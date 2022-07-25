// css
import './App.css';

//React
import { useEffect, useState, useCallback } from 'react';

//components
import StartPage from './components/StartPage/StartPage';
import Game from './components/Game/Game';
import GameOver from './components/GameOver/GameOver';

//data
import { wordsList } from './data/wordsList';

const stages = [
  { id: 1, name: 'start' },
  { id: 2, name: 'game' },
  { id: 1, name: 'end' }
]

const guessesQty = 10;

function App() {

  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words, setWords] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [letters, setLetters] = useState([]);
  const [pickedCategory, setPickedCategory] = useState("")

  const [usedLetters, setUsedLetters] = useState([])

  const [guessedLetters, setGessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(guessesQty)
  const [score, setScore] = useState(100)

  const clearLettersSate = () =>{
    setGessedLetters([])
    setWrongLetters([])
  }

  // Check lose condiction
  useEffect(()=>{
    if(guesses <= 0){
      setGameStage(stages[2].name)

      // Clearing state after gameOver
      clearLettersSate()
    }
  },[guesses])

  const startGame = useCallback(() => {
    clearLettersSate()
    // picking word and category
    const { word, category } = pickWordAndCategory();

    // creating array of letters
    const wordLetters = word.split("");

    setLetters(wordLetters);
    setGameStage(stages[1].name)
  },[])

  // Check win condiction
  useEffect(()=>{
    const uniqueLetters = [...new Set(letters)]

    //win condiction
      if(guessedLetters.length === uniqueLetters.length && uniqueLetters != 0){
        //add score
        setScore((actualScore)=>actualScore+=100)

        setTimeout(() => {
          // start game to call another word
          setUsedLetters([])
          startGame();
        }, 350);
        
  
      }


  },[guessedLetters, letters, startGame])

  const pickWordAndCategory = useCallback(() => {
    // picking a random category
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]
    setPickedCategory(category)

    //picking a random word
    const word = words[category][Math.floor(Math.random() * words[category].length)].toLowerCase()
    return { word, category };
  },[])

  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();

    //Checking if letter has already been utilized
    if(guessedLetters.includes(letter) || wrongLetters.includes(letter)){
      return;
    }

    // push guessed letter or remove a guess
    if(letters.includes(normalizedLetter)){
      setGessedLetters((actualGuessedLetters)=>[
        ...actualGuessedLetters, normalizedLetter
      ])
    }else{
      setWrongLetters((actualWrongLetters)=>[
        ...actualWrongLetters, normalizedLetter
      ])

      setGuesses((actualGuesses) => actualGuesses -1)
    }

  }

  const retry = () => {
    setGameStage(stages[0].name)
    setScore(0)
    setGuesses(guessesQty)
  }

  return (
    <div className="App">
      {gameStage === 'start' && <StartPage startGame={startGame} />}
      {gameStage === 'game' &&
        <Game verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
          usedLetters={usedLetters}
          setUsedLetters={setUsedLetters}
          letters={letters}
        />}
      {gameStage === 'end' && <GameOver retry={retry} score={score} />}
    </div>
  );
}

export default App;