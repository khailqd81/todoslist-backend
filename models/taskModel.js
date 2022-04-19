const db = require('./db');
const tableName = "Tasks"
module.exports = {
    getAllTasksByAccId: async (account_id) => {
        const tasks = await db.getByValue(tableName,"account_id",account_id);
        return tasks
    },

    addTask: async (task) => {
        const addTask = await db.add(tableName,task);
        return addTask;
    },

    updateTask: async (task, task_id) => {
        const upTask = await db.update(tableName, task, "task_id", task_id);
        return upTask;
    },

    finishTask: async () => {

    },

    deleteTask: async () => {

    }
}