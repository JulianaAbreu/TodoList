import React, { Component } from 'react';
import './AddTodo.css';
export default class AddTodo extends Component {
    
    constructor(){
        super();

        this.state = {
            value:''
        }
    }
    
    submitItem (e){
        e.preventDefault();

        this.props.handleSubmitSubItem(this.state.value, this.props.idTodo);

        this.setState({
            value:''
        })
    } 

    handleChange(e){
        this.setState({
            value: e.target.value
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={(e)=> this.submitItem(e)}> 
                    <input type="text" className="add-todo" onChange={(e)=> this.handleChange(e)} value={this.state.value} className="add-subitem"/>
                </form>
            </div>
        )
    }
}