import React from 'react';
import 'normalize.css';
import "./sass/main.scss";
import { HashRouter as Router, Route, NavLink, Switch } from 'react-router-dom';

import TopStories from './components/TopStories';
import NewStories from './components/NewStories';
import UserProfile from './components/UserProfile';
import Comments from './components/Comments';
import Provider, { SwitcherContext } from './context';


const App = () => {
  return (
    <Provider>
      <SwitcherContext.Consumer>
        {context => (
          <div className={context.darkMode ? 'app app-dark-mode' : 'app'}>
            <div className='app-container'>
              <Router>
                <h1>Hacker News Clone</h1>
                <ul className="navbar">
                  <NavLink exact to="/">Mais lidas</NavLink>
                  <NavLink exact to="/new">Mais recentes</NavLink>
                  <li className='switcher' onClick={context.toggleDarkMode}>{context.darkMode ? '💡' : '🔦'}</li>
                </ul>
                <Switch>
                  <Route exact path="/" component={TopStories} />
                  <Route path='/new' component={NewStories} />
                  <Route path="/author" component={UserProfile} />
                  <Route path='/comments' component={Comments} />
                  <Route render={() => (<h1>Erro 404</h1>)} />
                </Switch>
              </Router>
            </div>
          </div>
        )}
      </SwitcherContext.Consumer>

    </Provider>

  )
}

export default App;