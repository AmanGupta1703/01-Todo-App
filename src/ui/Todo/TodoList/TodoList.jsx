import { useTodo } from "../../../hooks/useTodo";
import "./todoList.css";

function TodoList() {
  const { todos, selectedTab } = useTodo();

  const todosData =
    selectedTab === "all"
      ? todos
      : selectedTab === "active"
      ? todos.filter((todo) => !todo.completed)
      : selectedTab === "completed"
      ? todos.filter((todo) => todo.completed)
      : todos;

  return (
    <div className="todos">
      {todosData.map((todo) => (
        <Todo key={todo.id} {...todo} />
      ))}
    </div>
  );
}

function Todo({ completed, title, id }) {
  const { dispatch, selectedTab } = useTodo();

  const isOnCompletedTab = selectedTab === "completed";

  function handleDeleteTodo(id) {
    if (!id) return;

    dispatch({ type: "todo/DELETE_TODO", payload: id });
  }

  function handleEditTodo(id) {
    if (!id) return;

    dispatch({ type: "todo/EDIT_TODO", payload: id });
  }

  return (
    <div className="todos__item">
      <label className="todos__label">
        <input
          type="checkbox"
          className="todos__input todos__input--checkbox"
          checked={completed}
          onChange={() => dispatch({ type: "todo/CHANGE_CHECKED_STATUS", payload: id })}
        />
        <span className="todos__text">{title}</span>
      </label>
      {selectedTab !== "completed" && !completed && (
        <button className="btn btn--edit" onClick={() => handleEditTodo(id)}>
          <span className="material-symbols-outlined">edit</span>
        </button>
      )}
      {isOnCompletedTab && (
        <button onClick={() => handleDeleteTodo(id)} className="btn btn--delete">
          <span className="material-symbols-outlined">delete</span>
        </button>
      )}
    </div>
  );
}

export default TodoList;
