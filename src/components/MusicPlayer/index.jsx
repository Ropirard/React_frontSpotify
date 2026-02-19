import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { playPause, nextSong, prevSong } from "../../store/player/playerSlice";
import Track from "./Track";
import Controls from "./Controls";
import SeekBar from "./SeekBar";
import Player from "./Player";
import VolumeBar from "./VolumeBar";

const MusicPlayer = () => {
  // On va récupérer toutes les données du slice player
  const {
    activeSong,
    currentSongs,
    currentAlbum,
    currentIndex,
    isActive,
    isPlaying,
  } = useSelector((state) => state.player);

  // On va déclarer nos states
  const [shuffle, setShuffle] = useState(false); // Mode aléatoire
  const [repeat, setRepeat] = useState(false); // Mode répétition
  const [volume, setVolume] = useState(0.3); // Etat du volume
  const [duration, setDuration] = useState(0); // Durée de la musique
  const [seekTime, setSeekTime] = useState(0); // Temps de la musique
  const [appTime, setAppTime] = useState(0); // Temps actuel de la musique

  // On récupère le hook dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    // Si le store contient un tableau de chansons, on dispatch playPause à true
    if (currentSongs?.length) dispatch(playPause(true));
  }, [currentIndex]); // Si currentIndex change, on recharge le composant

  // On définit nos méthodes
  // Méthode pour gérer l'état du play/pause
  const handlePlayPause = () => {
    if (!isActive) return;

    // Si une chanson est active, on dispatch playPayse
    isPlaying ? dispatch(playPause(false)) : dispatch(playPause(true));
  };

  // Méthode pour avancer d'une piste
  const handleNextSong = () => {
    if (!shuffle) {
      dispatch(nextSong((currentIndex + 1) % currentSongs?.length));
    } else {
      dispatch(nextSong(Math.floor(Math.random() * currentSongs?.length)));
    }
  };

  // Méthode pour reculer d'une piste
  const handlePrevSong = () => {
    if (currentIndex === 0) {
      // Si currentIndex == 0 on revoit sur le dernier élément du tableau
      dispatch(prevSong(currentSongs?.length - 1));
    } else if (shuffle) {
      dispatch(prevSong(Math.floor(Math.random() * currentSongs?.length)));
    } else {
      dispatch(prevSong(currentIndex - 1));
    }
  };

  return (
    <div className="relative sm:px-12 px-8 w-full flex -items-center justify-between mt-5">
      <Track
        isPlaying={isPlaying}
        isActive={isActive}
        currentAlbum={currentAlbum}
        activeSong={activeSong}
      />
      <div className="flex flex-1 flex-col items-center justify-center">
        <Controls
          isPlaying={isPlaying}
          currentSongs={currentSongs}
          isActive={isActive}
          repeat={repeat}
          shuffle={shuffle}
          setRepeat={setRepeat}
          setShuffle={setShuffle}
          handlePlayPause={handlePlayPause}
          handleNextSong={handleNextSong}
          handlePrevSong={handlePrevSong}
        />
        {/* Barre de progression de la musique */}
        <SeekBar
          value={appTime} // La valeur actuelle de la musique
          min="0" // La valeur minimum
          max={duration} // La valeur maximum
          onInput={(event) => setSeekTime(event.target.value)} // Récupérer la position de la barre de lecture
          setSeekTime={setSeekTime} // Changer la valeur de la barre de lecture
          appTime={appTime}
        />
        {/* Player */}
        <Player
          activeSong={activeSong} // Chanson active
          volume={volume} // Volume
          isPlaying={isPlaying} // Le player tourne ?
          seekTime={seekTime} // Temps actuel de la musique
          repeat={repeat} // Doit-on boucler la musique en cours ?
          currentIndex={currentIndex} // Index de la musique actuelle
          onEnded={handleNextSong} // Passer à la musique suivante à la fin de la musique actuelle
          onTimeUpdate={(event) => setAppTime(event.target.currentTime)} // Modifier en temps réelle la durée/seekbar
          onLoadedData={(event) => setDuration(event.target.duration)} // Récupération de la durée de la musique
        />
      </div>
      <VolumeBar
        value={volume}
        min="0"
        max="1"
        onChange={(event) => setVolume(event.target.value)}
        setVolume={setVolume}
      />
    </div>
  );
};

export default MusicPlayer;
