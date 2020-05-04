import 'whatwg-fetch'

class APIManager {
    static backendURL() {
        if (process.env.BACKEND_URL != null) {
            return process.env.BACKEND_URL
        } else {
            return "http://localhost:8080/"
        }
    }

    static getTodos() {
        const url = this.backendURL() + "todos";

        return fetch(url)
            .then(response => response.json())
    }

    static postTodo(todo) {
        const url = this.backendURL() + "todos";
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(todo)
        };

        return fetch(url, requestOptions)
            .then(response => response.json())
    }

    static updateTodo(todo) {
        console.log(todo);
        const url = this.backendURL() + "todos/" + todo.id;
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(todo)
        };

        return fetch(url, requestOptions)
            .then(response => response.json())
    }

    static deleteTodo(id) {
        const url = this.backendURL() + "todos/" + id;
        const requestOptions = {
            method: 'DELETE'
        };
        return fetch(url, requestOptions)
    }
}

export default APIManager