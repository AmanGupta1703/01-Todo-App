import { useContext } from "react";

import { TodoContext } from "../contexts/TodoContext";

export function useTodo() {
  const contexts = useContext(TodoContext);

  if (!contexts) {
    throw new Error("Make sure to use the contexts within TodoContextProvider");
  }

  return contexts;
}
