import React from "react";
import 'bootstrap/dist/css/bootstrap.css';

function AddTodoFormComponent(props) {
    return (
        <div className="card">
            <h4 className="card-header">Create TODO</h4>
            <form className="card-body" onSubmit={props.handleSubmit}>
                <div className="mb-3">
                    <label>Title of the task:
                        <input
                            className="form-control"
                            name="title"
                            value={props.data.title}
                            onChange={props.handleChange}
                            placeholder="Title"
                            required
                        />
                    </label>
                </div>
                <div className="mb-3">
                    <label>Date when task must be completed:
                        <input
                            className="form-control"
                            name="date"
                            value={props.data.date}
                            onChange={props.handleChange}
                            placeholder="dd/mm/yyyy (optional)"
                            pattern="(^(((0[1-9]|1[0-9]|2[0-8])[\/](0[1-9]|1[012]))|((29|30|31)[\/](0[13578]|1[02]))|((29|30)[\/](0[4,6,9]|11)))[\/](19|[2-9][0-9])\d\d$)|(^29[\/]02[\/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)"
                        />
                    </label>
                </div>
                <div className="mb-3">
                    <label>Choose a status:
                        <br/>
                        <select
                            className="custom-select"
                            name="status"
                            value={props.data.status}
                            onChange={props.handleChange}
                            required
                        >
                            <option value="To do">To do</option>
                            <option value="Done">Done</option>
                        </select>
                    </label>
                </div>
                <input className="btn btn-success btn-lg btn-block" type="submit" value="Send"/>
            </form>
        </div>
    )
}

export default AddTodoFormComponent;