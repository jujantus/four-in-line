import React from 'react';
import './style/App.css';
import Board from './components/Board.js';
import Modal from './components/Modal.js';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [
				[ 0, 0, 0, 0, 0, 0, 0 ],
				[ 0, 0, 0, 0, 0, 0, 0 ],
				[ 0, 0, 0, 0, 0, 0, 0 ],
				[ 0, 0, 0, 0, 0, 0, 0 ],
				[ 0, 0, 0, 0, 0, 0, 0 ],
				[ 0, 0, 0, 0, 0, 0, 0 ]
			],
			players: [],
			activePlayer: 0,
			fillings: [ '' ],
			isModalOpen: true,
			winner: null
		};
		this.handleButtonChange = this.handleButtonChange.bind(this);
		this.handleDrag = this.handleDrag.bind(this);
		// this.addColumn = this.addColumn.bind(this);
		// this.addRow = this.addRow.bind(this);
	}

	//-----------------------MÉTODOS PARA EL MODAL--------------------//
	onContinue = (player) => {
		let players = [ ...this.state.players ];
		let fillings = [ ...this.state.fillings ];
		players.push(player);
		fillings.push(player.color);
		this.setState({ players, fillings });
	};

	close = () => {
		this.setState({ isModalOpen: false });
	};
	// --------------------------------------------------------------//

	render() {
		return (
			<div id="main">
				{!!this.state.winner ? (
					<h1>GANA {this.state.winner.name}</h1>
				) : !!this.state.isModalOpen ? (
					<Modal onContinue={this.onContinue} players={2} close={this.close} />
				) : (
					<Board
						data={this.state.data}
						fillings={this.state.fillings}
						handleButtonChange={this.handleButtonChange}
						handleDrag={this.handleDrag}
					/>
				)}
			</div>
		);
	}

	findFloor = (data, row, col) => {
		let result = row;
		for (let k = row; k < data.length && data[k][col] === 0; k++) {
			result = k;
		}
		return result;
	};

	checkWinCon = (data, row, col) => {
		let value = data[row][col];

		//check diagonals
		if (
			(data[row + 1] && data[row + 1][col + 1] === value) ||
			(data[row - 1] && data[row - 1][col - 1] === value)
		) {
			let diagArray = [];
			let diagUpCol = col;
			let diagDownCol = col - 1;
			for (let diagUpRow = row; data[diagUpRow] && data[diagUpRow][diagUpCol]; diagUpRow++) {
				diagArray.push(data[diagUpRow][diagUpCol]);
				diagUpCol++;
			}
			for (let diagDownRow = row - 1; data[diagDownRow] && data[diagDownRow][diagDownCol]; diagDownRow--) {
				diagArray.unshift(data[diagDownRow][diagDownCol]);
				diagDownCol--;
			}
			//checkIfFinished
			this.gameEnded(diagArray, value);
		}
		if (
			(data[row + 1] && data[row + 1][col - 1] === value) ||
			(data[row + 1] && data[row - 1][col + 1] === value)
		) {
			let diagArray = [];
			let diagUpCol = col;
			let diagDownCol = col - 1;
			for (let diagUpRow = row; data[diagUpRow] && data[diagUpRow][diagUpCol]; diagUpRow++) {
				diagArray.push(data[diagUpRow][diagUpCol]);
				diagUpCol--;
			}
			for (let diagDownRow = row - 1; data[diagDownRow] && data[diagDownRow][diagDownCol]; diagDownRow--) {
				diagArray.unshift(data[diagDownRow][diagDownCol]);
				diagDownCol++;
			}
			this.gameEnded(diagArray, value);
		}
		//check row
		if (data[row][col - 1] === value || data[row][col + 1] === value) {
			this.gameEnded(data[row], value);
		}
		//check col
		if ((data[row - 1] && data[row - 1][col] === value) || (data[row + 1] && data[row + 1][col] === value)) {
			this.gameEnded();
		}
	};

	gameEnded = (array, value) => {
		let count = 0;
		array.forEach((el) => {
			if (el === value) {
				count++;
			} else {
				count = 0;
			}
		});

		if (count >= 4) {
			let winner = this.state.players[this.state.activePlayer];
			this.setState({ winner });
		}
	};

	handleButtonChange(i, j) {
		let data = this.state.data.map((el) => [ ...el ]);
		if (data[i][j] === 0) {
			let activePlayer = this.state.activePlayer;

			//Mete la ficha en el piso de la columna j
			data[this.findFloor(data, i, j)][j] = activePlayer + 1;

			//Pasar el turno al nextPlayer
			activePlayer = activePlayer + 1 === this.state.fillings.length - 1 ? 0 : activePlayer + 1;

			this.setState({ data, activePlayer });
		}
	}

	handleDrag(start_i, start_j, end_i, end_j) {
		// let new_data = this.state.data.map((row) => {
		// 	return [ ...row ];
		// });
		// new_data[end_i][end_j] = new_data[start_i][start_j];
		// new_data[start_i][start_j] = 0;
		// this.setState({ data: new_data });
	}

	// addColumn() {
	// 	let new_data = this.state.data.map((row) => {
	// 		return [ ...row ];
	// 	});
	// 	new_data.map((row) => row.push(0));
	// 	this.setState({ data: new_data });
	// }

	// addRow() {
	// 	let new_data = this.state.data.map((row) => {
	// 		return [ ...row ];
	// 	});
	// 	let new_row = [];
	// 	new_data[0].map((row) => new_row.push(0));
	// 	new_data.push(new_row);
	// 	this.setState({ data: new_data });
	// }
}

export default App;
