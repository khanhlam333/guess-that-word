# Guess That Word
**Guess That Word** is a game I created based on [Jotto](https://en.wikipedia.org/wiki/Jotto) (a logic-oriented game). You generate a random 5-letter word and then try to guess what that word is by typing into the input box.
The **Results** column will show you how many letters you got right. For example, if the random word is EARTH and you type OTHER, you will get a result of 4 (letters don't need to occur in the same position).
Please note that the random generated word could contain duplicate letters and could be a noun or a verb.

[React](https://reactjs.org/) was used to build **Guess That Word**, along with [Random word API](http://random-word-api.herokuapp.com/home) to generate random 5-letter words. Later on in the process, I decided to add a feature which allows the players to search for the definition of the random word since some of the random words generated from the API could be quite difficult to understand. So now the players not only can play the game but they can also learn something new each time. I used the [Free Dictionary API](https://dictionaryapi.dev/) to search for the definitions of each random generated word. 

You can play the game and discover new words [here](https://khanhlam333.github.io/guess-that-word/)
