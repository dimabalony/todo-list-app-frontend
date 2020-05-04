import React from "react"
import Todo from "../Todo"
import './style.css'

export default function TodoList({ todos, handleSelectedTodo, handleDeleteTodo }) {
    const todoElements = todos.map(todo =>
        <li key={todo.id} className="todo-list__li">
            <Todo
                todo={todo}
                handleSelectedTodo={handleSelectedTodo}
                handleDeleteTodo = {handleDeleteTodo}
            />
        </li>
    )
    return (
        <ul>
            {todoElements}
        </ul>
    )
}