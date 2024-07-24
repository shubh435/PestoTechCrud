import { Router } from "express";
import { addAllTodos, deleteAllTodos, getAllTodos, updateAllTodos } from "../controllers/Todo";
const router = Router();

router.get("/get", getAllTodos);

router.post("/add", addAllTodos);

router.delete("/delete", deleteAllTodos);

router.put("/update", updateAllTodos);

export default router