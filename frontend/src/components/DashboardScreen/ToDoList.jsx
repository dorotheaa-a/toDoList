"use client";
import React, { useState } from "react";
import styles from "../../styles/DashboardScreen/TodoList.module.css";
import tick from "../../assets/tick_white.png";
import tick_empty from "../../assets/rectangle.png";
import divider from "../../assets/divider.png";
import search from "../../assets/magnifying_glass_white.png";
import filter from "../../assets/filter.png";
import add from "../../assets/plus.png";
import trash from "../../assets/garbage.png";

const TodoList = () => {
  const [checked, setChecked] = useState([true, false, false]);

  const todos = [
    {
      task: "Meeting with client",
      date: "2023-11-01",
      time: "11:00",
      priority: "High",
    },
    {
      task: "Meeting with client",
      date: "2023-11-01",
      time: "11:00",
      priority: "Medium",
    },
    {
      task: "Meeting with client",
      date: "2023-11-01",
      time: "11:00",
      priority: "Low",
    },
  ];

  const toggleCheck = (index) => {
    const updated = [...checked];
    updated[index] = !updated[index];
    setChecked(updated);
  };

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
            />
          </div>
          <div className={styles.actions}>
            <button className={styles.actionButton}>
              <img src={filter} alt="Filter" className={styles.actionButton} />
            </button>
            <button className={styles.actionButton}>
              <img src={add} alt="Add" className={styles.actionButton} />
            </button>
          </div>
        </div>

        <img src={divider} alt="Divider" className={styles.divider} />

        {todos.map((todo, index) => (
          <div key={index} className={styles.todoItem}>
            <div className={styles.todoInfo}>
              <div className={styles.tickside}>
                <button
                  onClick={() => toggleCheck(index)}
                  className={styles.tickButton}
                >
                  <img
                    src={checked[index] ? tick : tick_empty}
                    alt="Tick"
                    className={styles.tickButton}
                  />
                </button>
              </div>
              <span className={styles.taskName}>{todo.task}</span>
              <span className={styles.date}>{todo.date}</span>
              <span className={styles.time}>{todo.time}</span>
              <span
                className={`${styles.priority} ${
                  styles[`priority${todo.priority}`]
                }`}
              >
                {todo.priority}
              </span>
            </div>
            <button className={styles.moreButton}>
              <img src={trash} alt="Delete" className={styles.moreIcon} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
