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
	findFloor = (data, row, col) => {
		let result = row;
		for (let k = row; k < data.length && data[k][col] === 0; k++) {
			result = k;
		}
		return result;
	};

	checkLine = (data, row, col, vrow, vcol) => {
		let activePlayer = this.state.activePlayer;
		let value = data[row][col];
		let count = 1;

		for (let r = row + vrow, c = col + vcol; data[r] && data[r][c] === value; r = r + vrow, c = c + vcol) {
			count++;
		}
		for (let r = row - vrow, c = col - vcol; data[r] && data[r][c] === value; r = r - vrow, c = c - vcol) {
			count++;
		}
		if (count >= 4) {
			let winner = this.state.players[this.state.activePlayer];
			this.setState({ winner });
		} else {
			activePlayer = activePlayer + 1 === this.state.fillings.length - 1 ? 0 : activePlayer + 1;
			this.setState({ activePlayer });
		}
	};

	handleButtonChange = (i, j) => {
		let data = this.state.data.map((el) => [ ...el ]);
		if (data[i][j] === 0) {
			let activePlayer = this.state.activePlayer;

			//Mete la ficha en el piso de la columna j
			let newi = this.findFloor(data, i, j);
			data[newi][j] = activePlayer + 1;
			this.setState({ data }, () => {
				this.checkLine(this.state.data, newi, j, 0, 1);
				this.checkLine(this.state.data, newi, j, 1, 0);
				this.checkLine(this.state.data, newi, j, -1, 1);
				this.checkLine(this.state.data, newi, j, 1, 1);
			});
		}
	};

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
}

export default App;
