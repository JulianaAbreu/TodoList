import React, { Component } from 'react';

export default class Todo extends Component {
    render() {
        return (
            <li className="todo-wrap">
                <label>
                    <input type="text" />
                    
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </label>
            </li>
        )
    }
}


