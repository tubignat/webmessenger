import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import {Landing} from "./landing/Landing";
import {Chat} from "./chat/Chat";
import styled from "styled-components";

const GlobalContainer = styled.div`
    user-select: none;
`

function App() {
    return (
        <GlobalContainer>
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
        </GlobalContainer>
    );
}

export default App;
