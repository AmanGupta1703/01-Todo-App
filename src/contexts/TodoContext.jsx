import { useReducer, useEffect } from "react";
import { createContext } from "react";

export const TodoContext = createContext();

const initialState = {
  todos: JSON.parse(localStorage.getItem("todos")) || [],
  selectedTab: "all",
  editMode: false,
  editTodoId: null,
  todoToEdit: {},
};

function todoReducer(state, action) {
  switch (action.type) {
    case "todo/ADD_TODO":
      const newTodo = {
        title: action.payload,
        id: crypto.randomUUID(),
        completed: false,
      };
      const updatedTodo = [...state.todos, newTodo];

      return { ...state, todos: updatedTodo };

    case "todo/CHANGE_TAB":
      return { ...state, selectedTab: action.payload };

    case "todo/CHANGE_CHECKED_STATUS":
      const index = state.todos.findIndex((todo) => todo.id === action.payload);
      if (index === -1) return state;

      const updatedTodos = state.todos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo,
      );

      return { ...state, todos: updatedTodos };

    case "todo/DELETE_TODO":
      const deleteTodoItem = state.todos.find((todo) => todo.id === action.payload);

      if (deleteTodoItem === -1) return state;

      const updatedTodosAfterDelete = state.todos.filter((todo) => todo.id !== deleteTodoItem.id);

      return { ...state, todos: updatedTodosAfterDelete };

    case "todo/EDIT_TODO":
      const todoToEdit = state.todos.find((todo) => todo.id === action.payload);

      return { ...state, editMode: true, editTodoId: action.payload, todoToEdit: todoToEdit };

    case "todo/UPDATE_TODO":
      const updatedTodoToEdit = { ...state.todoToEdit, title: action.payload };

      const updatedTodosAfterEdit = state.todos.map((todo) =>
        todo.id === state.editTodoId ? updatedTodoToEdit : todo,
      );

      return {
        ...state,
        todos: updatedTodosAfterEdit,
        editMode: false,
        editTodoId: null,
        todoToEdit: {},
      };

    default:
      return state;
  }
}

function TodoContextProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(state.todos));
  }, [state.todos]);

  return <TodoContext.Provider value={{ ...state, dispatch }}>{children}</TodoContext.Provider>;
}

export default TodoContextProvider;
