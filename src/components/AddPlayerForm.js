import React, { useState } from 'react';

const AddPlayerForm = ({ onAddPlayer, players }) => {
  const [playerName, setPlayerName] = useState('');
  const [playerRole, setPlayerRole] = useState('');
  const [isCaptain, setIsCaptain] = useState(false);
  const [isWicketKeeper, setIsWicketKeeper] = useState(false);

  // Define constants for validation limits
  const MAX_PLAYER_NAME_LENGTH = 30;
  const MAX_PLAYERS_COUNT = 12; // New: Maximum number of players allowed in the team

  const handleAdd = (e) => {
    e.preventDefault(); // Prevent default form submission
    const trimmedName = playerName.trim();
    const trimmedRole = playerRole.trim();

    // 1. Basic validation: Ensure name and role are not empty
    if (!trimmedName || !trimmedRole) {
      alert('Both player name and role are required');
      return;
    }

    // 2. Player name length validation
    if (trimmedName.length > MAX_PLAYER_NAME_LENGTH) {
      alert(`Player name cannot exceed ${MAX_PLAYER_NAME_LENGTH} characters.`);
      return;
    }

    // 3. Duplicate player name validation within the current team
    if (players && players.some(player => player.name.toLowerCase() === trimmedName.toLowerCase())) {
      alert(`Player "${trimmedName}" already exists in this team.`);
      return;
    }

    // 4. Team size validation: Prevent adding more than MAX_PLAYERS_COUNT players
    if (players && players.length >= MAX_PLAYERS_COUNT) {
      alert(`You cannot add more than ${MAX_PLAYERS_COUNT} players to the team.`);
      return;
    }

    // 5. Captain validation: Allow only one captain
    if (isCaptain && players && players.some(player => player.isCaptain)) {
      alert('A captain has already been assigned to this team. Please deselect the captain option or remove the existing captain first.');
      return;
    }

    // 6. Wicket-keeper validation: Allow only one wicket-keeper
    if (isWicketKeeper && players && players.some(player => player.isWicketKeeper)) {
      alert('A wicket-keeper has already been assigned to this team. Please deselect the wicket-keeper option or remove the existing wicket-keeper first.');
      return;
    }

    // If all validations pass, add the player
    onAddPlayer({
      name: trimmedName,
      role: trimmedRole,
      isCaptain,
      isWicketKeeper,
    });

    // Reset form fields after successful submission
    setPlayerName('');
    setPlayerRole('');
    setIsCaptain(false);
    setIsWicketKeeper(false);
  };

  return (
    <form onSubmit={handleAdd} className="bg-white p-6 rounded-xl space-y-6">
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
          maxLength={MAX_PLAYER_NAME_LENGTH} // HTML attribute for client-side enforcement
          aria-label="Player Name"
        />
        {/* Visual feedback for character count */}
        <p className="text-right text-sm text-gray-500 mt-1">
          {playerName.length}/{MAX_PLAYER_NAME_LENGTH} characters
        </p>
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