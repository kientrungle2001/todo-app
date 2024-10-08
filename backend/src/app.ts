import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import centerRoutes from './routes/centers';
import roomRoutes from './routes/rooms';
import subjectRoutes from './routes/subjects';
import teacherRoutes from './routes/teachers';
import classRoutes from './routes/classes';
import todoRoutes from './routes/todos';
import userTodoRoutes from './routes/userTodos';
import studentRoutes from './routes/students';  // <-- Import students route
import scheduleRoutes from './routes/schedules';  // <-- Import schedules route
import tableRoutes from './routes/tables';  // <-- Import table routes

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/centers', centerRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/todos', todoRoutes);
app.use('/api/todos', userTodoRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/students', studentRoutes);  // <-- Add students route
app.use('/api/schedules', scheduleRoutes);
app.use('/api/tables', tableRoutes);  // <-- Add table routes

export default app;
