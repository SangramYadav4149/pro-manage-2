import Backlog from "../Model/BacklogModel.js";
import Done from "../Model/DoneModel.js";
import InProgress from "../Model/InProgressModel.js";
import Todo from "../Model/ToDoModel.js";

const getShareTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const backlog = await Backlog.findOne({ id: id });
      const toDo = await Todo.findOne({ id: id });
      const inProgeess = await InProgress.findOne({ id: id });
      const done = await Done.findOne({ id: id });

      if (backlog) {
        res.status(200).json({ task: backlog });
      } else if (toDo) {
        res.status(200).json({ task: toDo });
      } else if (inProgeess) {
        res.status(200).json({ task: inProgeess });
      } else if (done) {
        res.status(200).json({ task: done });
      } else {
        res.status(404).json({ message: "Task not found!" });
      }
    } else {
      res.status(400).json({ message: "Task id is required!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(`Error : ${error.message}`);
  }
};
const createTodo = async (req, res) => {
  try {
    const { _id } = req.user;
    const { title, checklist, priority, dueDate, colour, pureDate, id } =
      req.body;

    if (title && checklist && priority && _id && colour) {
      const createTodo = new Todo({
        id,
        title,
        checklist,
        priority,
        creater: _id,
        dueDate,
        pureDate,
        colour,
      });
      await createTodo.save();
      res.status(201).json(createTodo);
    } else {
      res.status(400).json({ message: "All fields are required!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(`Error : ${error.message}`);
  }
};
const addToBacklog = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id } = req.user;
    const { task, removeFrom } = req.body;

    const tasks = {
      1: "TODO",
      2: "INPROGRESS",
      3: "DONE",
    };
    if (task && removeFrom && _id && id) {
      const createBacklog = new Backlog({
        id: task.id,
        title: task.title,
        checklist: task.checklist,
        priority: task.priority,
        dueDate: task.dueDate ? task.dueDate : "",
        pureDate: task.pureDate,
        colour: task.colour,
        creater: _id,
      });
      await createBacklog.save();

      if (removeFrom === tasks["1"]) {
        const deleteTask = await Todo.findByIdAndDelete(id);
      } else if (removeFrom === tasks["2"]) {
        const deleteTask = await InProgress.findByIdAndDelete(id);
      } else {
        const deleteTask = await Done.findByIdAndDelete(id);
      }
      res.status(201).json(createTodo);
    } else {
      res.status(400).json({ message: "All fields are required!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(`Error : ${error.message}`);
  }
};
const addToToDo = async (req, res) => {
  try {
    const { _id } = req.user;
    const { id } = req.params;
    const { task, removeFrom } = req.body;

    const tasks = {
      1: "BACKLOG",
      2: "INPROGRESS",
      3: "DONE",
    };
    if (task && removeFrom && _id && id) {
      const createTodo = new Todo({
        id: task.id,
        title: task.title,
        checklist: task.checklist,
        priority: task.priority,
        dueDate: task.dueDate ? task.dueDate : "",
        pureDate: task.pureDate,
        colour: task.colour,
        creater: _id,
      });
      await createTodo.save();

      if (removeFrom === tasks["1"]) {
        const deleteTask = await Backlog.findByIdAndDelete(task._id);
      } else if (removeFrom === tasks["2"]) {
        const deleteTask = await InProgress.findByIdAndDelete(task._id);
      } else {
        const deleteTask = await Done.findByIdAndDelete(task._id);
      }
      res.status(201).json(createTodo);
    } else {
      res.status(400).json({ message: "All fields are required!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(`Error : ${error.message}`);
  }
};
const addToInProgress = async (req, res) => {
  try {
    const { _id } = req.user;
    const { id } = req.params;
    const { task, removeFrom } = req.body;
    const tasks = {
      1: "BACKLOG",
      2: "TODO",
      3: "DONE",
    };
    if (task && removeFrom && _id && id) {
      const createInProgress = new InProgress({
        id: task.id,
        title: task.title,
        checklist: task.checklist,
        priority: task.priority,
        dueDate: task.dueDate ? task.dueDate : "",
        pureDate: task.pureDate,
        colour: task.colour,
        creater: _id,
      });
      await createInProgress.save();

      if (removeFrom === tasks["1"]) {
        const deleteTask = await Backlog.findByIdAndDelete(task._id);
      } else if (removeFrom === tasks["2"]) {
        const deleteTask = await Todo.findByIdAndDelete(task._id);
      } else {
        const deleteTask = await Done.findByIdAndDelete(task._id);
      }
      res.status(201).json(createInProgress);
    } else {
      res.status(400).json({ message: "All fields are required!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(`Error : ${error.message}`);
  }
};
const addToDone = async (req, res) => {
  try {
    const { _id } = req.user;
    const { id } = req.params;
    const { task, removeFrom } = req.body;

    const tasks = {
      1: "BACKLOG",
      2: "TODO",
      3: "INPROGRESS",
    };
    if (task && removeFrom && _id && id) {
      const createDone = new Done({
        id: task.id,
        title: task.title,
        checklist: task.checklist,
        priority: task.priority,
        dueDate: task.dueDate ? task.dueDate : "",
        pureDate: task.pureDate,
        colour: task.colour,
        creater: _id,
      });
      await createDone.save();

      if (removeFrom === tasks["1"]) {
        const deleteTask = await Backlog.findByIdAndDelete(id);
      } else if (removeFrom === tasks["2"]) {
        const deleteTask = await Todo.findByIdAndDelete(id);
      } else {
        const deleteTask = await InProgress.findByIdAndDelete(id);
      }
      res.status(201).json(createDone);
    } else {
      res.status(400).json({ message: "All fields are required!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(`Error : ${error.message}`);
  }
};

const editTask = async (req, res) => {
  try {
    const tasks = {
      1: "BACKLOG",
      2: "TODO",
      3: "INPROGRESS",
      4: "DONE",
    };
    const { id } = req.params;
    const { _id } = req.user;
    const { task, from } = req.body;

    if (id && _id && task && from) {
      if (from === tasks["1"]) {
        const updateTask = await Backlog.findByIdAndUpdate(
          id,
          {
            id: task.id,
            title: task.title,
            checklist: task.checklist,
            priority: task.priority,
            dueDate: task.dueDate ? task.dueDate : "",
            pureDate: task.pureDate,
            colour: task.colour,
            creater: _id,
          },
          { new: true }
        );
      } else if (from === tasks["2"]) {
        const updateTask = await Todo.findByIdAndUpdate(
          id,
          {
            id: task.id,
            title: task.title,
            checklist: task.checklist,
            priority: task.priority,
            dueDate: task.dueDate ? task.dueDate : "",
            pureDate: task.pureDate,
            colour: task.colour,
            creater: _id,
          },
          { new: true }
        );
      } else if (from === tasks["3"]) {
        const updateTask = await InProgress.findByIdAndUpdate(
          id,
          {
            id: task.id,
            title: task.title,
            checklist: task.checklist,
            priority: task.priority,
            dueDate: task.dueDate ? task.dueDate : "",
            pureDate: task.pureDate,
            colour: task.colour,
            creater: _id,
          },
          { new: true }
        );
      } else {
        const updateTask = await Done.findByIdAndUpdate(
          id,
          {
            id: task.id,
            title: task.title,
            checklist: task.checklist,
            priority: task.priority,
            dueDate: task.dueDate ? task.dueDate : "",
            pureDate: task.pureDate,
            colour: task.colour,
            creater: _id,
          },
          { new: true }
        );
      }

      res.status(201).json({ mesage: "Updated succesfully!" });
    } else {
      res.status(400).json({ message: "All fields are required!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(`Error : ${error.message}`);
  }
};
const deleteTask = async (req, res) => {
  try {
    const tasks = {
      1: "BACKLOG",
      2: "TODO",
      3: "INPROGRESS",
      4: "DONE",
    };
    const { id } = req.params;
    const { _id } = req.user;
    const { from } = req.body;

    if (id && _id && from) {
      if (from === tasks["1"]) {
        const updateTask = await Backlog.findOneAndDelete({
          $and: [{ _id: id }, { creater: _id }],
        });
      } else if (from === tasks["2"]) {
        const updateTask = await Todo.findOneAndDelete({
          $and: [{ _id: id }, { creater: _id }],
        });
      } else if (from === tasks["3"]) {
        const updateTask = await InProgress.findOneAndDelete({
          $and: [{ _id: id }, { creater: _id }],
        });
      } else {
        const updateTask = await Done.findOneAndDelete({
          $and: [{ _id: id }, { creater: _id }],
        });
      }

      res.status(201).json({ mesage: "Deleted succesfully!" });
    } else {
      res.status(400).json({ message: "All fields are required!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(`Error : ${error.message}`);
  }
};

const getUserAllCreatedTasksInfo = async (req, res) => {
  try {
    const { _id } = req.user;

    if (_id) {
      let userAllHighPriorityTasks;
      let userAllModeratePriorityTasks;
      let userAllLowPriorityTasks;

      let userAllDueDatesTasks = 0;
      const userAllTodoTasks = await Todo.find({ creater: _id });
      const userAllBacklogsTasks = await Backlog.find({ creater: _id });
      const userAllInProgressTasks = await InProgress.find({ creater: _id });
      const userAllDoneTasks = await Done.find({ creater: _id });

      userAllTodoTasks.filter(({ dueDate }) => {
        if (dueDate) {
          userAllDueDatesTasks += 1;
        }
      });
      userAllBacklogsTasks.filter(({ dueDate }) => {
        if (dueDate) {
          userAllDueDatesTasks += 1;
        }
      });
      userAllInProgressTasks.filter(({ dueDate }) => {
        if (dueDate) {
          userAllDueDatesTasks += 1;
        }
      });
      userAllDoneTasks.filter(({ dueDate }) => {
        if (dueDate) {
          userAllDueDatesTasks += 1;
        }
      });
      const highProirityTodo = await Todo.find({ priority: "high-priority" });
      const highProirityBacklog = await Backlog.find({
        $and: [{ creater: _id }, { priority: "high-priority" }],
      });
      const highProirityInProgress = await InProgress.find({
        $and: [{ creater: _id }, { priority: "high-priority" }],
      });
      const highProirityDone = await Done.find({
        $and: [{ creater: _id }, { priority: "high-priority" }],
      });

      const moderateProirityTodo = await Todo.find({
        $and: [{ creater: _id }, { priority: "moderate-priority" }],
      });
      const moderateProirityBacklog = await Backlog.find({
        $and: [{ creater: _id }, { priority: "moderate-priority" }],
      });
      const moderateProirityInProgress = await InProgress.find({
        $and: [{ creater: _id }, { priority: "moderate-priority" }],
      });
      const moderateProirityDone = await Done.find({
        $and: [{ creater: _id }, { priority: "moderate-priority" }],
      });

      const lowProirityTodo = await Todo.find({
        $and: [{ creater: _id }, { priority: "low-priority" }],
      });
      const lowProirityBacklog = await Backlog.find({
        $and: [{ creater: _id }, { priority: "low-priority" }],
      });
      const lowProirityInProgress = await InProgress.find({
        $and: [{ creater: _id }, { priority: "low-priority" }],
      });
      const lowProirityDone = await Done.find({
        $and: [{ creater: _id }, { priority: "low-priority" }],
      });
      userAllHighPriorityTasks =
        highProirityTodo.length +
        highProirityBacklog.length +
        highProirityInProgress.length +
        highProirityDone.length;

      userAllModeratePriorityTasks =
        moderateProirityTodo.length +
        moderateProirityBacklog.length +
        moderateProirityInProgress.length +
        moderateProirityDone.length;

      userAllLowPriorityTasks =
        lowProirityTodo.length +
        lowProirityBacklog.length +
        lowProirityInProgress.length +
        lowProirityDone.length;

      res.status(200).json({
        backlog: userAllBacklogsTasks.length,
        todo: userAllTodoTasks.length,
        inProgress: userAllInProgressTasks.length,
        done: userAllDoneTasks.length,
        highPriority: userAllHighPriorityTasks,
        moderatePriority: userAllModeratePriorityTasks,
        lowPriority: userAllLowPriorityTasks,
        dueDate: userAllDueDatesTasks,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export {
  createTodo,
  addToBacklog,
  addToToDo,
  addToInProgress,
  addToDone,
  editTask,
  deleteTask,
  getUserAllCreatedTasksInfo,
  getShareTask,
};
