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
  const titleInputRef = useRef<HTMLInputElement>(null);

  const handleEditTitle = () => {
    setIsEditingTitle(true);
    // Focar no input do título quando começar a edição
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  };

  const handleSaveTitle = () => {
    updateListTitle(list.id, title);
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
    deleteList(list.id);
  };

  return (
    <Card style={{ backgroundColor: '#e6e6e6', marginBottom: '20px', minWidth: '300px' }}>
      <CardContent>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            {isEditingTitle ? (
              <TextField
                value={title}
                onChange={handleTitleChange}
                onKeyPress={handleTitleKeyPress}
                inputRef={titleInputRef}
              />
            ) : (
              <Typography variant="h5" onClick={handleEditTitle}>
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
        <TaskForm listId={list.id} addTask={addTask} />
        <Droppable droppableId={String(list.id)} type="task">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} style={{ marginTop: '10px', maxHeight: '400px', overflowY: 'auto' }}>
              {list.tasks.map((task, index) => (
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
                        listId={list.id}
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
      </CardContent>
    </Card>
  );
};

export default TaskList;
