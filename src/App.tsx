import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/pages/SignUp";
import Home from "./components/pages/Home";
import Sidebar from "./components/shared/Sidebar";
import SignIn from "./components/pages/SignIn";

import { useState } from "react";
import { UserInterface } from "./interfaces/UserInterface";
import Inventory from "./components/pages/Inventory";

function App() {
  const [user, setUser] = useState<UserInterface | null>(null);

  return (
    <BrowserRouter>
      <div className="d-flex">
        <Sidebar user={user} setUser={setUser} />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/registro" element={<SignUp />} />
            <Route
              path="/login"
              element={<SignIn user={user} setUser={setUser} />}
            />
            {/* Rutas anidadas */}
            <Route
              path="/inventario"
              element={<Inventory user={user} />}
            ></Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
