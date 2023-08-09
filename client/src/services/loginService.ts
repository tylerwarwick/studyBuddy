import axios from "axios"
import baseUrl from "../api/baseUrl"


class LoginService {
    static login = async (username : string, password : string) => {
        const response = await axios.post(baseUrl+'login', {username: username, password: password})
        return response
    }
}


export default LoginService