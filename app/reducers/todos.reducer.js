export default (todos = [], action) => {
    switch (action.type) {
        case 'CHANGE_TODOS':
            return action.todos;
        default:
            return todos;
    }
}
