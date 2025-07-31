import React, { useState, useEffect } from 'react';
import TeamPlayers from './TeamPlayers'; // Assuming this component exists
import AddPlayerForm from './AddPlayerForm'; // Assuming this component exists

// You might need to install a react-icons library if you don't have one:
// npm install react-icons
// or yarn add react-icons
import { FaPlus } from 'react-icons/fa'; // Importing a plus icon

const LOCAL_STORAGE_KEY = 'teamsData'; // Key for storing data in localStorage

// Helper function to get initial teams from localStorage
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
      localStorage.removeItem(LOCAL_STORAGE_KEY); // Clear corrupted data
      return [];
    }
  }
  console.log('No teams found in localStorage. Initializing with empty array.');
  return [];
};

const TeamManager = () => {
  const [teams, setTeams] = useState(getInitialTeams);
  const [teamName, setTeamName] = useState('');
  const [visibleTeamId, setVisibleTeamId] = useState(null);
  const [addPlayerFormVisibleForTeamId, setAddPlayerFormVisibleForTeamId] = useState(null);

  // Define a maximum length for the team name
  const MAX_TEAM_NAME_LENGTH = 25; // You can adjust this value

  // Effect to save data to localStorage whenever the 'teams' state changes.
  useEffect(() => {
    console.log('Saving data to localStorage:', teams);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(teams));
  }, [teams]);

  const handleAddTeam = () => {
    const trimmed = teamName.trim();
    if (!trimmed) {
      alert('Team name is required');
      return;
    }

    // --- New validation for team name length ---
    if (trimmed.length > MAX_TEAM_NAME_LENGTH) {
      alert(`Team name cannot exceed ${MAX_TEAM_NAME_LENGTH} characters.`);
      return;
    }

    if (teams.some(team => team.name.toLowerCase() === trimmed.toLowerCase())) {
      alert('Team already exists');
      return;
    }
    const newTeam = { id: Date.now(), name: trimmed, players: [] };
    setTeams([...teams, newTeam]);
    setTeamName('');
  };

  const handleDeleteTeam = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this team?');
    if (confirmDelete) {
      const updatedTeams = teams.filter(team => team.id !== id);
      setTeams(updatedTeams);
      if (visibleTeamId === id) setVisibleTeamId(null);
      if (addPlayerFormVisibleForTeamId === id) setAddPlayerFormVisibleForTeamId(null);
    }
  };

  const handleAddPlayerToTeam = (teamId, player) => {
    const updatedTeams = teams.map(team => {
      if (team.id === teamId) {
        return { ...team, players: [...team.players, player] };
      }
      return team;
    });
    setTeams(updatedTeams);
    // Automatically hide the form after a player is successfully added
    setAddPlayerFormVisibleForTeamId(null);
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

  const handleMakeCaptain = (teamId, playerIndex) => {
    const updatedTeams = teams.map(team => {
      if (team.id === teamId) {
        const newPlayers = team.players.map((p, idx) => {
          return { ...p, isCaptain: (idx === playerIndex) };
        });
        return { ...team, players: newPlayers };
      }
      return team;
    });
    setTeams(updatedTeams);
  };

  const handleRemoveCaptain = (teamId, playerIndex) => {
    const updatedTeams = teams.map(team => {
      if (team.id === teamId) {
        const newPlayers = team.players.map((p, idx) => {
          if (idx === playerIndex) {
            return { ...p, isCaptain: false };
          }
          return p;
        });
        return { ...team, players: newPlayers };
      }
      return team;
    });
    setTeams(updatedTeams);
  };

  const toggleTeamVisibility = (id) => {
    setVisibleTeamId(prevId => {
      if (prevId === id) {
        setAddPlayerFormVisibleForTeamId(null);
        return null;
      } else {
        setAddPlayerFormVisibleForTeamId(null);
        return id;
      }
    });
  };

  const toggleAddPlayerFormVisibility = (teamId) => {
    setAddPlayerFormVisibleForTeamId(prevId => (prevId === teamId ? null : teamId));
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-100 p-4 sm:p-6 lg:p-8 font-inter">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-6 md:p-8 border border-gray-100">
        <h2 className="text-4xl font-extrabold text-center mb-8 text-gray-900 leading-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-blue-600">
            Team Roster
          </span> Manager
        </h2>

        {/* Input and button for adding new teams */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8 ">
          <input
            type="text"
            placeholder="Enter new team name..."
            className="flex-1 p-3 border border-blue-200 rounded-lg shadow-sm
                         focus:outline-none focus:ring-3 focus:ring-blue-400 focus:border-blue-400
                         transition duration-300 ease-in-out text-gray-800 placeholder-gray-400"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            maxLength={MAX_TEAM_NAME_LENGTH} // HTML attribute for client-side enforcement
            aria-label="Enter team name"
          />
          <button
            onClick={handleAddTeam}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg
                         shadow-md hover:shadow-lg transform hover:-translate-y-0.5
                         transition duration-300 ease-in-out
                         focus:outline-none focus:ring-3 focus:ring-blue-400 focus:ring-offset-2"
            aria-label="Add Team"
          >
            Add Team
          </button>
        </div>
        {/* Visual feedback for character count of team name */}
        <p className="text-right text-sm text-gray-500 mt-1 mb-4">
          {teamName.length}/{MAX_TEAM_NAME_LENGTH} characters
        </p>

        {/* Display message if no teams exist, otherwise list teams */}
        {teams.length === 0 ? (
          <p className="text-center text-gray-600 text-xl py-10 bg-gray-50 rounded-xl shadow-inner border border-gray-200">
            No teams created yet. Let's build your first roster!
          </p>
        ) : (
          <div className="space-y-6">
            {teams.map(team => (
              <div key={team.id} className="bg-white shadow-lg rounded-xl p-5 border border-gray-200 hover:shadow-xl transition duration-300 ease-in-out">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center flex-wrap gap-4 mb-4">
                  <span className="text-2xl sm:text-3xl font-bold text-teal-700 break-words max-w-full sm:max-w-[calc(100%-200px)]">
                    {team.name}
                    <span className="text-base font-normal text-gray-500 ml-2">({team.players.length} players)</span>
                  </span>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    <button
                      onClick={() => toggleTeamVisibility(team.id)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600
                                 shadow-sm hover:shadow-md transition duration-200 ease-in-out
                                 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 text-sm"
                      aria-label={visibleTeamId === team.id ? `Hide players for ${team.name}` : `View players for ${team.name}`}
                    >
                      {visibleTeamId === team.id ? 'Hide Players' : 'View Players'}
                    </button>
                    <button
                      onClick={() => handleDeleteTeam(team.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600
                                 shadow-sm hover:shadow-md transition duration-200 ease-in-out
                                 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 text-sm"
                      aria-label={`Delete team ${team.name}`}
                    >
                      Delete Team
                    </button>
                  </div>
                </div>

                {visibleTeamId === team.id && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    {/* Add Player button positioned to the right */}
                    <div className="flex justify-end mb-4">
                      <button
                        onClick={() => toggleAddPlayerFormVisibility(team.id)}
                        className="p-3 bg-green-500 text-white rounded-full shadow-md
                                   hover:bg-green-600 transform hover:scale-105
                                   transition duration-300 ease-in-out
                                   focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2
                                   flex items-center justify-center w-10 h-10"
                        aria-label={addPlayerFormVisibleForTeamId === team.id ? 'Hide Add Player Form' : 'Add New Player'}
                        title={addPlayerFormVisibleForTeamId === team.id ? 'Hide Add Player Form' : 'Add New Player'}
                      >
                        <FaPlus className="text-xl" />
                      </button>
                    </div>

                    {/* Conditionally render AddPlayerForm */}
                    {addPlayerFormVisibleForTeamId === team.id && (
                      <AddPlayerForm
                        onAddPlayer={(player) => handleAddPlayerToTeam(team.id, player)}
                        players={team.players}
                      />
                    )}

                    {/* TeamPlayers component */}
                    <TeamPlayers
                      players={team.players}
                      onDeletePlayer={(index) => handleDeletePlayer(team.id, index)}
                      onMakeCaptain={(index) => handleMakeCaptain(team.id, index)}
                      onRemoveCaptain={(index) => handleRemoveCaptain(team.id, index)}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamManager;