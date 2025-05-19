const TodoInput = props => {
  const { addNewTodo } = props;
  // addNewTodo("Baobao");

  const handleClick = () => {
    alert("call me");
  };

  const handlChange = event => {
    console.log(">>> handlChange: ", event.target.value);
  };
  return (
    <div className="todo-input">
      <input type="text" placeholder="Enter your task" onChange={() => handlChange} />
      <button onClick={handleClick}>Add</button>
    </div>
  );
};

export default TodoInput;
