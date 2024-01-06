import Home from '../views/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Delivery from '../views/Delivery';

function App() {

    return (
        <div className="app  ">
            <Router>
                <Header />
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route exact path="/delivey/:pharmacyId">
                            <Delivery />
                        </Route>
                    </Switch>
            </Router>
            <Footer />
        </div>
    )
}

export default App;
