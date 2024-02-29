import React from "react";
import style from "./ShareLink.module.css";
import { FaRegCopy } from "react-icons/fa6";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  clearShareLink,
  shareTaskLink,
} from "../../ReduxSection/UserBoardSection/BoardSlice";
const ShareLink = () => {
  const dispatch = useDispatch();
  const shareLink = useSelector(shareTaskLink);
  const link = `https://pro-manage-5.onrender.com/share/task/${shareLink}`;
  const handleClearUserSharetaskLink = () => {
    toast.success("URL copied succesfully!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setTimeout(() => {
      dispatch(clearShareLink());
    }, [5000]);
  };

  return (
    <section className={style.share_link_container}>
      <ToastContainer />
      <div className={style.share_link_box}>
        <div className={style.share_link_section}>
          <div className={style.share_link_text}>{link.slice(0, 40)}....</div>
          <div
            onClick={() => handleClearUserSharetaskLink()}
            className={style.copy_icon}
          >
            <CopyToClipboard text={link}>
              <FaRegCopy size={23} />
            </CopyToClipboard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShareLink;
