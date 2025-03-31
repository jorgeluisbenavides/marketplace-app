import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserInterface } from "../../interfaces/UserInterface";
import { Modal, Button } from "react-bootstrap";
import CardInventory from "../shared/CardInvetory";
import TableProducts from "../shared/TableProducts";
import { authKeys } from "../../enums/authEnum";
import Swal from "sweetalert2";

const API_URL = import.meta.env.VITE_API_URL;
interface AppLayoutProps {
  user: UserInterface | null;
}

function Inventory({ user }: AppLayoutProps) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [productsList, setProductsList] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log(user);
    if (!user) {
      setShowModal(true);
    }
    getProduct();
  }, [user]);

  const goSignIn = () => {
    setShowModal(false);
    navigate("/login");
  };

  const goSignUp = () => {
    setShowModal(false);
    navigate("/registro");
  };

  const getProduct = async () => {
    try {
      const token = localStorage.getItem(authKeys.AUTHTOKEN);
      // Swal.showLoading();
      const response = await fetch(`${API_URL}/products`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener los productos");
      }
      const data = await response.json();
      setProductsList(data);
      setLoading(false);
    } catch (error: any) {
      setError(error.message); // Maneja el error
      setLoading(false); // Actualiza el estado de carga
    }
  };

  return (
    <div>
      <h2>Inventario</h2>

      {user !== null ? (
        <TableProducts products={productsList} />
      ) : (
        <CardInventory />
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Crea una cuenta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Registra o inicia una sesión para empezar a gregar productos a tu
          inventario.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={goSignIn}>
            Inicia sesión
          </Button>
          <Button variant="secondary" onClick={goSignUp}>
            Crear cuenta
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Inventory;
