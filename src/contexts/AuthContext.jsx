// ===========================
// CONTEXTE D'AUTHENTIFICATION
// ===========================
// Ce contexte gère l'authentification globale de l'application
// Il permet de partager l'état de connexion entre tous les composants
// Avantage : Eviter le prop drilling (passage de props (données) à travers plusieurs niveaux de composants)

import { createContext, useContext, useState } from "react";
import { USER_INFOS } from "../constants/appContant";

// ===========================
//    CREATION DU CONTEXTE
// ===========================
// On définit la structure du contexte avec des valeurs par défaut
const AuthContext = createContext({
  userId: "", // ID de l'utilisateur connecté
  email: "", // Email de l'utilisateur
  nickname: "", // Pseudo de l'utilisateur
  setUserId: () => {}, // Fonction pour modifier userId
  setEmail: () => {}, // Fonction pour modifier email
  setNickname: () => {}, // Fonction pour modifier nickname
  signIn: async () => {}, // Fonction de connexion
  signOut: async () => {}, // Fonction de déconnexion
});

// ===========================
//    PROVIDER DU CONTEXTE
// ===========================
// Le Provider encapsule toute l'application et rend les données accessibles
const AuthContextProvider = ({ children }) => {
  // Etats locaux pour stocker les infos utilisateurs
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");

  // ===========================
  //    METHODE DE CONNEXION
  // ===========================
  /**
   * Connecte un utilisateur et sauvegarde ses infos
   * @param {Object} user - Objet qui contient userId, email et nickname
   * exemple attendu de l'Objet:
   * {
   *  userId: 1,
   *  email: "toto@toto.com",
   *  nickname: "toto"
   * }
   */
  const signIn = async (user) => {
    try {
      // Mise à jour des états avec les données utilisateurs
      setUserId(user.userId);
      setEmail(user.email);
      setNickname(user.nickname);

      // Sauvegarde dans le localStorage de l'utilisateur
      localStorage.setItem(USER_INFOS, JSON.stringify(user));
    } catch (error) {
      throw new Error(`Erreur lors de la connexion : ${error}`);
    }
  };

  // ===========================
  //   METHODE DE DECONNEXION
  // ===========================
  /**
   * Deconnecte l'utilisateur et nettoie les données
   */
  const signOut = async () => {
    try {
      setUserId("");
      setEmail("");
      setNickname("");

      // Suppression du localStorage
      localStorage.removeItem(USER_INFOS);
    } catch (error) {
      throw new Error(`Erreur lors de la connexion : ${error}`);
    }
  };

  // ===========================
  //     VALEUR DU CONTEXTE
  // ===========================
  // Objet contenant toutes les valeurs et fonctions à partager
  const value = {
    userId,
    email,
    nickname,
    setUserId,
    setEmail,
    setNickname,
    signIn,
    signOut,
  };

  // Rendu du Provider avec les valeurs
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// ===========================
//     HOOK PERSONNALISE
// ===========================
// Hook pour faciliter l'accès au contexte dans les composants
// Usage : const {userId, signIn} = useAuthContext()
const useAuthContext = () => useContext(AuthContext);

export { AuthContext, AuthContextProvider, useAuthContext};
