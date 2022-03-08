# Notes for Javascript
## Node
- Node is an interpretor that allows us to run javascript code on our computers, outside browsers
- javascript on browser has access to the HTML document/window, but Node does not.

## Fundamentals
- ECMAScript (ES5, ES6, etc) is a standard for JS, with each version building on top of each other (supersets)
  - Other JS-related languages such as TypeScript and CoffeeScript are supersets of EMCAScript (builds on top)
- Debugging & Errors
  - Syntax errors: the code will **NOT** run as the interpretor found invalid JavaScript that it cannot parse
    - Errors will provide the line number the parser errored on, the error is usually on or before the given line
  - Runtime errors: the code runs, but an error happens (sometimes also known as Bugs)
- Scope
  - Variables that persist throughout the document is in global scope
    - Global scope always exists
  - Variables that only exist in a limited scope is in local scope
    - Local scopes are created within functions
    - For/While loops do not create scopes
  - If we attempt to create another variable with the same name as an existing variable, we will get an error
    ```js
    var num = 3
    var num = 5 // will give us an error
    ```
  - `const` and `let`
    - introduced in ES6
    - allows for block scoping
      - even within the same scope, we won't get an error if two variables with the same name were created in different blocks (in different for/while loops)
      - however, now the variable is not accessible anywhere outside the scope (variable disappears outside a for loop)
    ```js
    for (let index = 0; index < names.length; index++) {
    const name = names[index];

    console.log(name + ' was found at index ' + index);
    }
    // index and name do not exist here anymore
    ```
- Hoisting
  - ALL variable declarations within a scope "floats" up to the start of the scope
    - value assignments stay where they are
    - variable declarations within a function gets hoisted to the start of the function
  - `var` variables are initialized with `undefined`, and is thus accessible before assignment (no errors, but value is undefined)
  - `let` and `const` variables are **NOT** initialized
    - attempting to access these variables before value assignment will result in error
  - if a function is declared starting with `function` keyword, the function will be hoisted to the top
    - ex: `function funcName() {}`
    - thus, it is possible to call a function that is defined later in the file.
  - if a function is declared like a variable, the variable declaration is hoisted to the top, but the function itself will not
    - ex: `var funcName = function () {}`
    - attempting to call funcName() before it is assigned will result in error: funcName is not a function
- Destructuring
  - another way of creating variables from items of objects and arrays
  - if we are getting data from an object, we wrap the variable names in `{}`
  - if we are getting data from an array, we wrap the variable names in `[]`
  - we can obtain multiple variables in the same line
  ```js
  const person = { 
      firstName: 'Bob', 
      lastName: 'Marley', 
      email: 'bob@marley.com', 
      password: 'sekureP@ssw0rd9', 
      username: 'barley', 
      createdAt: 1543945177623
  };
  const animals = ['horse', 'dog', 'fish', 'cat', 'bird'];

  const { email, password } = person; // creates new variables "email" & "password" within the scope
  const [firstAnimal, secondAnimal, thirdAnimal] = animals;
  ```
- Rest/Spread
  - can be used as a "catch-all" variable in destructuring
    - works for arrays and objects
  ```js
  const [firstAnimal, secondAnimal, ...otherAnimals] = animals;
  otherAnimals
  // => ['fish', 'cat', 'bird']
  ```
  - can also be used to create a 'shallow copy' of objects/arrays
    - the contents are copied by value, so arrays within arrays are copied by address
      - the inner arrays/objects are still pointing to the same ones
  ```js
  const personCopy = { ...person };
  // OR
  const {...personCopy} = person;
  ```
- Arrow functions
  - new way of writing functions
  - context is inherited from parent scope
    - `this` now refers to the parent of the arrow function
      - in regular functions, `this` refers to the scope of the function
  ```js
  const functName = (param1) => {
      //function body
      return returnVal;
  }
  // if the function is only one line with one parameter:
  const functName2 = param1 => returnVal;
  ```
- Ternary Operator
  - more concise way of writing if/else statements
    - each part of the ternary operator can be placed on different lines for readability
  - ternary operators could be chained, but readability diminishes
  - `condition ? performThisPartIfTrue : performThisPartIfFalse`
- Big O Notation
  - the worst case time/space complexity of the algorithm
  - written in combination of 1, log(N), N, N!
  - multiplying constants and lower order components are not included
    - 2 N^2 + 3N becomes N^2 in big O notation
## OOP
- JavaScript is a functional language with OOP support
  - all classes are converted into functions by the compiler
- Like most OOP languages, classes provide a blueprint of what an object can have (attributes) and what an object can do (methods)
    ``` js
    class ClassName {
        constructor(param1, param2, param3=default3) {
            this.attribute1 = param1 // attribute1 will be how we access this variable from an instance
            this.param2 = param2
            this.param3 = param3 // has a default value of default3
            this.attribute4 = 10 // not passed in as variable
        }

        method1(methodParam1) { // methods don't have a prefix
            // do something
            this.attribute1 += 200 // we can modify attributes here
            return returnValue
        }
    }

    const c1 = new ClassName(arg1, arg2) // create a new instance of class
    c1.method1(200) // call the method
    ```
- Inheritance & Super
  - classes can be inherited
    - the child class will have all properties and methods of parent class
    ```js
    class ChildClass extends ParentClass {
        constructor(param1,param2,childOnlyParam3) {
            super(param1, param2) // attributes are assigned the same way as parent class
            this.attribute3 = childOnlyParam3 // exclusive to child class, or assignment logic is different from parent
        }

        childMethod() {
            super.parentMethod() // calls the parentMethod from ParentClass
            doSomethingElse;
        }
    }
    ```
  - `super()` is used to access the parent class constructor
  - methods from the super class can be access by `super.parentMethod()`
## Functional Programming
- Multi-Paradigm
  - JavaScript can also be written with functions instead of classes
  - A good function should:
      1. Be Transparent: same input should provide the same output
      2. Be Pure: values are parameters are not changed; make copies of arrays & objects if needed
      3. Avoid Side Effects: don't make API calls, write to files, or print to console
      4. Never be Void: always return something, or else rule 2 or rule 3 could be violated
  - Sometimes, functions could deviate from the guidelines above
    - Following the guidelines as much as possible will make code easier to debug
- Callback Functions
  - Functions are treated like any other variable
    - thus, we can have a function as argument for another function
    - we have also assigned functions to variables
  - `Anonymous` functions are functions defined without a name
    - usually only used once
  - When a callback function is used as input for parent function, the parent function can call the callback function inside its body to do something
    - useful for webpage events, API calls, or querying databases
    ```js
    setTimeout( function() { 
    console.log("end") // will run after timeout is over (3 seconds in this case)
    }, 3000 );
        
    console.log("start"); // will run first
    ```
- The Big Freeze
  - normally, arrays and objects are mutable, even if they are declared with `const` keyword
    - we can still push and pop to the array
    - we can still add / change attributes of objects
  - `Object.freeze(varName)`
    - using freeze together with const, the array/object in the argument of freeze is now immutable
  - If we want to add to an immutable variable:
    - we can make a copy using the spread operator
      - ex: `const newList = [...oldList, newItem]`
    - we can also use concat
      - combines 2 lists
      - ex: `const newList = oldList.concat([newItem])`
  - `newList.slice(startIdx,endIdx)`
    - this will return a new list that starts at index startIdx, and ends at index endIdx (not including)
    - we can use the spread operator if we want to add more to the array
    - if endIdx is not included, slice goes from index startIdx to the end of the list
  - Sorting with `.sort()`
    - Normally, sort will rearrange the given array
      - original array is altered
    - We cannot sort a frozen list
      - we can make a copy and sort the copied list
      - ex: `const sortedList = [...unorderedList].sort()`
    - `.sort()` does not work on numbers and objects
      - to bypass this, we can add a callback function to the sort function
      - numbers ascending: `numArr.sort((a, b)=>a-b)`;
      - numbers descending: `numArr.sort((a, b)=>b-a)`;
      - object sorting: `objectArr.sort((a,b)=>comparison ? 1 : -1)`
        - the comparison is an expression that evaluates to a truthy or falsey value
          - ex: `a.item > b.item`, assuming the object has attribute `item`
- Map and Filter
  - can be used to avoid writing loops in some situations
    - both perform operations on every item in an array
  - `.map()`
    - the operation is the callback function passed in as parameter
      - the callback function should return something if the results of .map is saved
    - in the example below, the callback function converts the item passed in to a string wrapped with `<li>` tags
      - as a result, arrLi will be an array of strings
    ```js
    const arrLi = arrName.map(arrItem => `<li>${arrItem}</li>`)
    ```
  - `.filter()`
    - the operation is a callback function that evaluates to true or false
      - the list that .filter returns only includes those that had its callback return `true`
    - in the example below, the callback function only returns true for even numbers
      - as a result, the resulting evens array only contains even numbers
    ```js
    const values = [1, 2, 3, 4, 5];
    const evens = numbers.filter( val => val % 2 === 0 );
    ```
  - `.filter` and `.map` can be chained if needed.
  - extra: `.reduce()`
    - the callback function takes the return value from the previous iteration and the value at current index, and performs operations as defined
      - if no initialValue is given, reduce starts from index 1 and uses index 0 as prevReturn
        - if the array only has 1 item, the value at index 0 is always the result
          - even if the callback returns 0
      - if initialValue is given, reduce starts from index 0, and uses initialValue as prevReturn for the first iteration
      - optionally, the callback function can also accept the index and/or the array itself as input if needed
        - prevReturn and currentValue are REQUIRED for all calls
    - at the end, the function returns 1 value instead of an array
    - in the example below, the reduce function will return the sum of all items in array1 + initialValue
    ```js
    const sumWithInitial = array1.reduce((prevReturn, curValue)=>prevReturn + curValue, initialValue)
    ```
- Closure
  - a function can return a function
    - the returned function can be saved to a variable and be called multiple times
  - the variables instantiated in the outer function is still accessible by the inner function, but the variable is not accessible in regular scope
    ```js
    // here we have a function called "Outer"
    function outer() {
      let count = 0; // this is a count variable that is scoped to the function
      // there is an inner function that increments count and then console logs it
      function inner() {
        count++;
        console.log(count);
      }
      // we're returning the inner function
      return inner;
    }
        
    const counter = outer();   // counter is the function that we returned from calling the outer function (AKA inner())
    counter();                 // this will console.log "1"
    counter();                 // this will console.log "2"
    counter();                 // this will console.log "3"
    counter();                 // this will console.log "4"
        
    // so that means that the count variable still exists! 
    // and it is being changed even though we aren't inside of the Outer function!
    // can we access count out here?
    console.log(count); // doesn't work!
    ```
- Currying
    - closure is involved
    - the parent function is partly-run before the child function is returned
    ```js
    function ninjaBelt(ninja, beltColor){
      console.log("Ninja "+ ninja + " has earned a " + beltColor +" belt.");
    }
    ninjaBelt('Eileen', 'black');
    
    // can be re-written as: (curried)
    function ninjaBelt(ninja){
      return function belt(beltColor){ //note the closure here!
        console.log("Ninja "+ ninja + " has earned a " + beltColor +" belt.");
      }
    }
    ninjaBelt('Eileen')('black'); //note the double invocation here.
    ```
## NPM
- Node Package Manager
- used to retrieve packages for Node
  - packages are known as modules in MERN
    - gems in Ruby
    - libraries in Python
    - generalized as "middleware"
  - can be installed from local files or from <a href="https://www.npmjs.com/">"npm registry"</a>
  - general syntax for installing npm modules:
    - `-g` option installs the module globally
      - the module is accessible anywhere on the computer
      - MOST modules should NOT be installed globally!
  ```
  npm install moduleName
  npm install -g moduleName
  ```