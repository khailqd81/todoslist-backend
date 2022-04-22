const taskModel = require("../models/taskModel");

exports.getAllTasks = async (req, res, next) => {
    const tasks = await taskModel.getAllTasksByAccId(req.userId);
    const returnTasks = tasks.filter(task => !task.is_deleted);
    return res.status(200).json(returnTasks);
}

exports.updateTask = async (req, res, next) => {

    if (req.body && req.body.task) {
        const task = req.body.task;
        let newTask = {...task};
        delete newTask.task_id;
        console.log(newTask)
        const upTask = await taskModel.updateTask({
            // content: task.content,
            // deadline: task.deadline,
            // important: task.important,
            // is_finish: task.is_finish,
            // is_deleted: task.is_deleted
            ...newTask
        }, task.task_id);
        return res.status(200).json(upTask);
    } else {
        return res.status(202).json({
            message: "Empty task."
        });
    }

}

exports.addTask = async (req, res, next) => {
    console.log(req.body.task)
    if (req.body && req.body.task) {
        const newTask = {
            ...req.body.task,
            account_id: req.userId,
            date_create: new Date().toLocaleString('en-US'),
            is_finish: false,
            is_deleted: false
        }
        const addTask = await taskModel.addTask(newTask);
        return res.status(200).json(addTask);
    }
    return res.status(202).json({
        message: "Empty task."
    });
}