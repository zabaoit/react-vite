import "./components/todo/todo.css";
import TodoData from "./components/todo/TodoData";
import TodoInput from "./components/todo/TodoInput";
import reactLogo from "./assets/react.svg";
import { useState } from "react";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";

const App = () => {
  const [todoList, setTodoList] = useState([
    // { id: 1, name: "Learning React" },
    // { id: 2, name: "Fixing Bugs" },
  ]);

  const addNewTodo = name => {
    const newToDo = {
      id: randomIntFromInterval(1, 1000000),
      name: name,
    };

    setTodoList([...todoList, newToDo]);
  };

  const randomIntFromInterval = (min, max) => {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const deleteTodo = id => {
    const newTodo = todoList.filter(item => item.id !== id);
    setTodoList(newTodo);
  };

  return (
    <>
      <Header />
      <div className="todo-container">
        <div className="todo-title">Todo list</div>
        <TodoInput addNewTodo={addNewTodo} />

        {todoList.length > 0 ? (
          <TodoData todoList={todoList} deleteTodo={deleteTodo} />
        ) : (
          <div className="todo-image">
            <img src={reactLogo} className="logo" />
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default App;
