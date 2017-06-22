const express = require('express');
const mongoose = require('mongoose');
require('./TodoScheme');
const Todo = mongoose.model('Todo');

const api = express.Router();

const sendTodos = (res, userId) => {
    Todo.find({ userId })
        .then(todos => {
            res.json(todos);
        });
};

api.get('/api/todos', (req, res) => {
    sendTodos(res, req.cookies.userId);
});

api.post('/api/todos', (req, res) => {
    req.check('text', 'Task can\'t be empty').notEmpty();
    req.getValidationResult()
        .then(result => {
            if (result.array().length === 0) {
                const { body: { text }, cookies: { userId } } = req;
                const newTodo = new Todo({
                    text,
                    userId
                });
                newTodo.save()
                    .then(() => sendTodos(res, userId));
                } else {
                res.end();
            }
        });
});

api.delete('/api/todos/:_id', (req, res) => {
    const { _id } = req.params;
    Todo.remove({ _id })
        .then(() => sendTodos(res, req.cookies.userId));
});

api.put('/api/todos/:_id', (req, res) => {
    req.check('text', 'Task can\'t be empty').notEmpty();
    req.getValidationResult()
        .then(result => {
            if (result.array().length === 0) {
                const { _id } = req.params;
                const { text } = req.body;
                Todo.update({ _id }, {$set: { text }})
                    .then(() => sendTodos(res, req.cookies.userId));
            } else {
                res.end();
            }
        });
});

module.exports = api;
