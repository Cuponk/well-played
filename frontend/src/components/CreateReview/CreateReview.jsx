import React from "react";
import "./CreateReview.css";
import { useDispatch } from "react-redux";

function CreateReview({ gameId, closeModal, user }) {
  const dispatch = useDispatch();


  const handleBackgroundClick = (e) => {
    e.stopPropagation();
    closeModal();
  }

  return (
    <div className="modal">
      <div className="modal-background" onClick={handleBackgroundClick}></div>
      <div className="modal-content">
        hello this is a review form
      </div>
    </div>
  )
}

export default CreateReview;
