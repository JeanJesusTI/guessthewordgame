import { useState, useRef } from 'react'
import './Game.css'

const Game = ({
  verifyLetter,
  letters,
  guessedLetters,
  guesses,
  score,
  usedLetters,
  setUsedLetters,
  pickedCategory
}) => {

  const [typedLetter, setTypedLetter] = useState("");
  const letterInputRef = useRef();
  


  const handleSubmitLetter = (e) => {
    e.preventDefault()
    verifyLetter(typedLetter)
    setUsedLetters([...usedLetters, typedLetter])
    setTypedLetter("")
    console.log("UTILIZADA:");
    //console.log(usedLetters);
    letterInputRef.current.focus()
  }

  return (

    <div className="game">
      <p className="points">
        <span>Score: {score}</span>
      </p>
      <h1>Guess The word!</h1>
      <h3 className="tip"> Tip of the word: <span>{pickedCategory}</span></h3>
      <p>You still have {guesses} guesses!</p>
      <div className="wordContainer">
        {
          letters.map((letter, i) =>
          guessedLetters.includes(letter) ? (
              <span key={i} className='letter'>
                {letter}
              </span>
            ) : (
              <span key={i} className="blankSquare"></span>
            )

          )
        }

      </div>

      <div className="letterContainer">
        <p>Try to gess the word:</p>

        <form onSubmit={handleSubmitLetter}>
          <input
            type="text"
            name="letter"
            maxLength="1"
            required
            value={typedLetter}
            onChange={(e) => setTypedLetter(e.target.value)}
            ref={letterInputRef}
          />
          <button>Send</button>
        </form>
        <div className="wrongLettersContainer">
          <p>Already used:</p>
          {
            usedLetters.map((item, index)=>(
              <span key={index}>{item},</span>
            ))
          }
          
        </div>
      </div>
    </div>
  )
}

export default Game