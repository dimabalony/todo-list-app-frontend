import 'whatwg-fetch'

class APIManager {
    static backendURL() {
        if (process.env.REACT_APP_BACKEND_URL != null) {
            return process.env.REACT_APP_BACKEND_URL
        } else {
            return "http://localhost:8080/"
        }
    }

    static getTodos() {
        const url = this.backendURL() + "todos";

        return fetch(url, {
            credentials: 'include'
        })
    }

    static postTodo(todo) {
        const url = this.backendURL() + "todos";
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(todo),
            credentials: 'include'
        };

        return fetch(url, requestOptions)
    }

    static updateTodo(todo) {
        const url = this.backendURL() + "todos/" + todo.id;
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(todo),
            credentials: 'include'
        };

        return fetch(url, requestOptions)
    }

    static deleteTodo(id) {
        const url = this.backendURL() + "todos/" + id;
        const requestOptions = {
            method: 'DELETE',
            credentials: 'include'
        };
        return fetch(url, requestOptions)
    }

    static signIn(credentials) {
        const url = this.backendURL() + "sign-in"
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
            credentials: 'include'
        };
        return fetch(url, requestOptions)
    }

    static signUp(credentials) {
        const url = this.backendURL() + "sign-up"
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
            credentials: 'include'
        };
        return fetch(url, requestOptions)
    }

    static logout() {
        const url = this.backendURL() + "logout"
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        };
        return fetch(url, requestOptions)
    }
}

export default APIManager