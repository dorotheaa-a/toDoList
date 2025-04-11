import React from "react";
import styles from "../../styles/DashboardScreen/NoteCard.module.css";
import line from './Line.png';

const NoteCard = ({ title, items }) => {
  return (
    <article className={styles.noteCard}>
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <img src={line} alt="Divider" className={styles.divider} />
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
