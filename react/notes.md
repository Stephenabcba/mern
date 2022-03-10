# React
- Runs on user's browser, displaying information and reacting to user input
  - provides interactivity in addition to look & feel
- Developed by Facebook
  - Open-sourced under permissive MIT license
- Why?
  - build Single Page Applications (SPA)
  - Many choices in technologies and libraries
  - Still allows DOM manipulation
  - Highly Popular
## Intro to React
- Using React
  - in HTML: (will change later)
    ```HTML
    <script crossorigin="" src="https://unpkg.com/react@16/umd/react.development.js"></script>
    <script crossorigin="" src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script> 
    ```
  - The following can be done in a `<script>` tag in HTML
  - Components can be created with `React.createElement()`
    - three parameters
      - type of element
      - props
      - the content of the element
        - can be plain text (string)
        - could be other createElements
  - Having more `createElement()` as content of another element results in nested elements
  - The result of `createElement()` should be saved to a variable
  - To render the elements we created, we use
    - "root" is a div that we are rendering our content to
      - the content of root is replaced by the element we created
    ```js
    ReactDOM.render(elementName, document.getElementById("root"))
    ```
  - Full example:
    ```html
    <div id="root">
        <h1>First React page rendering...</h1>
    </div>

    <script crossorigin="" src="https://unpkg.com/react@16/umd/react.development.js"></script>
    <script crossorigin="" src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script> 
    <script>
        const App = React.createElement("h1", {}, "Our First React page has rendered");
        ReactDOM.render(App, document.getElementById("root"));
    </script>
    ```
- JSX & Babel
  - JavaScript Syntax Extension
  - Babel is the transpiler that translates JSX into JavaScript
  - nicer way of writing `createElement()` in more HTML-like syntax
  - the previous example becomes:
    ```js
    const App = () => <h1>Our First React page has rendered</h1>;
    ReactDOM.render(<App></App>, document.getElementByID("root"))
    ```
  - `App` must be capitalized in render()
- Create React App
  - Under the hood, `create-react-app` uses <a href="https://webpack.js.org/guides/getting-started/">Webpack</a> to "build" source code
  - to make a new project, run the following code, replacing `project-name` with name of the project
    ```
    npx create-react-app project-name
    ```
  - The command above creates a new folder, and we can run the following to start the React development server
    ```
    npm start
    ```
- React Folder Structure
  - since react is a library, folder structure is less important
  - a suggested folder structure is created when we run jsx ...
  - `src/index.js` is the entry point with `ReactDOM.render()`
  - main app jsx in `src/App.js`
  - create `src/components/` folder
- Composing Pages Using JSX
  - Using JSX, we can write methods that return HTML-like language
  - if we want to return multiple html tags, wrap them in a JSX fragment, which looks like an empty HTML tag: `<> </>`
  - if we want to add HTML classes to the tags, use `className="my-class"`
  - `label for` becomes `label htmlFor`
## Class Components
- Class Components
  - previously, we created functional components (the components were function return statements)
  - we can also create component classes
  - **3 requirements for a valid react component class**:
    - name must start with a capital letter
    - must extend React.Component
    - must have render() method that returns a react element from React.createElement() or JSX
  - in `src/components/SomeClassComponent.js`
    ```js
    import React, { Component } from 'react';
        
    class SomeClassComponent extends Component {
        render() {
            return <div>This is our first class component.</div>;
        }
    }
        
    export default SomeClassComponent;
    ```
  - in `src/App.js`
    ```js
    import SomeClassComponent from `./components/SomeClassComponent'

    //... somewhere inside the return statement of function App(){ }
    <SomeClassComponent/>
    ```
- Props
  - short for properties
  - by default, props is passed as an empty object
  - to add props, we can add attributes to the JSX element in `App`
  - props can be desctructured before the `return` statement within `render() { }`
  - when adding attributes, curly brackets denote a JavaScript expression
    - we can send numbers, strings, functions, objects, etc with curly braces
    - string values can be directly assigned without curly brackets
    - many other datatypes **require** curly brackets
    - all items can be wrapped in curly brackets, so when in doubt, use curly braces.
  - in `src/App.js`
    ```
    <SomeClassComponent prop1={propValue1} prop2={propValue2}/>
    ```
  - Props will be tranlated into:
    ```js
    // this object is automatically created by React, this is just a visualization
    let props = {
        prop1: propValue1,
        prop2: propValue2,
    }
    ```
  - in `src/components/SomeClassComponent.js`
    ```js
    render() {
        return (
            //...other stuff
            <h1>Property 1 has value of {this.props.prop1}</h1>
            <h2>Property 2 has value of {this.props.prop2}</h2>
        )
    }
    ```
- Children
  - children are tags within the body of a React component tag
  - we can customize the position of children inside the component file using `{this.props.children}`
- Synthetic Events
  - custom event listeners in React
  - event names are camelCased instead of lowercase
    - onClick instead of onclick
  - event handlers are passed as functions instead of strings in HTML
  - we can either write anonymous functions inside jsx portions, or we can call a method in MyComponent class to handle the event
    - we will have to write the methods ourselves
  - to prevent event from bubbling, we must use `event.stopPropagation()` or `event.preventDefault()`
    - returning false would not work
  - Events cannot be called asynchronously
    - React "pools" the Synthetic events
  - ex: `<button onClick={ ()=> alert("This button has been clicked!") }>Click Me</button>`
  - common events:
    - `onClick` : when something is clicked
    - `onChange` : when a form input is changed
    - `onSubmit` : when a form is submitted
    - `onFocus` : when an element is focused (clicked on or tabbed to)
    - `onBlur` : when element loses focus
- State
  - components can hold on to their own information using `this.state`
    - state is an object that is an attribute to the component class
  - we will need to modify the constructor to initialize state
  - to access state, we can use `this.state.stateVar`
  - to modify state, we will need to utilize `this.setState({stateVar: "newStateVal"})`
    - changing state variables directly using reassignment will not work
  - React sometimes "pools" state manipulation statements
    - attempting to access the state after `setState` may not return the correct state values
      - accessing the state as a call back function of `setState` ensures that we get the right state
    - changing the same state twice in one action may result in unexpected/unwanted interactions
  - to toggle state, we can create an if statement to perform different actions depending on state
    ``` js
    class MyComponent extends Component {
        constructor(props) {
            super(props); // retain all the functionality defined from constructor of Component class
            this.state = { // initialize state
                stateVar1: "stateVal1",
                stateVar2: "stateVal2"
            }
        }
    }

    render() {
        return (
            //do something with state
        )
    }
    ```
- Lifecycle Methods
  - a component's lifecycle goes from when it is created and mounted to when it is destroyed and unmounted
  - The lifecycle can be split into 4 stages
    - Mounting (creating & inserting)
      - `constructor()`
        - assign state and bind event handlers
        - first method called before component is actually mounted
        - DO NOT make API calls or introduce subscriptions
      - `render()`
        - HTML content is processed and rendered
      - `componentDidMount()`
        - immediately follows completions of `render()`
        - initiate network request, subscription, timer, or target a DOM node
    - Updating
      - run every time component state or properties are updated
      - `shouldComponentUpdate(nextProps, nextState)`
        - tell React whether component should be re-rendered
        - returns true by default
          - returning false prevents component from re-rendering
        - can be changed to optimize performance
      - `render()`
        - the component re-renders if `shouldComponentUpdate()` returns true
      - `componentDidUpdate(prevProps)`
        - allows us to compare prevProps, prevState, and snapshot value from previous method
    - Unmounting
      - `componentWillUnmount()`
        - invoke right before component is unmounted, ideal place to cancel any on-going network requests, subscriptions, or clear timers
- Styles
  - applying CSS has many methods
    - direct import a `style.css` file
      - implemented very similarly to regular css classes
      - upside: simple, supports querySelector
      - drawback: styles will apply to other components with same css class name
    ``` css
    /* styles.css */
    .btn {
        padding: 12px 15px; 
        font-family: Arial, sans-serif;
        font-weight: bold;
        background: linear-gradient(30deg, rebeccapurple, magenta); 
        color: #fff; 
        border: none;
    }
    ```
    ```js
    // MyButtonComponent.js
    import React, { Component } from 'react';
    import './styles.css';
        
    class MyButton extends Component {
        render() {
            return <button className="btn">{ props.children }</button>;
        }
    }
        
    export default MyButton;
    ```
    - inline styles
      - create a style object in JS and passing it as style attribute in JSX tags
      - upside: remedies drawback of direct import
      - drawback: media queries cannot be used for responsiveness, and pseudo-classes are not supported; all values must be strings
    ```js
    // MyButtonComponent.js
    import React, { Component } from 'react';
    
        
    const btnStyle = {
        padding: '12px 15px',
        fontFamily: 'Arial, sans-serif',
        fontWeight: 'bold',
        background: 'linear-gradient(30deg, rebeccapurple, magenta)', 
        color: '#fff',
        border: 'none'
    };
    
    class MyButton extends Component {
        render() {
            return <button style={ btnStyle }>{ props.children }</button>;
        }
    }
        
    export default MyButton;
    ```
    - CSS Modules
      - create a `MyComponent.module.css` and import it
        - the file must have `.module.css` extension
      - upside: 
        - supports media queries
        - completely encapsulated at component level
      - drawback: 
        - class names cannot be hyphenated
          - use camelCase instead
      ```css
      /* MyButtonComponent.module.css */
      .btn {
          padding: 12px 15px; 
          font-family: Arial, sans-serif; 
          font-weight: bold;
          background: linear-gradient(30deg, rebeccapurple, magenta); 
          color: #fff; 
          border: none;
      }
      ```
      ```js
      // MyButtonComponent.js
      import React, { Component } from 'react';
      import styles from './MyButtonComponent.module.css';
      
          
      class MyButton extends Component {
          render() {
              return <button className={ styles.btn }>{ props.children }</button>;
          }
      }
          
      export default MyButton;
      ```
- CSS in JS
  - CSS modules are in essence still regular CSS files
    - difficult to dynamically specify style properties
  - Alternative: Styled Components
    - library to enable CSS in JS
    - install the following package to utilize it
    ```
    npm install styled-components
    ```
    - `src/components/StyledBox.js`
      - to dynamically style a css property, use a callback function that takes in props and returns the desired props variable
      - `||` operator is the fallback value if the props variable is undefined (not specified)
      - the following example is a styled div
    ``` js
    import React from 'react';
    import styled from 'styled-components'; // import from the installed module
    
    const StyledBox = styled.div`
        border: 1px solid lightgray;
        background: ${props => props.bgColor};
        width: ${props => props.width || '100px'};  
        height: ${props => props.height || '100px'};
    `;
    
    export default StyledBox;
    ```
    - `src/components/SomeOtherComponent.js`
    ```js
    import React from 'react';
    
    import StyledBox from './StyledBox';
    
    const SomeOtherComponent = () => (
        <div>
            <StyledBox bgColor="blue"/>
            <StyledBox bgColor="red" height="200px"/>
        </div>
    )
    
    export default SomeOtherComponent;
    ```
  - Option 2 Styletron:
    ```
    npm install styletron-react
    npm install styletron-engine-atomic
    ```
    - `src/App.js`
    ``` js
    import React from 'react';
    
    import { Provider } from 'styletron-react';
    
    import { Client as Styletron } from 'styletron-engine-atomic';
    
    const engine = new Styletron();
    
    function App() {
        return (
            <Provider value={engine}>
                {/* your other components go in here */}
            </Provider>
        )
    }
    
    export default App;
    ```
    - `src/components/StyledBox.js`
    ```js
    import React from 'react'; 
    import { styled } from 'styletron-react';
    
    const StyledBox = styled('div', props => ({
        border: '1px solid lightgray',
        background: props.$bgColor,
        width: props.$width || '100px',
        height: props.$height || '100px',
    
        display: 'none',
    
        ['@media and (min-width: ' + (props.$minWidth || '500px') + ')']: {
            display: 'block'
        }
    }));
    
    export default StyledBox;
    ```
    - `src/components/SomeOtherComponent.js`
    ```js
    import React from 'react';
    
    import StyledBox from './StyledBox';
    
    const SomeOtherComponent = () => (
        <div>
            <StyledBox $bgColor="blue"/>
            <StyledBox $bgColor="red" $height="200px" $minWidth="1200"/>
        </div>
    )
    
    export default SomeOtherComponent;
    ```
- useRef
  - React uses Virtual DOM
    - "diffing": comparing Virtual DOM to actual DOM
      - makes decisions on when to re-render parts of app
  - We can use a ref attribute to obtain reference to a specific DOM node(element)
    - the variable name saved to `useRef()` should match name in `ref` attribute

    ```js
    import React, { useRef } from 'react';
    
    export default () => {
        const input = useRef();
    
        function focusInput() {
            input.current.focus();
        }
    
        return (
            <>
                <input ref={input}/>
                <button onClick={focusInput}>Focus Me!</button>
            </>
        );
    }
    ```
  - can also be used to access a stateful value
    - it will dynamically change to the new object as state changes

## Functional Components
- Functional vs Class Components
  - Historically, React class components were more popular due to their access to state
  - However, introduction of "hooks" had led to the rise of React function components
  - Now, functional components are more popular, but class components still exists and will be supported
- Functional Components Syntax
  - implementation in App.js is the same
  ``` js
  // PersonCard.js
  import React from 'react';
  const PersonCard = props => {
      return(
          <div>
              <h1>{ props.lastName }, { props.firstName }</h1>
              <p>Age: { props.age }</p>
              <p>Hair Color: { props.hairColor }</p>
          </div>
      );
  }
  export default PersonCard;
  ```
- useState
  - Hooks:
    - a function that allows us to use a certain piece of functionality
      - the function could be built-in or custom
  - State in functional components
    - state is available through useState
    - after state is initiated, behavior is same as state in classes
      - here, state is instantiated as an object with attributes
    ``` js
    import React, { useState } from 'react';
        
        
    const Counter = props => {
        const [state, setState] = useState({
            clickCount: 0
        });
    
        const handleClick = () => {
            setState({
                clickCount: state.clickCount + 1
            });
        }
    
        return (
            <div>
                { state.clickCount }
                <button onClick={ handleClick }>Click Me</button>
            </div>
        );
    }
        
    export default Counter;
    ```
    - alternatively, a primitive value can be passed in and the destructured variable can be accessed directly
    ``` js
    const [count, setCount] = useState(0);
    
    const handleClick = () => {
        setCount(count + 1);
    }
    ```
- Forms
  - 2 basic ways to handle forms
    1.  state: track input values as state, and updating state when the input changes (controlled components)
    2.  refs: attach refs to DOM nodes for input and textareas and inspect their values once form is submitted (uncontrolled components)
  - We usually prefer using controlled components
    - React handles the virtual DOM for us
    ``` js
    import React, { useState } from  'react';
        
        
    const UserForm = (props) => {
        const [username, setUsername] = useState("");
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");  
        
        const createUser = (e) => {
            e.preventDefault();
            const newUser = { username, email, password };
            console.log("Welcome", newUser);
        };
        
        return(
            <form onSubmit={ createUser }>
                <div>
                    <label>Username: </label> 
                    <input type="text" onChange={ (e) => setUsername(e.target.value) } />
                </div>
                <div>
                    <label>Email Address: </label> 
                    <input type="text" onChange={ (e) => setEmail(e.target.value) } />
                </div>
                <div>
                    <label>Password: </label>
                    <input type="text" onChange={ (e) => setPassword(e.target.value) } />
                </div>
                <input type="submit" value="Create User" />
            </form>
        );
    };
        
    export default UserForm;
    ```
  - `e.target` refers to the `input` tag, and we can get the value from it
    - this is due to `onChange` being placed on the input tag
  - we overwrite the `onSubmit` default functionality with a custom functiong using `e.preventDefault()`, and create our own interaction as needed
  - New in ES6: if we don't need to rename the object property names, we can add them to the object directly
    ```js
    const newUser = { username: username, email: email, password: password };
    // IN ES6, we can rewrite the above as follows:
    const newUser = { username, email, password };
    ```
  - If we want to clear input after submission, we can set the `value` of the `input` to the respective `state`, and clear the state variable once the form is submitted
    - it could be useful to not clear the state once input validation is implemented, as user needs to correct errors and resubmit form
    ```js
    <input type="text" onchange={ (e) => setUsername(e.target.value) } value={ username } />

    // inside of the createUser function
    setUsername("");
    ```
- Conditional Rendering
  - The page may render different content based on the state of the page
    - we can create and manipulate flags in `state` to keep track of what to render
  - Conditional rendering can be handled through either another function or ternary operators
    ``` js
    const [hasBeenSubmitted, setHasBeenSubmitted] = useState(false); // create the state flag
        
    const createUser = (e) => {
        // ...
        setHasBeenSubmitted( true ); // manipulate the flag as needed
    };

    const formMessage = () => { // handling conditional formatting with function
        if( hasBeenSubmitted ) { 
            return "Thank you for submitting the form!";
        } else {
            return "Welcome, please submit the form";
        }
    };

    return (
        // ...
        <h3>{ formMessage() }</h3> // handling conditional formatting with function
        // alternatively:
        {
            hasBeenSubmitted ? // handling conditional formatting with ternary operators
            <h3>Thank you for submitting the form!</h3> :
            <h3>Welcome, please submit the form.</h3> 
        }
        // ...
    )
    ```
  - Using conditional rendering, we can perform input validations for forms
    ``` js
    const [title, setTitle] = useState("");
        const [titleError, setTitleError] = useState("");
        
        const handleTitle = (e) => {
            setTitle(e.target.value);
            if(e.target.value.length < 1) {
                setTitleError("Title is required!");
            } else if(e.target.value.length < 3) {
                setTitleError("Title must be 3 characters or longer!");
            }
        }
        
        {/* rest of component removed for brevity */}
        
        return (
            <form onSubmit={ (e) => e.preventDefault() }>
                <div>
                    <label>Title: </label>
                    <input type="text" onChange={ handleTitle } />
                    {
                        titleError ? // renders empty string if titleError is empty
                        <p style={{color:'red'}}>{ titleError }</p> :
                        ''
                    }
                </div>
                <input type="submit" value="Create Movie" />
            </form>
        );
    ```
- useReducer
  - helps reduce repetitive code when working with multiple state
    - only need to write one handler for each synthetic event
  - we need to write our own `reducer` function to generate updated state object
    - updated state object is a copy of current state except the change specified by `action`
    - useReducer will use the returned updated state object from reducer function to update state
    - all state variables will be accessible using `state.variableName`
  - in the case of form inputs:
    - each input will have `name` corresponding to a state attribute in `initialState`
    - each input will have `value` reading from the `state.attributeName`, which is the same as the attribute name above
    - each input will have an `onChange` synthetic event pointing to the same `handleChange` function
      - inside `handleChange` function, we deconstruct the `name` and `value` from the input tag
      - once we call `dispatch()`, `useReducer` will update state for us using our `reducer` function
        - `dispatch()` takes in an object
          - `type` refers to the state attribute name from `name` (the key in state)
          - `payload` refers to the new value to assign to the state attribute from `value` (the value in state)
    - to handle form validation, each attribute in `initialState` should be an object
      - each object should have `value` and `error` attributes
      - `name` still refers to the state attribute
      - `value` now reads from `state.attributeName.value`, as defined 
      - `handleChange` will still deconstruct `name` and `value` from the input tag
        - but now it can also validate the `value`
          - either create a validators object or validator functions
          - if invalid, we will generate an `error` message
        - we can repackage the `value` and `error` into an object and save to sate using `dispatch()`
    ```js
    import React, { useReducer } from 'react'; // get useReducer() from React
    
    const initialState = { // set initial states
        name: '',
        email: '',
        age: { // setting up age attribute for form validation
          value:'',
          error: null
        }
    };
    
    function reducer(state, action) { // creates a new copy of state with change specified by the action object
        return {
            ...state,
            [action.type]: action.payload
        };
    }
    
    export default () => {
        const [state, dispatch] = useReducer(reducer, initialState); // utilize useReducer() to manage state
    
        function handleChange(e) { // handles all onChange synthetic events
            const { name, value } = e.target; // deconstruct and extract name and value from the input tag
            dispatch({ // useReducer will update state for us using reducer()
                type: name,
                payload: value
            });
        }
    
        return (
            <div>
                {JSON.stringify(state)}
                <div>
                    <label>
                        <span>Name:</span>{' '}
                        <input
                            name="name"
                            value={state.name}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        <span>Email:</span>{' '}
                        <input
                            name="email"
                            value={state.email}
                            onChange={handleChange}
                        />
                    </label>
                </div>
            </div>
        );
    }
    ```
- Iterating with Map
  - see notes in javascript section for details regarding `.map()` implementation
  - in JSX, we can generate HTML code for an array of items using `.map()`
    - the callback function passed in would return some HTML + information
    - if the collection is an array of objects, the callback function can reach into each object to access any key-value pairs
  - In this example, each grocery item (along with its index) gets placed in a `<li>` element
    ```js
    // inside function component
    const groceryList = ["pearl onions", "thyme", "cremini mushrooms", "butter"];
        return ( 
            <ul>
                { groceryList.map( (item, i) => 
                    <li key={ i }>{ item }</li> ) }
            </ul>
        ); 
    ```
- Lifting State
  - Props can be functions
    - we can pass a function as a prop into a component
      - the child component can then call the function normally and utilize its functionalities
      - if the function happens to be/call a setter function for `state`:
        - the child component can call the props function to manipulate state of the parent function
        - now, the parent function can either display the modified state
          - it can also pass the state into another child component to display
- Extra Callback Parameters
  - we cannot pass in parameters using just a function definition as event handlers
  - passing in parameters directly to the handler function will call the function
    - the function will execute as soon as the component renders
    - the handler function will not run properly
  - to properly pass parameters, use a callback function
  - Since this is important, the event parameter is passed into the handler function **by default**
```js
// function gets immediately run after component is rendered
return (<input onClick={handleInput(e)}>)

// the handler will work, but we cannot pass in parameters
return (<input onClick={handleInput}>)

// now we can properly pass in parameters using a callback function
return (<input onClick={e => handleInput(e)}>)

```

## Useful React Info
- React dataflow:
  - Base HTML is `/public/index.html`
  - React components are rendered into the html through `/src/index.js`
    - `ReactDOM.render` is called here
  - `index.js` only calls `App.js`
    - all other components go into `App.js`
- React component files can have `.js` or `.jsx` filetypes
  - `.jsx` offers better autocompletion, but fundamentally same as `.js`
- React cannot directly render objects to HTML
  - will need to use stringify to convert the object to string
    ```js
    JSON.stringify(objectName)
    ```
- `Package.json` keeps track of all dependencies
  - in the directory of `Package.json`, we can run `npm start` to run the react server
- `Ctrl + c` ends the react server
- To add Bootstrap, easiest way is to add the CDN links to `index.html`
  - The long way is to run `npm install Bootstrap` and work from there
- Shorthand for conditional rendering:
  - the jsx portion will only render if the first condition evaluates to true/truthy values
    ```js
    {state.firstName.error !== null && (
        <p className="error">{state.firstName.error}</p>
    )}
    ```
- By default, all synthetic events will pass `event` into the handler function
  - we can call it `e`
    - to access the value of an input tag, we can use `e.target.value` in the handler