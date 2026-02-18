import React, { useState } from "react";
import {
  dataAlbumNav,
  dataUserNav,
  IMG_LOGO,
  styleIcon,
} from "../../constants/appContant";
import Navlinks from "./Navlinks";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { RiCloseLine } from "react-icons/ri";
import { HiOutlineMenu } from "react-icons/hi";

// Mini composant pour la déconnexion
const Logout = () => {
  const { signOut } = useAuthContext();
  const navigate = useNavigate();

  // On se crée la méthode de déconnexion
  const handleLogout = () => {
    signOut();
    navigate("/");
  };

  return (
    <button
      onClick={() => {
        const confirmLogout = window.confirm(
          "Voulez-vous vraiment vous déconnecter ?",
        );
        if (confirmLogout) handleLogout();
      }}
      className="link-sidebar"
    >
      <FiLogOut className="mr-2" style={styleIcon} />
      Déconnexion
    </button>
  );
};

const Sidebar = () => {
  // On crée nos states
  const [mobileMenu, setMobileMenu] = useState(false);
  // On récupère l'id de l'utilisateur connecté grâce au contexte d'identification
  const { userId } = useAuthContext();

  return (
    <>
      {/* Sidebar pour la vue au dessur de 768px */}
      <div className="hidden md:flex flex-col w-60 py-10 px-4 bg-black justify-between">
        <div>
          <img
            className="w-full h-14 object-contain"
            src={IMG_LOGO}
            alt="Logo Spotify"
          />
          <h2 className="text-lg text-white font-semibold mt-10">Albums</h2>
          {/* TODO : Boucle pour afficher la liste des onglets suivant le tableau de data */}
          <Navlinks data={dataAlbumNav} marginTop={"mt-4"} />

          <h2 className="text-lg text-white font-semibold mt-10">
            Utilisateur
          </h2>
          <Navlinks data={dataUserNav} marginTop={"mt-4"} userId={userId} />
        </div>
        {/* Ajout du bouton de déconnexion */}
        <div className="mt-5">
          <Logout />
        </div>
      </div>
      {/* Gestion des incons pour ouvrir/fermer le menu en petit écran */}
      <div className="absolute md:hidden block top-6 right-3">
        {mobileMenu ? (
          <RiCloseLine
            style={styleIcon}
            className="text-white mr-2"
            onClick={() => setMobileMenu(false)}
          />
        ) : (
          <HiOutlineMenu
            style={styleIcon}
            className="text-white mr-2"
            onClick={() => setMobileMenu(true)}
          />
        )}
      </div>
      {/* Sidebar pour la vue en dessous de 768px */}
      <div className={`z-20 absolute top-0 h-screen w-2/3 bg-linear-to-tl from-white_01 to-black backdrop-blur-lg md:hidden smooth-transition duration-500 ${mobileMenu ? 'left-0' : '-left-full'} flex flex-col justify-between p-6`}>
        <div>
          <img
            className="w-full h-14 object-contain"
            src={IMG_LOGO}
            alt="Logo Spotify"
          />
          <h2 className="text-lg text-white font-semibold mt-10">Albums</h2>
          {/* TODO : Boucle pour afficher la liste des onglets suivant le tableau de data */}
          <Navlinks data={dataAlbumNav} marginTop={"mt-4"} />

          <h2 className="text-lg text-white font-semibold mt-10">
            Utilisateur
          </h2>
          <Navlinks data={dataUserNav} marginTop={"mt-4"} userId={userId} />
        </div>
        {/* Ajout du bouton de déconnexion */}
        <div className="mt-5">
          <Logout />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
