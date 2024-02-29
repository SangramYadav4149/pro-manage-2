import React, { useEffect, useState } from "react";
import style from "./DoneCard.module.css";
import { SlOptions } from "react-icons/sl";
import { MdExpandMore } from "react-icons/md";
import { MdExpandLess } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";
import {
  backlogCollapse,
  doneCollapseToggle,
  doneCollapsee,
  setDeleteTask,
  setEditTask,
  setShareTaskLink,
  toggle,
} from "../../../ReduxSection/UserBoardSection/BoardSlice";
import {
  addToBacklogAsync,
  addToInProgressAsync,
  addToTodoAsync,
  reFatchAlltasksToggle,
} from "../../../ReduxSection/UserSection/UserSlice";

const DoneCard = ({ note }) => {
  const [showAllTasks, setShowAllTasks] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [checkCount, setCheckCount] = useState(0);
  const [loader, setLoader] = useState(0);
  const Toggle = useSelector(doneCollapseToggle);
  const doneStatus = useSelector(doneCollapsee);
  const boardReFatchToggle = useSelector(reFatchAlltasksToggle);
  const dispatch = useDispatch();

  const handeEditTask = () => {
    dispatch(setEditTask({ task: note, from: "DONE" }));
  };

  const handleToggleShowAllTasks = () => {
    setShowAllTasks(!showAllTasks);
  };
  const handleToggleShowOptions = () => {
    setShowOptions(!showOptions);
  };
  const handleDeleteTask = (id) => {
    dispatch(setDeleteTask({ id: id, from: "DONE" }));
  };
  const handleAddToBacklog = (from) => {
    setLoader(1);
    dispatch(addToBacklogAsync({ removeFrom: from, task: note }));
  };

  const handleAddToToDo = (from) => {
    setLoader(2);
    dispatch(addToTodoAsync({ removeFrom: from, task: note }));
  };
  const handleAddToInProgress = (from) => {
    setLoader(3);
    dispatch(addToInProgressAsync({ removeFrom: from, task: note }));
  };

  const handleShareTaskLink = (link) => {
    dispatch(setShareTaskLink({ shareLink: link }));
  };

  useEffect(() => {
    let checks = note.checklist?.filter(({ tick }) => tick === true);
    setCheckCount(checks.length);
    if (doneStatus) {
      setShowAllTasks(false);
    }
    if (loader) {
      setLoader(0);
    }
  }, [Toggle, boardReFatchToggle]);
  return (
    <section className={style.done_card_container}>
      <div className={style.done_card_section}>
        <div className={style.done_card_section_up}>
          <div className={style.sec_left}>
            <div className={style.priority_sec}>
              <span
                className={style.color}
                style={{ background: `${note.colour}` }}
              ></span>
              <span className={style.task_priority}>{note.priority}</span>
            </div>
            <div className={style.task_title}>{note.title}</div>
          </div>
          <div className={style.sec_right}>
            <SlOptions onClick={() => handleToggleShowOptions()} />
            <div
              className={`${
                showOptions ? style.options_on : style.options_off
              }`}
            >
              <span onClick={() => handeEditTask()}>Edit</span>
              <span onClick={() => handleShareTaskLink(note?.id)}>Share</span>
              <span
                onClick={() => handleDeleteTask(note?._id)}
                className={style.delete}
              >
                Delete
              </span>
            </div>
          </div>
        </div>
        <div className={style.done_card_section_middle}>
          <div className={style.sec_up}>
            <span className={style.checklist}>
              Checlist({checkCount}/{note?.checklist.length})
            </span>
            <span
              onClick={() => handleToggleShowAllTasks()}
              className={style.expand}
            >
              {!showAllTasks ? (
                <MdExpandLess color=" #767575" />
              ) : (
                <MdExpandMore color=" #767575" />
              )}
            </span>
          </div>
          <div className={style.sec_down}>
            {showAllTasks &&
              note.checklist?.map((note, i) => {
                return (
                  <div key={i} className={style.task_sec}>
                    <span className={style.check_box_sec}>
                      <input
                        className={style.check_box}
                        checked={note?.tick ? true : false}
                        type="checkbox"
                      />
                    </span>
                    <span className={style.task}>{note.text}</span>
                  </div>
                );
              })}
          </div>
        </div>

        <div className={style.done_card_section_down}>
          {note?.dueDate && (
            <div className={style.btn_left}>
              <button>{note.dueDate}</button>
            </div>
          )}
          <div className={style.btn_right}>
            <button onClick={() => handleAddToBacklog("Done")}>
              {loader !== 1 ? "BACKLOG" : <BeatLoader size={4} color="black" />}
            </button>
            <button onClick={() => handleAddToToDo("Done")}>
              {loader !== 2 ? "TODO" : <BeatLoader size={4} color="black" />}
            </button>
            <button onClick={() => handleAddToInProgress("DONE")}>
              {loader !== 3 ? (
                "PROGRESS"
              ) : (
                <BeatLoader size={4} color="black" />
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoneCard;
