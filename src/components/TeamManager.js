import React, { useState, useEffect } from 'react';
import TeamPlayers from './TeamPlayers';
import AddPlayerForm from './AddPlayerForm';

const LOCAL_STORAGE_KEY = 'teamsData'; // Key for storing data in localStorage

// Helper function to get initial teams from localStorage
// This function is called only once when the component is first mounted
const getInitialTeams = () => {
  console.log('Attempting to get initial teams from localStorage...');
  const storedTeams = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (storedTeams) {
    try {
      const parsedTeams = JSON.parse(storedTeams);
      console.log('Initial teams loaded successfully:', parsedTeams);
      return parsedTeams;
    } catch (error) {
      console.error('Failed to parse stored teams from localStorage. Returning empty array.', error);
      // Clear corrupted data if parsing fails to prevent future errors
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      return [];
    }
  }
  console.log('No teams found in localStorage. Initializing with empty array.');
  return [];
};

const TeamManager = () => {
  // Initialize teams state directly by calling getInitialTeams.
  // This ensures the state starts with data from localStorage, not an empty array.
  const [teams, setTeams] = useState(getInitialTeams);
  const [teamName, setTeamName] = useState('');
  const [visibleTeamId, setVisibleTeamId] = useState(null);

  // Effect to save data to localStorage whenever the 'teams' state changes.
  // This effect is crucial for persisting all additions, deletions, and updates.
  useEffect(() => {
    console.log('Saving data to localStorage:', teams);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(teams));
  }, [teams]); // This effect runs every time the 'teams' array is updated

  const handleAddTeam = () => {
    const trimmed = teamName.trim();

    if (!trimmed) {
      alert('Team name is required');
      return;
    }

    if (teams.some(team => team.name.toLowerCase() === trimmed.toLowerCase())) {
      alert('Team already exists');
      return;
    }

    const newTeam = {
      id: Date.now(), // Unique ID for the team (simple timestamp)
      name: trimmed,
      players: []
    };

    setTeams([...teams, newTeam]); // Add the new team to the existing list
    setTeamName(''); // Clear the input field
  };

  const handleDeleteTeam = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this team?');
    if (confirmDelete) {
      const updatedTeams = teams.filter(team => team.id !== id);
      setTeams(updatedTeams);
      if (visibleTeamId === id) setVisibleTeamId(null);
    }
  };

  const handleAddPlayerToTeam = (teamId, player) => {
    const updatedTeams = teams.map(team => {
      if (team.id === teamId) {
        // Prevent adding duplicate players to the same team
        if (team.players.some(p => p.name.toLowerCase() === player.name.toLowerCase())) {
          alert(`Player "${player.name}" already exists in this team.`);
          return team; // Return original team if player exists
        }
        return { ...team, players: [...team.players, player] };
      }
      return team;
    });
    setTeams(updatedTeams);
  };

  const handleDeletePlayer = (teamId, index) => {
    const updatedTeams = teams.map(team => {
      if (team.id === teamId) {
        const updatedPlayers = team.players.filter((_, i) => i !== index);
        return { ...team, players: updatedPlayers };
      }
      return team;
    });
    setTeams(updatedTeams);
  };

  const toggleTeamVisibility = (id) => {
    setVisibleTeamId(prevId => (prevId === id ? null : id));
  };

  return (
    <div className="max-w-3xl mx-auto p-4 font-sans">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Team Manager</h2>

      <div className="flex gap-2 mb-6 p-2 bg-gray-50 rounded-lg shadow-sm">
        <input
          type="text"
          placeholder="Enter team name"
          className="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm
                     focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent
                     transition duration-200 ease-in-out"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          aria-label="Team name input"
        />
        <button
          onClick={handleAddTeam}
          className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-3 rounded-lg
                     shadow-md hover:shadow-lg transition duration-200 ease-in-out
                     focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          aria-label="Add Team button"
        >
          Add Team
        </button>
      </div>

      {teams.length === 0 ? (
        <p className="text-center text-gray-500 text-lg py-8 bg-white rounded-lg shadow">
          No teams added yet. Start by adding a new team above!
        </p>
      ) : (
        <div className="space-y-4">
          {teams.map(team => (
            <div key={team.id} className="bg-white shadow-lg rounded-xl p-5 border border-gray-200">
              <div className="flex justify-between items-center flex-wrap gap-3">
                <span className="text-2xl font-semibold text-teal-800 break-words max-w-[calc(100%-180px)]">
                  {team.name}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => toggleTeamVisibility(team.id)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600
                               shadow-md hover:shadow-lg transition duration-200 ease-in-out
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    aria-label={visibleTeamId === team.id ? `Hide players for ${team.name}` : `View players for ${team.name}`}
                  >
                    {visibleTeamId === team.id ? 'Hide Players' : 'View Players'}
                  </button>
                  <button
                    onClick={() => handleDeleteTeam(team.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600
                               shadow-md hover:shadow-lg transition duration-200 ease-in-out
                               focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    aria-label={`Delete team ${team.name}`}
                  >
                    Delete
                  </button>
                </div>
              </div>

              {visibleTeamId === team.id && (
                <div className="mt-6 border-t pt-5 border-gray-200">
                  <TeamPlayers
                    players={team.players}
                    onDeletePlayer={(index) => handleDeletePlayer(team.id, index)}
                  />
                  <AddPlayerForm
                    onAddPlayer={(player) => handleAddPlayerToTeam(team.id, player)}
                    players={team.players} // Pass players to AddPlayerForm for validation
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamManager;