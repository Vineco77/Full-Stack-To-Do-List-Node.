const tasksModel = require("../models/tasksModel");
const redisClient = require("../redisClient");

const getAll = async (_request, response) => {
  try {
    const cachedTasks = await redisClient.get("tasks");

    if (cachedTasks) {
      return response.status(201).json(JSON.parse(cachedTasks));
    }

    const tasks = await tasksModel.getAll();

    await redisClient.setEx("tasks", 3600, JSON.stringify(tasks));
    return response.status(200).json(tasks);
  } catch (error) {
    console.error(error);

    return response.status(500).json({ message: "Internal Server Error" });
  }
};

const createTask = async (request, response) => {
  const createdTask = await tasksModel.createTask(request.body);

  await redisClient.del("tasks");

  return response.status(201).json(createdTask);
};

const deleteTask = async (request, response) => {
  const { id } = request.params;

  await tasksModel.deleteTask(id);

  await redisClient.del("tasks");
  return response.status(204).json();
};

const updateTask = async (request, response) => {
  const { id } = request.params;

  await tasksModel.updateTask(id, request.body);

  await redisClient.del("tasks");

  return response.status(204).json();
};

module.exports = {
  getAll,
  createTask,
  deleteTask,
  updateTask,
};
