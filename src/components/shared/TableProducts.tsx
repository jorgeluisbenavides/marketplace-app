import { ProductInterface } from "../../interfaces/ProductInterface";
import { formatCurrency } from "../../utils/formatCurrency";

interface TableProductoProps {
  products: ProductInterface[] | [];
  isLoading: boolean;
  setIsCreateNewProduct: (isCreateProduct: boolean) => void;
  onEditProduct: (product: ProductInterface) => void;
}

function TableProducts({
  products,
  setIsCreateNewProduct,
  onEditProduct,
}: TableProductoProps) {
  
  const handleCreationProduct = () => {
    setIsCreateNewProduct(true);
  };

  return (
    <div>
      <div className="py-2">
        <button
          onClick={handleCreationProduct}
          type="button"
          className="btn btn-primary"
        >
          Crear producto
        </button>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre producto</th>
            <th>SKU</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center">
                No hay productos disponibles
              </td>
            </tr>
          ) : (
            products.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.sku}</td>
                <td>{item.quantity}</td>
                <td>{formatCurrency(item.price)}</td>
                <td>
                  <button className="btn btn-dark" onClick={() => onEditProduct(item)}>
                    <i className="bi bi-pencil-square"></i>
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TableProducts;
