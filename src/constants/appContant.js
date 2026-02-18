import { AiOutlineHome, AiOutlineSearch } from "react-icons/ai";
import { IMAGE_URL } from "./apiConstant";
import { BiLibrary } from "react-icons/bi";

// ===========================
//    CLE DU LOCAL STORAGE
// ===========================
export const USER_INFOS = "userInfos";

// Logo de l'app
export const IMG_LOGO = `${IMAGE_URL}/logo.png`

// ===========================
// CONFIGURATION DE LA SIDEBAR
// ===========================

// Navigation principale (albums et musique)
export const dataAlbumNav = [
    {title: "Accueil", path: "/", icon: AiOutlineHome},
    {title: "Rechercher", path: "/search", icon: AiOutlineSearch},
    {title: "Bibliothèque", path: "/library", icon: BiLibrary},
]