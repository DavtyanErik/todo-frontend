const fetchTodos = ({ _id, options }) => {
    const link = _id ? `/api/todos/${_id}` : `/api/todos`;
    return fetch(link, {
        ...options,
        headers: new Headers({'Content-Type': 'application/json'})
    })
        .then(res => {
            return res.json();
        })
        .catch(err => {
            console.log(err);
        });
};

const getTodos = () => {
    const options = { method: 'get' };
    return fetchTodos({ options });
};

const deleteTodo = (_id) => {
    const options = { method: 'delete' };
    return fetchTodos({ _id, options });
};

const postTodo = (text, _id) => {
    if (!_id) {
        const options = {
            method: 'post',
            body: JSON.stringify({ text })
        };
        return fetchTodos({ options });
    } else {
        const options = {
            method: 'put',
            body: JSON.stringify({ text })
        };
        return fetchTodos({ _id, options });
    }
};

export {getTodos, deleteTodo, postTodo};