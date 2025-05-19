import "./components/todo/todo.css";
import TodoData from "./components/todo/TodoData";
import TodoInput from "./components/todo/TodoInput";
import reactLogo from "./assets/react.svg";
import { useState } from "react";

const App = () => {
  const [todoList, setTodoList] = useState([
    { id: 1, name: "Learning React" },
    { id: 1, name: "Fixing Bugs" },
  ]);

  const data = {
    address: "hanoi",
    country: "vietnam",
  };

  const addNewTodo = name => {
    alert(`call me ${name}`);
  };

  return (
    <div className="todo-container">
      <div className="todo-title">Todo list</div>
      <TodoInput addNewTodo={addNewTodo} />
      <TodoData data={data} todoList={todoList} />

      <div className="todo-image">
        <img src={reactLogo} className="logo" />
      </div>
    </div>
  );
};

export default App;
