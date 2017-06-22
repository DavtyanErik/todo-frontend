const app = document.getElementById('app');

const state = {
    todos: [],
    inputValue: '',
    _id: 0,
    err: false
};
const reset = () => {
    state.inputValue = '';
    state._id = 0;
    state.err = false;
}
const handleIdChange = (_id, text) => {
    state.inputValue = text;
    state._id = _id;
    renderTodos();
};
const handleInputChange = (e) => {
    state.inputValue = e.target.value;
};

const fetchTodos = ({ _id, options }) => {
    const link = _id ? `/api/todos/${_id}` : `/api/todos`;
    reset();
    fetch(link, options)
        .then(res => {
            return res.json();
        })
        .then(todos => {
            state.todos = todos;
            renderTodos();
        })
        .catch(err => {
            console.log(err);
        });
};

const getTodos = () => {
    const options = { method: 'get' };
    fetchTodos({ options });
};
const deleteTodo = (_id) => {
    const options = { method: 'delete' };
    fetchTodos({ _id, options });
};
const postTodo = () => {
    const { inputValue: text, _id } = state;
    if (state.inputValue === '') {
        state.err = true;
        renderTodos();
        return;
    }
    if (!_id) {
        const options = {
            method: 'post',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify({ text })
        };
        fetchTodos({ options });
    } else {
        updateTodo(_id, text)
    }
};
const updateTodo = (_id, text) => {
    const options = {
        method: 'put',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({ text })
    };
    fetchTodos({ _id, options });
};

const Todo = ({ text, _id }) => `
    <div>
        <span> ${text} </span>
        <button onclick="handleIdChange('${_id}', '${text}')"> Edit </button>
        <button onclick="deleteTodo('${_id}')"> Delete </button>
    </div>
`;
const TodoList = (todos) => todos.map(todo => Todo(todo)).join('');

const InputTodo = () => `
    <input value='${state.inputValue}' onchange="handleInputChange(event)" />
    <button onclick="postTodo()"> Submit </button>
`;

const ErrorMessage = () => state.err ? `<p> Input can't be empty </p>` : `<div></div>`;

const View = (todos) => `
    ${ErrorMessage()}
    ${InputTodo()}
    ${TodoList(todos)}
`;

const renderTodos = () => {
    app.innerHTML = View(state.todos);
};

getTodos();
