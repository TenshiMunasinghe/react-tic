import React, {Component} from "react";
import Grid from "./Grid";

class GameBoard extends Component {
	state = {
		gridContent: ["", "", "", "", "", "", "", "", ""],
		currentPlayer: "X",
		gameOver: false,
		result: "",
		winningGrid: []
	};

	winningCombos = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	];

	componentDidUpdate = () => {
		const {gridContent, gameOver} = this.state;
		if (gameOver) {
			return;
		}
		let breakLoop = false;
		this.winningCombos.forEach(e => {
			if (
				gridContent[e[0]] === gridContent[e[1]] &&
				gridContent[e[0]] === gridContent[e[2]] &&
				gridContent[e[0]] !== ""
			) {
				breakLoop = true;
				this.setState(prev => {
					let winningGrid = [...prev.winningGrid];
					winningGrid[0] = e[0];
					winningGrid[1] = e[1];
					winningGrid[2] = e[2];
					return {result: gridContent[e[0]], gameOver: true, winningGrid};
				});
			}
			if (gridContent.every(e => e !== "") && !breakLoop) {
				this.setState({result: "tie", gameOver: true});
			}
		});
	};

	handleChange = e => {
		let {id} = e.target;
		let {currentPlayer, gridContent, gameOver} = this.state;
		if (gridContent[id] !== "" || gameOver) {
			return;
		}
		if (currentPlayer === "X") {
			this.setState(prev => {
				let gridContent = [...prev.gridContent];
				gridContent[id] = "X";
				return {gridContent, currentPlayer: "O"};
			});
		} else {
			this.setState(prev => {
				let gridContent = [...prev.gridContent];
				gridContent[id] = "O";
				return {gridContent, currentPlayer: "X"};
			});
		}
	};

	handleReset = () => {
		this.setState(prev => {
			let gridContent = prev.gridContent.map(e => "");
			let winningGrid = prev.winningGrid.map(e => "");
			return {
				gridContent,
				currentPlayer: "X",
				gameOver: false,
				result: false,
				winningGrid
			};
		});
	};

	render() {
		const {
			gridContent,
			gameOver,
			result,
			currentPlayer,
			winningGrid
		} = this.state;

		let mainContent = gridContent.map((e, i) => {
			return (
				<Grid
					key={i}
					id={i}
					content={gridContent[i]}
					handleChange={this.handleChange}
					won={winningGrid.includes(i)}
				/>
			);
		});

		return (
			<React.Fragment>
				{!gameOver && <h2 id='turns'>{currentPlayer}'s turn</h2>}
				{gameOver && (
					<h2 id='result'>{result === "tie" ? "Tie" : `${result} wins`}</h2>
				)}
				<div id='grid-container'>{mainContent}</div>
				{gameOver && <button onClick={this.handleReset}>Reset</button>}
			</React.Fragment>
		);
	}
}

export default GameBoard;
