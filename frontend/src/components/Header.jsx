import { FaTwitter } from "react-icons/fa";
import { IoHomeOutline, IoCreateOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function Header({ onNewTweetClick }) {
  return (
    <header className="bg-base-100 shadow-sm">
      <div className="container mx-auto navbar justify-between">
        <Link to="/" className="btn btn-ghost text-xl text-primary">
          <FaTwitter />
          MiniTwitter
        </Link>

        <nav className="flex items-center gap-3">
          <Link to="/" className="btn btn-ghost">
            <IoHomeOutline size={20} />
            Inicio
          </Link>
          <button
            className="btn btn-primary text-white rounded-full"
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
