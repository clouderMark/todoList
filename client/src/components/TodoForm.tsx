import {Box, Button, TextField} from '@mui/material';
import {FormEvent, useEffect, useState} from 'react';
import {ITodo} from '../types/types';
import {useCreateTodoMutation} from '../redux/todoApi';
import {handleAlert} from '../redux/alertSlice';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {selectUser} from '../redux/userSlice';

const initialState: ITodo = {
  title: '',
  value: '',
};

const TodoForm = () => {
  const [value, setValue] = useState(initialState);
  const [
    createTodo,
    {data: newTodoData, isSuccess: isCreateTodoSuccess, isError: isCreateTodoError, error: newDataError},
  ] = useCreateTodoMutation();
  const dispatch = useAppDispatch();
  const {email} = useAppSelector(selectUser);

  const handlSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    createTodo({...value, email: email!});
    setValue(initialState);
  };

  const handleReset = () => {
    setValue(initialState);
  };

  useEffect(() => {
    if (isCreateTodoSuccess) {
      dispatch(handleAlert({message: `${newTodoData!.title} успешно добавлена`, statusCode: 201}));
    }
  }, [isCreateTodoSuccess]);

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
          value={value.title}
          onChange={(e) => setValue({...value, title: e.target.value})}
          sx={{width: '100%', mb: 2}}
          size="small"
        />
        <TextField
          placeholder="Задача"
          name="value"
          value={value.value}
          onChange={(e) => setValue({...value, value: e.target.value})}
          sx={{width: '100%'}}
          size="small"
        />
      </Box>
      <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
        <Button variant="outlined" type="submit">
          Сохранить
        </Button>
        <Button onClick={handleReset} variant='outlined' color='warning'>
          Сбросить
        </Button>
      </Box>
    </Box>
  );
};

export default TodoForm;
