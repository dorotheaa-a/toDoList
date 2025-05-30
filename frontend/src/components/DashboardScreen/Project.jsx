import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/DashboardScreen/Project.module.css";
import search from "../../assets/magnifying_glass_white.png";
import filter from "../../assets/filter.png";
import add from "../../assets/plus.png";
import trash from "../../assets/garbage.png";

const Project = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [showSidebar, setShowSidebar] = useState(false);
  const [newProject, setNewProject] = useState({
    name: "",
    start: new Date().toISOString().slice(0, 10),
    end: new Date().toISOString().slice(0, 10),
    description: "",
    priority: "Low",
    status: "Not Started",
  });
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Test Project A",
      start: "2023-11-01",
      end: "2023-11-01",
      priority: "High",
      status: "Not Started",
    },
    {
      id: 2,
      name: "Project 2",
      start: "2023-11-01",
      end: "2023-11-01",
      priority: "Medium",
      status: "In Progress",
    },
    {
      id: 3,
      name: "Project 3",
      start: "2023-11-01",
      end: "2023-11-01",
      priority: "Low",
      status: "Done",
    },
    {
      id: 4,
      name: "Project 4",
      start: "2023-11-01",
      end: "2023-11-01",
      priority: "Low",
      status: "Done",
    },
  ]);

  const priorityOrder = { High: 3, Medium: 2, Low: 1 };

  const handleFilterClick = () => setSortAsc(!sortAsc);
  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleAddClick = () => setShowSidebar(true);

  const handleCreateProject = () => {
    const newProj = { id: Date.now(), ...newProject };
    setProjects([newProj, ...projects]);
    setShowSidebar(false);
    setNewProject({
      name: "",
      start: new Date().toISOString().slice(0, 10),
      end: new Date().toISOString().slice(0, 10),
      description: "",
      priority: "Low",
      status: "Not Started",
    });
  };

  const handleInputChange = (id, field, value) => {
    const updated = projects.map((p) =>
      p.id === id ? { ...p, [field]: value } : p
    );
    setProjects(updated);
  };

  const handleDelete = (id) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  const grouped = useMemo(() => {
    return projects.reduce((acc, item) => {
      if (!acc[item.status]) acc[item.status] = [];
      acc[item.status].push(item);
      return acc;
    }, {});
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects
      .filter((p) =>
        `${p.name} ${p.start} ${p.end} ${p.priority} ${p.status}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        const valA = priorityOrder[a.priority];
        const valB = priorityOrder[b.priority];
        return sortAsc ? valA - valB : valB - valA;
      });
  }, [projects, searchQuery, sortAsc]);

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
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
              <div className={styles.actions}>
                <button
                  className={styles.actionButton}
                  onClick={handleFilterClick}
                >
                  <img
                    src={filter}
                    alt="Filter"
                    className={styles.actionButton}
                  />
                </button>
                <button
                  className={styles.actionButton}
                  onClick={handleAddClick}
                >
                  <img src={add} alt="Add" className={styles.actionButton} />
                </button>
              </div>
            </div>

            {filteredProjects.map((proj) => (
              <div key={proj.id} className={styles.todoItem}>
                <div className={styles.todoInfo}>
                  <Link
                    to={`/project/${proj.id}`}
                    className={styles.taskName}
                    onClick={() =>
                      localStorage.setItem(
                        "selectedProject",
                        JSON.stringify(proj)
                      )
                    }
                  >
                    {proj.name}
                  </Link>
                  <input
                    type="date"
                    className={styles.date}
                    value={proj.start}
                    onChange={(e) =>
                      handleInputChange(proj.id, "start", e.target.value)
                    }
                  />
                  <input
                    type="date"
                    className={styles.date}
                    value={proj.end}
                    onChange={(e) =>
                      handleInputChange(proj.id, "end", e.target.value)
                    }
                  />
                  <select
                    className={styles.priority}
                    value={proj.priority}
                    onChange={(e) =>
                      handleInputChange(proj.id, "priority", e.target.value)
                    }
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                  <select
                    className={styles.status}
                    value={proj.status}
                    onChange={(e) =>
                      handleInputChange(proj.id, "status", e.target.value)
                    }
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>
                </div>
                <button
                  className={styles.moreButton}
                  onClick={() => handleDelete(proj.id)}
                >
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
                styles[`statusGroup${status.replace(/\s/g, "")}`]
              }`}
            >
              <div className={styles.groupHeader}>
                <span
                  className={`${styles.statusBadge} ${
                    styles[`status${status.replace(/\s/g, "")}`]
                  }`}
                >
                  {status}
                </span>
                <span className={styles.groupCount}>{items.length}</span>
              </div>
              {items.map((proj) => (
                <div key={proj.id} className={styles.projectCard}>
                  <Link
                    to={`/project/${proj.id}`}
                    className={styles.cardTitle}
                    onClick={() =>
                      localStorage.setItem(
                        "selectedProject",
                        JSON.stringify(proj)
                      )
                    }
                  >
                    {proj.name}
                  </Link>
                  <span
                    className={`${styles.cardPriority} ${
                      styles[`priority${proj.priority}`]
                    }`}
                  >
                    {proj.priority}
                  </span>
                </div>
              ))}
              <div className={styles.projectCardAdd} onClick={handleAddClick}>
                + Add a new project
              </div>
            </div>
          ))}
        </div>
      )}

      {showSidebar && (
        <div className={styles.sidebarOverlay}>
          <div className={styles.sidebarForm}>
            <h3>Add New Project</h3>
            <input
              type="text"
              placeholder="Project Name"
              value={newProject.name}
              onChange={(e) =>
                setNewProject({ ...newProject, name: e.target.value })
              }
            />
            <input
              type="date"
              value={newProject.start}
              onChange={(e) =>
                setNewProject({ ...newProject, start: e.target.value })
              }
            />
            <input
              type="date"
              value={newProject.end}
              onChange={(e) =>
                setNewProject({ ...newProject, end: e.target.value })
              }
            />
            <textarea
              placeholder="Short Description"
              value={newProject.description}
              onChange={(e) =>
                setNewProject({ ...newProject, description: e.target.value })
              }
            />
            <select
              value={newProject.priority}
              onChange={(e) =>
                setNewProject({ ...newProject, priority: e.target.value })
              }
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <select
              value={newProject.status}
              onChange={(e) =>
                setNewProject({ ...newProject, status: e.target.value })
              }
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
            <button onClick={handleCreateProject}>Create Project</button>
            <button onClick={() => setShowSidebar(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Project;
