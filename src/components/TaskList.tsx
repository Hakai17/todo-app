import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface List {
  id: number;
  title: string;
  tasks: Task[];
}

interface Props {
  list: List;
  addTask: (listId: number, text: string) => void;
  toggleTask: (listId: number, taskId: number) => void;
}

const TaskList: React.FC<Props> = ({ list, addTask, toggleTask }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>{list.title}</Typography>
        <TaskForm listId={list.id} addTask={addTask} />
        {list.tasks.map(task => (
          <TaskItem key={task.id} task={task} toggleTask={() => toggleTask(list.id, task.id)} />
        ))}
      </CardContent>
    </Card>
  );
};

export default TaskList;
