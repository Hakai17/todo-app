import React from 'react';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
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
}

const TaskList: React.FC<Props> = ({ list, addTask, updateTask, deleteTask, toggleTask, deleteList }) => {
  const handleDeleteList = () => {
    deleteList(list.id);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {list.title}
          <IconButton onClick={handleDeleteList} style={{ float: 'right' }}>
            <DeleteIcon />
          </IconButton>
        </Typography>
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
      </CardContent>
    </Card>
  );
};

export default TaskList;
