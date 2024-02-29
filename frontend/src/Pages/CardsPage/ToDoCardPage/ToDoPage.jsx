import React from "react";
import ToDoCard from "../../../Components/CardsSection/ToDoCard/ToDoCard";

const ToDoCardPage = ({ note }) => {
  return (
    <div>
      <ToDoCard note={note} />
    </div>
  );
};

export default ToDoCardPage;
