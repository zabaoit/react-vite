import { useState } from "react";

const TodoInput = props => {
  // useState  hook (getter/setter)
  // const valueInput = "Baobao"
  const [valueInput, setValueInput] = useState("Baobao");

  const { addNewTodo } = props;

  // addNewTodo("Baobao");
  const handleClick = () => {
    addNewTodo(valueInput);
    setValueInput("");
  };

  const handlChange = name => {
    setValueInput(name);
  };
  return (
    <div className="todo-input">
      <input
        type="text"
        value={valueInput}
        placeholder="Enter your task"
        onChange={event => handlChange(event.target.value)}
      />
      <button onClick={handleClick}>Add</button>
      <div>My text input is {valueInput}</div>
    </div>
  );
};

export default TodoInput;
