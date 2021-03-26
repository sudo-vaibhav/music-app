import './App.scss'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import MusicPlayer from './components/MusicPlayer/MusicPlayer'
import Home from './components/Home/Home'
import Search from './components/Search/Search'
import HOC from './components/HOC/HOC'

function App() {
  return (
    <Router>
      <HOC>
        <Switch>
          <Route path="/play/:songId">
            <MusicPlayer />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/search" exact>
            <Search />
          </Route>
        </Switch>
      </HOC>
    </Router>
  )
}

export default App
