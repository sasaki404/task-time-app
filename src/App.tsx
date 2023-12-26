import { useState } from 'react';
import { Container, Box } from '@mui/material';
import { TodoForm } from './TodoForm';
import { TodoList } from './TodoList';

export const App = () => {
    const [todo, setTodo] = useState('');
    const [todoList, setTodoList] = useState([]);
    const [typeList, setTypeList] = useState([]);
    return (
        <Box>
            <Container maxWidth='xs'>
                <h1>作業時間記録</h1>
            </Container>
            <TodoForm todo={todo} setTodo={setTodo} todoList={todoList} setTodoList={setTodoList} typeList={typeList} setTypeList={setTypeList} />
            <TodoList todoList={todoList} setTodoList={setTodoList} typeList={typeList} setTypeList={setTypeList} />
        </Box>
    );
};
