import { useTodo } from "../../../hooks/useTodo";
import "./tabs.css";

function Tabs() {
  const { selectedTab, dispatch } = useTodo();

  const ALL = "all";
  const ACTIVE = "active";
  const COMPLETED = "completed";

  function handleChangeTab(tab) {
    if (!tab) {
      return;
    }

    dispatch({ type: "todo/CHANGE_TAB", payload: tab });
  }

  return (
    <div className="tabs tabs--box">
      <button
        onClick={() => handleChangeTab(ALL)}
        className={`tab tab--all ${selectedTab === ALL ? "tab--selected" : ""}`}
      >
        All
      </button>
      <button
        onClick={() => handleChangeTab(ACTIVE)}
        className={`tab tab--active ${selectedTab === ACTIVE ? "tab--selected" : ""}`}
      >
        Active
      </button>
      <button
        onClick={() => handleChangeTab(COMPLETED)}
        className={`tab tab--completed ${selectedTab === COMPLETED ? "tab--selected" : ""}`}
      >
        Completed
      </button>
    </div>
  );
}

export default Tabs;
