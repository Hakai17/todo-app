import React from 'react';
import { ListItem, ListItemText, Checkbox } from '@mui/material';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface Props {
  task: Task;
  toggleTask: () => void;
}

const TaskItem: React.FC<Props> = ({ task, toggleTask }) => {
  return (
    <ListItem
      button
      onClick={toggleTask}
      style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
    >
      <Checkbox
        checked={task.completed}
        tabIndex={-1}
        disableRipple
      />
      <ListItemText primary={task.text} />
    </ListItem>
  );
};

export default TaskItem;
