import axios from "axios"

const logout = () => {

    axios.get("http://localhost:4000/logout", { withCredentials: true }).then((res) => {
      window.location.href = "/"


    })
  }


export default logout

