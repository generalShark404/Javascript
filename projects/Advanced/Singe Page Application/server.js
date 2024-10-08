const express = require('express');
const path = require('path');

const app = express();

app.use('/static', express.static(path.resolve(__dirname, 'ui', 'static')))

app.get('/*', (req, res) => {
    res.sendFile(path.resolve('ui', 'index.html'));
});

app.listen(process.env.PORT || 5000, () => console.log('Server running...'))