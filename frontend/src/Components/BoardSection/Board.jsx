import React, { useState } from "react";
import style from "./Board.module.css";
import { getCurrentDate } from "../../Utils/GetDate";
import { VscCollapseAll } from "react-icons/vsc";
import { IoIosAdd } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  setBackLogCollapse,
  setDoneCollapse,
  setInProgressCollapse,
  setToDoCollapse,
  toggleCreateTask,
} from "../../ReduxSection/UserBoardSection/BoardSlice";

import BacklogCardPage from "../../Pages/CardsPage/BacklogCardPage/BacklogCardPage";
import ToDoCardPage from "../../Pages/CardsPage/ToDoCardPage/ToDoPage";
import DoneCardpage from "../../Pages/CardsPage/DoneCardPage/DoneCardpage";
import InProgressCardPage from "../../Pages/CardsPage/InProgressCardPage/InProgressCardPage";
import {
  backlog,
  done,
  inProgress,
  todo,
  user,
} from "../../ReduxSection/UserSection/UserSlice";
const Board = () => {
  const taskBoxes = {
    1: "backlogs",
    2: "todo",
    3: "inprogress",
    4: "done",
  };
  const userTodoTasks = useSelector(todo);
  const userBacklogTasks = useSelector(backlog);
  const userInProgressTasks = useSelector(inProgress);
  const userDoneTasks = useSelector(done);
  const dispatch = useDispatch();
  const userInfo = useSelector(user);
  const date = getCurrentDate();
  const handleToggleCreateTaskSec = () => {
    dispatch(toggleCreateTask());
  };
  const handleCollapseAll = (taskBoxNumber, value) => {
    if (taskBoxNumber === taskBoxes["1"]) {
      dispatch(setBackLogCollapse({ status: value }));
    } else if (taskBoxNumber === taskBoxes["2"]) {
      dispatch(setToDoCollapse({ status: value }));
    } else if (taskBoxNumber === taskBoxes["3"]) {
      dispatch(setInProgressCollapse({ status: value }));
    } else {
      dispatch(setDoneCollapse({ status: value }));
    }
  };

  return (
    <section className={style.board_container}>
      <div className={style.borad_sec_1}>
        <span className={style.board_welcome}>Welcome! {userInfo?.name}</span>
        <span className={style.board_date}>{date}</span>
      </div>
      <div className={style.board_sec_2}>
        <span className={style.section_title}>Board</span>
        <span className={style.board_filters}>
          <select className={style.options}>
            <option value="Today">Today</option>
            <option value="This week">This week</option>
            <option value="This month">This month</option>
          </select>
        </span>
      </div>
      <div className={style.board_sec_3}>
        <div className={style.board_box}>
          <div className={style.board_box_up_sec}>
            <div className={style.box}>
              <span className={style.text}>Backlogs</span>
              <span onClick={() => handleCollapseAll(taskBoxes["1"], true)}>
                <VscCollapseAll size={21} />
              </span>
            </div>
          </div>
          <div className={style.tasks_sec}>
            {userBacklogTasks?.map((note, i) => {
              return (
                <div key={i} className={style.task_box}>
                  <BacklogCardPage note={note} />
                </div>
              );
            })}
          </div>
        </div>
        <div className={style.board_box}>
          <div className={style.board_box_up_sec}>
            <div className={style.box}>
              <span className={style.text}>To do</span>
              <span className={style.add_icon}>
                <IoIosAdd
                  onClick={() => handleToggleCreateTaskSec()}
                  size={25}
                />
                <span onClick={() => handleCollapseAll(taskBoxes["2"], true)}>
                  <VscCollapseAll size={21} />
                </span>
              </span>
            </div>
          </div>
          <div className={style.tasks_sec}>
            {userTodoTasks?.map((note) => {
              return (
                <div className={style.task_box}>
                  <ToDoCardPage note={note} />
                </div>
              );
            })}
          </div>
        </div>
        <div className={style.board_box}>
          <div className={style.board_box_up_sec}>
            <div className={style.box}>
              <span className={style.text}>In pogress</span>
              <span onClick={() => handleCollapseAll(taskBoxes["3"], true)}>
                <VscCollapseAll size={21} />
              </span>
            </div>
          </div>
          <div className={style.tasks_sec}>
            {userInProgressTasks?.map((note, i) => {
              return (
                <div key={i} className={style.task_box}>
                  <InProgressCardPage note={note} />
                </div>
              );
            })}
          </div>
        </div>
        <div className={style.board_box}>
          <div className={style.board_box_up_sec}>
            <div className={style.box}>
              <span className={style.text}>Done</span>
              <span onClick={() => handleCollapseAll(taskBoxes["4"], true)}>
                <VscCollapseAll size={21} />
              </span>
            </div>
          </div>
          <div className={style.tasks_sec}>
            {userDoneTasks?.map((note, i) => {
              return (
                <div key={i} className={style.task_box}>
                  <DoneCardpage note={note} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Board;
