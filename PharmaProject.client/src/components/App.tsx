import Home from './Home'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

function App() {

    return (
        <div className="app  ">
            <Header />
            <div className="container-xxl ">
                <Router>
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                    </Switch>
                </Router>
            </div>
            <Footer />
        </div>
    )
}

export default App;
