import React, {useState} from 'react';
import TaskList from './TaskList';
import ListForm from './ListForm';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import Header from './Header'

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

interface Member {
  id: number;
  name: string;
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
  setSelectedMember: React.Dispatch<React.SetStateAction<number | null>>;
}

const Board: React.FC<Props> = ({
  lists, addList, addTask, updateTask, deleteTask, toggleTask, deleteList, updateListTitle, onDragEnd,
  selectedMember, setSelectedMember
}) => {
  const [boardTitle, setBoardTitle] = useState('Miguel Board');
  const [members, setMembers] = useState<Member[]>([
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
  ]);

  const updateBoardTitle = (newTitle: string) => {
    setBoardTitle(newTitle);
  };

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
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row' }}>
      <div style={{ display: 'flex', flexDirection: 'column', padding: '10px', flex: '1' }}>
        <Header
          title={boardTitle}
          onUpdateTitle={updateBoardTitle}
          members={members}
          setSelectedMember={setSelectedMember}
        />
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
                {filteredLists.map((list, index) => (
                  <Draggable key={list.id} draggableId={String(list.id)} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{ ...provided.draggableProps.style, maxHeight: '400px' }}
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
                <div style={{ minWidth: '300px' }}>
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
