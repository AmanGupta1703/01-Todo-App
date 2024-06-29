import { useState, useEffect } from "react";
import "./addTodoForm.css";
import { useTodo } from "../../../hooks/useTodo";

function AddTodoForm() {
  const [todo, setTodo] = useState("");
  const { editMode, dispatch, todoToEdit } = useTodo();

  useEffect(() => {
    if (editMode) {
      setTodo(todoToEdit.title);
    }
  }, [editMode]);

  function handleAddTodo(e) {
    e.preventDefault();

    if (!todo) {
      return;
    }

    if (!editMode) {
      dispatch({ type: "todo/ADD_TODO", payload: todo });
    }

    if (editMode) {
      dispatch({ type: "todo/UPDATE_TODO", payload: todo });
    }

    setTodo("");
  }

  return (
    <form className="form form--add-todo" onSubmit={handleAddTodo}>
      <input
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        type="text"
        placeholder="Add a todo..."
        className="form__input form__input--todo"
      />

      <button type="submit" className="btn btn--submit">
        {editMode ? "update" : "add"}
      </button>
    </form>
  );
}

export default AddTodoForm;
