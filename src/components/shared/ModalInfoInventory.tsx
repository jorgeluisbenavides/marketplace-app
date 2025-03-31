import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface ModalInvetoryProps {
  isShowModal: boolean;
  onClose: () => void;
}

function ModalInfoInventory({ isShowModal, onClose }: ModalInvetoryProps) {

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(isShowModal);

  useEffect(() => {
    setShowModal(isShowModal);
  }, [isShowModal]);

  const goSignIn = () => {
    setShowModal(false);
    onClose();
    navigate("/login");
  };

  const goSignUp = () => {
    setShowModal(false);
    onClose();
    navigate("/registro");
  };

  return (
    <Modal show={showModal} onHide={onClose} centered>
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
  );
}

export default ModalInfoInventory;
