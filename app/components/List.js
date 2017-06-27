import React, { Component } from 'react';
import ListElement from './ListElement';

class List extends Component {
    render() {
        const RenderList = this.props.todos.map(todo => 
            <ListElement
                key={todo._id}
                todo={todo}
            />
        );
        return (
            <div>
                {RenderList}
            </div>
        );
    }
}

export default List;