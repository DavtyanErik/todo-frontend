import React, { PureComponent } from 'react';
import FlatButton from 'material-ui/FlatButton';

class ListElement extends PureComponent {
    render() {
        const { _id, text } = this.props.todo;
        return (
            <div>
                <span>{text}</span>
                <FlatButton
                    onTouchTap={() => this.props.editTodo(_id)}
                    label='edit'
                    primary
                />
                <FlatButton
                    onTouchTap={() => this.props.deleteTodo(_id)}
                    label='delete'
                    primary
                />
            </div>
        );
    }
}

export default ListElement;