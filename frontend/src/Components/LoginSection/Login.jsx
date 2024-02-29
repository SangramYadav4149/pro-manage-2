import React, { useEffect, useState } from "react";
import style from "./Login.module.css";
import icon from "../../Images/Login/Art.png";
import { FiEye } from "react-icons/fi";
import { CiMail } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { FiEyeOff } from "react-icons/fi";
import { BeatLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loginError,
  loginUserAsync,
  toggle,
  user,
} from "../../ReduxSection/UserSection/UserSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [mailError, setMailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userToggle = useSelector(toggle);
  const error = useSelector(loginError);
  const userInfo = useSelector(user);

  const handleTypingMail = (event) => {
    setMail(event.target.value);
  };
  const handleTypingPassword = (event) => {
    setPassword(event.target.value);
  };
  const handleNavigateToSignUpPage = (route) => {
    navigate(route);
  };

  const handleLogin = async () => {
    try {
      setMailError("");
      setPasswordError("");
      if (!mail && !password) {
        setMailError("Please insert a valid email!");
        setPasswordError("Please insert a valid password!");
      } else if (!mail) {
        setMailError("Please insert a valid email!");
      } else if (!password) {
        setPasswordError("Please insert a valid password!");
      } else {
        setLoader(true);
        const userInfo = {
          email: mail,
          password: password,
        };
        dispatch(loginUserAsync(userInfo));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userInfo?._id) {
      setMail("");
      setPassword("");
      setLoader(false);
      navigate("/");
    }
    if (error) {
      setLoader(false);
      setMail("");
      setPassword("");
      toast.error("Password or email is not correct!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [userToggle]);
  return (
    <section className={style.login_container}>
      <ToastContainer />
      <div className={style.left_container}>
        <div className={style.image}>
          <img src={icon} alt="icon" className={style.big_img} />
          <div className={style.round_background}></div>
        </div>

        <div className={style.text_flex}>
          <span className={style.big_tag}>Welcome aboard my friend</span>
          <span className={style.small_tag}>
            {" "}
            just a couple of clicks and we start
          </span>
        </div>
      </div>
      <div className={style.right_container}>
        <div className={style.container_up}>
          <span className={style.title_text}>Login</span>
          <div className={style.form}>
            <div className={style.login_form}>
              <div className={style.input_box}>
                <div className={style.input_placeholder}>
                  <span className={style.mail_icon}>
                    <CiMail />
                  </span>
                </div>

                <input
                  onChange={(e) => handleTypingMail(e)}
                  type="mail"
                  className={style.input}
                  placeholder="Email"
                  value={mail}
                />
                <span className={style.input_error_msg}>{mailError}</span>
              </div>
              <div className={style.input_box}>
                <span className={style.lock_icon}>
                  <CiLock />
                </span>

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
                  placeholder="Password"
                  value={password}
                />
                <span className={style.input_error_msg}>{passwordError}</span>
              </div>
            </div>
          </div>
        </div>
        <div className={style.container_down}>
          <button onClick={() => handleLogin()} className={style.login_btn}>
            {!loader ? "Login" : <BeatLoader size={13} color="white" />}
          </button>
          <span className={style.no_account}>have no account yet?</span>
          <button
            onClick={() => handleNavigateToSignUpPage("/register")}
            className={style.register_btn}
          >
            Register
          </button>
        </div>
      </div>
    </section>
  );
};

export default Login;
