import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import fetchTodos from '../actions/todos.action';
import changeSelected from '../actions/selected.action';
import List from './List';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Layout extends PureComponent {
    state = {
        inputValue: '',
        err: ''
    }
    componentDidMount() {
        this.props.fetchTodos({ method: 'get' });
    }
    componentWillReceiveProps({ selected }) {
        const selectedTodo = this.props.todos.find(todo => todo._id === selected);
        const inputValue = selectedTodo ? selectedTodo.text : '';
        this.setState({ inputValue, err: '' });
    }
    changeInputValue = (e) => {
        this.setState({ inputValue: e.target.value });
    }
    reset = () => {
        this.props.changeSelected(0);
    }
    submitTodo = () => {
        const { inputValue: text } = this.state;
        if (text === '') {
            this.setState({ err: 'Input can\'t be empty' });
            return;
        }
        if (!this.props.selected) {
            this.props.fetchTodos({ method: 'post', text });
        } else {
            this.props.fetchTodos({ method: 'put', text, _id: this.props.selected });
        }
        this.reset()
    }
    render() {
        return (
            <div>
                <div style={{color: 'red'}}>
                    {this.state.err}
                </div>
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
                    todos={this.props.todos}
                />
            </div>
        );
    }
}

const mapStateToProps = ({ todos, selected }) => {
    return {
       todos, selected
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        fetchTodos, changeSelected
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);