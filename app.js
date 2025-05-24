const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
const db = require('./database');
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, Node.js!');
});

app.get('/tasks', (req, res) => {
  db.all('SELECT * FROM tasks', [], (err, rows) => {
    if (err) {
      return err;
    }
    res.json(rows);
  });
});

app.post('/addtask', (req, res) => {
  const { title, description } = req.body;
  const stmt = db.prepare('INSERT INTO tasks (title, description) VALUES (?, ?)');
  stmt.run(title, description, function (err) {
    if (err) {
      console.error(err.message);
      res.status(400).send(err.message);

    } else {
      console.log(`Added task with ID ${this.lastID}`);
      res.status(201).send('Task added');
    }
  });
  stmt.finalize();


}
);

app.delete('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const stmt = db.prepare('DELETE FROM tasks WHERE id = ?');
  stmt.run(taskId, function (err) {
    if (err) {
      return res.status(500).send('Error deleting task');
    }
    if (this.changes === 0) {
      return res.status(404).send('Task not found');
    }
    res.status(200).send('Task deleted successfully');
  });
  stmt.finalize();
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

