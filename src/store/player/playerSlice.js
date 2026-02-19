import { createSlice } from "@reduxjs/toolkit";
import PlayPause from "../../components/Services/PlayPause";

const initialState = {
    activeSong: {}, // L'objet chanson actuel en cours de lecture
    currentAlbum: [], // Infos de l'album en cours de lecture
    currentIndex: 0, // Index de la chanson dans son tableau
    currentSongs: [], // Tableau de toutes les chansons de la playlist/album
    isActive: false, // Le player est-il actif ?
    isPlaying: false // La musique est-elle en lecture (true) ou en pause (false) ?
}

const playerSlice = createSlice({
    name: "player",
    initialState,
    reducers: {
        /**
         * Active une chanson et initialise le player
         */
        setActiveSong: (state, action) => {
            // Stock la chanson à l'index donnée
            state.activeSong = action.payload?.songs[action.payload.index]
            // Stock toutes les chansons de la playlist/album
            state.currentSongs = action.payload?.songs
            // Stock l'index de la chanson active
            state.currentIndex= action.payload?.index
            // On active le player
            state.isActive = true;
        },

        /**
         * Stock les informations de l'album en cours
         */
        setActiveAlbum: (state, action) => {
            state.currentAlbum = action.payload?.data
        },

        /**
         * Passe à la chanson suivante dans la playlist
         */
        nextSong: (state, action) => {
            // Met à jour la chanson active
            state.activeSong = state.currentSongs[action.payload]
            // Met à jour l'index
            state.currentIndex = action.payload
            // Met à jour l'album si la chanson en a un 
            // Certaine musique peuvent ne pas avoir d'album associé (cas du single)
            state.currentAlbum = state.currentSongs[action.payload]?.album 
            ? state.currentSongs[action.payload]?.album 
            : state.currentAlbum

            state.isActive = true;
        },

        /**
         * Passe à la chanson précédente dans la playlist
         */
        prevSong: (state, action) => {
            // Met à jour la chanson active
            state.activeSong = state.currentSongs[action.payload]
            // Met à jour l'index
            state.currentIndex = action.payload
            // Met à jour l'album si la chanson en a un 
            // Certaine musique peuvent ne pas avoir d'album associé (cas du single)
            state.currentAlbum = state.currentSongs[action.payload]?.album 
            ? state.currentSongs[action.payload]?.album 
            : state.currentAlbum

            state.isActive = true;
        },

        /**
         * Bascule entre play et pause
         */
        playPause: (state, action) => {
            state.isPlaying = action.payload
        }
    }
})

export const {setActiveSong, setActiveAlbum, nextSong, prevSong, playPause} = playerSlice.actions
export default playerSlice.reducer;