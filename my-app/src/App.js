import React from 'react'
import './App.css'
import "bootstrap/dist/css/bootstrap.css";
import {
  Carousel,
  CarouselItem
} from 'reactstrap'

const gameOptions = [
  'Tic Tac Toe (2-Player)',
  'Tic Tac Toe (versus Computer)',
]

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      winner: '',
      turn: 'o',
      computerTurn:'x',
      board: ["", "", "", "", "", "", "", "", "",],
      activeIndex: 0,
      gameOptionsTitle:''
    }
  }

  handleClickComputer = (i) => {
   let randomIndex = Math.floor(Math.random()*9)
   const newBoard = [...this.state.board]

  //  console.log("i "+i+", randomIndex: "+ randomIndex)
  //player turn
  if (newBoard[i] == "") {
      newBoard[i]=this.state.turn
    }
  else{
    window.alert("please choose another cell")
  }

  this.setState({
    board:newBoard, 
  })

  //computer turn
  var newArray = []

  newBoard.forEach((item,index)=> {
  if(newBoard[index] == ""){
    newArray.push(newBoard[index])
  }})

   let random = Math.ceil(Math.random()*newArray.length)-1

  do{
    let random = Math.ceil(Math.random()*newArray.length)-1
    console.log("if"+random)
    if(newBoard[random]==""){
      newBoard[random] = this.state.computerTurn
      break;
    }
  }while(newBoard[random] != "")

  
  this.setState({
    board:newBoard,
  })
  console.log(newBoard)
}


  
  // tic-tac-toe functions
  handleClick = (e) => {
    console.log(e.target.id)
    const newBoard = [...this.state.board];
    newBoard[e.target.id] = this.state.turn ? 'x' : 'o';
    this.setState({
      board: newBoard,
      turn: !this.state.turn,
      //turn: 'o' ? 'o' : 'x'
    })
  }

  onExited = () => {
    this.animating = false;
  }

  onExiting = () => {
    this.animating = true;
  }

  checkWinner = (board) => {
    const winLine = [[0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]];

    for (let i = 0; i < winLine.length; i++) {
      const [a, b, c] = winLine[i];
      if (board[a] === 'o' && board[a] === board[b] && board[b] === board[c] && board[a] === board[c]) {
        return 'o';
      }
      else if (board[a] === 'x' && board[a] === board[b] && board[b] === board[c] && board[a] === board[c]) {
        return 'x';
      }
      else if (this.state.board.indexOf("") == -1 && this.state.winner === '') {
        return 'draw';
      }
    }
  }
  // page functions
  next = () => {
    const nextIndex = this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  handleNextPage = (option) => {
    this.setState({gameOptionsTitle:option})
    this.next()
  }

  previous = () => {
    const previousIndex = this.state.activeIndex - 1;
    this.setState({ activeIndex: previousIndex });
  }

  handlePreviousPage = () => {
    this.previous()
  }

  render() {
    const {activeIndex, gameOptionsTitle} = this.state
    let gameContain

    let status;
    if(this.checkWinner(this.state.board)){
      status = 'Game Over'
    }else{
      status = 'Next Player: ' + (this.state.turn? 'x':'o')
    }

   if(gameOptionsTitle == 'Tic Tac Toe (2-Player)'){
     gameContain = <div class="canvas">
    <div class="container">
    <div>{status}</div>
      <div className="row">
          <div className="col center" id="0" onClick={this.handleClick}>{this.state.board[0]}</div>  
          <div className="col center" id="1" onClick={this.handleClick}>{this.state.board[1]}</div>  
          <div className="col center" id="2" onClick={this.handleClick}>{this.state.board[2]}</div>  
      </div>
      <div className="row">
        <div className="col center" id="3" onClick={this.handleClick}>{this.state.board[3]}</div>  
        <div className="col center" id="4" onClick={this.handleClick}>{this.state.board[4]}</div>  
        <div className="col center" id="5" onClick={this.handleClick}>{this.state.board[5]}</div>  
      </div>
      <div className="row">
        <div className="col center" id="6" onClick={this.handleClick}>{this.state.board[6]}</div>  
        <div className="col center" id="7" onClick={this.handleClick}>{this.state.board[7]}</div>  
        <div className="col center" id="8" onClick={this.handleClick}>{this.state.board[8]}</div>  
      </div>
    </div>
    </div>
   }
   else if(gameOptionsTitle == 'Tic Tac Toe (versus Computer)'){
    gameContain = <div class="canvas">
      <div></div>
      <div className="row">
          <div className="col center" id="0" onClick={() => this.handleClickComputer(0)}>{this.state.board[0]}</div>  
          <div className="col center" id="1" onClick={() => this.handleClickComputer(1)}>{this.state.board[1]}</div>  
          <div className="col center" id="2" onClick={() => this.handleClickComputer(2)}>{this.state.board[2]}</div>  
      </div>
      <div className="row">
        <div className="col center" id="3" onClick={() => this.handleClickComputer(3)}>{this.state.board[3]}</div>  
        <div className="col center" id="4" onClick={() => this.handleClickComputer(4)}>{this.state.board[4]}</div>  
        <div className="col center" id="5" onClick={() => this.handleClickComputer(5)}>{this.state.board[5]}</div>  
      </div>
      <div className="row">
        <div className="col center" id="6" onClick={() => this.handleClickComputer(6)}>{this.state.board[6]}</div>  
        <div className="col center" id="7" onClick={() => this.handleClickComputer(7)}>{this.state.board[7]}</div>  
        <div className="col center" id="8" onClick={() => this.handleClickComputer(8)}>{this.state.board[8]}</div>  
      </div>
    </div>
   }

    
    return (
      <Carousel
        activeIndex={activeIndex}>
        <CarouselItem>
          <div class="canvas">
            <p>Hi, Welcome!</p>
            {gameOptions.map(option => {
              return(
                <div onClick={()=>this.handleNextPage(option)}>
                <p className="lead text-center font-weight-bold">{option}</p>
                </div>
              )
            })}
          </div>
        </CarouselItem>
          
        <CarouselItem
        onExited={this.onExited}
        onExiting={this.onExiting}>

          <div>
              <p>{gameOptionsTitle}</p>
              <div>{gameContain}</div>
              <button onClick={() => this.handlePreviousPage()}>previous</button>
          </div>
        </CarouselItem>
      </Carousel>
    );
  }
}

export default (App)


