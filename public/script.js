const app = document.getElementById('app');

const fetchTodos = ({ id, options }) => {
    const link = id ? `/api/todos/${id}` : `/api/todos`;
    fetch(link, options)
        .then(res => {
            return res.json();
        })
        .then(todos => {
            renderTodos(todos);
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
const postTodo = (task) => {
    const options = {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify(task)
    };
    fetchTodos({ options });
};
const updateTodo = (id, task) => {
    const options = { method: 'put', body };
    fetch({ id, options });
};

const Todo = ({ task, id }) => `
    <div>
        <span> ${task} </span>
        <button> Edit </button>
        <button onclick="deleteTodo('${id}')"> Delete </button>
    </div>
`;
const TodoList = (todos) => todos.map(todo => Todo(todo)).join('');

const InputTodo = () => `
    <input name='newTodo' />
    <button onclick="postTodo('${74}')"> Submit </button>
`;

const View = (todos) => `${InputTodo()}${TodoList(todos)}`;


const renderTodos = (todos) => {
    app.innerHTML = View(todos);
};

getTodos();
