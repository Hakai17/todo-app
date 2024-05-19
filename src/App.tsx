import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import Board from './components/Board';

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

const App: React.FC = () => {
  const [lists, setLists] = useState<List[]>([]);

  const addList = (title: string) => {
    const newList: List = { id: Date.now(), title, tasks: [] };
    setLists([...lists, newList]);
  };

  const addTask = (listId: number, text: string) => {
    const newTask: Task = { id: Date.now(), text, completed: false };
    setLists(lists.map(list => list.id === listId ? { ...list, tasks: [...list.tasks, newTask] } : list));
  };

  const toggleTask = (listId: number, taskId: number) => {
    setLists(lists.map(list => list.id === listId ? {
      ...list,
      tasks: list.tasks.map(task => task.id === taskId ? { ...task, completed: !task.completed } : task)
    } : list));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Task Board</Typography>
      <Board lists={lists} addList={addList} addTask={addTask} toggleTask={toggleTask} />
    </Container>
  );
};

export default App;
