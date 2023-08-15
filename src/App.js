// import React, { Component } from "react";
import React from "react";
import JokeList from "./JokeList";


/** App component (class version). Renders list of jokes. */

// class App extends Component {
//     render() {
//         return (
//             <div className="App">
//                 <JokeList />
//             </div>
//         );
//     }
// }

// export default App;


/**
 * App component (functional version). Renders list of jokes.
 */
function App () {
    return (
        <div className="App">
            <JokeList />
        </div>
    );
}


export default App;
