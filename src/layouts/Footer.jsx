import 'bootstrap/dist/css/bootstrap.min.css';

function Footer() {
  return (
    <footer
      className="text-black py-3 mt-auto"
      style={{
        backdropFilter: "blur(8px)",
        background: "rgba(255, 255, 255, 0.7)",
        borderTop: "1px solid rgba(0,0,0,0.1)",
      }}
    >
      <div className="container-fluid text-center">
        <h6
          className="m-0 fw-semibold"
          style={{
            background: "linear-gradient(45deg, #28a745, #17a2b8)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            transition: "transform 0.3s",
            display: "inline-block",
          }}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
        >
          &copy; 2025 ByteCraft
        </h6>
      </div>
    </footer>
  );
}

export default Footer;
