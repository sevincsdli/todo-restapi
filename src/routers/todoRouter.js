const router = require("express").Router();
const {todoAdd, todoGetAll, todoUpdate, todoDelete, todoGet} =
  require("../controllers/todoController.js");
router.post("/add", todoAdd);
router.get("/get/:id", todoGet);
router.get("/getall", todoGetAll);
router.delete("/delete/:id", todoDelete);
router.put("/update/:id", todoUpdate);
module.exports =router;
