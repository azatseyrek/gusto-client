import axios from "axios"



export const logout = () => {
    
    axios.get("http://localhost:4000/logout", { withCredentials: true }).then((res) => {
        window.location.href = "/"
    })
}




