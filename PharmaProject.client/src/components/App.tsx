import Home from './Home'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

function App() {

    return (
        <div className="app  ">
            <Router>
                <Header />
                <div className="container-xxl ">
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                    </Switch>
                </div>
            </Router>
            <Footer />
        </div>
    )
}

export default App;
