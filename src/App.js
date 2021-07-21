import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";

import Page from "./Page";

function App() {
  return (
    <BrowserRouter>
      <Route path="/:id?" exact component={Page} />
    </BrowserRouter>
  );
}

export default App;
