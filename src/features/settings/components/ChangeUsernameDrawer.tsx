import { useState } from "react";
import { XIcon } from "lucide-react";
import { ChangeUsernameDrawerProps } from "../types";

export function ChangeUsernameDrawer({
  currentUsername,
  onSave,
  onClose,
  error,
}: ChangeUsernameDrawerProps) {
  const [newUsername, setNewUsername] = useState(currentUsername);

  const handleSave = async () => {
    if (newUsername && newUsername !== currentUsername) {
      await onSave(newUsername);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto px-6 py-6">
      <div className="flex flex-col space-y-4 bg-(--background)">
        <button className="flex justify-end items-end" onClick={onClose}>
          <XIcon className="h-8 w-8 p-2 bg-(--grayText)/20 text-white rounded-full" />
        </button>

        <h1 className="text-(--textColor) text-2xl font-bold">
          Change username
        </h1>

        <div className="flex-1 py-2 flex justify-center">
          <div className="w-full flex flex-col bg-gray-100 rounded">
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              placeholder="enter username"
              className="email-input w-full px-3 py-4 rounded text-black outline-none placeholder:text-base placeholder:font-medium placeholder:text-gray-400 placeholder:tracking-wider"
            />
            {error && <p className="text-red-500 px-3 py-2">{error}</p>}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            className="bg-(--primary) rounded-full py-2 px-4"
            onClick={handleSave}
            disabled={!newUsername || newUsername === currentUsername}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
