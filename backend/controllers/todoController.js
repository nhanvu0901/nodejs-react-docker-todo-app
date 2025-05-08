const Todo = require('../models/todoModel');

// Get all todos
exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.status(200).json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({message: 'Failed to fetch todos', error: error.message});
  }
};

// Get a single todo by ID
exports.getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id);

    if (!todo) {
      return res.status(404).json({message: 'Todo not found'});
    }

    res.status(200).json(todo);
  } catch (error) {
    console.error('Error fetching todo:', error);
    res.status(500).json({message: 'Failed to fetch todo', error: error.message});
  }
};

// Create a new todo
exports.createTodo = async (req, res) => {
  try {
    // Validate request
    if (!req.body.title) {
      return res.status(400).json({message: 'Title is required'});
    }

    try {
      const todo = await Todo.create({
        title: req.body?.title,
        description: req.body?.description || '',
        completed: req.body?.completed || false,
      })
      return res.status(201).json({todo, status: 201});
    } catch (error) {
      console.log(error.message);
      res.status(400).json(
        {
          error: error.message,
          status: 400,
        }
      );
    }

  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({message: 'Failed to create todo', error: error.message});
  }
};

// Update a todo
exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id);

    if (!todo) {
      return res.status(404).json({message: 'Todo not found'});
    }

    await todo.update({
      title: req.body.title || todo.title,
      description: req.body.description || todo.description,
      completed: req.body.completed !== undefined ? req.body.completed : todo.completed
    });

    res.status(200).json(todo);
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({message: 'Failed to update todo', error: error.message});
  }
};

// Delete a todo
exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id);

    if (!todo) {
      return res.status(404).json({message: 'Todo not found'});
    }

    await todo.destroy();

    res.status(200).json({message: 'Todo deleted successfully'});
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({message: 'Failed to delete todo', error: error.message});
  }
};