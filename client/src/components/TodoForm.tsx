import {Box, Button, TextField} from '@mui/material';
import {FormEvent, useEffect} from 'react';
import {useCreateTodoMutation, useUpdateTodoMutation} from '../redux/todoApi';
import {handleAlert} from '../redux/alertSlice';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {selectUser} from '../redux/userSlice';
import {setTodo} from '../redux/todoSlice';
import {reset, selectTodoForm, setTitle, setValue} from '../redux/todoFormSlice';

const TodoForm = () => {
  const dispatch = useAppDispatch();
  const [
    createTodo,
    {data: newTodoData, isSuccess: isCreateTodoSuccess, isError: isCreateTodoError, error: newDataError},
  ] = useCreateTodoMutation();
  const [
    updateTodo,
    {data: updatedTodoData, isSuccess: isUpdatedTodoSuccess, isError: isUpdatedTodoError, error: updatedDataError},
  ] = useUpdateTodoMutation();
  const {email} = useAppSelector(selectUser);
  const {title, value, id, completed} = useAppSelector(selectTodoForm);

  const handlSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (id) {
      updateTodo({title, value, email: email!, id, completed});
    } else {
      createTodo({title, value, email: email!});
    }

    dispatch(reset());
  };

  const handleReset = () => {
    dispatch(reset());
  };

  useEffect(() => {
    if (isCreateTodoSuccess) {
      dispatch(handleAlert({message: `${newTodoData!.title} успешно добавлена`, statusCode: 201}));
      dispatch(setTodo({todos: [newTodoData!]}));
    }
  }, [isCreateTodoSuccess]);

  useEffect(() => {
    if (isUpdatedTodoSuccess) {
      dispatch(handleAlert({message: `${updatedTodoData!.title} успешно обновлена`, statusCode: 201}));
      dispatch(setTodo({todos: [updatedTodoData!]}));
    }
  }, [isUpdatedTodoSuccess]);

  useEffect(() => {
    if (isUpdatedTodoError && 'data' in updatedDataError!) {
      dispatch(handleAlert({message: updatedDataError.data.message, statusCode: updatedDataError.status}));
    }
  }, [isUpdatedTodoError]);

  useEffect(() => {
    if (isCreateTodoError && 'data' in newDataError!) {
      dispatch(handleAlert({message: newDataError.data.message, statusCode: newDataError.status}));
    }
  }, [isCreateTodoError]);

  return (
    <Box component="form" onSubmit={handlSubmit} sx={{display: 'flex', mt: 2}}>
      <Box sx={{flexGrow: 1, mr: 2}}>
        <TextField
          placeholder="Название"
          name="title"
          value={title}
          onChange={(e) => dispatch(setTitle({title: e.target.value}))}
          sx={{width: '100%', mb: 2}}
          size="small"
        />
        <TextField
          placeholder="Задача"
          name="value"
          value={value}
          onChange={(e) => dispatch(setValue({value: e.target.value}))}
          sx={{width: '100%'}}
          size="small"
        />
      </Box>
      <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
        <Button variant="outlined" type="submit">
          Сохранить
        </Button>
        <Button onClick={handleReset} variant="outlined" color="warning">
          Сбросить
        </Button>
      </Box>
    </Box>
  );
};

export default TodoForm;
