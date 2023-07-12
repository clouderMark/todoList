import {MouseEvent, useEffect} from 'react';
import {Box, Card, CardContent, IconButton, Typography} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {removeTodo, selectTodo} from '../redux/todoSlice';
import {setItem} from '../redux/todoFormSlice';
import {useDeleteTodoMutation} from '../redux/todoApi';
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

  const handleClick = () => {
    if (todo) {
      dispatch(removeTodo({id: todo.id}));
      dispatch(setItem({item: todo}));
    }
  };

  const deleteClick = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (todo) {
      deleteTodo({id: todo!.id, email: email!});
      setTimeout(() => {
        dispatch(removeTodo({id: todo.id}));
      }, 1000);
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

  return (
    <>
      {todo ? (
        <Card sx={{mb: 1}} onClick={handleClick}>
          <CardContent sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Box>
              <Typography>{todo.title}</Typography>
              <Typography>{todo.value}</Typography>
            </Box>
            <Box>
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
