import React, { useState } from "react";
import { dataAlbumNav, IMG_LOGO } from "../../constants/appContant";
import Navlinks from "./Navlinks";

const Sidebar = () => {
  // On crée nos states
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <>
      {/* Sidebar pour la vue au dessur de 768px */}
      <div className="hidden md:flex w-60 py-10 px-4 bg-black justify-between">
        <div>
          <img
            className="w-full h-14 object-contain"
            src={IMG_LOGO}
            alt="Logo Spotify"
          />
          <h2 className="text-lg text-white font-semibold mt-10">Albums</h2>
          {/* TODO : Boucle pour afficher la liste des onglets suivant le tableau de data */}
          <Navlinks data={dataAlbumNav}/>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
