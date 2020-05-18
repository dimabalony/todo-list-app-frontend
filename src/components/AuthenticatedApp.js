import React from "react";
import TodoList from "./TodoList";
import APIManager from "../APIManager";
import 'bootstrap/dist/css/bootstrap.css';
import SelectedTodo from "./SelectedTodo";
import AddTodoForm from "./AddTodoForm";

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
        APIManager.getTodos()
            .then((response) => {
                if (response.ok) {
                    const parsedJSON = response.json();
                    parsedJSON.then((todos) => {
                        this.setState({
                            todos: todos
                        });
                    });
                } else if (response.status === 401) {
                    this.props.setAuthenticated(false);
                }
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
        APIManager.postTodo(todo)
            .then((response) => {
                if (response.ok) {
                    const parsedJSON = response.json();
                    parsedJSON.then((todo) => {
                        this.setState(prevState => {
                            return {
                                todos: prevState.todos.concat([todo]),
                                selectedTodo: todo
                            }
                        })
                    });
                } else if (response.status === 401) {
                    this.props.setAuthenticated(false)
                }
            })
    }

    handleDeleteTodo(id) {
        APIManager.deleteTodo(id)
            .then((response) => {
                if (response.ok) {
                    this.setState(prevState => {
                        return {
                            todos: prevState.todos.filter(todo => todo.id !== id)
                        }
                    })
                } else if (response.status === 401) {
                    this.props.setAuthenticated(false)
                }
            })
    }

    handleEditTodo(todo) {
        APIManager.updateTodo(todo)
            .then((response) => {
                if (response.ok) {
                    const parsedJSON = response.json();
                    parsedJSON.then((result) => {
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
                    });

                } else if (response.status === 401) {
                    this.props.setAuthenticated(false)
                }
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