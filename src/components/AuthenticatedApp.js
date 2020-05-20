import React from "react";
import TodoList from "./TodoList";
import APIManager from "../APIManager";
import 'bootstrap/dist/css/bootstrap.css';
import SelectedTodo from "./SelectedTodo";
import AddTodoForm from "./AddTodoForm";
import SocketManager from "../SocketManager";
import GraphQLManager from "../GraphQLManager";

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
        this._asyncRequest = this.getTodos();
    }

    componentWillUnmount() {
        if (this._asyncRequest) {
            this._asyncRequest.cancel();
        }
    }

    getTodos() {
        GraphQLManager.getInstance().getTodos()
            .then((response) => {
                this.setState({
                    todos: response.data.todos
                });
            });
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
        GraphQLManager.getInstance().postTodo(todo)
            .then((response) => {
                this.setState(prevState => {
                    return {
                        todos: prevState.todos.concat([response.data.createTodo]),
                        selectedTodo: response.data.createTodo
                    }
                })
            })
    }

    handleDeleteTodo(id) {
        GraphQLManager.getInstance().deleteTodo(id)
            .then((response) => {
                this.setState(prevState => {
                    return {
                        todos: prevState.todos.filter(todo => todo.id !== id)
                    }
                })
            })
    }

    handleEditTodo(todo) {
        GraphQLManager.getInstance().updateTodo(todo)
            .then((response) => {
                this.setState(prevState => {
                    const updatedList = prevState.todos.map((item) => {
                        if (item.id === response.data.updateTodo.id) {
                            return response.data.updateTodo
                        } else {
                            return item
                        }
                    })
                    return {
                        todos: updatedList,
                        selectedTodo: response.data.updateTodo
                    }
                })
            })
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