import "./MainPage.css";
import wellPlayed from "../../assets/images/Well-Played.svg";
import { NavLink } from "react-router-dom/";

function MainPage() {
  return (
    <>
      <div className="main-page-container">
        <img src={wellPlayed} alt="Well Played splash"></img>
        <NavLink to="/search"><button>Search Games</button></NavLink>
      </div>
    </>
  );
}

export default MainPage;
