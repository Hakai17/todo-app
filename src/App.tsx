import React, { useState } from 'react';
import './styles.css'
import Board from './components/Board';
import { DropResult } from 'react-beautiful-dnd';
import Header from './components/Header';

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

const App: React.FC = () => {
  const [lists, setLists] = useState<List[]>([]);
  const [selectedMember, setSelectedMember] = useState<number | null>(null);
  const [boardTitle, setBoardTitle] = useState('QUADRO MIGUEL');
  const [members] = useState([
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
  ]);

  const addList = (title: string) => {
    const newList: List = {
      id: Date.now(),
      title,
      tasks: []
    };
    setLists([...lists, newList]);
  };

  const addTask = (listId: number, text: string) => {
    const newTask: Task = {
      id: Date.now(),
      text,
      description: '',
      completed: false,
      members: [],
      labels: []
    };
    const updatedLists = lists.map(list =>
      list.id === listId ? { ...list, tasks: [...list.tasks, newTask] } : list
    );
    setLists(updatedLists);
  };

  const updateTask = (listId: number, taskId: number, text: string, description: string, members: { id: number; name: string }[], labels: { id: number; text: string; color: string }[]) => {
    const updatedLists = lists.map(list =>
      list.id === listId
        ? {
            ...list,
            tasks: list.tasks.map(task =>
              task.id === taskId ? { ...task, text, description, members, labels } : task
            )
          }
        : list
    );
    setLists(updatedLists);
  };

  const deleteTask = (listId: number, taskId: number) => {
    const updatedLists = lists.map(list =>
      list.id === listId
        ? { ...list, tasks: list.tasks.filter(task => task.id !== taskId) }
        : list
    );
    setLists(updatedLists);
  };

  const toggleTask = (listId: number, taskId: number) => {
    const updatedLists = lists.map(list =>
      list.id === listId
        ? {
            ...list,
            tasks: list.tasks.map(task =>
              task.id === taskId ? { ...task, completed: !task.completed } : task
            )
          }
        : list
    );
    setLists(updatedLists);
  };

  const deleteList = (listId: number) => {
    setLists(lists.filter(list => list.id !== listId));
  };

  const updateListTitle = (listId: number, newTitle: string) => {
    const updatedLists = lists.map(list =>
      list.id === listId ? { ...list, title: newTitle } : list
    );
    setLists(updatedLists);
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId && source.droppableId === 'board') {
      const newLists = Array.from(lists);
      const [movedList] = newLists.splice(source.index, 1);
      newLists.splice(destination.index, 0, movedList);
      setLists(newLists);
    } else if (source.droppableId === destination.droppableId) {
      const list = lists.find(list => list.id === parseInt(source.droppableId));
      if (!list) return;
      const tasks = Array.from(list.tasks);
      const [movedTask] = tasks.splice(source.index, 1);
      tasks.splice(destination.index, 0, movedTask);

      setLists(lists.map(l => l.id === list.id ? { ...l, tasks } : l));
    } else {
      const sourceList = lists.find(list => list.id === parseInt(source.droppableId));
      const destinationList = lists.find(list => list.id === parseInt(destination.droppableId));
      if (!sourceList || !destinationList) return;

      const sourceTasks = Array.from(sourceList.tasks);
      const [movedTask] = sourceTasks.splice(source.index, 1);
      const destinationTasks = Array.from(destinationList.tasks);
      destinationTasks.splice(destination.index, 0, movedTask);

      setLists(lists.map(list => {
        if (list.id === sourceList.id) return { ...list, tasks: sourceTasks };
        if (list.id === destinationList.id) return { ...list, tasks: destinationTasks };
        return list;
      }));
    }
  };

  const updateBoardTitle = (newTitle: string) => {
    setBoardTitle(newTitle);
  };

  return (
    <div className='container'>
      <Header
        title={boardTitle}
        onUpdateTitle={updateBoardTitle}
        members={members}
        setSelectedMember={setSelectedMember}
      />
      <Board
        lists={lists}
        addList={addList}
        addTask={addTask}
        updateTask={updateTask}
        deleteTask={deleteTask}
        toggleTask={toggleTask}
        deleteList={deleteList}
        updateListTitle={updateListTitle}
        onDragEnd={onDragEnd}
        selectedMember={selectedMember}
      />
    </div>
  );
};

export default App;
