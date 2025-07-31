// src/components/TeamPlayers.js
import React from 'react';
import { FaCrown } from 'react-icons/fa';
import { GiGloves } from 'react-icons/gi';

const TeamPlayers = ({ players, onDeletePlayer }) => {
  return (
    <div className="bg-white rounded-lg  w-full  mx-auto">
      {players.length === 0 ? (
        <p className="text-gray-500 text-center">No players in this team yet.</p>
      ) : (
        <ul className="space-y-3">
          {players.map((player, index) => (
            <li
              key={index}
              className="flex items-center justify-between bg-gray-100 rounded px-3 py-2"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                <span className="font-semibold text-gray-800">{player.name}</span>
                <span className="text-sm text-gray-600">({player.role})</span>

                <div className="flex gap-2 ml-2 text-lg">
                  {player.isCaptain && <FaCrown className="text-yellow-500" title="Captain" />}
                  {player.isWicketKeeper && <GiGloves className="text-green-600" title="Wicket Keeper" />}
                </div>
              </div>
              <button
                onClick={() => onDeletePlayer(index)}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TeamPlayers;
