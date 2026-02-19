import React from "react";
import { ALBUMS_URL } from "../../constants/apiConstant";

const Track = ({
  isPlaying,
  isActive,
  currentAlbum,
  activeSong,
  artist = "artiste inconnu",
}) => {
  // On crée nos variables
  const imgAlbum = `${ALBUMS_URL}/${currentAlbum?.imagePath}`;
  const title = activeSong?.title ?? "musique inconnu";
  const artistName = currentAlbum?.artist?.name ?? artist;
  const album = currentAlbum?.title ?? "album inconnu";

  return (
    <div className="flex flex-1 items-center justify-start">
      <div
        className={`${isPlaying && isActive ? "animate-[spin_3s_linear_infinite]" : ""} hidden sm:block w-16 h-16 mr-4`}
      >
        <img
          src={imgAlbum}
          alt={`image album ${album}`}
          className="rounded-full"
        />
      </div>
      <div className="w-[50%]">
        <p className="truncate text-white font-bold text-lg">{title}</p>
        <p className="truncate text-gray-500">{artistName}</p>
      </div>
    </div>
  );
};

export default Track;
