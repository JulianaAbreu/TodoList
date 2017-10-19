import React, { Component } from 'react';
import logo from './logo.svg';
import TodoList from './components/TodoList';
import Navbar from './components/Navbar';
import SearchTodo from './components/SearchTodo';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleDeleteSubItem = this.handleDeleteSubItem.bind(this);
    this.handleDone = this.handleDone.bind(this);

    this.state = {
      todo: [],
      searchText: ''

    };
  }

  componentDidMount() {
    fetch('https://private-f0cf3-tweet.apiary-mock.com/todolists').then(response => response.json()).then((responseData) => {
      this.setState({
        todo: responseData
      });
    })
      .catch(error => {
        console.log('Error', error);
      })
  }

  handleChange(e) {
    console.log(e.target.value)
    this.setState({
      title: e.target.value
    })
  }
  handleSubmit(e) {
    e.preventDefault();

    const newTodo = {
      id: Date.now(),
      title: this.state.title,
      todos: []
    }
    this.setState((prevTodo) => ({
      todo: this.state.todo.concat(newTodo)
    }));
    console.log(newTodo);
  }

  handleSubmitSubItem(description, idTodo) {
    const todo = this.state.todo;
    const indexTodo = todo.findIndex((j) => j.id == idTodo);

    const newSubTodo = {
      id: Date.now(),
      description: description,
      done: false
    }

    /* const todos = todo[indexTodo].todos.concat(newSubTodo); */
    const todos = [...todo[indexTodo].todos, newSubTodo];
    const newTodo = todo.map((t) => {
      if (t.id == idTodo) {
        t.todos = todos;
      }
      return t;
    });
    this.setState({
      todo: newTodo
    });

  }

  handleDeleteSubItem(e, idTodo, idTodos) {
    e.preventDefault();
    let todo = this.state.todo;
    let indexTodo = todo.findIndex((f) => f.id == idTodo);
    let todos = todo[indexTodo].todos;

    const indexTodos = todos.findIndex((a) => a.id == idTodos);

    todos.splice(indexTodos, 1);

    const newTodo = todo.map((t) => {
      if (t.id == idTodo) {
        t.todos = todos;
      }
      return t;
    });

    this.setState({
      todo: newTodo
    })
  }

  handleEditSubItem(e, idTodo, idTodos) {
    e.preventDefault();
    let todo = this.state.todo;
    let indexTodo = todo.findIndex((f) => f.id == idTodo);

    const newDescription = todo[indexTodo].todos.map((t) => {
      if (t.id == idTodos) {
        t.description = e.target.value;
      }
      return t;
    })
    const newTodo = todo.map((g) => {
      if (g.id == idTodo) {
        g.todos = newDescription;
      }
      return g;
    })

    this.setState({
      todos: newTodo
    })

  }

  handleDone(idTodo, idTodos) {
    let todo = this.state.todo;
    let indexTodo = todo.findIndex((g) => g.id == idTodo);
    let todos = todo[indexTodo].todos.map((t) => {
      if(t.id == idTodos){
        t.done = !t.done;
      }
      return t; 
    })
    
    let list = todo.map((l) => {
      if(l.id == idTodo){
        l.todos = todos
      }
      return l;
    })
    
    this.setState({
      todo:list
    });
    console.log(idTodo);
  }

  handleDelete(e, id) {
    e.preventDefault();
    let todo = this.state.todo;
    let card = this.state.todo.findIndex((i) => i.id == id)

    todo.splice(card, 1);

    this.setState({
      todo
    })

  }
  handleEdit(e, cardParam) {
    let card = this.state.todo.map((card) => {
      if (card.id == cardParam.id) {
        card.title = e.target.value;
      }
      return card;
    })
    this.setState({
      todo: card
    })
  }

  handleSearch(e) {
    e.preventDefault();
    const { value } = e.target;

    this.setState({
      searchText: value
    })
  }


  render() {
    console.log(this.state.todo);
    return (
      <div className="App">
        <Navbar />
        <SearchTodo handleSearch={this.handleSearch.bind(this)} />
        <div className="all-items">
          <ul className="todo-list">
            {this.state.todo.map(todo => (
              <TodoList handleEditSubItem={this.handleEditSubItem.bind(this)}
                handleSubmitSubItem={this.handleSubmitSubItem.bind(this)}
                todo={todo} key={todo.id} handleDelete={this.handleDelete.bind(this)}
                handleEdit={this.handleEdit.bind(this)} searchText={this.state.searchText}
                handleDone={this.handleDone.bind(this)}
                handleDeleteSubItem={this.handleDeleteSubItem.bind(this)} />
            ))}

          </ul>
        </div>
        <a href="#openModal" className="float">
          <img src=""/>
        </a>

        <div id="openModal" className="modalDialog">
          <div>	<a href="#close" title="Close" className="close">X</a>
            <div className="form-todo">
              <form onSubmit={this.handleSubmit} >
                <input type="text" className="field-add" onChange={(e) => this.handleChange(e)} />
                <a href="#close" >
                  <button className="btn-add">Add</button>
                </a>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
