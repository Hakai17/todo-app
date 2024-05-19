import React from 'react';
import { ListItem, ListItemText, Checkbox } from '@mui/material';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface Props {
  todo: Todo;
  toggleTodo: (id: number) => void;
}

const TodoItem: React.FC<Props> = ({ todo, toggleTodo }) => {
  return (
    <ListItem
      button
      onClick={() => toggleTodo(todo.id)}
      style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
    >
      <Checkbox
        checked={todo.completed}
        tabIndex={-1}
        disableRipple
      />
      <ListItemText primary={todo.text} />
    </ListItem>
  );
};

export default TodoItem;
