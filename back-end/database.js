const sqlite3 = require('sqlite3').verbose();  

const db = new sqlite3.Database('./tasks.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// יצירת טבלה אם היא לא קיימת
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      completed BOOLEAN DEFAULT 0
    );
  `);
});

module.exports = db;



//   const express = require('express');
//   const app = express();
//   const port =3000;
  
//   const Todo = [
//     {id: 1, name: 'cleaning my room'},
//      {id: 2, name: 'leaning node.js'},
    
//   ]
  
//   app.get('/', (req, res) => {
//     res.send('Hello, Node.js!');
//   });
  
//   app.get('/todo', (req, res) => {
//     res.send(Todo);
//   });
  
  
  
//   app.listen(port, () => {
//     console.log(`Server is running at http://localhost:${port}`);
//   });
  
  