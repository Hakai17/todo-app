import React, { useState } from 'react';
import { ListItem, ListItemText, IconButton, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Button, Chip, Autocomplete } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';

interface Task {
  id: number;
  text: string;
  description: string;
  completed: boolean;
  members: { id: number; name: string }[];
}

const members = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
];

interface Props {
  task: Task;
  listId: number;
  updateTask: (listId: number, taskId: number, text: string, description: string, members: { id: number; name: string }[]) => void;
  deleteTask: (listId: number, taskId: number) => void;
  toggleTask: (listId: number, taskId: number) => void;
}

const TaskItem: React.FC<Props> = ({ task, listId, updateTask, deleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(task.text);
  const [description, setDescription] = useState(task.description);
  const [selectedMembers, setSelectedMembers] = useState(task.members);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleClose = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    updateTask(listId, task.id, text, description, selectedMembers);
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteTask(listId, task.id);
  };

  return (
    <>
      <ListItem style={{ backgroundColor: '#f5f5f5', marginBottom: '10px' }}>
        <ListItemText
          primary={
            <>
              <div>
                {task.members.map(member => (
                  <Chip
                    key={member.id}
                    icon={<PersonIcon />}
                    label={member.name}
                    size="small"
                    style={{ marginLeft: '5px' }}
                  />
                ))}
              </div>
              {task.text}
            </>
          }
          secondary={task.description}
        />
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
          <Autocomplete
            multiple
            options={members}
            getOptionLabel={(option) => option.name}
            value={selectedMembers}
            onChange={(event, newValue) => setSelectedMembers(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                margin="dense"
                label="Members"
                placeholder="Select members"
                fullWidth
              />
            )}
          />
          <TextField
            margin="dense"
            label="Title"
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
