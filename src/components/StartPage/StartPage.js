import './StartPage.css'

const StartPage = ({ startGame }) => {
  return (
    <div className="start">
        <h1>Guess The Word!</h1>
        <p>Click in the button bellow to start the game</p>
        <button onClick={startGame}>Start Game</button>
    </div>
  )
}

export default StartPage