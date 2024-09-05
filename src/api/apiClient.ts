import apiClient from './axiosInstance';

// Example API calls
export const getTodos = () => apiClient.get('/todos');
export const addTodo = (title: string) => apiClient.post('/todos', { title });
export const editTodo = (id: number, title: string, completed: boolean) => apiClient.put(`/todos/${id}`, { title, completed });
export const deleteTodo = (id: number) => apiClient.delete(`/todos/${id}`);
export const toggleTodo = (id: number, completed: boolean) => apiClient.put(`/todos/${id}`, { completed: !completed });
export const getAssignedUsers = (todoId: number) => apiClient.get(`/todos/${todoId}/users`);
export const assignUsersToTodo = (todoId: number, userIds: number[]) => apiClient.post(`/todos/${todoId}/users`, { userIds });
