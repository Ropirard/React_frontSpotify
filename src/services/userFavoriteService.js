import axios from "axios"
import { API_URL } from "../constants/apiConstant"

export const fetchAddRepoveFavorite = async (arrayIds, userId) => {
    const dataFavorite = {
        albums: arrayIds
    }

    try {
        // On doit ajouter la méthode patch à axios
        axios.defaults.headers.patch["Content-Type"] = "application/merge-patch+json"
        const response = await axios.patch(`${API_URL}/users/${userId}`, dataFavorite)

        if (response.status === 200) {
            console.log("reponse", response)
        } else {
            console.log("Error lors du fetchAddRemoveFavorite")
        }
    } catch (error) {
        console.log(`Erreur lors du fetchAddRemoveFavorite : ${error}`)
    }
}