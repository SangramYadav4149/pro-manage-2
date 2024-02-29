import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  changeUserPasswordAsync,
  reFatchAlltasksToggle,
  toggle,
  user,
} from "../../ReduxSection/UserSection/UserSlice";
import { FiEye } from "react-icons/fi";
import { CiMail } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { FiEyeOff } from "react-icons/fi";
import { CiUser } from "react-icons/ci";
import { BeatLoader } from "react-spinners";
import style from "./Settings.module.css";
const Settings = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [shownewPassword, setShownewPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [name, setName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [newPasswordError, setnewPasswordError] = useState("");
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const boardReFatchToggle = useSelector(reFatchAlltasksToggle);

  const handleNotifyUser = () => {
    toast.success("Password changed succesfully!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleTypingName = (e) => {
    setName(e.target.value);
  };

  const handleTypingnewPassword = (event) => {
    setnewPassword(event.target.value);
  };
  const handleTypingPassword = (event) => {
    setOldPassword(event.target.value);
  };

  const handleChangePassword = async () => {
    try {
      setPasswordError("");
      setnewPasswordError("");

      if (!oldPassword && !newPassword) {
        setPasswordError("Please insert a valid password!");
        setnewPasswordError("Please insert a valid new password!");
      } else if (!oldPassword) {
        setPasswordError("Please insert a valid password!");
      } else if (!newPassword) {
        setnewPasswordError("Please insert a valid new password!");
      } else {
        {
          setLoader(true);
          const userInfo = {
            name: name,
            password: newPassword,
          };
          dispatch(changeUserPasswordAsync(userInfo));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (loader) {
      handleNotifyUser();
      setLoader(false);
    }
  }, [boardReFatchToggle]);
  return (
    <section className={style.settings_container}>
      <ToastContainer />
      <span className={style.title_text}>Settings</span>
      <div className={style.right_container}>
        <div className={style.container_up}>
          <div className={style.form}>
            <div className={style.register_form}>
              <div className={style.input_box}>
                <span className={style.user_icon}>
                  <CiUser />
                </span>

                <input
                  onChange={(e) => handleTypingName(e)}
                  type="text"
                  placeholder="Name"
                  className={style.input}
                  value={name}
                />
                <span className={style.input_error_msg}></span>
              </div>

              <div className={style.input_box}>
                <div className={style.input_placeholder}>
                  <span className={style.password_icon}>
                    <CiLock />
                  </span>
                </div>

                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className={style.eye}
                >
                  {!showPassword ? <FiEyeOff /> : <FiEye />}
                </span>
                <input
                  onChange={(e) => handleTypingPassword(e)}
                  type={`${showPassword ? "text" : "password"}`}
                  className={style.input}
                  placeholder=" Old Password"
                  value={oldPassword}
                />
                <span className={style.input_error_msg}>{passwordError}</span>
              </div>
              <div className={style.input_box}>
                <div className={style.input_placeholder}>
                  <span className={style.newPassword_icon}>
                    <CiLock />
                  </span>
                </div>

                <span
                  onClick={() => setShownewPassword(!shownewPassword)}
                  className={style.eye}
                >
                  {!shownewPassword ? <FiEyeOff /> : <FiEye />}
                </span>
                <input
                  onChange={(e) => handleTypingnewPassword(e)}
                  type={`${shownewPassword ? "text" : "password"}`}
                  className={style.input}
                  placeholder="New Password"
                  value={newPassword}
                />
                <span className={style.input_error_msg}>
                  {newPasswordError}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className={style.container_down}>
          <button
            onClick={() => handleChangePassword()}
            className={style.submit_btn}
          >
            {!loader ? "Update" : <BeatLoader size={13} color="white" />}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Settings;
