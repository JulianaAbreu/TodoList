import React, { Component } from 'react';
import Todo from './Todo';
import AddTodo from './AddTodo';
import './TodoList.css';


export default class TodoList extends Component {
    render() {
        let todo = this.props.todo;
        return (
            <li className="list-item">
                <div className="title-item">
                    <input value={this.props.todo.title} onChange={(e) => this.props.handleEdit(e, todo)} />
                </div>
                <ul className="todo-items">
                    {this.props.todo.todos.map(t => (
                        <li key={t.id} >
                            <input type="checkbox" defaultChecked={t.done} className="checked" onClick={(e) => this.props.handleDone(todo.id, t.id)} />
                            <input type="text" value={t.description} onChange={(e) => this.props.handleEditSubItem(e, todo.id, t.id)} className={t.done ? 'sub-item checked done' : 'sub-item checked'} />
                            <button onClick={(e) => this.props.handleDeleteSubItem(e, this.props.todo.id, t.id)}>Remove</button>
                        </li>

                    ))}
                    <AddTodo handleSubmitSubItem={this.props.handleSubmitSubItem} idTodo={todo.id} />
                    <div>
                        <button className="btn-removelist" onClick={(e) => this.props.handleDelete(e, todo.id)}>Remover</button>
                    </div>
                </ul>
            </li>
        )
    }
}



