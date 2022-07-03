import "./Header.css"

export default function Header () {
    return(
        <div className="header">
            <h1 className="center">Guess That Word</h1>
            <h3 className="center">This game is based on Jotto (a logic-oriented word game). You generate a random 5-letter word and then try to guess what that word is by typing your guess into the input box.</h3>
            <h3 className="center">The Results column will show you how many letters you got right. For example, if the random word is EARTH and you type OTHER, you will get a result of 4 (letters don't need to occur in the same position)</h3>
            <h3 id="red">* The random generated word could contain duplicate letters and could be a noun or a verb.</h3>
        </div>
    )
}