import React from "react";
import styles from "../../styles/DashboardScreen/NoteCard.module.css";

const NoteCard = ({ title, items }) => {
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
      <button className={styles.editButton}>Edit</button>
    </article>
  );
};

export default NoteCard;
