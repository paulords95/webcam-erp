import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";

import FaceCam from "./Page";
import FrontPlate from "./FrontPlate";

function App() {
  return (
    <BrowserRouter>
      <Route path="/placa-frente/:id?" exact component={FrontPlate} />
      <Route path="/webcam/:id?" exact component={FaceCam} />
    </BrowserRouter>
  );
}

export default App;
