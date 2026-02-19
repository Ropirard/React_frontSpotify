import React from "react";
import { ARTIST_URL, ALBUMS_URL } from "../../constants/apiConstant";
import { Link } from "react-router-dom";
import { totalDuration } from "../../services/toolService";

const HeaderInfo = ({ dataAlbum }) => {
  const imgPath = dataAlbum?.artist?.imagePath
    ? `${ARTIST_URL}/${dataAlbum?.artist?.imagePath}`
    : `${ALBUMS_URL}/${dataAlbum?.imagePath}`;

  // On format la date de sortie (on ne récupère que l'année)
  const releaseDate = dataAlbum?.releaseDate
    ? new Date(dataAlbum?.releaseDate).getFullYear().toString()
    : "Date inconnue";

  // On définit le nombre de titre par album
  const nbTitle = dataAlbum?.songs
    ? dataAlbum?.songs?.length > 1
      ? `${dataAlbum?.songs?.length} titres`
      : `${dataAlbum?.songs?.length} titre`
    : "0 titre";

  // Mini component pour le séparateur
  const separator = <span className="text-gray-500 mx-1.5">•</span>;

  return (
    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-0 gap-y-1 mt-3">
      <Link to={"#"} className="inline-flex items-center gap-2 group">
        <img
          src={imgPath}
          alt={dataAlbum?.artist?.name ?? "Artiste inconnu"}
          className="w-8 h-8 rounded-full object-cover ring-1 ring-white/20 group-hover:ring-blue transition"
        />
        <span className="font-semibold text-white text-sm sm:text-base group-hover:text-blue transition">
          {dataAlbum?.artist?.name ?? "Artiste inconnu"}
        </span>
      </Link>
      {separator}
      <span className="text-gray-400 text-sm sm:text-base">{releaseDate}</span>
      {separator}
      <span className="text-gray-400 text-sm sm:text-base">{nbTitle}</span>
      {separator}
      <span className="text-gray-400 text-sm sm:text-base">{dataAlbum?.songs?.length > 0 ? totalDuration(dataAlbum) : '-'}</span>
    </div>
  );
};

export default HeaderInfo;
