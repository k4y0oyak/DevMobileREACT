import { BrowserRouter, Routes, Route } from "react-router-dom";

import Card from "./components/Card/Card";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/card/:id" element={<Card />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
