import React from "react";
import AddTodoFormComponent from "./AddTodoFormComponent";

class AddTodoForm extends React.Component {
    state = {
        title: "",
        date: "",
        status: "To do"
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
            date: this.state.date.length === 0 ? null : this.state.date,
            status: this.state.status
        };
        this.props.handleAddTodo(object);
    }

    render() {
        return (
            <AddTodoFormComponent
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                data={this.state}
            />
        )
    }
}

export default AddTodoForm;