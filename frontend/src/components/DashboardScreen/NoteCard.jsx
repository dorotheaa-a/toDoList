import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/DashboardScreen/NoteCard.module.css";

const NoteCard = ({ id, title, items }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    localStorage.setItem("selectedNote", JSON.stringify({ id, title, items }));
    navigate(`/note/${id}`);
  };

  return (
    <article className={styles.noteCard}>
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <div className={styles.divider} />
        <ul className={styles.itemsList}>
          {items.map((item, index) => (
            <li key={index} className={styles.item}>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <button className={styles.editButton} onClick={handleEdit}>
        Edit
      </button>
    </article>
  );
};

export default NoteCard;
