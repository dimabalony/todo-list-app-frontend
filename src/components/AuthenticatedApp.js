import React from "react";
import TodoList from "./TodoList";
import APIManager from "../APIManager";
import 'bootstrap/dist/css/bootstrap.css';
import SelectedTodo from "./SelectedTodo";
import AddTodoForm from "./AddTodoForm";
import SocketManager from "../SocketManager";

class AuthenticatedApp extends React.Component {
    state = {
        todos: null,
        selectedTodo: null,
        notLoadedText: "Loading..."
    };

    constructor(props) {
        super(props);

        this.handleSelectTodo = this.handleSelectTodo.bind(this);
        this.handleBackButtonClicked = this.handleBackButtonClicked.bind(this);
        this.handleAddTodo = this.handleAddTodo.bind(this);
        this.handleDeleteTodo = this.handleDeleteTodo.bind(this);
        this.handleEditTodo = this.handleEditTodo.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentDidMount() {
        this.subscribeToTodos();
    }

    componentWillUnmount() {
        this.unsubscribeFromTodos();
    }

    subscribeToTodos() {
        SocketManager.subscribeToTodos((response) => {
            switch (response.type) {
                case "post":
                    const todo = JSON.parse(response.json);
                    this.setState(prevState => {
                        return {
                            todos: prevState.todos.concat([todo]),
                            selectedTodo: todo
                        }
                    })
                    break
                case "put":
                    const selectedTodo = JSON.parse(response.json);
                    this.setState(prevState => {
                        const updatedList = prevState.todos.map((item) => {
                            if (item.id === response.id) {
                                return selectedTodo
                            } else {
                                return item
                            }
                        })
                        return {
                            todos: updatedList,
                            selectedTodo: selectedTodo
                        }
                    })
                    break
                case "delete":
                    this.setState(prevState => {
                        return {
                            todos: prevState.todos.filter(todo => todo.id !== response.id)
                        }
                    })
                    break
                case "get":
                    const todos = JSON.parse(response.json);
                    this.setState({
                        todos: todos
                    })
                    break
                default: break
            }
        }, (error) => {
            this.props.setAuthenticated(false)
        });
    }

    unsubscribeFromTodos() {
        SocketManager.unsubscribeFromTodos();
    }

    handleSelectTodo(todo) {
        this.setState({
            selectedTodo: todo
        })
    }

    handleBackButtonClicked() {
        this.setState({
            selectedTodo: null
        })
    }

    handleAddTodo(todo) {
        SocketManager.sendTodo(todo);
    }

    handleDeleteTodo(id) {
        SocketManager.deleteTodo(id);
    }

    handleEditTodo(todo) {
        SocketManager.updateTodo(todo);
    }

    handleLogout() {
        APIManager.logout()
            .then((response) => {
                if (response.ok) {
                    this.props.setAuthenticated(false);
                }
            })
    }

    render() {
        if (this.state.todos === null) {
            return (
                <div>
                    <h1>Loading.....</h1>
                </div>
            )
        } else {
            if (this.state.selectedTodo === null) {
                return (
                    <div>
                        <AddTodoForm handleAddTodo = { this.handleAddTodo } handleLogout = { this.handleLogout } />
                        <br/>
                        <TodoList
                            todos={ this.state.todos }
                            handleSelectedTodo = { this.handleSelectTodo }
                            handleDeleteTodo = { this.handleDeleteTodo }
                        />
                    </div>
                )
            } else {
                return (
                    <SelectedTodo
                        todo={ this.state.selectedTodo }
                        handleBackButtonClicked = { this.handleBackButtonClicked }
                        handleEditTodo = { this.handleEditTodo }
                    />
                )
            }
        }
    }
}

export default AuthenticatedApp