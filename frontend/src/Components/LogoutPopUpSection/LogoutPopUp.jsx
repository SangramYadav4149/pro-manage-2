import React from "react";
import style from "./LogoutPopUp.module.css";
import { useDispatch } from "react-redux";
import { setLogOut } from "../../ReduxSection/UserSection/UserSlice";
import { setUserLogoutfalse } from "../../ReduxSection/UserBoardSection/BoardSlice";
const LogoutPopUp = () => {
  const dispatch = useDispatch();
  const handleLogoutUser = () => {
    dispatch(setLogOut());
    dispatch(setUserLogoutfalse());
  };

  const handleCancelLogoutUser = () => {
    dispatch(setUserLogoutfalse());
  };
  return (
    <section className={style.logout_popup_container}>
      <div className={style.logout_popup_section}>
        <div className={style.info}>
          <span>Are you sure you want to logout?</span>
        </div>
        <div className={style.buttons}>
          <button onClick={() => handleLogoutUser()} className={style.logout}>
            Yes, logout
          </button>
          <button
            onClick={() => handleCancelLogoutUser()}
            className={style.cancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </section>
  );
};

export default LogoutPopUp;
