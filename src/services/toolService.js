export const totalDuration = (objectData) => {
    // On va calculer le nombre de secondes pour tous les titres
    const totalSeconds = objectData?.songs && objectData?.songs.map(function(titre) {
        return parseInt(titre.duration)
    }).reduce(function(a, b){
        return a + b
    }, 0)

    // On va formater les secondes en heures, minutes, secondes
    const hours = Math.floor(totalSeconds/3600)
    const minutes = Math.floor((totalSeconds % 3600)/60)
    const seconds = totalSeconds % 60

    // On retourne la string formatée sous la forme 1h, 15min, 30s
    return hours > 0
    ? `${hours}h ${minutes}min ${seconds}s` 
    : `${minutes}min ${seconds}s`
}