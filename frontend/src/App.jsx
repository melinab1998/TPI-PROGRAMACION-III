import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout/Layout"
import Home from "./pages/Home/Home"
import Register from "./pages/Register/Register";



function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home/>} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;
