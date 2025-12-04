import './Header.css';
import logo from "../assets/brand-logo.svg";

export function Header() {
  return (
    <div className="header">
      <div className="header-content">
        <div className="logo-container">
          <img src={logo} alt='logo'/>
        </div>
      </div>
    </div>
  );
}
