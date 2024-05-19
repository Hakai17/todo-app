import React, { useState } from 'react';
import { ListItem, ListItemText, IconButton, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface Task {
  id: number;
  text: string;
  description: string;
}

interface Props {
  task: Task;
  listId: number;
  updateTask: (listId: number, taskId: number, text: string, description: string) => void;
  deleteTask: (listId: number, taskId: number) => void;
}

const TaskItem: React.FC<Props> = ({ task, listId, updateTask, deleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(task.text);
  const [description, setDescription] = useState(task.description);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleClose = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    updateTask(listId, task.id, text, description);
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteTask(listId, task.id);
  };

  return (
    <>
      <ListItem style={{ backgroundColor: '#f5f5f5', marginBottom: '10px' }}>
        <ListItemText primary={task.text} secondary={task.description} />
        <IconButton onClick={handleEdit}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </ListItem>
      <Dialog open={isEditing} onClose={handleClose}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Task Text"
            type="text"
            fullWidth
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TaskItem;
