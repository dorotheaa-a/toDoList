"use client";
import React from "react";
import styles from "../../styles/DashboardScreen/TodoList.module.css";
import tick1 from './tick.png';
import divider from './divider.png';
import search from './search.png';
import filter from './filter.png';
import add from './add.png';
import trash from './trash.png';

const TodoList = () => {
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

  return (
    <div className={styles.todoListContainer}>
      <div className={styles.sidebar}>
        <img src={tick1} alt="Tick" className={styles.menuIcon} />
        <img src={tick1} alt="Tick" className={styles.filterIcon} />
        <img src={tick1} alt="Tick" className={styles.sortIcon} />
      </div>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <div className={styles.columns}>
            <span className={styles.columnTitle}>Task</span>
            <span className={styles.columnTitle}>Date</span>
            <span className={styles.columnTitle}>Time</span>
            <span className={styles.columnTitle}>Priority</span>
          </div>
          <div className={styles.searchBar}>
            <img src= {search} alt="Search" className={styles.searchIcon} />
            <span className={styles.searchPlaceholder}>Type to search</span>
          </div>
          <div className={styles.actions}>
            <button className={styles.actionButton}>
              <img src={filter} alt="Filter" />
            </button>
            <button className={styles.actionButton}>
              <img src= {add} alt="Add" />
            </button>
          </div>
        </div>
        <img src={divider} alt="Divider" className={styles.divider} />
        {todos.map((todo, index) => (
          <div key={index} className={styles.todoItem}>
            <span className={styles.taskName}>{todo.task}</span>
            <span className={styles.date}>{todo.date}</span>
            <span className={styles.time}>{todo.time}</span>
            <span
              className={`${styles.priority} ${styles[`priority${todo.priority}`]}`}
            >
              {todo.priority}
            </span>
            <button className={styles.moreButton}>
              <img
                src= {trash}
                alt="Delete"
                className={styles.moreIcon}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
