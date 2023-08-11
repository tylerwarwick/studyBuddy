
import axios from 'axios'
import baseUrl from '../api/baseUrl';

const getToken = async () => {
  const user = await JSON.parse(localStorage.getItem("user")!);
  const token = `Bearer ${user.token}`;
  return token;
}

const url : string = baseUrl + 'deck'

class DeckService {
  static getDecks = async () => {
    const token = await getToken();
    try {
      const response = await axios.get(url, 
      {headers: {'Authorization': token}});
      return response.data;

    } 
    
    catch (error) {
      return null;
    }
  }

  static updateDeck = async (newName : string, deckId: string) => {
    
    const token = await getToken();
    let data = JSON.stringify({
      "newName": newName,
      "deckId": deckId
    });
    
    //Come back and enable put requests with axios
    const config = {
      method: 'put',
      url: url,
      maxBodyLength: Infinity,
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': token
      },
      data : data
    };


    try {
      const response = await axios.request(config);
      return response.data;

    } catch (error) {
      return null
    }
  }

  static newDeck = async (name : string) => {
    const token = await getToken();

    let data = JSON.stringify({
      "name": name
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: url,
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': token
      },
      data : data
    };
    
    try {
      const response = await axios.request(config);
      return response.data;

    } catch (error) {
      return null;
    }
  }
}




export default DeckService;