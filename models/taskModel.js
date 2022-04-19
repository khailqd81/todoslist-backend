const db = require('./db');
const tableName = "Tasks"
module.exports = {
    getAllTasksByAccId: async (account_id) => {
        const tasks = await db.getByValueOrder(tableName, "account_id", account_id, "task_id");
        return tasks
    },

    addTask: async (task) => {
        const addTask = await db.add(tableName, task);
        return addTask[0];
    },

    updateTask: async (task, task_id) => {
        const upTask = await db.update(tableName, task, "task_id", task_id);
        return upTask[0];
    },

    finishTask: async () => {

    },

    deleteTask: async () => {

    }
}