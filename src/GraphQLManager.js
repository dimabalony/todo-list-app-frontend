import ApolloClient from "apollo-client";
import gql from "graphql-tag";
import {InMemoryCache} from "apollo-cache-inmemory";
import {HttpLink} from "apollo-link-http";
import { onError } from "apollo-link-error";
import {ApolloLink} from "apollo-link";

var GraphQLManager = (function () {

    var instance;

    var setupClient = function (notAuthCB) {
        const backendURL = () => {
            if (process.env.REACT_APP_BACKEND_URL != null) {
                return process.env.REACT_APP_BACKEND_URL + "graphql"
            } else {
                return "http://localhost:8080/" + 'graphql'
            }
        }

        const errorLink = onError(({ graphQLErrors, networkError }) => {
            if (networkError && networkError.statusCode === 401) {
                notAuthCB();
            }
        });

        const link = new HttpLink({
            uri: backendURL,
            credentials: 'include'
        });

        const groupedLink = ApolloLink.from([
            errorLink,
            link,
        ]);
        const cache = new InMemoryCache();
        this.client = new ApolloClient({
            link: groupedLink,
            cache: cache,
            notAuthCB: null
        });
    }

    var createInstance = function () {
        return {
            client: null,
            setupClient: setupClient,
            getTodos: getTodos,
            postTodo: postTodo,
            deleteTodo: deleteTodo,
            updateTodo: updateTodo
        }
    }

    var getTodos = function () {
        return this.client.query({
            query: gql`
            {
                todos {
                    id
                    title
                    status
                    date
                }
            }
            `
        })
    }

    var postTodo = function (todo) {
        return this.client.mutate({
            mutation: gql`
            mutation CreateTodo {
                createTodo(title: "${todo.title}", date: "${todo.date}", status: "${todo.status}") {
                    id
                    title
                    status
                    date
                }
            }
           `
        })
    }

    var deleteTodo = function (id) {
        return this.client.mutate({
            mutation: gql`
            mutation DeleteTodo {
                deleteTodo(id: "${id}")
            }
           `
        })
    }

    var updateTodo = function (todo) {
        return this.client.mutate({
            mutation: gql`
            mutation UpdateTodo {
                updateTodo(id: "${todo.id}", title: "${todo.title}", status: "${todo.status}", date: "${todo.date}") {
                    id
                    title
                    status
                    date
                }
            }
           `
        })
    }

    return {
        getInstance: function() {
            return instance || (instance = createInstance());
        }
    }
})();

export default GraphQLManager