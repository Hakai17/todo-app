import React, { useState } from 'react';
import { ListItem, ListItemText, IconButton, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Button, Chip, MenuItem, Select, Autocomplete } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';

interface Task {
  id: number;
  text: string;
  description: string;
  completed: boolean;
  members: { id: number; name: string }[];
  labels: { id: number; text: string; color: string }[];
}

const members = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
];

interface Props {
  task: Task;
  listId: number;
  updateTask: (listId: number, taskId: number, text: string, description: string, members: { id: number; name: string }[], labels: { id: number; text: string; color: string }[]) => void;
  deleteTask: (listId: number, taskId: number) => void;
  toggleTask: (listId: number, taskId: number) => void;
}

const TaskItem: React.FC<Props> = ({ task, listId, updateTask, deleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(task.text);
  const [description, setDescription] = useState(task.description);
  const [selectedMembers, setSelectedMembers] = useState(task.members);
  const [labels, setLabels] = useState(task.labels);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleClose = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    updateTask(listId, task.id, text, description, selectedMembers, labels);
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteTask(listId, task.id);
  };

  const handleAddLabel = () => {
    const newLabel = { id: Date.now(), text: '', color: 'default' };
    setLabels([...labels, newLabel]);
  };

  const handleLabelChange = (id: number, key: string, value: string) => {
    setLabels(labels.map(label => label.id === id ? { ...label, [key]: value } : label));
  };

  const handleDeleteLabel = (id: number) => {
    setLabels(labels.filter(label => label.id !== id));
  };

  return (
    <>
      <div style={{ backgroundColor: '#f5f5f5', borderRadius: '10px' }}>
        {labels.map(label => (
          <Chip key={label.id} label={label.text} style={{ backgroundColor: label.color, color: '#fff', minWidth: '100px', maxHeight: '20px', marginTop: '5px', marginLeft: '5px', borderRadius: '5px' }} />
        ))}
      <ListItem>
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
                  />
                ))}
              </div>
              {task.text}
            </>
          }
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
          <div>
            <Button type="submit" variant="contained" onClick={handleAddLabel} color="primary">
              Add Label
            </Button>
            {labels.map(label => (
              <div key={label.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <TextField
                  margin="dense"
                  label="Label Text"
                  type="text"
                  value={label.text}
                  onChange={(e) => handleLabelChange(label.id, 'text', e.target.value)}
                  style={{ marginRight: '10px' }}
                />
                <Select
                  value={label.color}
                  onChange={(e) => handleLabelChange(label.id, 'color', e.target.value as string)}
                  style={{ marginRight: '10px' }}
                >
                  <MenuItem value="default">Default</MenuItem>
                  <MenuItem value="red">Red</MenuItem>
                  <MenuItem value="green">Green</MenuItem>
                  <MenuItem value="blue">Blue</MenuItem>
                  <MenuItem value="yellow">Yellow</MenuItem>
                  <MenuItem value="purple">Purple</MenuItem>
                </Select>
                <IconButton onClick={() => handleDeleteLabel(label.id)}>
                  <DeleteIcon />
                </IconButton>
              </div>
            ))}
          </div>
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
      </div>
    </>
  );
};

export default TaskItem;
