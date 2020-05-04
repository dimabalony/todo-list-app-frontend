import React, {Component} from "react";

class Todo extends Component {
    render() {
        const todo = this.props.todo;
        return (
            <div className="card">
                <div className="card-header">
                   <h2>
                       {todo.title}
                       <button onClick={ () => this.props.handleDeleteTodo(todo.id) } className="btn btn-danger btn-lg float-right">
                           Delete
                       </button>
                       <button onClick={ () => this.props.handleSelectedTodo(todo) } className="btn btn-primary btn-lg float-right">
                           View details
                       </button>
                   </h2>
                </div>
                <div className="card-body">
                    <h6 className="card-text text-muted">
                        status: { (todo.status) }
                    </h6>
                    <h6 className="card-text text-muted">
                        date of completion: { (todo.date ?? "Not set") }
                    </h6>
                </div>
            </div>
        );
    }
}

export default Todo