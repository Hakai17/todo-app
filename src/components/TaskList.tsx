// TaskList.tsx

import React, { useState } from 'react';
import { Card, CardContent, Typography, IconButton, TextField, Button, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';
import { Draggable, DraggableProvided } from 'react-beautiful-dnd';

interface Task {
  id: number;
  text: string;
  description: string;
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
  updateTask: (listId: number, taskId: number, text: string, description: string) => void;
  deleteTask: (listId: number, taskId: number) => void;
  toggleTask: (listId: number, taskId: number) => void;
  deleteList: (listId: number) => void;
  updateListTitle: (listId: number, newTitle: string) => void;
}

const TaskList: React.FC<Props> = ({ list, addTask, updateTask, deleteTask, toggleTask, deleteList, updateListTitle }) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState(list.title);

  const handleEditTitle = () => {
    setIsEditingTitle(true);
  };

  const handleSaveTitle = () => {
    updateListTitle(list.id, title);
    setIsEditingTitle(false);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDeleteList = () => {
    deleteList(list.id);
  };

  return (
    <Card style={{ backgroundColor: '#e6e6e6', marginBottom: '20px' }}>
      <CardContent>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            {isEditingTitle ? (
              <div>
                <TextField
                  value={title}
                  onChange={handleTitleChange}
                  size="small"
                />
                <Button onClick={handleSaveTitle} size="small">Save</Button>
              </div>
            ) : (
              <Typography variant="h5" gutterBottom onClick={handleEditTitle}>
                {list.title}
              </Typography>
            )}
          </Grid>
          <Grid item>
            <IconButton onClick={handleDeleteList}>
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <TaskForm listId={list.id} addTask={addTask} />
          {list.tasks.map((task, index) => (
            <Draggable key={task.id} draggableId={String(task.id)} index={index}>
              {(provided: DraggableProvided) => (
                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                  <TaskItem
                    task={task}
                    listId={list.id}
                    updateTask={updateTask}
                    deleteTask={deleteTask}
                  />
                </div>
              )}
            </Draggable>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskList;
