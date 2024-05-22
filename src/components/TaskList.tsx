import React, { useState, useRef } from 'react';
import { Card, CardContent, Typography, IconButton, TextField, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';
import { Draggable, Droppable, DraggableProvided } from 'react-beautiful-dnd';

interface Task {
  id: number;
  text: string;
  description: string;
  completed: boolean;
  members: { id: number; name: string }[];
  labels: { id: number; text: string; color: string }[];
}

interface Lists {
  id: number;
  title: string;
  tasks: Task[];
}

interface Props {
  lists: Lists;
  addTask: (listId: number, text: string) => void;
  updateTask: (listId: number, taskId: number, text: string, description: string, members: { id: number; name: string }[], labels: { id: number; text: string; color: string }[]) => void;
  deleteTask: (listId: number, taskId: number) => void;
  toggleTask: (listId: number, taskId: number) => void;
  deleteList: (listId: number) => void;
  updateListTitle: (listId: number, newTitle: string) => void;
}

const TaskList: React.FC<Props> = ({ lists, addTask, updateTask, deleteTask, toggleTask, deleteList, updateListTitle }) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState(lists.title);
  const titleInputRef = useRef<HTMLInputElement>(null);

  const handleEditTitle = () => {
    setIsEditingTitle(true);
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  };

  const handleSaveTitle = () => {
    updateListTitle(lists.id, title);
    setIsEditingTitle(false);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleTitleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSaveTitle();
    }
  };

  const handleDeleteList = () => {
    deleteList(lists.id);
  };

  return (
    <Card style={{ backgroundColor: '#e6e6e6', marginBottom: '20px', maxWidth: '300px', minWidth: '300px' }}>
      <CardContent>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            {isEditingTitle ? (
              <TextField
                value={title}
                onChange={handleTitleChange}
                onKeyDown={handleTitleKeyPress}
                inputRef={titleInputRef}
              />
            ) : (
              <Typography variant="h5" onClick={handleEditTitle}>
                {lists.title}
              </Typography>
            )}
          </Grid>
          <Grid item>
            <IconButton onClick={handleDeleteList}>
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Droppable droppableId={String(lists.id)} type="task">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} style={{ marginTop: '10px', marginBottom: '10px', maxHeight: '400px', overflowY: 'auto' }}>
              {lists.tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={String(task.id)} index={index}>
                  {(provided: DraggableProvided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{ marginBottom: '8px', ...provided.draggableProps.style }}
                    >
                      <TaskItem
                        task={task}
                        listId={lists.id}
                        updateTask={updateTask}
                        deleteTask={deleteTask}
                        toggleTask={toggleTask}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <TaskForm listId={lists.id} addTask={addTask} />
      </CardContent>
    </Card>
  );
};

export default TaskList;
