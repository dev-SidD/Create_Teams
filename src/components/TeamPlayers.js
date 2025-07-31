import React from 'react';
import { FaCrown } from 'react-icons/fa'; // Import the Crown icon
import { GiGloves } from 'react-icons/gi'; // Import the Gloves icon
import { MdOutlineStarBorder, MdOutlineStar } from 'react-icons/md'; // Icons for make/remove captain

const TeamPlayers = ({ players, onDeletePlayer, onMakeCaptain, onRemoveCaptain }) => {
  return (
    <div >
     
      {players.length === 0 ? (
        <p className="text-gray-500 text-center italic py-6 text-lg">
          No players in this team yet. Add some champions!
        </p>
      ) : (
        <ul className="space-y-4">
          {players.map((player, index) => (
            <li
              key={index}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between
                         bg-white rounded-lg px-4 py-3 shadow-sm border border-gray-100
                         hover:border-blue-300 hover:shadow-md transition duration-200 ease-in-out"
            >
              <div className="flex items-center flex-wrap gap-x-2 gap-y-1 mb-2 sm:mb-0">
                <span className="font-bold text-lg text-gray-900">{player.name}</span>
                {player.role && <span className="text-sm text-gray-600 ml-1">({player.role})</span>}

                <div className="flex gap-2 ml-0 sm:ml-2 text-xl">
                  {player.isCaptain && <FaCrown className="text-yellow-500" title="Captain" aria-label="Captain" />}
                  {player.isWicketKeeper && <GiGloves className="text-green-600" title="Wicket Keeper" aria-label="Wicket Keeper" />}
                </div>
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {player.isCaptain ? (
                  <button
                    onClick={() => onRemoveCaptain(index)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-md text-sm
                               border border-yellow-300 hover:bg-yellow-200 transition duration-200 ease-in-out
                               focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                    aria-label={`Remove ${player.name} as Captain`}
                  >
                    <MdOutlineStar className="text-lg" /> Remove Captain
                  </button>
                ) : (
                  <button
                    onClick={() => onMakeCaptain(index)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-md text-sm
                               border border-blue-300 hover:bg-blue-200 transition duration-200 ease-in-out
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    aria-label={`Make ${player.name} Captain`}
                  >
                    <MdOutlineStarBorder className="text-lg" /> Make Captain
                  </button>
                )}
                <button
                  onClick={() => onDeletePlayer(index)}
                  className="text-red-600 hover:text-red-800 text-sm py-1.5 px-3 rounded-md
                             bg-red-50 hover:bg-red-100 border border-red-200
                             transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  aria-label={`Delete player ${player.name}`}
                >
                  Remove Player
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TeamPlayers;