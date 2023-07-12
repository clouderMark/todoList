import {MouseEvent, useEffect} from 'react';
import {Box, Button, Card, CardContent, IconButton, Typography} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {removeTodo, selectTodo, setTodo} from '../redux/todoSlice';
import {selectTodoForm, setItem} from '../redux/todoFormSlice';
import {useDeleteTodoMutation, useUpdateTodoMutation} from '../redux/todoApi';
import {selectUser} from '../redux/userSlice';
import {handleAlert} from '../redux/alertSlice';

interface IProps {
  id: string;
}

const TodoItem = (props: IProps) => {
  const todo = useAppSelector(selectTodo).todos.find((todo) => todo.id === props.id);
  const dispatch = useAppDispatch();
  const [deleteTodo, {isSuccess, isError, error}] = useDeleteTodoMutation();
  const {email} = useAppSelector(selectUser);
  const {id, title, value, completed} = useAppSelector(selectTodoForm);

  const [
    updateTodo,
    {data: updatedTodoData, isSuccess: isUpdatedTodoSuccess, isError: isUpdatedTodoError, error: updatedDataError},
  ] = useUpdateTodoMutation();

  const handleClick = () => {
    if (todo) {
      dispatch(removeTodo({id: todo.id!}));
      dispatch(setItem({item: todo}));
      if (id) {
        dispatch(setTodo({todos: [{id: id!, title, value, completed: completed!}]}));
      }
    }
  };

  const deleteClick = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (todo) {
      deleteTodo({id: todo.id!, email: email!});
      setTimeout(() => {
        dispatch(removeTodo({id: todo.id!}));
      }, 1000);
    }
  };

  const handleChange = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (todo) {
      updateTodo({title: todo.title, value: todo.value, email: email!, id: todo.id, completed: !todo.completed});
    }
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(handleAlert({message: 'Заметка успешно удалена', statusCode: 201}));
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError && 'data' in error!) {
      dispatch(handleAlert({message: error.data.message, statusCode: error.status}));
    }
  }, [isError]);

  useEffect(() => {
    if (isUpdatedTodoSuccess) {
      if (todo) {
        dispatch(removeTodo({id: todo.id!}));
        dispatch(setTodo({todos: [updatedTodoData!]}));
      }
    }
  }, [isUpdatedTodoSuccess]);

  useEffect(() => {
    if (isUpdatedTodoError && 'data' in updatedDataError!) {
      dispatch(handleAlert({message: updatedDataError.data.message, statusCode: updatedDataError.status}));
    }
  }, [isUpdatedTodoError]);

  return (
    <>
      {todo ? (
        <Card sx={[todo.completed ? {boxShadow: '0.5px 1px 1px 0.5px tomato'} : {}, {mb: 1}]} onClick={handleClick}>
          <CardContent sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Box>
              <Typography>{todo.title}</Typography>
              <Typography>{todo.value}</Typography>
            </Box>
            <Box>
              <Button
                onClick={handleChange}
                variant="outlined"
                color={todo.completed ? 'primary' : 'success'}
                sx={{mr: 1}}
              >
                {todo.completed ? 'завершена' : 'В процессе'}
              </Button>
              <IconButton onClick={(e) => deleteClick(e)}>
                <DeleteForeverIcon color="warning" />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      ) : null}
    </>
  );
};

export default TodoItem;
