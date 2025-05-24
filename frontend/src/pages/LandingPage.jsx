import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import landingBanner from "../assets/snapshot.png";
import heroImage from "../assets/landingBanner.jpg";
import "../styles/LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Header variant="landing" />
      <div className="landing-hero">
        <div className="hero-text">
          <h1>A Better Task Management</h1>
          <p>Write, plan and work with us</p>
          <button className="tryButton" onClick={() => navigate("/signup")}>
            Try it
          </button>
        </div>
        <div className="hero-image">
          <img src={heroImage} />
        </div>
      </div>
      <div className="screenshot-section">
        <img
          src={landingBanner}
          alt="App Screenshot"
          className="screenshot-img"
        />
      </div>
    </div>
  );
};

export default LandingPage;
