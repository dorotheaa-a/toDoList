import React, { useState, useMemo } from "react";
import styles from "../../styles/DashboardScreen/TodoList.module.css";
import tick from "../../assets/tick_white.png";
import tick_empty from "../../assets/rectangle.png";
import search from "../../assets/magnifying_glass_white.png";
import filter from "../../assets/filter.png";
import add from "../../assets/plus.png";
import trash from "../../assets/garbage.png";

const TodoList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [todos, setTodos] = useState([
    {
      id: 6,
      task: "Update README documentation",
      date: "2023-10-17",
      time: "13:00",
      priority: "Low",
      done: true,
    },
    {
      id: 7,
      task: "Conduct sprint retrospective",
      date: "2023-10-18",
      time: "15:30",
      priority: "Medium",
      done: false,
    },
    {
      id: 8,
      task: "Optimize database queries",
      date: "2023-10-19",
      time: "10:00",
      priority: "High",
      done: false,
    },
    {
      id: 9,
      task: "Schedule 1-on-1s with team",
      date: "2023-10-20",
      time: "09:00",
      priority: "Medium",
      done: true,
    },
    {
      id: 10,
      task: "Finalize Q4 roadmap",
      date: "2023-10-21",
      time: "17:00",
      priority: "High",
      done: false,
    },
  ]);

  const priorityOrder = { High: 3, Medium: 2, Low: 1 };

  const toggleCheck = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    );
    setTodos(updatedTodos);
  };

  const handleFilterClick = () => {
    setSortAsc(!sortAsc);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleAddClick = () => {
    const newTask = {
      id: Date.now(),
      task: "",
      date: new Date().toISOString().slice(0, 10),
      time: "",
      priority: "Low",
      done: false,
    };
    setTodos([newTask, ...todos]);
  };

  const handleInputChange = (id, field, value) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, [field]: value } : todo
    );
    setTodos(updatedTodos);
  };

  const handleDelete = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const filteredTodos = useMemo(() => {
    return todos
      .filter((todo) =>
        todo.task.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        const valA = priorityOrder[a.priority];
        const valB = priorityOrder[b.priority];
        return sortAsc ? valA - valB : valB - valA;
      });
  }, [todos, searchQuery, sortAsc]);

  return (
    <div className={styles.todoListContainer}>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <div className={styles.titleSection}>
            <div className={styles.columns}>
              <span className={styles.tasktitle}>Task</span>
              <span className={styles.datetitle}>Date</span>
              <span className={styles.timetitle}>Time</span>
              <span className={styles.prioritytitle}>Priority</span>
            </div>
          </div>

          <div className={styles.searchBar}>
            <img src={search} alt="Search" className={styles.searchIcon} />
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Type to search"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>

          <div className={styles.actions}>
            <button className={styles.actionButton} onClick={handleFilterClick}>
              <img src={filter} alt="Filter" className={styles.actionButton} />
            </button>
            <button className={styles.actionButton} onClick={handleAddClick}>
              <img src={add} alt="Add" className={styles.actionButton} />
            </button>
          </div>
        </div>

        {filteredTodos.map((todo) => (
          <div key={todo.id} className={styles.todoItem}>
            <div className={styles.todoInfo}>
              <div className={styles.tickside}>
                <button
                  onClick={() => toggleCheck(todo.id)}
                  className={styles.tickButton}
                >
                  <img
                    src={todo.done ? tick : tick_empty}
                    alt="Tick"
                    className={styles.tickButton}
                  />
                </button>
              </div>
              <input
                type="text"
                className={styles.taskName}
                value={todo.task}
                onChange={(e) =>
                  handleInputChange(todo.id, "task", e.target.value)
                }
              />
              <input
                type="date"
                className={styles.date}
                value={todo.date}
                onChange={(e) =>
                  handleInputChange(todo.id, "date", e.target.value)
                }
              />
              <input
                type="time"
                className={styles.time}
                value={todo.time}
                onChange={(e) =>
                  handleInputChange(todo.id, "time", e.target.value)
                }
              />
              <select
                className={styles.priority}
                value={todo.priority}
                onChange={(e) =>
                  handleInputChange(todo.id, "priority", e.target.value)
                }
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <button
              className={styles.moreButton}
              onClick={() => handleDelete(todo.id)}
            >
              <img src={trash} alt="Delete" className={styles.moreIcon} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
