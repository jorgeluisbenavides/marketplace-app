import { useEffect, useState } from "react";
import { SignInInterface } from "../../interfaces/SignInInterface";
import { useNavigate } from "react-router-dom";
import { authKeys } from "../../enums/authEnum";
import { UserInterface } from "../../interfaces/UserInterface";

const API_URL = import.meta.env.VITE_API_URL;

interface SignInProps {
  user: UserInterface | null;
  setUser: (user: UserInterface | null) => void;
}

function SignIn({ user, setUser }: SignInProps) {
  const navigate = useNavigate();
  const isAuthenticated = Boolean(user);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/inventario");
    }
  });

  const [formData, setFormData] = useState<SignInInterface>({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const validateEmail = (email: string) => {
    return /^[\w-.]+@[\w-]+\.[a-z]{2,}$/i.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!validateEmail(formData.email)) {
      setError("Correo electrónico no válido.");
      return;
    }

    if (formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Error en el registro.");
        return;
      }

      const data = await response.json();
      localStorage.setItem(authKeys.AUTHTOKEN, data.access_token);
      localStorage.setItem(authKeys.AUTHUSER, JSON.stringify(data.user));

      setUser(data.user);
      setSuccess(true);
      setFormData({
        email: "",
        password: "",
      });
      navigate("/");
    } catch (error) {
      setError("Error al registrar usuario.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Inicia con tu cuenta</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">Inicio exitoso.</div>}
      <form onSubmit={handleSubmit}>
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

        <button className="btn btn-primary" type="submit">
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}

export default SignIn;
