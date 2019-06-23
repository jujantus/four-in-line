import React from 'react';
import './style/App.css';
import Board from './components/Board.js';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {  data: [[0, 0, 0, 0, 0, 0, 0, 0], 
                          [0, 0, 0, 0, 0, 0, 0, 0], 
                          [0, 0, 0, 0, 0, 0, 0, 0], 
                          [0, 0, 0, 0, 0, 0, 0, 0],
                          [0, 0, 0, 0, 0, 0, 0, 0], 
                          [0, 0, 0, 0, 0, 0, 0, 0], 
                          [0, 0, 0, 0, 0, 0, 0, 0], 
                          [0, 0, 0, 0, 0, 0, 0, 0]
                        ],
                    fillings: [
                      "",
                      "https://images-na.ssl-images-amazon.com/images/I/81-yKbVND-L._SY355_.png",
                      "https://media0.giphy.com/media/l3q2K5jinAlChoCLS/giphy.gif?cid=790b76115d0a4d1b7442634759187d4c&rid=giphy.gif",
                      "https://thumbs.gfycat.com/FreeAnyIndianelephant-max-1mb.gif",
                      "https://media.tenor.com/images/fd967aeb717528e87c36a6b32e7b9b1a/tenor.gif"
                    ] };
    this.handleButtonChange = this.handleButtonChange.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.addColumn = this.addColumn.bind(this);
    this.addRow = this.addRow.bind(this);
    
  };

  render(){
    
    return (
      <div id="main">
        <Board data={this.state.data} 
               fillings = {this.state.fillings}
               handleButtonChange = {this.handleButtonChange}
               handleDrag = {this.handleDrag}/>
        <br></br>
        <input type="button" onClick={this.addColumn} value="Add Column"></input>
        <input type="button" onClick={this.addRow} value="Add Row"></input>
      </div>
    )
  };

  handleButtonChange(i,j){
    let new_data = this.state.data.map( (row) => {return [...row]} )
    let icons_qty = this.state.fillings.length - 1
    let button_state = this.state.data[i][j]
    if (button_state < icons_qty) {
      new_data[i][j] += 1
    } 
    else{
      new_data[i][j] = 0
    }
    
    this.setState({data: new_data})
  };

  handleDrag(start_i, start_j, end_i, end_j){
    let new_data = this.state.data.map( (row) => {return [...row]} )
    new_data[end_i][end_j] = new_data[start_i][start_j]
    new_data[start_i][start_j] = 0
    this.setState({data: new_data})
  }

  addColumn(){
    let new_data = this.state.data.map( (row) => {return [...row]} )
    new_data.map( (row) => {row.push(0)} )
    this.setState({data: new_data})
  }

  addRow(){
    let new_data = this.state.data.map( (row) => {return [...row]} )
    let new_row = []
    new_data[0].map( (row) => {new_row.push(0)} )
    new_data.push(new_row)
    this.setState({data: new_data})
  }

}

export default App;