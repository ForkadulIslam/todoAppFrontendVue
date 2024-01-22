<template>
    <div>
        <h2>Todo List</h2>
        <router-link to="/create">Create Todo</router-link>
        <div>
            <label for="statusFilter">Filter by Status:</label>
            <select class="status_dropdown" v-model="selectedStatus" id="statusFilter" @change="fetchTodos">
                <option value="">All</option>
                <option value="Completed">Completed</option>
                <option value="Incomplete">Incomplete</option>
            </select>
        </div>
        <table class="todo-table">
            <thead>
            <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th>Due Date</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="todo in todos" :key="todo.id">
                <td>{{ todo.title }}</td>
                <td>{{ todo.description }}</td>
                <td>
                    <span :class="getStatusClass(todo.status)">{{todo.status}}</span>
                </td>
                <td>{{ todo.due_date }}</td>
                <td>
                    <button v-if="todo.status === 'Completed'" @click="removeTodo(todo.id)">
                        Remove
                    </button>
                    <router-link v-if="todo.status === 'Incomplete'" :to="{ name: 'edit', params: { id: todo.id }}">
                        Edit
                    </router-link>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import axios from 'axios';
    import {api_base_url} from "@/config";
    export default {
        data() {
            return {
                todos: [],
                selectedStatus: '',
            };
        },
        mounted() {
            this.fetchTodos(); // Fetch todos when the component is mounted
        },
        watch: {
            selectedStatus: 'fetchTodos', // Watch for changes in selectedStatus and trigger fetchTodos
        },
        methods: {
            getStatusClass(status) {
                return {
                    completed: status === 'Completed',
                    incomplete: status === 'Incomplete',
                };
            },

            async fetchTodos() {
                try {
                    const response = await axios.get(api_base_url + '/todo', {
                        params: {
                            status: this.selectedStatus,
                        },
                    });
                    this.todos = response.data;
                } catch (error) {
                    console.error('Error fetching todos:', error);
                }
            },
            async removeTodo(todoId) {
                try {
                    await axios.delete(`${api_base_url}/todo/${todoId}`);
                    this.todos = this.todos.filter(todo => todo.id !== todoId);
                } catch (error) {
                    console.error('Error removing todo:', error);
                }
            },
        },
    };
</script>

<style scoped>
    .status_dropdown{
        margin-top: 20px;
    }
    .todo-table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
    }

    .todo-table th, .todo-table td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
    }

    .todo-table th {
        background-color: #f2f2f2;
    }

    button {
        background-color: #ff4444;
        color: #fff;
        cursor: pointer;
        border: none;
        padding: 8px;
        display: inline-block;
        text-decoration: none;
    }
    .completed {
        color: #4caf50;
        font-weight: bold;
    }

    .incomplete {
        color: #ff9800;
        font-weight: bold;
    }
</style>
