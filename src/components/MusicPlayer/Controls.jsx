import { current } from "@reduxjs/toolkit";
import React from "react";
import {
  BsArrowRepeat,
  BsFillPauseFill,
  BsFillPlayFill,
  BsShuffle,
} from "react-icons/bs";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";

const Controls = ({
  isPlaying,
  currentSongs,
  isActive,
  repeat,
  shuffle,
  setRepeat,
  setShuffle,
  handlePlayPause,
  handleNextSong,
  handlePrevSong,
}) => {
  return (
    <div className="flex items-center justify-around md:w-36 lg:w-52 2xl:w-80">
      {/* Bouton repeat */}
      <BsArrowRepeat
        size={20}
        color={repeat ? "rgba(30,215,96,1)" : "#fff"}
        className="cursor-pointer"
        onClick={() => setRepeat(!repeat)}
      />
      {/* Bouton 'précédent' si tableau de chanson > 1 */}
      {currentSongs?.length > 1 && (
        <MdSkipPrevious
          size={30}
          color="#fff"
          className="cursor-pointer"
          onClick={handlePrevSong}
        />
      )}
      {/* Bouton 'play/pause' */}
      {isPlaying && isActive ? (
        // On affiche le bouton pause
        <BsFillPauseFill
          size={45}
          color="#fff"
          className="cursor-pointer"
          onClick={handlePlayPause}
        />
      ) : (
        <BsFillPlayFill
          size={45}
          color="#fff"
          className="cursor-pointer"
          onClick={handlePlayPause}
        />
      )}
      {/* Bouton 'suivant' si tableau de chanson > 1 */}
      {currentSongs?.length > 1 && (
        <MdSkipNext
          size={30}
          color="#fff"
          className="cursor-pointer"
          onClick={handleNextSong}
        />
      )}
      {/* Bouton 'shuffle */}
      <BsShuffle
        size={20}
        color={shuffle ? "rgba(30,215,96,1)" : "#fff"}
        onClick={() => setShuffle(!shuffle)}
      />
    </div>
  );
};

export default Controls;
