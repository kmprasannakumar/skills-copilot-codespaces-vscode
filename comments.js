// Create web server
// GET /comments
// POST /comments
// PUT /comments
// DELETE /comments

const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const comments = [
    { id: 1, comment: 'Comment 1' },
    { id: 2, comment: 'Comment 2' },
    { id: 3, comment: 'Comment 3' }
];

app.get('/comments', (req, res) => {
    res.send(comments);
});

app.post('/comments', (req, res) => {
    comments.push({ id: comments.length + 1, comment: req.body.comment });
    res.send(comments);
});

app.put('/comments/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) return res.status(404).send('The comment with the given ID was not found.');

    comment.comment = req.body.comment;
    res.send(comment);
});

app.delete('/comments/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) return res.status(404).send('The comment with the given ID was not found.');

    const index = comments.indexOf(comment);
    comments.splice(index, 1);
    res.send(comment);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});