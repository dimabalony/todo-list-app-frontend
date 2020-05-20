import 'whatwg-fetch'

class SocketManager {
    static backendURL() {
        if (process.env.REACT_APP_SOCKET_URL != null) {
            return process.env.REACT_APP_SOCKET_URL
        } else {
            return "ws://localhost:8080/"
        }
    }


    static subscribeToTodos(todosCB, onErrorCB) {
        const url = this.backendURL() + "todos";
        this.socket = new WebSocket(url);

        this.socket.onmessage = (text) => {
            const json = JSON.parse(text.data);
            todosCB(json);
        };

        this.socket.onerror = function(error) {
            onErrorCB(error);
        };
    }

    static unsubscribeFromTodos() {
        this.socket.close();
    }

    static sendTodo(todo) {
        const data = JSON.stringify({
            type: "post",
            json: JSON.stringify(todo)
        });

        this.socket.send(data);
    }

    static updateTodo(todo) {
        const data = JSON.stringify({
            type: "put",
            id: todo.id,
            json: JSON.stringify(todo)
        });

        this.socket.send(data);
    }

    static deleteTodo(id) {
        const data = JSON.stringify({
            type: "delete",
            id: id,
            json: ""
        });

        this.socket.send(data);
    }

    static signIn(credentials) {
        const url = this.backendURL() + "sign-in"
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
            credentials: 'include',
            mode: 'cors'
        };
        return fetch(url, requestOptions)
    }

    static signUp(credentials) {
        const url = this.backendURL() + "sign-up"
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
            credentials: 'include',
            mode: 'cors'
        };
        return fetch(url, requestOptions)
    }

    static logout() {
        const url = this.backendURL() + "logout"
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            mode: 'cors'
        };
        return fetch(url, requestOptions)
    }
}

export default SocketManager