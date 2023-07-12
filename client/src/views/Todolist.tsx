import {Container} from '@mui/material';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';

const Todolist = () => (
  <Container maxWidth={false}>
    <TodoForm />
    <TodoList />
  </Container>
);

export default Todolist;
