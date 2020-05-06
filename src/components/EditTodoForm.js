import React from "react";
import EditTodoFormComponent from "./EditTodoFormComponent";

class EditTodoForm extends React.Component {
    state = {
        title: this.props.todo.title,
        date: this.props.todo.date,
        status: this.props.todo.status
    };

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        let object = {
            title: this.state.title,
            date: this.state.date,
            status: this.state.status,
            id: this.props.todo.id
        };
        this.props.handleEditTodo(object);
    }

    render() {
        return (
            <EditTodoFormComponent
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                data={this.state}
            />
        )
    }
}

export default EditTodoForm;