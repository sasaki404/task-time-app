import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Container, Box } from '@mui/material';
import { TodoForm } from './TodoForm';
import { TodoList } from './TodoList';

export const App = () => {
    const [todo, setTodo] = useState('');
    const [todoList, setTodoList] = useState([]);
    const [typeList, setTypeList] = useState([]);
    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        作業時間記録
                    </Typography>
                </Toolbar>
            </AppBar>
            <div style={{ marginBottom: 15 }}></div>
            <TodoForm todo={todo} setTodo={setTodo} todoList={todoList} setTodoList={setTodoList} typeList={typeList} setTypeList={setTypeList} />
            <TodoList todoList={todoList} setTodoList={setTodoList} typeList={typeList} setTypeList={setTypeList} />
        </Box>
    );
};
