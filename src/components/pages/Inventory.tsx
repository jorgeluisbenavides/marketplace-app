import { useEffect, useState } from "react";
import { UserInterface } from "../../interfaces/UserInterface";
import CardInventory from "../shared/CardInvetory";
import TableProducts from "../shared/TableProducts";
import { authKeys } from "../../enums/authEnum";
import ModalInfoInventory from "../shared/ModalInfoInventory";
import ModalProduct from "../shared/ModalProduct";
import { ProductInterface } from "../../interfaces/ProductInterface";

const API_URL = import.meta.env.VITE_API_URL;

interface AppLayoutProps {
  user: UserInterface | null;
}

function Inventory({ user }: AppLayoutProps) {
  const [showModal, setShowModal] = useState(false);
  const [showModalProduct, setShowModalProduct] = useState(false);
  const [productsList, setProductsList] = useState<ProductInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<ProductInterface | null>(null);

  useEffect(() => {
    if (!user) {
      setShowModal(true);
    } else {
      fetchProducts();
    }
  }, [user]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem(authKeys.AUTHTOKEN);
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
    } catch (error) {
      console.error("Error al obtener productos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProduct = () => {
    setSelectedProduct(null); // Nuevo producto
    setShowModalProduct(true);
  };

  const handleEditProduct = (product: ProductInterface) => {
    setSelectedProduct(product);
    setShowModalProduct(true);
  };

  const handleCloseProductModal = () => {
    setShowModalProduct(false);
    fetchProducts(); // Refrescar la tabla al cerrar el modal
  };

  return (
    <div className="container mt-4">
      <h2>Inventario</h2>

      {user ? (
        <TableProducts
          products={productsList}
          isLoading={loading}
          setIsCreateNewProduct={handleCreateProduct}
          onEditProduct={handleEditProduct}
        />
      ) : (
        <CardInventory />
      )}

      <ModalInfoInventory isShowModal={showModal} onClose={() => setShowModal(false)} />

      <ModalProduct
        product={selectedProduct}
        isShowModal={showModalProduct}
        onClose={handleCloseProductModal}
      />
    </div>
  );
}

export default Inventory;