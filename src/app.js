const express = require('express');

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

const app = express();
app.use(express.json());

const ALLOWED_STATUSES = ['todo', 'in-progress', 'done'];

let tasks = [
  {
    id: 1,
    title: 'Prepare GitHub workshop',
    description: 'Finish the slides',
    status: 'todo'
  },
  {
    id: 2,
    title: 'Write CI workflow',
    description: 'Configure GitHub Actions',
    status: 'in-progress'
  },
  {
    id: 3,
    title: 'Review Pull Request',
    description: 'Review teammate changes',
    status: 'done'
  }
];

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// GET /tasks avec filtre par statut (Feature A)
app.get('/tasks', (req, res) => {
  const { status } = req.query;

  if (status) {
    const filteredTasks = tasks.filter((item) => item.status === status);
    return res.json(filteredTasks);
  }

  return res.json(tasks);
});

// GET /tasks/:id
app.get('/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((item) => item.id === id);

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  return res.json(task);
});

// POST /tasks avec validations (Feature C)
app.post('/tasks', (req, res) => {
  const { title, description, status = 'todo' } = req.body || {};

  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }

  if (title.length > 100) {
    return res.status(400).json({ error: 'Title must be less than 100 characters' });
  }

  if (!ALLOWED_STATUSES.includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  const task = {
    id: tasks.length ? Math.max(...tasks.map((item) => item.id)) + 1 : 1,
    title: title.trim(),
    description: description || '',
    status
  };

  tasks.push(task);
  return res.status(201).json(task);
});

// DELETE /tasks/:id (Feature E)
app.delete('/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  const taskIndex = tasks.findIndex((item) => item.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  tasks.splice(taskIndex, 1);
  return res.status(204).send();
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Task API listening on port ${PORT} in ${NODE_ENV} mode`);
  });
}

module.exports = { app };