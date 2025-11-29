const UserAvatar = ({ name }) => {
  const initial = name.charAt(0).toUpperCase();
  const colors = [
    "bg-blue-500", "bg-green-500", "bg-purple-500",
    "bg-red-500", "bg-yellow-500", "bg-indigo-500"
  ];
  // Simple hash function to get a consistent color for a name
  const charCodeSum = name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const color = colors[charCodeSum % colors.length];

  return (
    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl ${color}`}>
      {initial}
    </div>
  );
};

export default UserAvatar;
