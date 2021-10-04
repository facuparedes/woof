import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "../../common/components/Navbar";
import Breeds from "../Breeds";
import Home from "../Home";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" children={<Home />} />
        <Route exact path="/breeds" children={<Breeds />} />
        <Route exact path="/breeds/:breed">
          Breed details
        </Route>
        <Route exact path="/create/breed">
          Create breed form
        </Route>
        <Route>404 Not found</Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
