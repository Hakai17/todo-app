import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import ListForm from './ListForm';
import TaskList from './TaskList';

interface Task {
  id: number;
  text: string;
  description: string;
  completed: boolean;
  members: { id: number; name: string }[];
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
  updateTask: (listId: number, taskId: number, text: string, description: string, members: { id: number; name: string }[]) => void;
  deleteTask: (listId: number, taskId: number) => void;
  toggleTask: (listId: number, taskId: number) => void;
  deleteList: (listId: number) => void;
  updateListTitle: (listId: number, newTitle: string) => void;
  onDragEnd: (result: DropResult) => void;
}

const Board: React.FC<Props> = ({ lists, addList, addTask, updateTask, deleteTask, toggleTask, deleteList, updateListTitle, onDragEnd }) => {
  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'row' }}>
      <div style={{ display: 'flex', flexDirection: 'column', padding: '10px', flex: '1' }}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="board" direction="horizontal" type="list">
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
                {lists.map((list, index) => (
                  <Draggable key={list.id} draggableId={String(list.id)} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{ ...provided.draggableProps.style, maxHeight: '400px' }}
                      >
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
