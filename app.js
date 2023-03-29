const express = require('express');
const app = express();
app.use(express.static('public'));
require ('dotenv').config();
KEY = process.env.API_KEY
// Tenor
const Tenor = require("tenorjs").client({
  // Replace with your own key
  "Key": KEY, // https://tenor.com/developer/keyregistration
  "Filter": "high", // "off", "low", "medium", "high", not case sensitive
  "Locale": "en_US", // Your locale here, case-sensitivity depends on input
});


// Middleware
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// Routes

app.get('/', (req, res) => {
  // Handle the home page when we haven't queried yet
  term = ""
  if (req.query.term) {
      term = req.query.term
      // Tenor.search.Query("SEARCH KEYWORD HERE", "LIMIT HERE")
      Tenor.Search.Query(term, "10")
      .then(response => {
        // store the gifs we get back from the search
        const gifs = response;
        // pass the gifs as an object into the home page
        res.render('home', { gifs })
      }).catch(console.error);
    }
    else {
      res.render('home', { gifs: [] })
    }
});

app.get('/greetings/:name', (req, res) => {
  const name = req.params.name;
  res.render('greetings', {name});
});



app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// AIzaSyAsaHzJNGyyZKpPo1-tfiDEuNH7GCJ3wlA