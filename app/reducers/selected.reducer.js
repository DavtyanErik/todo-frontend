export default (selected = 0, action) => {
    switch (action.type) {
        case 'CHANGE_SELECTED_TODO':
            return action.id;
        default:
            return selected;
    }
}