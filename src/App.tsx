import React, { useState } from 'react';
import { DropResult } from 'react-beautiful-dnd';
import Board from './components/Board';

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

const App: React.FC = () => {
  const [lists, setLists] = useState<List[]>([
    // Initial state with some lists and tasks
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
      completed: false
    };
    const updatedLists = lists.map(list =>
      list.id === listId ? { ...list, tasks: [...list.tasks, newTask] } : list
    );
    setLists(updatedLists);
  };

  const updateTask = (listId: number, taskId: number, text: string, description: string) => {
    const updatedLists = lists.map(list =>
      list.id === listId
        ? {
            ...list,
            tasks: list.tasks.map(task =>
              task.id === taskId ? { ...task, text, description } : task
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
    const { source, destination, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (type === 'list') {
      // Handle list reordering if needed
      return;
    }

    const sourceListId = parseInt(source.droppableId, 10);
    const destinationListId = parseInt(destination.droppableId, 10);

    const sourceList = lists.find(list => list.id === sourceListId);
    const destinationList = lists.find(list => list.id === destinationListId);

    if (!sourceList || !destinationList) {
      return;
    }

    const task = sourceList.tasks.find(task => task.id === parseInt(draggableId, 10));

    if (!task) {
      return;
    }

    const newSourceTasks = Array.from(sourceList.tasks);
    newSourceTasks.splice(source.index, 1);

    const newDestinationTasks = Array.from(destinationList.tasks);
    newDestinationTasks.splice(destination.index, 0, task);

    const newLists = lists.map(list => {
      if (list.id === sourceListId) {
        return { ...list, tasks: newSourceTasks };
      }
      if (list.id === destinationListId) {
        return { ...list, tasks: newDestinationTasks };
      }
      return list;
    });

    setLists(newLists);
  };

  return (
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
    />
  );
};

export default App;
