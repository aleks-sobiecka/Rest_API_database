const express = require('express');
//const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//app.use(cors());
/* app.use(cors({
    "origin": "https://kodilla.com", //origin sets domains that we approve
    "methods": "GET,POST", //we allow only GET and POST methods
})); */


const db = [
    { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
    { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
    { id: 3, author: 'Some Author', text: 'Some testimonial text.' },
];

app.get('/testimonials', (req, res) => {
    res.json(db);
});

app.get('/testimonials/random', (req, res) => {
    const randomIndex = Math.floor(Math.random() * db.length);
    const randomTestimonial = db[randomIndex];
    res.json(randomTestimonial);
  });

app.get('/testimonials/:id', (req, res) => {
    const testimonial = db.find(entry => entry.id === parseInt(req.params.id));
    if (testimonial) {
        res.json(testimonial);
    } else {
        res.status(404).json({ message: 'Testimonial not found' });
    }
});

app.post('/testimonials', (req, res) => {
    const { author, text } = req.body;

    if (!author || !text) {
        res.status(400).json({ message: 'Author and text are required' });
    } else {
        const newTestimonial = {
            id: uuidv4(),
            author,
            text,
        };
        db.push(newTestimonial);
        res.json({ message: 'OK' });
    }
});

app.put('/testimonials/:id', (req, res) => {
    const { author, text } = req.body;

    const testimonial = db.find(entry => entry.id === parseInt(req.params.id));
    if (!testimonial) {
        res.status(404).json({ message: 'Testimonial not found' });
    } else {
        if (author) testimonial.author = author;
        if (text) testimonial.text = text;
        res.json({ message: 'OK' });
    }
});

app.delete('/testimonials/:id', (req, res) => {
    const index = db.findIndex(entry => entry.id === parseInt(req.params.id));
    if (index === -1) {
        res.status(404).json({ message: 'Testimonial not found' });
    } else {
        db.splice(index, 1);
        res.json({ message: 'OK' });
    }
});

app.use((req, res) => {
    res.status(404).json({ message: 'Not found...' });
});

app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});