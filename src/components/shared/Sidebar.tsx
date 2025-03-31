import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { authKeys } from "../../enums/authEnum";
import { UserInterface } from "../../interfaces/UserInterface";

interface SidebarProps {
  user: UserInterface | null; //Input
  setUser: (user: UserInterface | null) => void; // output
}

function Sidebar({ user, setUser }: SidebarProps) {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const isAuthenticated = Boolean(user);

  useEffect(() => {
    const userData = localStorage.getItem(authKeys.AUTHUSER);

    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [setUser]);

  const handleLogout = () => {
    localStorage.removeItem(authKeys.AUTHTOKEN);
    localStorage.removeItem(authKeys.AUTHUSER);
    setUser(null);
  };

  const toggleSidebar = () => setIsSidebarVisible(!isSidebarVisible);

  return (
    <>
      <button
        className="btn btn-dark d-block d-md-none btn-toggle-sidebar"
        onClick={toggleSidebar}
      >
        <i className="bi bi-list"></i>
      </button>

      <div
        className={`sidebar bg-light position-fixed top-0 bottom-0 start-0 p-3 ${
          isSidebarVisible ? "show" : ""
        }`}
      >
        <h1 className="mb-4">Marketplace</h1>
        <ul className="nav flex-column">
          <li className="nav-item">
            <button
              type="button"
              className="btn btn-dark btn-toggle-sidebar-arrow"
              onClick={toggleSidebar}
            >
              <i className="bi bi-arrow-right"></i>
            </button>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/">
              Inicio
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/inventario">
              Inventario
            </Link>
          </li>
          {isAuthenticated ? (
            <li className="nav-item">
              <button type="button" className="nav-link" onClick={handleLogout}>
                {user?.name} | Salir
              </button>
            </li>
          ) : (
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Iniciar sesión
              </Link>
            </li>
          )}
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
