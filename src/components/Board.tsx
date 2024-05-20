import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import ListForm from './ListForm';
import Tasklist from './TaskList';

interface Task {
  id: number;
  text: string;
  description: string;
  completed: boolean;
  members: { id: number; name: string }[];
  labels: { id: number; text: string; color: string }[];
}

interface lists {
  id: number;
  title: string;
  tasks: Task[];
}

interface Props {
  lists: lists[];
  addList: (title: string) => void;
  addTask: (listsId: number, text: string) => void;
  updateTask: (listsId: number, taskId: number, text: string, description: string, members: { id: number; name: string }[], labels: { id: number; text: string; color: string }[]) => void;
  deleteTask: (listsId: number, taskId: number) => void;
  toggleTask: (listsId: number, taskId: number) => void;
  deleteList: (listsId: number) => void;
  updateListTitle: (listsId: number, newTitle: string) => void;
  onDragEnd: (result: DropResult) => void;
}

const Board: React.FC<Props> = ({ lists, addList, addTask, updateTask, deleteTask, toggleTask, deleteList, updateListTitle, onDragEnd }) => {
  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'row' }}>
      <div style={{ display: 'flex', flexDirection: 'column', padding: '10px', flex: '1' }}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="board" direction="horizontal" type="lists">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  display: 'flex',
                  flexWrap: 'nowrap',
                  gap: '10px',
                  maxWidth: '100%',
                }}
              >
                {lists.map((lists, index) => (
                  <Draggable key={lists.id} draggableId={String(lists.id)} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{ ...provided.draggableProps.style, maxHeight: '400px' }}
                      >
                        <Tasklist
                          lists={lists}
                          addTask={addTask}
                          updateTask={updateTask}
                          deleteTask={deleteTask}
                          toggleTask={toggleTask}
                          deleteList={deleteList}
                          updateListTitle={updateListTitle}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                <div style={{ minWidth: '300px', maxHeight: '400px' }}>
                  <ListForm addList={addList} />
                </div>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default Board;
