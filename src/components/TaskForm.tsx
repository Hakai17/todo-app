import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

interface Props {
  listId: number;
  addTask: (listId: number, text: string) => void;
}

const TaskForm: React.FC<Props> = ({ listId, addTask }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTask(listId, text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
      <TextField
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task"
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
        Add Task
      </Button>
    </form>
  );
};

export default TaskForm;
