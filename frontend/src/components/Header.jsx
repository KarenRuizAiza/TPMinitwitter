import { FaTwitter } from "react-icons/fa";
import { IoHomeOutline, IoCreateOutline, IoPeopleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function Header({ onNewTweetClick }) {
  return (
    <header className="bg-base-100 shadow-sm sticky top-0 z-10">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo y título */}
        <Link to="/" className="flex items-center gap-4 text-primary">
          <FaTwitter size={32} />
          <h1 className="text-2xl font-bold">MiniTwitter</h1>
        </Link>

        {/* Navegación */}
        <nav className="flex items-center gap-4">
          <Link to="/" className="btn btn-ghost btn-sm flex items-center gap-2">
            <IoHomeOutline size={20} />
            Inicio
          </Link>
          <Link to="/users" className="btn btn-ghost btn-sm flex items-center gap-2">
            <IoPeopleOutline size={20} />
            Usuarios
          </Link>
          <button
            className="btn btn-primary btn-sm flex items-center gap-2"
            onClick={onNewTweetClick}
          >
            <IoCreateOutline size={20} />
            Crear Tweet
          </button>
        </nav>
      </div>
    </header>
  );
}
