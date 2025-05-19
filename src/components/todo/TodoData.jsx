const TodoData = props => {
  console.log(">>> check props: ", props);

  const { data } = props;
  return (
    <div className="todo-data">
      <div className="item">Learning React</div>
      <div className="item">Fixing Bugs</div>
    </div>
  );
};

export default TodoData;
