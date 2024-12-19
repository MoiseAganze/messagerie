import Messagerie from "./pages/Messagerie";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<Messagerie />} />
      </Routes>
    </Router>
  );
}

export default App;
