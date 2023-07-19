import "./App.scss";
import { Register } from "./components/Register";
import { Login } from "./components/Login";
import { Home } from "./components/Home";
import { Routes, Route } from "react-router-dom";
import { removeToken } from "./utils/authUtils";

function App() {

  return (
      <div>
        <button onClick={removeToken}>logout</button>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
  );
}

export default App;
