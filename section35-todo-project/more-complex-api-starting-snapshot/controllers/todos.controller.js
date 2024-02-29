const Todo = require("../models/todo.model");

async function getAllTodos(req, res, next) {
  let toDos;

  try {
    toDos = await Todo.getAllTodos();
  } catch (error) {
    next(error);
  }

  res.json({
    toDos,
  });
}

async function addTodo(req, res, next) {
  const todoText = req.body.text;
  const todo = new Todo(todoText);

  let insertedId;

  try {
    const result = await todo.save(); // result의 객체에 insertedId 프로퍼티가 있는데 생성된 일정의 ObjectId 값이다.
    insertedId = result.insertedId;
  } catch (error) {
    next(error);
  }

  todo.id = insertedId.toString();

  res.json({ message: "Added todo successfully!", createdTodo: todo });
}

async function updateTodo(req, res, next) {
  const todoId = req.params.id;
  const newText = req.body.text;

  const todo = new Todo(newText, todoId);

  try {
    await todo.save();
  } catch (error) {
    next(error);
  }

  res.json({ message: "Todo Updated Sussess!", updatedTodo: todo });
}

async function deleteTodo(req, res, next) {
  const todoId = req.params.id;

  const todo = new Todo(null, todoId);

  try {
    await todo.delete();
  } catch (error) {
    next(error);
  }

  res.json({ message: "Todo Deleted Success!" });
}

module.exports = {
  getAllTodos,
  addTodo,
  updateTodo,
  deleteTodo,
};
