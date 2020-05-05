import React from "react";
import TodoList from "./TodoList";
import APIManager from "../APIManager";
import 'bootstrap/dist/css/bootstrap.css';
import SelectedTodo from "./SelectedTodo";
import AddTodoForm from "./AddTodoForm";

class App extends React.Component {
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
    }


    componentDidMount() {
        this._asyncRequest = this.getTodos()
    }

    componentWillUnmount() {
        if (this._asyncRequest) {
            this._asyncRequest.cancel();
        }
    }

    getTodos() {
        APIManager.getTodos()
            .then((result) => {
                this.setState({
                    todos: result
                })
            })
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
        APIManager.postTodo(todo)
            .then((result) => {
                this.setState(prevState => {
                    return {
                        todos: prevState.todos.concat([result]),
                        selectedTodo: result
                    }
                })
            })
    }

    handleDeleteTodo(id) {
        APIManager.deleteTodo(id)
            .then((result) => {
                if (result.ok) {
                    this.setState(prevState => {
                        return {
                            todos: prevState.todos.filter(todo => todo.id !== id)
                        }
                    })
                }
            })
    }

    handleEditTodo(todo) {
        APIManager.updateTodo(todo)
            .then((result) => {
                this.setState(prevState => {
                    const updatedList = prevState.todos.map((item) => {
                        if (item.id === result.id) {
                            return result
                        } else {
                            return item
                        }
                    })
                    return {
                        todos: updatedList,
                        selectedTodo: result
                    }
                })
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
                    <div className="container">
                        <div className="jumbotron">
                            <h1 className="display-3">TODO LIST</h1>
                        </div>
                        <AddTodoForm handleAddTodo = { this.handleAddTodo } />
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
                    <div className="container">
                        <div className="jumbotron">
                            <h1 className="display-3">TODO LIST</h1>
                        </div>
                        <div className="container">
                            <SelectedTodo
                                todo={ this.state.selectedTodo }
                                handleBackButtonClicked = { this.handleBackButtonClicked }
                                handleEditTodo = { this.handleEditTodo }
                            />
                        </div>
                    </div>
                )
            }
        }
    }
}

export default App