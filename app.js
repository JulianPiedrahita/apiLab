const express = require('express');
const {Client} = require('pg');

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3050;

const app = express();

app.use(bodyParser.json());

// postgres
const connectionData ={
  host: 'fanny.db.elephantsql.com',
  user: 'gtbwgmaq',
  password: 'L1152IzJpGq2gtBcMNxckKUDi61V-_dx',
  database: 'gtbwgmaq'
}

const client = new Client(connectionData)

// Route
app.get('/', (req, res) => {
  res.send('Welcome to my API!');
  const sql = 'SELECT * FROM customers';

  client.query(sql, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.json(results);
    } else {
      res.send('Not result');
    }
  });
});

// all customers
app.get('/customers', (req, res) => {
  const sql = 'SELECT * FROM customers';

  client.query(sql, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.json(results);
    } else {
      res.send('Not result');
    }
  });
});

app.get('/customers/:id', (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM customers WHERE id = ${id}`;
  client.query(sql, (error, result) => {
    if (error) throw error;

    if (result.length > 0) {
      res.json(result);
    } else {
      res.send('Not result');
    }
  });
});

app.post('/add', (req, res) => {
  const sql = 'INSERT INTO customers SET ?';

  const customerObj = {
    name: req.body.name,
    city: req.body.city
  };

  client.query(sql, customerObj, error => {
    if (error) throw error;
    res.send('Customer created!');
  });
});

app.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const { name, city } = req.body;
  const sql = `UPDATE customers SET name = '${name}', city='${city}' WHERE id =${id}`;

  client.query(sql, error => {
    if (error) throw error;
    res.send('Customer updated!');
  });
});

app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM customers WHERE id= ${id}`;

  client.query(sql, error => {
    if (error) throw error;
    res.send('Delete customer');
  });
});



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
