import React, { useState, useEffect } from "react";
import "../../styles/Settings/UserProfile.css";
import Image from "../../assets/girl.jpg";


export default function UserProfile() {
  const userData = {
    name: "John Doe",
    email: "john@example.com",
    image: Image  
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    setName(userData.name);
    setEmail(userData.email);
    setPreview(userData.image); 
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Profile Updated:\nName: ${name}\nEmail: ${email}`);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-wrapper">
      <p>User Profile</p>
      <form className="profile-form" onSubmit={handleSubmit}>
        {preview && <img src={preview} alt="Preview" className="profile-preview" />}
        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />

        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          required
        />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}
