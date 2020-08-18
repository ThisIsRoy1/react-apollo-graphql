import React from 'react';
import '../styles/App.css';
import { Switch, Route, Redirect} from 'react-router-dom'
import LinkList from './LinkList';
import Header from './Header';
import CreateLink from './CreateLink';
import Login from './Login';
import Search from './Search';

const App = () => {
    return (
        // <div className="App">
        //   <header className="App-header">
        //     <img src={logo} className="App-logo" alt="logo" />
        //     <p>
        //       Edit <code>src/App.js</code> and save to reload.
        //     </p>
        //     <a
        //       className="App-link"
        //       href="https://reactjs.org"
        //       target="_blank"
        //       rel="noopener noreferrer"
        //     >
        //       Learn React
        //     </a>
        //   </header>
        // </div>
        // <LinkList/>
        // <CreateLink />
        <div className="center w85">
            <Header />
            <div className="ph3 pv1 background-gray">
                <Switch>
                    <Route exact path='/' render={() => <Redirect to='/new/1' />} />
                    <Route exact path="/create" component={CreateLink} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path='/search' component={Search} />
                    <Route exact path='/top' component={LinkList} />
                    <Route exact path='/new/:page' component={LinkList} />
                </Switch>
            </div>
        </div>
    );
}

export default App;
