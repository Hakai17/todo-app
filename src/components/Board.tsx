import React from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
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
  updateListTitle: (listId: number, newTitle: string) => void;
  onDragEnd: (result: DropResult) => void;
}

const Board: React.FC<Props> = ({ lists, addList, addTask, updateTask, deleteTask, toggleTask, deleteList, updateListTitle, onDragEnd }) => {
  return (
    <div>
      <ListForm addList={addList} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="board" direction="horizontal" type="list">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} style={{ display: 'flex', overflowX: 'auto' }}>
              {lists.map((list, index) => (
                <div key={list.id} style={{ margin: '0 10px' }}>
                  <TaskList
                    list={list}
                    addTask={addTask}
                    updateTask={updateTask}
                    deleteTask={deleteTask}
                    toggleTask={toggleTask}
                    deleteList={deleteList}
                    updateListTitle={updateListTitle}
                  />
                </div>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Board;
