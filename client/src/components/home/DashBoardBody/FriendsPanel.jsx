import { FaUserPlus } from "react-icons/fa";
import useThemeInfo from "../../../hooks/useThemeInfo";

export default function FriendsPanel({ friends = [], onlineCount = 0 }) {
  const { theme } = useThemeInfo();
  const isDark = theme === "dark";

  const asideBg = isDark
    ? "border-gray-800 bg-[#111111]"
    : "border-gray-200 bg-white shadow-md";

  const titleClass = isDark ? "text-white" : "text-gray-900";
  const subClass = isDark ? "text-gray-400" : "text-gray-500";
  const badgeClass = isDark
    ? "border-green-800 bg-green-950 text-green-400"
    : "border-green-200 bg-green-50 text-green-700";

  const labelClass = isDark ? "text-gray-300" : "text-gray-700";
  const inputClass = isDark
    ? "border-gray-700 bg-[#181818] text-white placeholder-gray-500 focus:border-red-600"
    : "border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400 focus:border-red-600 focus:bg-white";

  const dividerClass = isDark ? "bg-gray-800" : "bg-gray-200";
  const emptyCircleBg = isDark ? "bg-[#1a1a1a]" : "bg-gray-100";
  const emptyTitleClass = isDark ? "text-white" : "text-gray-800";
  const emptyDescClass = isDark ? "text-gray-400" : "text-gray-500";
  const friendItemClass = isDark
    ? "bg-[#181818]"
    : "bg-gray-50 border border-gray-100 shadow-xs";

  return (
    <aside className={`rounded-3xl border p-6 transition-all duration-300 ${asideBg}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold transition-colors duration-300 ${titleClass}`}>Friends List</h2>

          <p className={`mt-1 text-sm transition-colors duration-300 ${subClass}`}>
            Connect with your friends
          </p>
        </div>

        <div className={`rounded-full border px-3 py-1 transition-colors duration-300 ${badgeClass}`}>
          <span className="text-xs font-semibold">
            {onlineCount} Online
          </span>
        </div>
      </div>

      {/* Add Friend */}
      <div className="mt-8">
        <label className={`mb-2 block text-sm font-medium transition-colors duration-300 ${labelClass}`}>
          Add Friend
        </label>

        <input
          type="email"
          placeholder="Enter email address"
          className={`
            w-full
            rounded-xl
            border
            px-4
            py-3
            outline-none
            transition
            ${inputClass}
          `}
        />

        <button
          className="
            mt-4
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-red-700
            py-3
            font-semibold
            text-white
            transition
            hover:bg-red-600
            active:scale-95
          "
        >
          <FaUserPlus />
          Add Friend
        </button>
      </div>

      {/* Divider */}
      <div className={`my-8 h-px transition-colors duration-300 ${dividerClass}`} />

      {/* Friends */}
      {friends.length === 0 ? (
        <div className="flex flex-col items-center py-10 text-center">
          <div className={`flex h-16 w-16 items-center justify-center rounded-full transition-colors duration-300 ${emptyCircleBg}`}>
            <FaUserPlus className="text-2xl text-gray-500" />
          </div>

          <h3 className={`mt-5 text-lg font-semibold transition-colors duration-300 ${emptyTitleClass}`}>
            No Friends Yet
          </h3>

          <p className={`mt-2 text-sm leading-6 transition-colors duration-300 ${emptyDescClass}`}>
            Invite friends using their email and start watching movies together.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {friends.map((friend) => (
            <div
              key={friend.id}
              className={`flex items-center justify-between rounded-xl p-3 transition-colors duration-300 ${friendItemClass}`}
            >
              <div className="flex items-center gap-3">
                <img
                  src={friend.avatar}
                  alt={friend.name}
                  className="h-11 w-11 rounded-full object-cover"
                />

                <div>
                  <p className={`font-semibold transition-colors duration-300 ${titleClass}`}>{friend.name}</p>

                  <p className={`text-sm transition-colors duration-300 ${subClass}`}>{friend.email}</p>
                </div>
              </div>

              <span
                className={`h-3 w-3 rounded-full ${
                  friend.online ? "bg-green-500" : "bg-gray-500"
                }`}
              />
            </div>
          ))}
        </div>
      )}
    </aside>
  );
}

