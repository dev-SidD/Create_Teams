// src/components/AddPlayerForm.js
import React, { useState } from 'react';

const AddPlayerForm = ({ onAddPlayer }) => {
  const [playerName, setPlayerName] = useState('');
  const [playerRole, setPlayerRole] = useState('');
  const [isCaptain, setIsCaptain] = useState(false);
  const [isWicketKeeper, setIsWicketKeeper] = useState(false);

  const handleAdd = () => {
    const trimmedName = playerName.trim();
    const trimmedRole = playerRole.trim();

    if (!trimmedName || !trimmedRole) {
      alert('Both player name and role are required');
      return;
    }

    onAddPlayer({
      name: trimmedName,
      role: trimmedRole,
      isCaptain,
      isWicketKeeper,
    });

    setPlayerName('');
    setPlayerRole('');
    setIsCaptain(false);
    setIsWicketKeeper(false);
  };

  return (
    <div className="mx-auto bg-white p-6 rounded-xl shadow-md space-y-4 border border-gray-200">
      <input
        type="text"
        placeholder="Player Name"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />

      <div className="flex flex-col space-y-2">
        <span className="text-sm font-medium text-gray-700">Select Role:</span>
        <div className="flex gap-4">
          {['Batsman', 'Bowler', 'All-Rounder'].map((role) => (
            <label key={role} className="flex items-center gap-2 text-gray-600">
              <input
                type="radio"
                name="role"
                value={role}
                checked={playerRole === role}
                onChange={(e) => setPlayerRole(e.target.value)}
              />
              {role}
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-col space-y-2">
        <span className="text-sm font-medium text-gray-700">Additional Options:</span>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-gray-600">
            <input
              type="checkbox"
              checked={isCaptain}
              onChange={(e) => setIsCaptain(e.target.checked)}
            />
            Captain
          </label>
          <label className="flex items-center gap-2 text-gray-600">
            <input
              type="checkbox"
              checked={isWicketKeeper}
              onChange={(e) => setIsWicketKeeper(e.target.checked)}
            />
            Wicket Keeper
          </label>
        </div>
      </div>

      <button
        onClick={handleAdd}
        className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition duration-200"
      >
        Add Player
      </button>
    </div>
  );
};

export default AddPlayerForm;
