import React from "react";
import { BsPauseCircleFill, BsPlayCircleFill } from "react-icons/bs";

const PlayPause = ({
  size = "60px", // Permet de définir la taille du bouton (par défaut 60px)
  isPlaying, // Gère l'état si on est en lecture ou en pause
  songs, // Tableau de chansons
  activeSong, // Infos de la chanson en cours de lecture
  handlePlay, // Fonction pour mettre en lecture
  handlePause, // Fonction pour mettre en pause
  index, // Index de la chanson dans son tableau
}) => {
  return (
    // On check si on est en monde 'play' (isPlaying)
    // && si le titre de la chanson en cours de lecture == au titre de la chanson du tableau à l'index donné
    isPlaying && activeSong?.title == songs?.[index]?.title ? (
      <BsPauseCircleFill
        size={size}
        className="text-blue shadow-md cursor-pointer"
        onClick={handlePause}
      />
    ) : (
      <BsPlayCircleFill
        size={size}
        className="text-blue shadow-md cursor-pointer"
        onClick={handlePlay}
      />
    )
  );
};

export default PlayPause;
