import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {getTodos, deleteTodo, postTodo} from './fetcher';
import List from './List';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class App extends React.PureComponent {
    constructor(props) {
        super(props);
        injectTapEventPlugin();
        this.state = {
            todos: [],
            inputValue: '',
            selectedId: 0
        }
    }
    componentDidMount() {
        getTodos()
            .then(todos => this.reset(todos));
    }
    reset = (todos) => {
        this.setState({ inputValue: '', selectedId: 0, todos });
    }
    changeInputValue = (e) => {
        this.setState({inputValue: e.target.value});
    }
    submitTodo = () => {
        postTodo(this.state.inputValue, this.state.selectedId)
            .then(todos => this.reset(todos));
    }
    deleteTodo = (id) => {
        deleteTodo(id)
            .then(todos => this.reset(todos));
    }
    editTodo = (id) => {
        const selected = this.state.todos.find(todo => todo._id === id);
        const { _id: selectedId, text: inputValue } = selected;
        this.setState({ selectedId, inputValue });
    }
    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <TextField
                        value={this.state.inputValue}
                        onChange={this.changeInputValue}
                        name='todoInput'
                    />
                    <RaisedButton
                        onTouchTap={this.submitTodo}
                        label='submit'
                        primary
                    />
                    <List
                        todos={this.state.todos}
                        deleteTodo={this.deleteTodo}
                        editTodo={this.editTodo}
                    />
                </div>
            </MuiThemeProvider>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));