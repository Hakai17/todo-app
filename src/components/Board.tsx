import React from 'react';
import TaskList from './TaskList';
import ListForm from './ListForm';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';

interface Task {
  id: number;
  text: string;
  description: string;
  completed: boolean;
  members: { id: number; name: string }[];
  labels: { id: number; text: string; color: string }[];
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
  updateTask: (listId: number, taskId: number, text: string, description: string, members: { id: number; name: string }[], labels: { id: number; text: string; color: string }[]) => void;
  deleteTask: (listId: number, taskId: number) => void;
  toggleTask: (listId: number, taskId: number) => void;
  deleteList: (listId: number) => void;
  updateListTitle: (listId: number, title: string) => void;
  onDragEnd: (result: DropResult) => void;
  selectedMember: number | null;
}

const Board: React.FC<Props> = ({
  lists, addList, addTask, updateTask, deleteTask, toggleTask, deleteList, updateListTitle, onDragEnd,
  selectedMember
}) => {
  const filteredLists = lists.map(list => ({
    ...list,
    tasks: list.tasks.filter(task => {
      if (selectedMember !== null && !task.members.some(member => member.id === selectedMember)) {
        return false;
      }
      return true;
    })
  }));

  return (
      <div className='board'>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="board" direction="horizontal" type="list">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className='lists'
              >
                {filteredLists.map((list, index) => (
                  <Draggable key={list.id} draggableId={list.id.toString()} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          ...provided.draggableProps.style
                        }}
                      >
                        <TaskList
                          lists={list}
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
                <ListForm addList={addList} />
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
  );
};

export default Board;
