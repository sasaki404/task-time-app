import { Container, Box, TextField, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React, { useState } from 'react';
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
export const TodoForm = (props: { todo: any; setTodo: any; todoList: any; setTodoList: any; typeList: any; setTypeList: any; }) => {
    const { todo, setTodo, todoList, setTodoList, typeList, setTypeList } = props;
    const [type, setType] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setType(event.target.value);
    };

    return (
        <Container maxWidth="sm">
            <Stack direction="row">
                <TextField
                    id='outlined-basic'
                    label='タスク名'
                    type='text'
                    name='inputTodo'
                    value={todo}
                    onChange={(e) => {
                        setTodo(e.target.value);
                    }}
                    variant='filled'
                />
                <FormControl sx={{ m: 1, minWidth: 80 }} size="small">
                    <InputLabel id="demo-simple-select-label">工数</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={type}
                        label="工数"
                        onChange={handleChange}
                    >
                        <MenuItem value={'共通工数'}>共通</MenuItem>
                        <MenuItem value={'新規'}>新規</MenuItem>
                        <MenuItem value={'修正'}>修正</MenuItem>
                        <MenuItem value={'製造間接工数'}>製造間接</MenuItem>
                        <MenuItem value={'新規1'}>新規1</MenuItem>
                        <MenuItem value={'修正1'}>修正1</MenuItem>
                    </Select>
                </FormControl>
                <IconButton
                    aria-label='add'
                    size='large'
                    type='submit'
                    onClick={() => {
                        setTodoList([...todoList, todo]);
                        setTodo("");
                        setTypeList([...typeList, type]);
                    }}
                >
                    <AddIcon fontSize='inherit' />
                </IconButton>
            </Stack>
        </Container>
    );
};