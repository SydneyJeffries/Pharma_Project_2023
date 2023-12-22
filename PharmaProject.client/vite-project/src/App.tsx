import Home from './Home'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import Pharmacy from './Pharmacy'

function App() {

  return (
      <>
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
     </>
  )
}

export default App;
