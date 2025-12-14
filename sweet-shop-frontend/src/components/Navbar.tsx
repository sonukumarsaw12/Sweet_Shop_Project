import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (!token) return null;

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={styles.navbar}>
      <h2 style={styles.logo} onClick={() => navigate("/")}>
        SweetShop
      </h2>

      <button style={styles.logout} onClick={logout}>
        Logout
      </button>
    </div>
  );
}

const styles = {
  navbar: {
    height: "60px",
    backgroundColor: "#2874f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 20px",
    color: "white",
  },
  logo: {
    cursor: "pointer",
    fontWeight: "bold",
  },
  logout: {
    backgroundColor: "#ffe500",
    border: "none",
    padding: "6px 12px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};
