import "./MainPage.css";
import wellPlayed from "../../assets/images/Well-Played.svg";

function MainPage() {
  return (
    <>
      <div className="main-page-container">
        <img src={wellPlayed} alt="Well Played splash"></img>
      </div>
    </>
  );
}

export default MainPage;
