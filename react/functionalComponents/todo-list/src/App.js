import './App.css';
import NewTodoItem from './components/NewTodoItem';
import React, { useState, useEffect } from 'react'
import TodoItem from './components/TodoItem';

function App() {
  const [todoList, setTodoList] = useState([])

  useEffect(() => {
    document.title = `You have ${todoList.filter(todo => !todo.completed).length} unfinished todos`
  })

  useEffect(() => {
    setTodoList(JSON.parse(window.localStorage.getItem('todo')) || [])
  }, [])

  useEffect(() => {
    todoList && window.localStorage.setItem("todo", JSON.stringify(todoList))
  })


  function addItemToList(item) {
    setTodoList([
      ...todoList,
      item
    ])
  }

  function toggleCompleted(todoIdx) {
    const updatedTodo = todoList.map((todo, idx) => {
      return (idx === todoIdx) ?
        {
          ...todo,
          completed: !todo.completed
        }
        : { ...todo }
    })
    setTodoList(updatedTodo)
  }

  function deleteTodo(deleteIdx) {
    const updatedTodo = todoList.filter((todo, idx) => deleteIdx !== idx)
    setTodoList(updatedTodo)
  }

  function clearTodo() {
    setTodoList([])
  }

  return (
    <div className="App">
      <h1>To-do List</h1>
      <NewTodoItem addItem={addItemToList} />
      {todoList.map((item, index) => <TodoItem key={index} item={item} index={index} toggleCompleted={toggleCompleted} deleteTodo={deleteTodo} />)}
      <button className="clearButton" onClick={clearTodo}>Clear Todos</button>
    </div>
  );
}

export default App;
