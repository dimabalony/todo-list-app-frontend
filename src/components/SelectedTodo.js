import React, {Component} from "react";
import EditTodoForm from "./EditTodoForm";

class SelectedTodo extends Component {
    render() {
        const {todo, handleEditTodo} = this.props
        return (
            <div>
                <div className="card">
                    <div className="card-header">
                        <h2>
                            <button onClick={this.props.handleBackButtonClicked} className="btn btn-primary btn-lg">
                                Back
                            </button>
                        </h2>
                    </div>
                    <div className="card-body">
                        <h6 className="card-text text-muted">
                            title: { todo.title }
                        </h6>
                        <h6 className="card-text text-muted">
                            status: { (todo.status) }
                        </h6>
                        <h6 className="card-text text-muted">
                            date of completion: { (todo.date ?? "Not set") }
                        </h6>
                    </div>
                </div>
                <br/>
                <EditTodoForm id={todo.id} handleEditTodo={handleEditTodo} />
            </div>
        );
    }
}

export default SelectedTodo