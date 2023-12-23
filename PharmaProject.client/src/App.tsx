import Home from './Home'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.min.css';
import './App.css'
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
