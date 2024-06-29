import { Tabs, AddTodoForm, TodoList } from "../";
import "./todo.css";

function Todo() {
  return (
    <section className="section section--todo">
      <h1 className="section__title">#todo</h1>

      <Tabs />

      <div className="divider"></div>

      <AddTodoForm />
      <TodoList />
    </section>
  );
}

export default Todo;
