import {useEffect} from 'react';
import {Box} from '@mui/material';
import {useGetAllTodoQuery} from '../redux/todoApi';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {selectUser} from '../redux/userSlice';
import {closeLoader, setShowLoader} from '../redux/loaderSlice';
import {selectTodo, setTodo} from '../redux/todoSlice';
import TodoItem from './TodoItem';

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
        <TodoItem key={todo.id} id={todo.id!}/>
      )) : 'Cписок задач пуст'}
    </Box>
  );
};

export default TodoList;
