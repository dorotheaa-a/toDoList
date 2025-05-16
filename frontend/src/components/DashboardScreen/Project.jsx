import React, { useState } from "react";
import styles from "../../styles/DashboardScreen/Project.module.css";
import tick from "../../assets/tick_white.png";
import tick_empty from "../../assets/rectangle.png";
import search from "../../assets/magnifying_glass_white.png";
import filter from "../../assets/filter.png";
import add from "../../assets/plus.png";
import trash from "../../assets/garbage.png";

const Project = () => {
  const [checked, setChecked] = useState([false, false, false, false]);
  const [activeTab, setActiveTab] = useState("all");

  const todos = [
    {
      name: "Project 1",
      start: "2023-11-01",
      end: "2023-11-01",
      priority: "High",
      status: "Not Started",
    },
    {
      name: "Project 2",
      start: "2023-11-01",
      end: "2023-11-01",
      priority: "Medium",
      status: "In Progress",
    },
    {
      name: "Project 3",
      start: "2023-11-01",
      end: "2023-11-01",
      priority: "Low",
      status: "Done",
    },
    {
      name: "Project 4",
      start: "2023-11-01",
      end: "2023-11-01",
      priority: "Low",
      status: "Done",
    },
  ];

  const toggleCheck = (index) => {
    const updated = [...checked];
    updated[index] = !updated[index];
    setChecked(updated);
  };

  const grouped = todos.reduce((acc, item) => {
    if (!acc[item.status]) acc[item.status] = [];
    acc[item.status].push(item);
    return acc;
  }, {});

  return (
    <div className={styles.body}>
      <h2 className={styles.sectionTitle}>Projects</h2>

      <div className={styles.tabHeader}>
        <span
          className={`${styles.tab} ${
            activeTab === "all" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("all")}
        >
          All Projects
        </span>
        <span
          className={`${styles.tab} ${
            activeTab === "status" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("status")}
        >
          By Status
        </span>
      </div>
      <hr className={styles.tabDivider} />

      {activeTab === "all" && (
        <div className={styles.todoListContainer}>
          <div className={styles.mainContent}>
            <div className={styles.header}>
              <div className={styles.titleSection}>
                <div className={styles.columns}>
                  <span className={styles.projecttitle}>Project Name</span>
                  <span className={styles.sdatetitle}>Start Date</span>
                  <span className={styles.edatetitle}>End Date</span>
                  <span className={styles.prioritytitle}>Priority</span>
                  <span className={styles.statustitle}>Status</span>
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
                  <img
                    src={filter}
                    alt="Filter"
                    className={styles.actionButton}
                  />
                </button>
                <button className={styles.actionButton}>
                  <img src={add} alt="Add" className={styles.actionButton} />
                </button>
              </div>
            </div>

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
      )}

      {activeTab === "status" && (
        <div className={styles.groupedView}>
          {Object.entries(grouped).map(([status, items]) => (
            <div
              key={status}
              className={`${styles.statusGroup} ${
                styles[`statusGroup${status.replace(" ", "")}`]
              }`}
            >
              <div className={styles.groupHeader}>
                <span
                  className={`${styles.statusBadge} ${
                    styles[`status${status.replace(" ", "")}`]
                  }`}
                >
                  {status}
                </span>
                <span className={styles.groupCount}>{items.length}</span>
              </div>
              {items.map((proj, idx) => (
                <div key={idx} className={styles.projectCard}>
                  <span className={styles.cardTitle}>{proj.name}</span>
                  <span
                    className={`${styles.cardPriority} ${
                      styles[`priority${proj.priority}`]
                    }`}
                  >
                    {proj.priority}
                  </span>
                </div>
              ))}
              <div className={styles.projectCardAdd}>+ Add a new project</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Project;
