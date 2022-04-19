const express = require("express")
const router = express.Router();
const taskController = require("../controllers/taskController");

router.get("/", taskController.getAllTasks);
router.post("/add", taskController.addTask);
router.put("/update", taskController.updateTask);

module.exports = router