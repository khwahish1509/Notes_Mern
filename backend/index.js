const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());

app.use(
    cors({
        origin: "*",
    })
);

// Routes
app.get('/', (req, res) => {
    res.json({data: 'Hello World'});

});

app.listen(8000);

module.exports = app;