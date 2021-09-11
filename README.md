# tic-tac-toe

A JavaScript tic tac toe game for a web browser

## Description
While browsing classmates repositories for any interesting projects I came across this not quite functional version of tic tac toe. I took it upon myself to study and comment on the code line by line to understand its logic. I have brought the code into what I consider a working state but there are still some issues I have with it. Mainly that I want to have a better way of changing the styles of the boxes involved in the winning moves played. and I would like to add an 'AI' to play against some day also.

## Issues
none currently found in code :)

but I'm not sure i understand the form of object/function declaration for the 'game' and 'board' objects. it uses an arrow function declaration and is wrapped in ellipsis. and possible calls its self after it's declaration.  I must learn more about javascript obviously.

*notes:* after talking to the initial author of the code and doing some reading. I now understand that the objects/functions are using a design called "Revealing module pattern". This design choice allows for public and private methods/variables contained within objects, to avoid cluttering the global scope.

The public methods and variables are those that have been revealed through the return statement in the containing object.

The objects containing methods are declared using IIFE (Immediately invoked function expression). This takes the form of: 

` var namedObject = (function() { /*  code  */ })(); `

An IIFE, as the name implies is executed immediately after the interpreter has parsed its code, creating a local scope for its methods and variables.

The methods contained in this script also use Arrow Function declaration aka "fat arrow" functions. These were introduced in ECMAScript6 and are a short hand method for writing function expressions. ie. don't type 'function()' just '() =>' . Arrow functions allow for one line functions that automatically return the value of the one line expression. The arrow function does not require curly braces if it is a one liner.

Because the objects game and board in this script contain several lines of code each I am not sure why the fat arrow syntax was used. Possibly just out of personal taste.

![The game being a good boy!](./assets/images/app-screenshot.png)
