import {Card, CardContent, Typography} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {removeTodo, selectTodo} from '../redux/todoSlice';
import {setItem} from '../redux/todoFormSlice';

interface IProps {
  id: string;
}

const TodoItem = (props: IProps) => {
  const todo = useAppSelector(selectTodo).todos.find((todo) => todo.id === props.id);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (todo) {
      dispatch(removeTodo({id: todo.id}));
      dispatch(setItem({item: todo}));
    }
  };

  return (
    <>
      {todo ? (
        <Card sx={{mb: 1}} onClick={handleClick}>
          <CardContent>
            <Typography>{todo.title}</Typography>
            <Typography>{todo.value}</Typography>
          </CardContent>
        </Card>
      ) : null}
    </>
  );
};

export default TodoItem;
