import React, {Component} from 'react';
import './SearchTodo.css';

export default class SearchTodo extends Component {
    render(){
        return(
            <div className="form-search">
                <form>
                    <input type="search" className="field-search" onChange={this.props.handleSearch}/>
                    <button className="btn-search">Pesquisar</button>
                </form>
            </div>
        )
    }
}