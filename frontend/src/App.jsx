import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout/Layout"
import Home from "./pages/Home/Home"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home/>} />
      </Route>
    </Routes>
  );
}

export default App;
