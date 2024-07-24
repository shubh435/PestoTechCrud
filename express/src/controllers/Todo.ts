import Todo from "../model/Todo";

export const getAllTodos = async (req: any,response: any)=> {
    try {
        const todoList = await Todo.find({});
        response.status(200).json({
          message: "List of available todo",
          todo: todoList,
        });
      } catch (error) {
        response.status(400).json({
          messsage: error,
        });
      }
}
export const addAllTodos = async(req: any,response: any)=> {
    const {title,description ,status} = req.body;
    const todo = new Todo({title,description ,status});
    const savedTodo = await todo.save();
    response.status(200).json({
        message: "Todo Created successfully",
        body: { todo: savedTodo },
      });
}



export const deleteAllTodos = async(req: any,res: any)=> {
    try {
        const {_id} = req.body;
        const re1s = await Todo.findByIdAndDelete({ _id });
          res
            .status(200)
            .json({ message: "Item deleted successfully", deletedItems: re1s });
    } catch (error) {
        res
        .status(400)
        .json({ message: "Something went wrong"});
    }
}



export const updateAllTodos =async (req: any,res: any)=> {
    try {
        const { _id, title, description,status } = req.body;
      const updateItem = await Todo.findByIdAndUpdate(
        { _id },
        { title, description,status }
      );
      if (!updateItem) {
        throw "Item not found";
      }
      const todo = await Todo.findById({ _id });
      res.status(200).json({
        message: "Item updated successfully ",
        updateTodo: todo,
      });
    } catch (error) {
        res
        .status(400)
        .json({ message: "Something went wrong"});
    }
}