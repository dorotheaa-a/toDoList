import React, { useState } from "react";
import styles from "../styles/Users.module.css";
import girl from "../assets/girl.jpg";
import Header from "../components/Header";

const UserCard = ({ name, imageUrl, onAdd, onRemove }) => {
  return (
    <article className={styles.userCard}>
      <div className={styles.userCardContent}>
        <img src={imageUrl} alt={name} className={styles.userImage} />
        <h3 className={styles.userCardTitle}>{name}</h3>
        <div className={styles.divider} />
      </div>
      <button className={styles.addButton} onClick={onAdd}>
        Add
      </button>
      <button className={styles.removeButton} onClick={onRemove}>
        Remove
      </button>
    </article>
  );
};

const UserDisplay = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const users = [
    { id: 1, fullName: "Alice Johnson", avatar: girl },
    { id: 2, fullName: "Bob Smith", avatar: girl },
    { id: 3, fullName: "Charlie Rose", avatar: girl },
    { id: 4, fullName: "Diana Prince", avatar: girl },
    { id: 5, fullName: "Ethan Hunt", avatar: girl },
    { id: 6, fullName: "Grace Lee", avatar: girl },
    { id: 7, fullName: "Henry Ford", avatar: girl },
    { id: 8, fullName: "Isabel Garcia", avatar: girl },
    { id: 9, fullName: "Jack Ma", avatar: girl },
    { id: 10, fullName: "Karen Adams", avatar: girl },
    { id: 11, fullName: "Liam Turner", avatar: girl },
    { id: 12, fullName: "Mia Davis", avatar: girl },
    { id: 13, fullName: "Nathan Young", avatar: girl },
    { id: 14, fullName: "Olivia Brown", avatar: girl },
    { id: 15, fullName: "Paul Walker", avatar: girl },
    { id: 16, fullName: "Quincy Jones", avatar: girl },
    { id: 17, fullName: "Rachel Green", avatar: girl },
    { id: 18, fullName: "Sam Wilson", avatar: girl },
    { id: 19, fullName: "Tina Fey", avatar: girl },
    { id: 20, fullName: "Ursula Kwon", avatar: girl },
  ];

  const filteredUsers = users.filter((user) =>
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Header variant="clean"/>
      <section className={styles.notesSection} style={{ marginTop: "50px" }}>
        <h2 className={styles.sectionTitle}>User List</h2>
        <div className={styles.headerRow}>
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        <div className={styles.notesGrid}>
          {filteredUsers.map((user) => (
            <div key={user.id} className={styles.noteWrapper}>
              <UserCard
                name={user.fullName}
                imageUrl={user.avatar}
                onAdd={() => console.log("Add", user.fullName)}
                onRemove={() => console.log("Remove", user.fullName)}
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default UserDisplay;
