import React from 'react';
import Header from "./Header";
import Letter from './Letter';
import './App.css';
import alphabet from './alphabet';

export default function App () {
  const [generate, setGenerate] = React.useState(0)
  const [input, setInput] = React.useState({array: ""})
  const [inputArray, setInputArray] = React.useState([])
  const [guesses, setGuesses] = React.useState(["Guesses"])
  
  const [turns, setTurns] = React.useState(["Turns"])
  
  const [result, setResult] = React.useState("a")
  const [results, setResults] = React.useState(["Results"])
  
  const [word, setWord] = React.useState([])
  const [mistake, setMistake] = React.useState(false)
  const [wrong, setWrong] = React.useState("You should only type a 5-letter word")
  
  const [definitions, setDefinitions] = React.useState([])
  const [signal, setSignal] = React.useState(0)
  
  const [signalThree, setSignalThree] = React.useState(false)
  const [seeWord, setSeeWord] = React.useState(false)
  
  const [signalTwo, setSignalTwo] = React.useState(false)
  const [seeDefinition, setSeeDefinition] = React.useState(0)
  
  const [clear, setClear] = React.useState(0)
  function handleClear () {
    setClear(prevClear => prevClear + 1)
  }
  
  function handleGenerate () {
    setGenerate(prevGenerate => prevGenerate + 1)
  }
  
  React.useEffect(() => {
    if(generate >= 1) {
      fetch("https://random-word-api.herokuapp.com/word?length=5")
      .then(res => res.json())
      .then(data => setWord(Array.from(data[0])))
      
     setInput({array: ""})
     setInputArray([])
     setGuesses(["Guesses"])
     setTurns(["Turns"])
     setResult("a")
     setResults(["Results"])
     setMistake(false)
     setWrong("You should only type a 5-letter word")
      
     setDefinitions([])
     setSignal(0) 
      
     setSignalThree(false)
     setSeeWord(false)
      
     setSignalTwo(false)
     setSeeDefinition(0)
    }
  }, [generate])
  
  
  function handleChange(event) {
    const {name, value} = event.target
    setInput({
      [name]: value
    })
    setResult('a')
  }
  React.useEffect(() => {
    setInputArray(Array.from(input.array))
  }, [input.array])
  
  
  function handleOnKeyPress(e) {
    let key = e.key;
    let countOne = 0;
    let countTwo = 0;
    if(key == "Enter") {
      if(inputArray.length > 5) {
        setMistake(true)
      }else if(inputArray.length == 5) {
        for(let i = 0; i < word.length; i++) {
          if(word.includes(inputArray[i])){
            countOne += 1;
            if(word[i] == inputArray[i]){
              countTwo += 1;
            }
          }
        }
        setTurns(prevTurns => {
          return [...prevTurns, turns.length]
        })
        setGuesses(prevGuesses => {
          return [...prevGuesses, input.array]
        })
        
        if(countOne > countTwo && countOne != 5) {
          setResult(countOne)
          setSignal(1)
        }else if(countOne == 5 && countTwo == 5) {
          setResult(5)
          setSignal(2)
        }else if(countOne == 5 && countTwo < 5){
          setResult(countOne)
          setSignal(3)
        }else if(countOne == countTwo) {
          setResult(countOne)
          setSignal(4)
        }
          
        setMistake(false)
      }
    }
  }
  React.useEffect(() => {
    if(result >= 0) {
      if(signal == 2) {
        setResults(prevResults => {
          return [...prevResults, "You WIN!!! You guessed the word correctly"]
        })
        setSignalTwo(true)
        setSignalThree(false)
      }else if(signal == 3){
        setResults(prevResults => {
          return [...prevResults, "You guessed all the letters that appear in the word correctly. Do you want to see the correct order of the word?"]
        })
        setSignalThree(true)
        setSignalTwo(false)
      }else if(signal == 1 || signal == 4) {
        setResults(prevResults => {
          return [...prevResults, result]
        })
        setSignalThree(false)
        setSignalTwo(false)
      }
    }
  }, [result, signal])
  
  function handleSeeWord() {
    setSeeWord(true)
  }
  
  function handleDefinition(){
    setSeeDefinition(prevSeeDefinition => prevSeeDefinition + 1)
  }
  
  function meanings (meaningArray) {
    for(let i = 0; i < meaningArray.length; i++) {
      setDefinitions(prevDefinitions => {
        return [...prevDefinitions, meaningArray[i].definitions[0].definition]
      })
    }
  }
  
  React.useEffect(() => {
    if(seeDefinition >= 1) {
      fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.join("")}`)
       .then(res => res.json())
       .then(data => meanings(data[0].meanings))
    }
  }, [seeDefinition])
  
  let alphabetArray = alphabet.map(letter => {
    return <Letter
             letter = {letter}
             clear = {clear}
             />
  })
  
  let turnsArray = turns.map(turn => {
    return <span>{turn}</span>
  })
  
  let guessesArray = guesses.map(guess => {
    return <span>{guess}</span>
  })
  
  let resultsArray = results.map(result => {
    return <span>{result}</span>
  })
  
  let definitionArray = definitions.map(definition => {
    return <li>{definition}</li>
  })
  
  return(
   <div className="app">
    <Header />
    <div className="game">
     <div className="containerOne">
      <button onClick={handleGenerate}>Generate A Random Word</button>
      <br/>
      <br/>
      <div className="lettersToEliminate">
        <span>Letters to eliminate: </span>
        <button onClick={handleClear}>Clear</button>
        <div className="alphabet">{alphabetArray}</div>
      </div>
      <br/>
      <label htmlFor="input">Input</label>
      <br/>
      <input
        id="input"
        type="text"
        onChange={handleChange}
        onKeyPress={handleOnKeyPress}
        name="array"
        value={input.array}
        />
      <br/>
      <br/>
      <div className="showcase">
        <div className="turns">{turnsArray}</div>
        <div className="guesses">{guessesArray}</div>
        <div className="results">{resultsArray}</div>
      </div>
      {mistake && <p>{wrong}</p>}
       
       <br/>
      {signalThree && 
        <div className="buttons">
          <button onClick={handleSeeWord}>See Generated Word</button>
          <button onClick={handleDefinition}>Search Definition</button>
        </div>}
      {signalTwo && <button onClick={handleDefinition}>Search Definition</button>}
       {seeWord && <p>Random Generated Word: <span id="word">{word}</span></p>}
       </div>
      
      <div className="containerTwo">
        {seeDefinition && 
          <div className="definitions">
            <h3 id="definition">Definition(s)</h3>
            <p id="disclaimer">*If you don't see the definition(s), please wait for a few minutes*</p>
            <ul>{definitionArray}</ul>
          </div>}
        {!seeDefinition && <div className="rules">
          <h3 id="rule">Rules</h3>
          <ul>
          <li>Press "Generate A Random Word" to generate a random word for you to guess and also to play again</li>
          <li>Press on any letters of the alphabet to cross out letters that (by deduction) cannot appear in the random generated word</li>
          <li>Press "Clear" to clear the x's on the alphabet once you're done</li>
          <li>Press "See Generated Word" to see the random generated word</li>
          <li>Press "Search Definition" to search the definition(s) of the random word if you don't know what it means</li>
          </ul>
        </div>}
      </div>
    </div>
   </div>
  )
}
