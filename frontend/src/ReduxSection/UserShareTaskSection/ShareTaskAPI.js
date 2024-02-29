import axios from "axios";

export const getShareTask = async (data) => {
  console.log(data);
  try {
    return await axios.get(
      `https://backend-r1sv.onrender.com/promaneger/api/tasks/get/share/task/${data.id}`
    );
  } catch (error) {
    console.log(error.message);
  }
};
