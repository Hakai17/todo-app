import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Grid } from '@mui/material';
import ListForm from './ListForm';
import TaskList from './TaskList';

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
  lists: List[];
  addList: (title: string) => void;
  addTask: (listId: number, text: string) => void;
  updateTask: (listId: number, taskId: number, text: string, description: string) => void;
  deleteTask: (listId: number, taskId: number) => void;
  toggleTask: (listId: number, taskId: number) => void;
  deleteList: (listId: number) => void;
  onDragEnd: (result: any) => void;
}

const Board: React.FC<Props> = ({ lists, addList, addTask, updateTask, deleteTask, toggleTask, deleteList, onDragEnd }) => {
  return (
    <div>
      <ListForm addList={addList} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Grid container spacing={3}>
          {lists.map(list => (
            <Grid item key={list.id} xs={12} md={6} lg={4}>
              <Droppable droppableId={String(list.id)}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    <TaskList
                      list={list}
                      addTask={addTask}
                      updateTask={updateTask}
                      deleteTask={deleteTask}
                      toggleTask={toggleTask}
                      deleteList={deleteList}
                    />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Grid>
          ))}
        </Grid>
      </DragDropContext>
    </div>
  );
};

export default Board;
