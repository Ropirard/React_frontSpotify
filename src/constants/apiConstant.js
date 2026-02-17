// ====================
// CONSTANTES DE L'API
// ====================
// Ce fchier centralise toutes les url de l'API Symfony
// L'avantage : Modifier l'url de base en un seul endroit

// Url racine du serveur backend
export const API_ROOT = "http://localhost:8088";

// L'url de base de l'API Plateform
export const API_URL = `${API_ROOT}/api`

// ==============================
// URLS DES RESSOURCES STATIQUES
// ==============================

// Images générales (logo, etc..)
export const IMAGE_URL = `${API_ROOT}/images`

// Avatars des utilisateurs
export const AVATAR_URL = `${IMAGE_URL}/avatars`

// Cover des albums
export const ALBUMS_URL = `${API_ROOT}/upload/images/albums`

// Photos des artistes
export const ARTIST_URL = `${API_ROOT}/upload/images/artists`

// Fichiers audio MP3 
export const MUSIC_URL = `${API_ROOT}/upload/files/music`



