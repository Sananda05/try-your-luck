//css
import "./Navbar.css";

function Navbar({ modalOpener, setModalOpener }) {
  return (
    <div className="header">
      <nav className="navbar">
        <h2 className="navbar_title">try your LUCK</h2>
        <div
          className="navbar_button"
          onClick={() => setModalOpener(!modalOpener)}
        >
          Edit wheel
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
