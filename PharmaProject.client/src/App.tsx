import Home from './Home'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './styles/bootstrap.css'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import './styles/App.css'
import Pharmacy from './Pharmacy'


function App() {

    return (
      <div>
          <Router>
              <Switch>
                  <Route exact path="/">
                    <Home/> 
                  </Route>
                  <Route path="/pharmacy/:id">
                      <Pharmacy></Pharmacy>
                  </Route>
              </Switch>
          </Router>
        </div>
  )
}

export default App;
