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
    - changing state variables using reassignment will not work
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