import { FaUserPlus } from "react-icons/fa";

export default function FriendsPanel({ friends = [], onlineCount = 0 }) {
  return (
    <aside className="rounded-3xl border border-gray-800 bg-[#111111] p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Friends List</h2>

          <p className="mt-1 text-sm text-gray-400">
            Connect with your friends
          </p>
        </div>

        <div className="rounded-full border border-green-800 bg-green-950 px-3 py-1">
          <span className="text-xs font-semibold text-green-400">
            {onlineCount} Online
          </span>
        </div>
      </div>

      {/* Add Friend */}
      <div className="mt-8">
        <label className="mb-2 block text-sm font-medium text-gray-300">
          Add Friend
        </label>

        <input
          type="email"
          placeholder="Enter email address"
          className="
            w-full
            rounded-xl
            border
            border-gray-700
            bg-[#181818]
            px-4
            py-3
            text-white
            outline-none
            transition
            focus:border-red-600
          "
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
      <div className="my-8 h-px bg-gray-800" />

      {/* Friends */}
      {friends.length === 0 ? (
        <div className="flex flex-col items-center py-10 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1a1a1a]">
            <FaUserPlus className="text-2xl text-gray-500" />
          </div>

          <h3 className="mt-5 text-lg font-semibold text-white">
            No Friends Yet
          </h3>

          <p className="mt-2 text-sm leading-6 text-gray-400">
            Invite friends using their email and start watching movies together.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {friends.map((friend) => (
            <div
              key={friend.id}
              className="flex items-center justify-between rounded-xl bg-[#181818] p-3"
            >
              <div className="flex items-center gap-3">
                <img
                  src={friend.avatar}
                  alt={friend.name}
                  className="h-11 w-11 rounded-full object-cover"
                />

                <div>
                  <p className="font-semibold text-white">{friend.name}</p>

                  <p className="text-sm text-gray-400">{friend.email}</p>
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
