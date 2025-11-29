import { FiHome, FiUsers } from "react-icons/fi";
import { Link } from "react-router-dom";
import UserAvatar from "./UserAvatar";

export default function SidebarUsers({ users = [] }) {
  return (
    <aside className="w-72 bg-base-100 p-4 rounded-2xl shadow-sm hidden lg:block">
      <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
        <FiUsers />
        Lista de Usuarios
      </h2>

      <div className="space-y-4">
        <Link to="/" className="flex items-center gap-3 font-bold">
          <FiHome />
          Home
        </Link>
        {users.map((u) => (
          <Link to={`/user/${u.id}`} key={u.id} className="flex items-center gap-3">
            <UserAvatar name={u.userName} />
            <div>
              <p className="font-semibold">{u.userName}</p>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
}
