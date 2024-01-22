import { createRouter, createWebHistory } from 'vue-router';
import TodoDashboard from './views/TodoDashboard.vue';
import TodoForm from './views/TodoForm.vue';
import EditTodo from "@/views/EditTodo";

const routes = [
    {
        path: '/',
        name: 'dashboard',
        component: TodoDashboard,
    },
    {
        path: '/create',
        name: 'create',
        component: TodoForm,
    },
    {
        path: '/edit/:id',
        name: 'edit',
        component: EditTodo,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
