import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import {Landing} from "./landing/Landing";
import {Chat} from "./chat/Chat";
console.log("123")

function App() {
    return (
        <Router>
            <Switch>
                <Route path='/' exact>
                    <Landing/>
                </Route>
                <Route path='/'>
                    <Chat/>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
