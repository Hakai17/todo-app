import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

interface Props {
  addList: (title: string) => void;
}

const ListForm: React.FC<Props> = ({ addList }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      addList(title);
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
      label="New List"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      fullWidth
      style={{ marginTop: '10px', marginLeft: "10px", minWidth: '300px' }}
      />
      <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px', marginLeft: "10px", marginBottom: "10px" }}>
        Add List
      </Button>
    </form>
  );
};

export default ListForm;
