import Home from './Home'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

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