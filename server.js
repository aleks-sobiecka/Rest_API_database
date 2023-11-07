const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();

// import routes
const testimonialRoutes = require('./routes/testimonials.routes');
const concertRoutes = require('./routes/concerts.routes');
const seatRoutes = require('./routes/seats.routes');

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
/* app.use(cors({
    "origin": "https://kodilla.com", //origin sets domains that we approve
    "methods": "GET,POST", //we allow only GET and POST methods
})); */
app.use('/api', testimonialRoutes); // add testimonials routes to server
app.use('/api', concertRoutes); // add concert routes to server
app.use('/api', seatRoutes); // add seat routes to server

// catching bad links
app.use((req, res) => {
    res.status(404).json({ message: 'Not found...' });
});

app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});