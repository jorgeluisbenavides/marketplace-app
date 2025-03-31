import { Modal, Button, Form, Alert } from "react-bootstrap";
import { ProductInterface } from "../../interfaces/ProductInterface";
import { useEffect, useState } from "react";
import { authKeys } from "../../enums/authEnum";

const API_URL = import.meta.env.VITE_API_URL;

interface ModalProductProps {
  product: ProductInterface | null;
  isShowModal: boolean;
  onClose: () => void;
  setLoadTable: (loadTable: boolean) => void;
}
function ModalProduct({
  product,
  isShowModal,
  setLoadTable,
  onClose,
}: ModalProductProps) {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState<ProductInterface>({
    id: 0,
    name: "",
    sku: "",
    quantity: 0,
    price: 0,
    active: true,
  });

  useEffect(() => {
    if (product) {
      setFormData({ ...product, price: parseInt(product.price.toString()) });
    } else {
      clearForm();
    }
  }, [product]);

  const clearForm = () => {
    setFormData({
      id: 0,
      name: "",
      sku: "",
      quantity: 0,
      price: 0,
      active: true,
    });
    setSuccess(false);
    setError("");
    setErrors({});
  };

  const validateForm = () => {
    let newErrors: { [key: string]: string } = {};

    if (formData.name.trim().length < 3) {
      newErrors.name = "El nombre debe tener al menos 3 caracteres.";
    }

    if (formData.sku.trim().length < 3) {
      newErrors.sku = "El SKU debe tener al menos 3 caracteres.";
    }

    if (formData.quantity <= 0) {
      newErrors.quantity = "La cantidad debe ser mayor o igual a 1.";
    }

    if (formData.price <= 0) {
      newErrors.price = "El precio no puede ser mayor o igual a 1.";
    }

    setSuccess(false);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Retorna `true` si no hay errores
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "quantity" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const token = localStorage.getItem(authKeys.AUTHTOKEN);

      let method = "POST";
      let path = `${API_URL}/products`;

      if (formData.id > 0) {
        method = "PUT";
        path = `${API_URL}/products/${formData.id}`;
      }

      const response = await fetch(path, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Error en el registro.");
        return;
      }

      setSuccess(true);
      setLoadTable(true);
      clearForm();
      onClose();
    } catch (error) {
      setError("Error al registrar producto.");
    }
  };

  return (
    <Modal show={isShowModal} onHide={onClose} centered>
      <form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>
            {product?.id >= 0 ? "Actualizar" : "Crear"} producto
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <div className="alert alert-danger">{error}</div>}
          {success && (
            <div className="alert alert-success">Registro exitoso.</div>
          )}
          <Form.Group>
            <Form.Label>Nombre:</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <Alert variant="danger">{errors.name}</Alert>}
          </Form.Group>

          <Form.Group>
            <Form.Label>SKU:</Form.Label>
            <Form.Control
              type="text"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              required
            />
            {errors.sku && <Alert variant="danger">{errors.sku}</Alert>}
          </Form.Group>

          <Form.Group>
            <Form.Label>Cantidad:</Form.Label>
            <Form.Control
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
            {errors.quantity && (
              <Alert variant="danger">{errors.quantity}</Alert>
            )}
          </Form.Group>

          <Form.Group>
            <Form.Label>Precio:</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
            {errors.price && <Alert variant="danger">{errors.price}</Alert>}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" variant="primary">
            {product?.id >= 0 ? "Actualizar" : "Crear"}
          </Button>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
export default ModalProduct;
