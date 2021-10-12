import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "../../common/components/Navbar";
import Breeds from "../Breeds";
import BreedDetails from "../BreedDetails";
import CreateBreed from "../CreateBreed";
import Home from "../Home";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" children={<Home />} />
        <Route exact path="/breeds" children={<Breeds />} />
        <Route exact path="/breeds/:id" children={<BreedDetails />} />
        <Route exact path="/create/breed" children={<CreateBreed />} />
        <Route>404 Not found</Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
