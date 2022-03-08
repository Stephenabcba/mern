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
    ```js
    class App extends Component {
        render() {
            return (
                <>
                    <h1 className="my-class">Hello World</h1>
                    <p>more text</p>
                </>
            );
        }
    }
    ```