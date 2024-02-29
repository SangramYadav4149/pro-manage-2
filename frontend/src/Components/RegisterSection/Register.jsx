import React, { useEffect, useState } from "react";
import icon from "../../Images/Login/Art.png";
import { FiEye } from "react-icons/fi";
import { CiMail } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { FiEyeOff } from "react-icons/fi";
import { CiUser } from "react-icons/ci";
import { BeatLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import style from "./Register.module.css";
import {
  registerUserAsync,
  toggle,
  user,
} from "../../ReduxSection/UserSection/UserSlice";
const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [mailError, setMailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [mail, setMail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [nameErorr, setNameError] = useState("");
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userToggle = useSelector(toggle);
  const registerUser = useSelector(user);

  const handleTypingMail = (event) => {
    setMail(event.target.value);
  };
  const handleTypingName = (event) => {
    setName(event.target.value);
  };
  const handleTypingConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };
  const handleTypingPassword = (event) => {
    setPassword(event.target.value);
  };
  const handleNavigateToLoinPage = (route) => {
    navigate(route);
  };

  const handleRegister = async () => {
    try {
      setMailError("");
      setPasswordError("");
      setConfirmPasswordError("");
      setNameError("");
      if (!name && !mail && !password && !confirmPassword) {
        setNameError("Please insert a valid name!");
        setMailError("Please insert a valid email!");
        setPasswordError("Please insert a valid password!");
        setConfirmPasswordError("Please insert a valid confirm password!");
      } else if (
        !mail ||
        !mail.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      ) {
        setMailError("Please insert a valid email!");
      } else if (!password) {
        setPasswordError("Please insert a valid password!");
      } else if (password !== confirmPassword) {
        setConfirmPasswordError(
          "Confirm password doesn't match with password!"
        );
      } else {
        setLoader(true);
        const userInfo = {
          name: name,
          email: mail,
          password: password,
        };
        dispatch(registerUserAsync(userInfo));
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (registerUser?.name) {
      setMail("");
      setPassword("");
      setName("");
      setConfirmPassword("");
      navigate("/");
      setLoader(false);
    }
  }, [userToggle]);
  return (
    <section className={style.register_container}>
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
          <span className={style.title_text}>Register</span>
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
                <span className={style.input_error_msg}>{nameErorr}</span>
              </div>
              <div className={style.input_box}>
                <span className={style.mail_icon}>
                  <CiMail />
                </span>

                <input
                  onChange={(e) => handleTypingMail(e)}
                  type="text"
                  placeholder="Email"
                  className={style.input}
                  value={mail}
                />
                <span className={style.input_error_msg}>{mailError}</span>
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
                  placeholder="Password"
                  value={password}
                />
                <span className={style.input_error_msg}>{passwordError}</span>
              </div>
              <div className={style.input_box}>
                <div className={style.input_placeholder}>
                  <span className={style.confirmpassword_icon}>
                    <CiLock />
                  </span>
                </div>

                <span
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className={style.eye}
                >
                  {!showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </span>
                <input
                  onChange={(e) => handleTypingConfirmPassword(e)}
                  type={`${showConfirmPassword ? "text" : "password"}`}
                  className={style.input}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                />
                <span className={style.input_error_msg}>
                  {confirmPasswordError}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className={style.container_down}>
          <button
            onClick={() => handleRegister()}
            className={style.register_btn}
          >
            {!loader ? "Register" : <BeatLoader size={13} color="white" />}
          </button>
          <span className={style.no_account}>Have an account?</span>
          <button
            onClick={() => handleNavigateToLoinPage("/login")}
            className={style.login_btn}
          >
            Login
          </button>
        </div>
      </div>
    </section>
  );
};

export default Register;
