import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BeatLoader } from "react-spinners";
import { MdDelete } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import style from "./EditTask.module.css";
import {
  createTodoAsync,
  editTaskAsync,
  reFatchAlltasksToggle,
} from "../../ReduxSection/UserSection/UserSlice";
import { decodeMonth, getCurrentDate, getMonth } from "../../Utils/GetDate";
import {
  clearDeleteTask,
  clearEditTask,
  editTask,
} from "../../ReduxSection/UserBoardSection/BoardSlice";

const EditTask = () => {
  const userEditTask = useSelector(editTask);

  const [inputValues, setInputValues] = useState(userEditTask?.task?.checklist);
  const allTicks = userEditTask?.task?.checklist.filter(
    ({ tick }) => tick === true
  );
  let [inputsCount, setInputsCount] = useState(
    userEditTask?.task?.checklist[userEditTask?.task?.checklist.length - 1].id
  );
  const [priority, setPriority] = useState(userEditTask?.task?.priority);
  const [taskToggle, setTaskToggle] = useState(false);
  const [date, setDate] = useState(userEditTask?.task?.pureDate);
  const [title, setTilte] = useState(userEditTask?.task?.title);
  let [checkList, setCheckList] = useState(
    allTicks[0]?.id ? allTicks?.length : 0
  );
  const [enableSaveButton, setEnableSaveButton] = useState(true);
  const [loader, setLoader] = useState(false);

  const dispatch = useDispatch();
  const boardReFatchToggle = useSelector(reFatchAlltasksToggle);

  const handleCloseEditTask = () => {
    dispatch(clearEditTask());
  };

  const handleSetTitle = (text) => {
    if (inputValues[0]?.id && text && priority) {
      setEnableSaveButton(true);
    } else {
      setEnableSaveButton(false);
    }
    setTilte(text);
  };
  const handleSelectPriority = (priority) => {
    if (inputValues[0]?.id && title && priority) {
      setEnableSaveButton(true);
    } else {
      setEnableSaveButton(false);
    }
    setPriority(priority);
  };

  const handleSaveTask = () => {
    setLoader(true);
    let month = "";
    let currDate = "";
    if (date) {
      const monthNumber =
        date?.split("-")[1][0] === "0"
          ? date?.split("-")[1][1]
          : date?.split("-")[1];
      currDate = date.split("-")[2];

      month = date ? getMonth(monthNumber) : "";
    }

    const editTaskInfo = {
      _id: userEditTask?.task?._id,
      id: userEditTask?.task?.id,
      title: title,
      checklist: inputValues,
      priority: priority,
      dueDate: date ? `${month} ${currDate}th` : "",
      pureDate: date,
      colour:
        priority === "lo-priority"
          ? "green"
          : priority === "high-priority"
          ? "red"
          : "blue",
    };
    console.log({ task: editTaskInfo, from: userEditTask.from });

    dispatch(editTaskAsync({ task: editTaskInfo, from: userEditTask.from }));
  };

  const handleSetTick = (index) => {
    let task = { ...inputValues[index] };
    let allTasks = [...inputValues];
    let alreadyTick = task.tick;
    if (alreadyTick) {
      task.tick = false;
      allTasks[index] = task;
      setCheckList(checkList - 1);
    } else {
      task.tick = true;
      allTasks[index] = task;
      setCheckList(checkList + 1);
    }
    setInputValues(allTasks);
    setTaskToggle(!taskToggle);
  };

  const handleDeleteInput = (index) => {
    const filterInputValues = inputValues.filter(({ id }) => id !== index);
    const taskIndex = inputValues.findIndex(({ id }) => id === index);

    if (filterInputValues[0]?.id && title && priority) {
      setEnableSaveButton(true);
    } else {
      setEnableSaveButton(false);
    }

    if (inputValues[taskIndex].tick) {
      setCheckList(checkList - 1);
    }

    setInputValues([...filterInputValues]);
  };
  const handleAddInputBox = (count) => {
    if (title && priority) {
      setEnableSaveButton(true);
    } else {
      setEnableSaveButton(false);
    }
    setInputValues([
      ...inputValues,
      {
        id: count + 1,
        tick: false,
        text: "",
      },
    ]);
    setInputsCount(count + 1);
  };
  const handleSetText = (index, text) => {
    let task = { ...inputValues[index] };
    task.text = text;
    let allTasks = [...inputValues];
    allTasks[index] = task;
    setInputValues(allTasks);
    setTaskToggle(!taskToggle);
  };

  useEffect(() => {
    if (loader) {
      setLoader(false);
      handleCloseEditTask();
    }
  }, [boardReFatchToggle]);
  return (
    <section className={style.edit_task}>
      <div className={style.edit_task_sec}>
        <div className={style.task_sec_up}>
          <div className={style.task_input_sec}>
            <label>
              Title <span className={style.red_dot}>*</span>
            </label>
            <input
              onChange={(e) => handleSetTitle(e.target.value)}
              type="text"
              value={title}
              placeholder="Enter Task Title"
            />
          </div>
          <div className={style.select_priority}>
            <div className={style.task_title}>
              <span>
                Select Priority <span className={style.red_dot}>*</span>
              </span>
            </div>
            <div className={style.select_opt}>
              <div
                onClick={() => handleSelectPriority("high-priority")}
                className={`${style.opt} ${
                  priority === "high-priority" && style.select_priority_on
                }`}
              >
                <span className={style.red}></span>
                <span className={style.select_text}>HIGH PRIORITY</span>
              </div>
              <div
                onClick={() => handleSelectPriority("moderate-priority")}
                className={`${style.opt} ${
                  priority === "moderate-priority" && style.select_priority_on
                }`}
              >
                <span className={style.blue}></span>
                <span className={style.select_text}>MODERATE PRIORITY</span>
              </div>
              <div
                onClick={() => handleSelectPriority("low-priority")}
                className={`${style.opt} ${
                  priority === "low-priority" && style.select_priority_on
                }`}
              >
                <span className={style.green}></span>
                <span className={style.select_text}> LOW PRIORITY</span>
              </div>
            </div>
          </div>
          <div className={style.task_section}>
            <div>
              <span className={style.checklist_title}>
                Checklist {`(${checkList}/${inputValues?.length})`}{" "}
                <span className={style.red_dot}>*</span>
              </span>
            </div>
            <div className={style.task_inputs}>
              {inputValues?.map(({ id, text }, i) => {
                return (
                  <>
                    <div key={i} className={style.task_box}>
                      <div className={style.check_box}>
                        <input
                          onChange={(e) => handleSetTick(i)}
                          checked={inputValues[i].tick}
                          type="checkbox"
                        />
                      </div>
                      <div className={style.task_delete}>
                        <MdDelete
                          onClick={() => handleDeleteInput(id)}
                          color="#CF3636"
                        />
                      </div>

                      <div className={style.task_write}>
                        <input
                          onChange={(e) => handleSetText(i, e.target.value)}
                          type="text"
                          value={text}
                          placeholder="Write task"
                        />
                      </div>
                    </div>
                  </>
                );
              })}
            </div>

            <div className={style.task_add_box}>
              <span className={style.task_add_icon}>
                <IoIosAdd />
              </span>
              <span
                onClick={() => handleAddInputBox(inputsCount)}
                className={style.task_add_text}
              >
                Add New
              </span>
            </div>
          </div>
        </div>

        <div className={style.task_sec_down}>
          <div className={style.buttons_left}>
            <input
              onChange={(e) => setDate(e.target.value)}
              className={style.date_btn}
              value={date}
              type="date"
            />
          </div>
          <div className={style.buttons_right}>
            <button
              onClick={() => handleCloseEditTask()}
              className={style.cancel_btn}
            >
              Cancel
            </button>
            <button
              onClick={() => handleSaveTask()}
              disabled={!enableSaveButton ? true : false}
              className={` ${style.save_btn} ${
                !enableSaveButton && style.disable_btn
              }`}
            >
              {!loader ? "Save" : <BeatLoader size={10} color="white" />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditTask;
