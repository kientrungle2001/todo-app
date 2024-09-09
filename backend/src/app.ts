import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import centerRoutes from './routes/centers';
import roomRoutes from './routes/rooms';
import subjectRoutes from './routes/subjects';
import teacherRoutes from './routes/teachers';
import todoRoutes from './routes/todos';
import userTodoRoutes from './routes/userTodos';

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

export default app;