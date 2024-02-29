import React from "react";
import InProgressCard from "../../../Components/CardsSection/InProgress/InProgressCard";

const InProgressCardPage = ({ note }) => {
  return (
    <div>
      <InProgressCard note={note} />
    </div>
  );
};

export default InProgressCardPage;
