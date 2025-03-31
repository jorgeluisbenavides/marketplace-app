import { useState } from "react";
import { SignUpInterface } from "../../interfaces/SignUpInterface";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignUpInterface>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profile: "buyer",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const validateEmail = (email: string) => {
    return /^[\w-.]+@[\w-]+\.[a-z]{2,}$/i.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? "seller" : "buyer") : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!formData.name || !formData.email || !formData.password) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    if (!validateEmail(formData.email)) {
      setError("Correo electrónico no válido.");
      return;
    }

    if (formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Error en el registro.");
        return;
      }

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        profile: "buyer",
      });
    } catch (error) {
      setError("Error al registrar usuario.");
    }
  };

  const goSignIn = () => {
    navigate("/login");
  };

  return (
    <div className="container mt-4">
      <h2>Crea una cuenta</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">Registro exitoso.</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <div className="form-group">
            <label className="form-label">Nombre:</label>
            <input
              className="form-control"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            className="form-control"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña:</label>
          <input
            className="form-control"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Confirmar Contraseña:</label>
          <input
            className="form-control"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-check form-switch mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
            name="profile"
            checked={formData.profile === "seller"}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
            Registrar como Vendedor
          </label>
        </div>

        <button className="btn btn-primary" type="submit">
          Registrarse
        </button>

        <button className="btn btn-info m-1" type="button" onClick={goSignIn}>
          Inicia sesión
        </button>
      </form>
    </div>
  );
}

export default SignUp;
