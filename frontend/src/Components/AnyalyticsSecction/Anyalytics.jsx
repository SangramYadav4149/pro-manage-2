import React from "react";
import style from "./Anyalytics.module.css";
import { useSelector } from "react-redux";
import {
  allBacklog,
  allDone,
  allDueDateTasks,
  allHighPriority,
  allInProgress,
  allLowPriority,
  allModeratePriority,
  allTodo,
} from "../../ReduxSection/UserSection/UserSlice";

const Anyalytics = () => {
  const userAllBacklog = useSelector(allBacklog);
  const userAllTodo = useSelector(allTodo);
  const userAllInProgress = useSelector(allInProgress);
  const userAllDone = useSelector(allDone);
  const userAllHighPriorityTasks = useSelector(allHighPriority);
  const userAllModeratePriorityTasks = useSelector(allModeratePriority);
  const userAllLowPriorityTasks = useSelector(allLowPriority);
  const userAllDueDateTasks = useSelector(allDueDateTasks);
  return (
    <section className={style.anyalytics_container}>
      <span className={style.section_title}>Anyalytics</span>
      <div className={style.anyalytics_section}>
        <div className={style.anyalytics_box}>
          <div className={style.detail_sec}>
            <div className={style.detail_box}>
              <span className={style.dot}></span>
              <span className={style.task_title}>Backlog Tasks</span>
            </div>
            <div className={style.anyalytics_info}>
              {userAllBacklog >= 10
                ? userAllBacklog
                : userAllBacklog === 0
                ? 0
                : `0${userAllBacklog}`}
            </div>
          </div>
          <div className={style.detail_sec}>
            <div className={style.detail_box}>
              <span className={style.dot}></span>
              <span className={style.task_title}>To-do Tasks</span>
            </div>
            <div className={style.anyalytics_info}>
              {userAllTodo >= 10
                ? userAllTodo
                : userAllTodo === 0
                ? 0
                : `0${userAllTodo}`}
            </div>
          </div>
          <div className={style.detail_sec}>
            <div className={style.detail_box}>
              <span className={style.dot}></span>
              <span className={style.task_title}>In-progress Tasks</span>
            </div>
            <div className={style.anyalytics_info}>
              {" "}
              {userAllInProgress >= 10
                ? userAllInProgress
                : userAllInProgress === 0
                ? 0
                : `0${userAllInProgress}`}
            </div>
          </div>
          <div className={style.detail_sec}>
            <div className={style.detail_box}>
              <span className={style.dot}></span>
              <span className={style.task_title}>Completed Tasks</span>
            </div>
            <div className={style.anyalytics_info}>
              {userAllDone >= 10
                ? userAllDone
                : userAllDone === 0
                ? 0
                : `0${userAllDone}`}
            </div>
          </div>
        </div>
        <div className={style.anyalytics_box}>
          <div className={style.detail_sec}>
            <div className={style.detail_box}>
              <span className={style.dot}></span>
              <span className={style.task_title}>Low Priority</span>
            </div>
            <div className={style.anyalytics_info}>
              {userAllLowPriorityTasks >= 10
                ? userAllLowPriorityTasks
                : userAllLowPriorityTasks === 0
                ? 0
                : `0${userAllLowPriorityTasks}`}
            </div>
          </div>
          <div className={style.detail_sec}>
            <div className={style.detail_box}>
              <span className={style.dot}></span>
              <span className={style.task_title}>Moderate Priority</span>
            </div>
            <div className={style.anyalytics_info}>
              {userAllModeratePriorityTasks >= 10
                ? userAllModeratePriorityTasks
                : userAllModeratePriorityTasks === 0
                ? 0
                : `0${userAllModeratePriorityTasks}`}
            </div>
          </div>
          <div className={style.detail_sec}>
            <div className={style.detail_box}>
              <span className={style.dot}></span>
              <span className={style.task_title}>High Priority</span>
            </div>
            <div className={style.anyalytics_info}>
              {userAllHighPriorityTasks >= 10
                ? userAllHighPriorityTasks
                : userAllHighPriorityTasks === 0
                ? 0
                : `0${userAllHighPriorityTasks}`}
            </div>
          </div>
          <div className={style.detail_sec}>
            <div className={style.detail_box}>
              <span className={style.dot}></span>
              <span className={style.task_title}>Due-date Tasks</span>
            </div>
            <div className={style.anyalytics_info}>
              {" "}
              {userAllDueDateTasks >= 10
                ? userAllDueDateTasks
                : userAllDueDateTasks === 0
                ? 0
                : `0${userAllDueDateTasks}`}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Anyalytics;
