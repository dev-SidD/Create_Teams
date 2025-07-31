import React, { useState } from 'react';

const AddPlayerForm = ({ onAddPlayer, players }) => { // Added 'players' prop back for validation
  const [playerName, setPlayerName] = useState('');
  const [playerRole, setPlayerRole] = useState('');
  const [isCaptain, setIsCaptain] = useState(false);
  const [isWicketKeeper, setIsWicketKeeper] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault(); // Prevent default form submission
    const trimmedName = playerName.trim();
    const trimmedRole = playerRole.trim();

    if (!trimmedName || !trimmedRole) {
      alert('Both player name and role are required');
      return;
    }

    // Check for duplicate player names within the current team
    if (players && players.some(player => player.name.toLowerCase() === trimmedName.toLowerCase())) {
      alert(`Player "${trimmedName}" already exists in this team.`);
      return;
    }

    onAddPlayer({
      name: trimmedName,
      role: trimmedRole,
      isCaptain,
      isWicketKeeper,
    });

    // Reset form fields
    setPlayerName('');
    setPlayerRole('');
    setIsCaptain(false);
    setIsWicketKeeper(false);
  };

  return (
    <form onSubmit={handleAdd} className="bg-white p-6 rounded-xl  space-y-6 ">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Add New Player</h3>

      {/* Player Name Input */}
      <div>
        <label htmlFor="playerName" className="block text-sm font-medium text-gray-700 mb-2">Player Name</label>
        <input
          id="playerName"
          type="text"
          placeholder="e.g., Virat Kohli"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                     transition duration-200 ease-in-out text-gray-800 placeholder-gray-400"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          aria-label="Player Name"
        />
      </div>

      {/* Select Role Radio Buttons */}
      <div>
        <span className="block text-sm font-medium text-gray-700 mb-2">Select Role:</span>
        <div className="flex flex-wrap gap-4">
          {['Batsman', 'Bowler', 'All-Rounder'].map((role) => (
            <label key={role} className="flex items-center gap-2 text-gray-700 cursor-pointer">
              <input
                type="radio"
                name="playerRole"
                value={role}
                checked={playerRole === role}
                onChange={(e) => setPlayerRole(e.target.value)}
                className="form-radio h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 transition duration-150 ease-in-out"
                aria-label={`Select role ${role}`}
              />
              <span className="text-base">{role}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Additional Options Checkboxes */}
      <div>
        <span className="block text-sm font-medium text-gray-700 mb-2">Additional Options:</span>
        <div className="flex flex-wrap gap-6">
          <label className="flex items-center gap-2 text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={isCaptain}
              onChange={(e) => setIsCaptain(e.target.checked)}
              className="form-checkbox h-4 w-4 text-green-600 rounded border-gray-300 focus:ring-green-500 transition duration-150 ease-in-out"
              aria-label="Is Captain"
            />
            <span className="text-base">Captain</span>
          </label>
          <label className="flex items-center gap-2 text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={isWicketKeeper}
              onChange={(e) => setIsWicketKeeper(e.target.checked)}
              className="form-checkbox h-4 w-4 text-green-600 rounded border-gray-300 focus:ring-green-500 transition duration-150 ease-in-out"
              aria-label="Is Wicket Keeper"
            />
            <span className="text-base">Wicket Keeper</span>
          </label>
        </div>
      </div>

      {/* Add Player Button */}
      <button
        type="submit"
        className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700
                   shadow-md hover:shadow-lg transform hover:-translate-y-0.5
                   transition duration-300 ease-in-out
                   focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 font-semibold text-lg"
        aria-label="Add Player"
      >
        Add Player
      </button>
    </form>
  );
};

export default AddPlayerForm;