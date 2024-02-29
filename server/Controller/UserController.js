import Backlog from "../Model/BacklogModel.js";
import Done from "../Model/DoneModel.js";
import InProgress from "../Model/InProgressModel.js";
import Todo from "../Model/ToDoModel.js";
import User from "../Model/UserModel.js";
import bcrypt from "bcrypt";
const getUser = async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id);
    res.status(200).json({ user: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserAllTasks = async (req, res) => {
  try {
    const { _id } = req.user;
    const allTodo = await Todo.find({ creater: _id });
    const allbacklog = await Backlog.find({ creater: _id });
    const allInProgress = await InProgress.find({ creater: _id });
    const allDone = await Done.find({ creater: _id });
    res.status(200).json({
      backlog: allbacklog,
      todo: allTodo,
      inProgress: allInProgress,
      done: allDone,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const changeUserPassword = async (req, res) => {
  try {
    const { _id } = req.user;
    const { password, name } = req.body;

    if (_id && password && name) {
      const count = await bcrypt.genSalt(5);
      const hashedPassword = await bcrypt.hash(password, count);
      const user = await User.findByIdAndUpdate(
        _id,
        {
          password: hashedPassword,
          name: name,
        },
        { new: true }
      );

      res.status(201).json({ user: user });
    } else if (_id && password) {
      const count = await bcrypt.genSalt(5);
      const hashedPassword = await bcrypt.hash(password, count);
      const user = await User.findByIdAndUpdate(
        _id,
        {
          password: hashedPassword,
          name: name,
        },
        { new: true }
      );

      res.status(201).json({ user: user });
    } else {
      res.status(400).json({ message: "All inputs are required!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export { getUser, getUserAllTasks, changeUserPassword };
