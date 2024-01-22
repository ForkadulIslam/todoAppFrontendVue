<template>
    <div class="todo-form-container">
        <h2>Create Todo</h2>
        <router-link to="/">Dashboard</router-link>
        <form @submit.prevent="addTodo" class="todo-form">
            <div class="form-group">
                <label for="title">Title:</label>
                <input v-model="title" type="text" id="title">
                <span v-if="errors.title" class="error">{{ errors.title[0] }}</span>
            </div>

            <div class="form-group">
                <label for="description">Description:</label>
                <textarea v-model="description" id="description"></textarea>
                <span v-if="errors.description" class="error">{{ errors.description[0] }}</span>
            </div>

            <div class="form-group">
                <label for="due_date">Due Date:</label>
                <input v-model="dueDate" type="date" id="due_date">
                <span v-if="errors.due_date" class="error">{{ errors.due_date[0] }}</span>
            </div>

            <div class="form-group">
                <button type="submit" :disabled="loading">
                    <span v-if="loading">Adding...</span>
                    <span v-else>Add Todo</span>
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
                title: '',
                description: '',
                dueDate: '',
                errors: {},
                loading: false,
            };
        },
        methods: {
            async addTodo() {
                try {
                    this.loading = true;
                    const response = await axios.post(api_base_url+'/todo', {
                        title: this.title,
                        description: this.description,
                        due_date: this.dueDate,
                    });
                    this.title = '';
                    this.description = '';
                    this.dueDate = '';
                    this.errors = {};
                    this.$router.push('/');
                    console.log(response.data);
                } catch (error) {
                    if (error.response.status === 422) {
                        this.errors = error.response.data.errors;
                    }
                } finally {
                    this.loading = false;
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
    button {
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
