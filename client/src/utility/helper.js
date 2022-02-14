import axios from "axios"

export const logout = () => {
    
    axios.get("https://gusto-movie-backend.herokuapp.com/logout", { withCredentials: true }).then((res) => {
        window.location.href = "/"
    })
}




