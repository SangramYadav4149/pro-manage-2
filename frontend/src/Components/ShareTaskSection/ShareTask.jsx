import React, { useEffect, useState } from "react";
import style from "./ShareTask.module.css";
import { SiCountingworkspro } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getShareTaskAsync,
  task,
  toggle,
} from "../../ReduxSection/UserShareTaskSection/ShareTaskSlice";
const ShareTask = () => {
  const [shareTask, setShareTask] = useState({});
  let [checkCount, setCheckCount] = useState(0);
  const dispatch = useDispatch();
  const { taskId } = useParams();
  const taskToggle = useSelector(toggle);
  const fetchedTask = useSelector(task);

  const handleGetShareTask = () => {
    dispatch(getShareTaskAsync({ id: taskId }));
  };

  useEffect(() => {
    if (fetchedTask?.id) {
      let checks = fetchedTask?.checklist?.filter(({ tick }) => tick === true);
      setCheckCount(checks?.length);
      setShareTask(fetchedTask);
    }
    handleGetShareTask();
  }, [taskToggle]);

  return (
    <section className={style.share_task_container}>
      <div className={style.section_left}>
        <div className={style.brand_title}>
          <SiCountingworkspro />
          Pro Manage
        </div>
      </div>
      <div className={style.section_right}>
        <div className={style.section_box}>
          <div className={style.section_up}>
            <span className={style.priority_section}>
              <span
                className={style.dot}
                style={{ backgroundColor: `${shareTask.colour}` }}
              ></span>
              <span className={style.priority_title}>{shareTask.priority}</span>
            </span>
            <span className={style.title}>{shareTask?.title}</span>
          </div>
          <div className={style.section_down}>
            <div className={style.checks}>
              <span className={style.checklist_tag}>
                Checlist({checkCount}/{shareTask?.checklist?.length})
              </span>
            </div>
            <div className={style.checklist_box}>
              {shareTask?.checklist?.map((task, i) => {
                return (
                  <div key={i} className={style.checklist}>
                    <div className={style.values}>
                      <input
                        type="checkbox"
                        checked={task?.tick === true ? true : false}
                      />
                      <span>{task.text}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {shareTask?.dueDate && (
            <div className={style.date_section}>
              <span className={style.date_text}>Due Date</span>
              <span className={style.date}>{shareTask?.dueDate}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ShareTask;
