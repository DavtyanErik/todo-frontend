const fetchTodos = ({ _id, options }) => {
    const link = _id ? `http://localhost:8081/api/todos/${_id}`
        : `http://localhost:8081/api/todos`;
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

const syncTodos = (todos) => {
    return {
        type: "CHANGE_TODOS",
        todos
    }
}

export default ({ method, _id, text}) => dispatch => {
    const options = text ? { method, body: JSON.stringify({ text }) } : { method };
    fetchTodos({ options, _id })
        .then(todos => {
            dispatch(syncTodos(todos));
        });
}