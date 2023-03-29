const express = require('express');

const app = express();


// Middleware
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// Routes

app.get('/', (req, res) => {
  console.log(req.query)
  res.render('home');
});

app.get('/greetings/:name', (req, res) => {
  const name = req.params.name;
  res.render('greetings', {name});
});



app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

