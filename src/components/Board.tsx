import React from 'react';
import { Grid } from '@mui/material';
import ListForm from './ListForm';
import TaskList from './TaskList';

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
  lists: List[];
  addList: (title: string) => void;
  addTask: (listId: number, text: string) => void;
  toggleTask: (listId: number, taskId: number) => void;
}

const Board: React.FC<Props> = ({ lists, addList, addTask, toggleTask }) => {
  return (
    <div>
      <ListForm addList={addList} />
      <Grid container spacing={3}>
        {lists.map(list => (
          <Grid item key={list.id} xs={12} md={6} lg={4}>
            <TaskList list={list} addTask={addTask} toggleTask={toggleTask} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Board;
