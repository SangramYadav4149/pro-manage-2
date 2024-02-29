import React, { useEffect, useState } from "react";
import { SiCountingworkspro } from "react-icons/si";
import { PiLayoutThin } from "react-icons/pi";
import { GoDatabase } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import style from "./Home.module.css";
import BoardPage from "../../Pages/BoardPage/BoardPage";
import AnyalyticsPage from "../../Pages/AnyalyticsPage/AnyalyticsPage";
import SettingsPage from "../../Pages/SettingsPage/SettingsPage";
import TaskCreate from "../TaskCreateSection/TaskCreate";
import { useSelector, useDispatch } from "react-redux";
import {
  createTask,
  deleteTask,
  editTask,
  logOut,
  setUserLogoutTrue,
  shareTaskLink,
  toggle,
  toggleCreateTask,
} from "../../ReduxSection/UserBoardSection/BoardSlice";
import DeletePopUp from "../DeletePopUpSection/DeletePopUp";
import EditTask from "../EditTaskSection/EditTask";

import ShareLink from "../ShareLinkPopUpSection/ShareLinkPopUp";
import LogoutPopUp from "../LogoutPopUpSection/LogoutPopUp";
const Home = () => {
  const [selectSection, setSelectSection] = useState("board");
  const [showCreateTask, setShowCreateTask] = useState(false);
  const taskStatus = useSelector(createTask);
  const userDeleteTask = useSelector(deleteTask);
  const userEditTask = useSelector(editTask);
  const userShareTaskLink = useSelector(shareTaskLink);
  const userLogout = useSelector(logOut);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(setUserLogoutTrue());
  };
  const boardToggle = useSelector(toggle);
  const handleClickSection = (section) => {
    setSelectSection(section);
  };

  useEffect(() => {
    setShowCreateTask(taskStatus);
  }, [boardToggle]);

  return (
    <>
      {userLogout && (
        <div className={style.user_logout}>
          <LogoutPopUp />
        </div>
      )}
      {userShareTaskLink && (
        <div className={style.share_link_sec}>
          <ShareLink />
        </div>
      )}
      {userEditTask?.task?._id && (
        <div className={style.edit_sec}>
          <EditTask />
        </div>
      )}
      {userDeleteTask?.id && (
        <div className={style.delete_sec}>
          <DeletePopUp />
        </div>
      )}
      {showCreateTask && (
        <div className={style.note_sec}>
          <TaskCreate />
        </div>
      )}
      <section
        className={`${style.home_container} ${
          (showCreateTask ||
            userDeleteTask?.id ||
            userShareTaskLink ||
            userLogout ||
            userEditTask?.task?._id) &&
          style.crate_task_on
        }`}
      >
        <div className={style.left_section}>
          <div className={style.section_up}>
            <div className={style.brand_name_section}>
              <div className={style.brand_name}>
                <span className={style.brand_icon}>
                  <SiCountingworkspro />
                </span>
                <span className={style.brand_text}>Pro Manage</span>
              </div>
            </div>

            <div className={style.routes_container}>
              <div
                className={`${style.route_section} ${
                  selectSection === "board" && style.select_section
                }`}
                onClick={() => handleClickSection("board")}
              >
                <span className={style.route_icon}>
                  <PiLayoutThin />
                </span>
                <span className={style.route_text}>Board</span>
              </div>
              <div
                className={`${style.route_section} ${
                  selectSection === "anyalytics" && style.select_section
                }`}
                onClick={() => handleClickSection("anyalytics")}
              >
                <span className={style.route_icon}>
                  <GoDatabase />
                </span>
                <span className={style.route_text}>Anyalytics</span>
              </div>
              <div
                onClick={() => handleClickSection("settings")}
                className={`${style.route_section} ${
                  selectSection === "settings" && style.select_section
                }`}
              >
                <span className={style.route_icon}>
                  <IoSettingsOutline />
                </span>
                <span className={style.route_text}>Settings</span>
              </div>
            </div>
          </div>
          <div className={style.section_down}>
            <div
              onClick={() => handleLogout()}
              className={style.logout_section}
            >
              <span className={style.logout_icon}>
                <IoLogOutOutline />
              </span>
              <span className={style.logout_text}>Logout</span>
            </div>
          </div>
        </div>
        <div className={style.right_section}>
          {selectSection === "board" ? (
            <BoardPage />
          ) : selectSection === "anyalytics" ? (
            <AnyalyticsPage />
          ) : (
            <SettingsPage />
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
