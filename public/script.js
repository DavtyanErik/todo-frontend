const app = document.getElementById('app');

const state = {
    todos: [],
    inputValue: '',
    id: 0
};
const reset = () => {
    state.inputValue = '';
    state.id = 0;
}
const handleIdChange = (id, task) => {
    state.inputValue = task;
    state.id = id;
    renderTodos();
};
const handleInputChange = (e) => {
    state.inputValue = e.target.value;
};

const fetchTodos = ({ id, options }) => {
    const link = id ? `/api/todos/${id}` : `/api/todos`;
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
const deleteTodo = (id) => {
    const options = { method: 'delete' };
    fetchTodos({ id, options });
};
const postTodo = () => {
    const { inputValue: task, id } = state;
    if (!id) {
        const options = {
            method: 'post',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify({ task })
        };
        fetchTodos({ options });
    } else {
        updateTodo(id, task)
    }
};
const updateTodo = (id, task) => {
    const options = {
        method: 'put',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({ task })
    };
    fetchTodos({ id, options });
};

const Todo = ({ task, id }) => `
    <div>
        <span> ${task} </span>
        <button onclick="handleIdChange('${id}', '${task}')"> Edit </button>
        <button onclick="deleteTodo('${id}')"> Delete </button>
    </div>
`;
const TodoList = (todos) => todos.map(todo => Todo(todo)).join('');

const InputTodo = () => `
    <input value='${state.inputValue}' onchange="handleInputChange(event)" />
    <button onclick="postTodo()"> Submit </button>
`;

const View = (todos) => `${InputTodo()}${TodoList(todos)}`;

const renderTodos = () => {
    app.innerHTML = View(state.todos);
};

getTodos();
