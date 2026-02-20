import React, { useEffect, useState } from "react";
import { USER_INFOS } from "../../constants/appContant";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserFavorites } from "../../store/user/userSlice";
import {
  playPause,
  setActiveAlbum,
  setActiveSong,
} from "../../store/player/playerSlice";
import { fetchAddRepoveFavorite } from "../../services/userFavoriteService";
import PageLoader from "../Loader/PageLoader";
import PlayPause from "../Services/PlayPause";
import {
  AiFillHeart,
  AiFillInfoCircle,
  AiOutlineHeart,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import { Collapse } from "react-collapse";
import InfoCollapse from "./InfoCollapse";

const ToolbarDetail = ({ dataAlbum }) => {
  // On déclare nos constantes
  const data = dataAlbum; // Info de l'album
  const songs = dataAlbum?.songs; // Tableau de chansons
  const albumId = dataAlbum?.id; // Id de l'album
  // Récupérion de l'id user depuis le contexte
  // -> const { userId } = useAuthContext();
  // Récupération de l'id user depuis le local storage
  const userId = localStorage.getItem(USER_INFOS)
    ? JSON.parse(localStorage.getItem(USER_INFOS)).userId
    : null;

  // On déclare nos states
  const [index, setIndex] = useState(0); // Pour l'index des chansons
  const [isLoading, setIsLoading] = useState(false); // flag pour afficher loader lors de la mise en favorie
  const [isCollapse, setIsCollapse] = useState(false); // Pour ouvrir/fermer la collapse
  const [isInList, setIsInList] = useState(false); // Pour savoir si l'album est dans la liste de favorie
  const [listArray, setListArray] = useState([]); // Tableau d'URI des albums favories au format /api/albums/id

  // On récupère les hooks
  const dispatch = useDispatch();

  // On va faire les courses! On récupère les infos du store
  const { isPlaying, activeSong } = useSelector((state) => state.player);
  // On récupère la liste des favories de l'utilisateur depuis le store
  const { loading, userFavorites } = useSelector((state) => state.users);

  // Méthode qui vérifie si l'album est dans la liste des favories
  const checkFavorite = () => {
    // Si l'utilisateur a des favories
    if (userFavorites) {
      // On récupère les ids des albums favoris reconstruit en URI
      const idArray = userFavorites.map((item) => `api/albums/${item.id}`);

      // On set la liste dans notre state listArray en supprimant les doublons
      setListArray([...new Set(idArray)]);

      // On vérifie si l'album est dans la liste
      if (idArray.includes(`api/albums/${albumId}`)) {
        setIsInList(true);
      }
    }
  };

  useEffect(() => {
    dispatch(fetchUserFavorites(userId));
    setIsLoading(false);
  }, [dispatch]);

  useEffect(() => {
    checkFavorite();
  }, [loading]);

  // Méthode lorsque l'on met pause
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  // Méthode lorsque l'on met play
  const handlePlayClick = () => {
    dispatch(setActiveSong({ songs, data, index }));
    dispatch(setActiveAlbum({ data }));
    dispatch(playPause(true));
  };

  // Méthode pour ouvrir/fermer le collapse
  const handleCollapseClick = () => {
    setIsCollapse(!isCollapse);
  };

  // Méthode pour gérer le favori (pour ajouter ou enlever un album des favoris)
  const toggleFavorite = async () => {
    // On va créer une copie de listArray
    let updatedListArray = [...listArray];

    // On vérifie si l'album est dans la liste
    if (isInList) {
      // Si il est dans la liste, on doit l'enlever
      updatedListArray = listArray.filter(
        (item) => item != `/api/albums/${albumId}`,
      );
    } else {
      // Si non, on doit l'ajouter
      updatedListArray.push(`/api/albums/${albumId}`);
    }

    // On appelle le service pour mettre à jour les favoris dans la bdd
    await fetchAddRepoveFavorite(updatedListArray, userId);

    setListArray(updatedListArray);
    setIsInList(!isInList);
  };

  return loading ? (
    <PageLoader />
  ) : (
    <>
      <div className="flex items-center gap-1 px-4 sm:px-6 lg:px-8 py-4">
        <div className="cursor-pointer">
          <PlayPause
            songs={songs}
            handlePause={handlePauseClick}
            handlePlay={() => handlePlayClick(index)}
            isPlaying={isPlaying}
            activeSong={activeSong}
            index={index}
            data={data}
          />
        </div>
        <button
          type="button"
          onClick={toggleFavorite}
          className="p-3 rounded-full text-white/70 hover:text-blue hover:scale-105 transition-all cursor-pointer"
          aria-label={isInList ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
          {isInList ? (
            <AiFillHeart size={28} className="text-blue" />
          ) : (
            <AiOutlineHeart size={28} />
          )}
        </button>
        <button
          type="button"
          onClick={handleCollapseClick}
          className="p-3 rounded-full text-white/70 hover:text-blue hover:scale-105 transition-all cursor-pointer"
          aria-label={isCollapse ? "Masquer les infos" : "Afficher les infos"}
        >
          {isCollapse ? (
            <AiFillInfoCircle size={28} className="text-blue" />
          ) : (
            <AiOutlineInfoCircle size={28} />
          )}
        </button>
      </div>
      <div className="px-4sm:px-6 lg:px-8">
        <Collapse isOpened={isCollapse}>
          <InfoCollapse dataAlbum={dataAlbum}/>
        </Collapse>
      </div>
    </>
  );
};

export default ToolbarDetail;
