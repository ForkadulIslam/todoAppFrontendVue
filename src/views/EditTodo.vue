<template>
    <div class="todo-form-container">
        <h2>Edit Todo</h2>
        <router-link to="/">Back</router-link>
        <form @submit.prevent="updateTodo" class="todo-form">
            <div class="form-group">
                <label for="title">Title:</label>
                <input v-model="todo.title" type="text" id="title">
                <span v-if="errors.title" class="error">{{ errors.title[0] }}</span>
            </div>

            <div class="form-group">
                <label for="description">Description:</label>
                <textarea v-model="todo.description" id="description"></textarea>
            </div>

            <div class="form-group">
                <label for="due_date">Due Date:</label>
                <input v-model="todo.due_date" type="date" id="due_date">
            </div>

            <div class="form-group">
                <label for="status">Status:</label>
                <select v-model="todo.status" id="status">
                    <option value="Incomplete">Incomplete</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>

            <div class="form-group">
                <button type="submit" :disabled="loading">
                    <span v-if="loading">Updating...</span>
                    <span v-else>Update Todo</span>
                </button>
            </div>
        </form>
    </div>
</template>

<script>
    import axios from 'axios';
    import {api_base_url} from "@/config";
    export default {
        data() {
            return {
                todo: {
                    title: '',
                    description: '',
                    due_date: '',
                    status: 'Incomplete', // Default status
                },
                errors: {},
                loading: false,
            };
        },
        mounted() {
            // Fetch the todo details when the component is mounted
            this.fetchTodoDetails();
        },
        methods: {
            async fetchTodoDetails() {
                try {
                    const todoId = this.$route.params.id;
                    const response = await axios.get(`${api_base_url}/todo/${todoId}/edit`);
                    this.todo = response.data;
                } catch (error) {
                    console.error('Error fetching todo details:', error);
                }
            },
            async updateTodo() {
                try {
                    this.loading = true; // Set loading to true during the request

                    const todoId = this.$route.params.id;
                    const response = await axios.put(`${api_base_url}/todo/${todoId}`, this.todo);

                    // Redirect to the dashboard after updating the todo
                    this.$router.push('/');

                    console.log(response.data); // You can handle the successful response here
                } catch (error) {
                    if (error.response.status === 422) {
                        // Update the errors data with the validation errors from the server
                        this.errors = error.response.data.errors;
                    } else {
                        console.error('Error updating todo:', error);
                    }
                } finally {
                    this.loading = false; // Set loading back to false, whether the request succeeds or encounters an error
                }
            },
        },
    };
</script>

<style scoped>
    .todo-form-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .todo-form {
        max-width: 400px;
        width: 100%;
        margin-top: 20px;
    }

    .form-group {
        margin-bottom: 15px;
    }

    label {
        display: block;
        margin-bottom: 5px;
    }

    input,
    textarea,
    button,
    select {
        width: 100%;
        padding: 8px;
        box-sizing: border-box;
    }

    button {
        background-color: #4caf50;
        color: #fff;
        cursor: pointer;
        border: none;
        padding: 10px;
    }

    .error {
        color: red;
        font-size: 12px;
    }
</style>
