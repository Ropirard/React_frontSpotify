import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAlbumDetail } from "../../store/album/albumSlice";
import selectAlbumData from "../../store/album/albumSelector";
import PageLoader from "../../components/Loader/PageLoader";
import DetailAlbum from "../../components/DetailAlbum";

const Detail = () => {
  // Hook pour récupérer les paramètres passés dans l'url
  const params = useParams();
  const { id } = params;
  // On récupère le hook dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAlbumDetail(id));
  }, [dispatch, id]);

  const { loading, albumDetail } = useSelector(selectAlbumData);

  return loading ? <PageLoader /> : <DetailAlbum dataAlbum={albumDetail} />;
};
export default Detail;
