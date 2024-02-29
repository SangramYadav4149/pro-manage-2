import React, { useEffect, useState } from "react";
import style from "./DeletePopUp.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  clearDeleteTask,
  deleteTask,
} from "../../ReduxSection/UserBoardSection/BoardSlice";
import {
  deleteTaskAsync,
  reFatchAlltasksToggle,
} from "../../ReduxSection/UserSection/UserSlice";

import { BeatLoader } from "react-spinners";

const DeletePopUp = () => {
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const deleteTaskInfo = useSelector(deleteTask);
  const boardReFatchToggle = useSelector(reFatchAlltasksToggle);

  const handleClearDeleteTask = () => {
    dispatch(clearDeleteTask());
  };

  const handleDeleteTask = () => {
    setLoader(true);
    dispatch(deleteTaskAsync(deleteTaskInfo));
  };

  useEffect(() => {
    if (loader) {
      setLoader(false);
      handleClearDeleteTask();
    }
  }, [boardReFatchToggle]);
  return (
    <section className={style.delete_popup_container}>
      <div className={style.delete_popup_section}>
        <div className={style.info}>
          <span>Are you sure you want to Delete?</span>
        </div>
        <div className={style.buttons}>
          <button onClick={() => handleDeleteTask()} className={style.delete}>
            {!loader ? "Yes, Delete" : <BeatLoader size={10} color="white" />}
          </button>
          <button
            onClick={() => handleClearDeleteTask()}
            className={style.cancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </section>
  );
};

export default DeletePopUp;
