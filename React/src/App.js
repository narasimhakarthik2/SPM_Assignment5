import Home from "./components/Home";
import Stats from "./components/Stats.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/stats" element={<Stats />} />
    </Routes>
  );
}

function OuterApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default OuterApp;