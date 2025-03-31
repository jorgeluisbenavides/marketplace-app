import { useNavigate } from "react-router-dom";

function CardInventory() {
  const navigate = useNavigate();

  const goSignUp = () => {
    navigate("/registro");
  };

  return (
    <div className="row">
      <div className="col-sm-12">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-sm-6">
                <img
                  src="/img/products.png"
                  className="img-fluid"
                  alt="productos"
                />
              </div>
              <div className="col-sm-6">
                <h2 className="card-title">Crea tu producto</h2>
                <h3 className="card-text">
                  Organiza de manera profecional tu inventario.
                </h3>
                <a href="#" className="btn-primary mx-2">
                  Conoce más
                </a>
                <button
                  type="button"
                  onClick={goSignUp}
                  className="btn btn-primary"
                >
                  Crea tu cuenta
                </button>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center my-2">
          Inicia sesión para poder ver tu inventario
        </p>
      </div>
    </div>
  );
}

export default CardInventory;
