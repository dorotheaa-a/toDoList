import React from "react";
import TodoList from "./ToDoList";
import styles from "../../styles/DashboardScreen/TodoSection.module.css";
import tick1 from './tick.png';

const TodoSection = () => {
  return (
    <section className={styles.todoSection}>
      <header className={styles.todoHeader}>
        <img src={tick1} alt="Todo icon" className={styles.todoIcon} />
        <h2 className={styles.title}>To-Dos</h2>
      </header>
      <TodoList />
    </section>
  );
};

export default TodoSection;
