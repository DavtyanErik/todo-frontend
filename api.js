const uuid = require('uuid/v4');
const express = require('express');

const api = express.Router();

const todos = [
    {id: uuid(), task: 'Eat'},
    {id: uuid(), task: 'Sleep'}
];

api.get('/api/todos', (req, res) => {
    res.json(todos);
});

api.post('/api/todos', (req, res) => {
    req.check('task', 'Task can\'t be empty').notEmpty();
    req.getValidationResult()
        .then(result => {
            if (result.array().length === 0) {
                const { task } = req.body;
                todos.push({ id: uuid(), task });
                res.json(todos);
            } else {
                res.end();
            }
        });
});

api.delete('/api/todos/:id', (req, res) => {
    const { id } = req.params;
    const index = todos.findIndex(todo => todo.id === id);
    todos.splice(index, 1);
    res.json(todos);
});

api.put('/api/todos/:id', (req, res) => {
    req.check('task', 'Task can\'t be empty').notEmpty();
    req.getValidationResult()
        .then(result => {
            if (result.array().length === 0) {
                const { id } = req.params;
                const index = todos.findIndex(todo => todo.id === id);
                todos[index].task = req.body.task;
                res.json(todos);
            } else {
                res.end();
            }
        });
});

module.exports = api;
