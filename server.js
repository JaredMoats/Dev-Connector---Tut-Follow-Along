const express = require('express');

const app = express();

app.get('/', (req, res) => res.send('API Running'));

//dynamically figure out which port to use
//If not port environment variable, use 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));