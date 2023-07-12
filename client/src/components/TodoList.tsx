import {useEffect} from 'react';
import {Box, Typography} from '@mui/material';
import {useGetAllTodoQuery} from '../redux/todoApi';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {selectUser} from '../redux/userSlice';
import {closeLoader, setShowLoader} from '../redux/loaderSlice';
import {selectTodo, setTodo} from '../redux/todoSlice';

const TodoList = () => {
  const {email} = useAppSelector(selectUser);
  const {data, isSuccess, isFetching} = useGetAllTodoQuery({email: email!});
  const dispatch = useAppDispatch();
  const {todos} = useAppSelector(selectTodo);

  useEffect(() => {
    if (!isFetching) {
      dispatch(closeLoader());
    }
  }, [isFetching]);

  useEffect(() => {
    dispatch(setShowLoader());
  }, []);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setTodo({todos: data}));
    }
  }, [isSuccess]);

  // prettier-ignore
  return (
    <Box sx={{mt: 2}}>
      {isSuccess && todos.length ? todos.map((todo) => (
        <Box key={todo.id}>
          <Typography>{todo.title}</Typography>
          <Typography>{todo.value}</Typography>
        </Box>
      )) : 'Cписок задач пуст'}
    </Box>
  );
};

export default TodoList;
