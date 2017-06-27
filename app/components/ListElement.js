import React, { PureComponent } from 'react';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import changeSelected from '../actions/selected.action';
import fetchTodos from '../actions/todos.action';

class ListElement extends PureComponent {
    render() {
        const { _id, text } = this.props.todo;
        return (
            <div>
                <span>{text}</span>
                <FlatButton
                    onTouchTap={() => this.props.changeSelected(_id)}
                    label='edit'
                    primary
                />
                <FlatButton
                    onTouchTap={() => this.props.fetchTodos({ method: 'delete', _id })}
                    label='delete'
                    primary
                />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        changeSelected, fetchTodos
    }, dispatch)
}

export default connect(null, mapDispatchToProps)(ListElement);