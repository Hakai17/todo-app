import React, { useState } from 'react';
import { TextField, IconButton, Menu, MenuItem, Chip, Avatar } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

interface Member {
  id: number;
  name: string;
}

interface HeaderProps {
  title: string;
  onUpdateTitle: (newTitle: string) => void;
  members: Member[];
  setSelectedMember: (memberId: number | null) => void;
}

const Header: React.FC<HeaderProps> = ({
  title, onUpdateTitle, members, setSelectedMember
}) => {
  const [editTitle, setEditTitle] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(title);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [filterType, setFilterType] = useState<string | null>(null);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTitle(e.target.value);
  };

  const handleTitleBlur = () => {
    setEditTitle(false);
    onUpdateTitle(currentTitle);
  };

  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  const handleFilterSelect = (type: string) => {
    setFilterType(type);
    setAnchorEl(null);
  };

  const handleMemberSelect = (memberId: number) => {
    setSelectedMember(memberId);
  };

  const clearFilter = () => {
    setSelectedMember(null);
    setFilterType(null);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderBottom: '1px solid #ccc' }}>
      <div>
        {editTitle ? (
          <TextField
            value={currentTitle}
            onChange={handleTitleChange}
            onBlur={handleTitleBlur}
            onKeyDown={(e) => e.key === 'Enter' && handleTitleBlur()}
            autoFocus
          />
        ) : (
          <h2 onClick={() => setEditTitle(true)}>{title}</h2>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <IconButton onClick={handleFilterClick}>
          <FilterListIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleFilterClose}
        >
          <MenuItem onClick={() => handleFilterSelect('member')}>Filtrar por Membros</MenuItem>
        </Menu>
        {filterType === 'member' && (
          <div>
            {members.map(member => (
              <Chip
                key={member.id}
                avatar={<Avatar>{member.name[0]}</Avatar>}
                label={member.name}
                onClick={() => handleMemberSelect(member.id)}
                style={{ marginLeft: '5px' }}
              />
            ))}
            <Chip
              label="Clear"
              onClick={clearFilter}
              style={{ marginLeft: '5px', backgroundColor: '#f44336', color: '#fff' }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
