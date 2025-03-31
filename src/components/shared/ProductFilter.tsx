import { useState } from "react";

interface ProductFilterProps {
  onFilter: (filters: { name: string; sku: string; minPrice: number; maxPrice: number }) => void;
}

function ProductFilter({ onFilter }: ProductFilterProps) {
  const [filters, setFilters] = useState({
    name: "",
    sku: "",
    minPrice: "",
    maxPrice: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilter = () => {
    onFilter({
      name: filters.name.trim(),
      sku: filters.sku.trim(),
      minPrice: Number(filters.minPrice) || 0,
      maxPrice: Number(filters.maxPrice) || Infinity,
    });
  };

  const handleReset = () => {
    setFilters({ name: "", sku: "", minPrice: "", maxPrice: "" });
    onFilter({ name: "", sku: "", minPrice: 0, maxPrice: Infinity });
  };

  return (
    <div className="flex gap-2 items-center p-3 bg-gray-100 rounded-lg">
      <input
        type="text"
        name="name"
        value={filters.name}
        onChange={handleChange}
        placeholder="Nombre del producto"
        className="p-2 border rounded"
      />
      <input
        type="text"
        name="sku"
        value={filters.sku}
        onChange={handleChange}
        placeholder="SKU"
        className="p-2 border rounded"
      />
      <input
        type="number"
        name="minPrice"
        value={filters.minPrice}
        onChange={handleChange}
        placeholder="Precio mínimo"
        className="p-2 border rounded"
      />
      <input
        type="number"
        name="maxPrice"
        value={filters.maxPrice}
        onChange={handleChange}
        placeholder="Precio máximo"
        className="p-2 border rounded"
      />
      <button onClick={handleFilter} className="px-4 py-2 bg-blue-500 text-white rounded">
        Filtrar
      </button>
      <button onClick={handleReset} className="px-4 py-2 bg-gray-400 text-white rounded">
        Limpiar
      </button>
    </div>
  );
}

export default ProductFilter;
