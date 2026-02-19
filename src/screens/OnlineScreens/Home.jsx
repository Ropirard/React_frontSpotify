import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAlbums } from "../../store/album/albumSlice";
import selectAlbumData from "../../store/album/albumSelector";
import PageLoader from "../../components/Loader/PageLoader";
import AlbumCard from "../../components/Card/AlbumCard";

const Home = () => {
  // On récupère le hook dispatch pour pouvoir exécuter les actions du slice
  const dispatch = useDispatch();

  useEffect(() => {
    // Dans le useEffect on dispatch la méthode fetchAlbums pour récupérer les albums en bdd
    dispatch(fetchAlbums());
  }, [dispatch]);

  // On récupère les données des albums et le loading avec useSelector
  const { loading, albums } = useSelector(selectAlbumData);

  const dataAlbum = albums.member;

  // On récupère les données du slice player
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  return loading ? (
    <PageLoader />
  ) : (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Tous les albums
      </h2>
      <div className="flex flex-wrap justify-center sm:justify-start gap-8 mx-2">
        {dataAlbum &&
          dataAlbum.map((data, index) => (
            <AlbumCard
              key={index} // key : pour que chaque enfant de la boucle soit unique
              data={data} // data : données de l'album
              songs={data?.songs} // songs : tableau de chanson de l'album
              isPlaying={isPlaying} // isPlaying : l'état si on est en lecture ou en pause
              activeSong={activeSong} // activeSongs : infos de la chanson en cours de lecture
              index={0}
            />
          ))}
      </div>
    </div>
  );
};

export default Home;
