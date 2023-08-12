import axios from 'axios'
import baseUrl from '../api/baseUrl';



const getToken = async () => {
  const user = await JSON.parse(localStorage.getItem("user")!);
  const token = `Bearer ${user.token}`;
  return token;
}

const url : string = baseUrl + 'card/'

class CardService {
    static getCards = async (deckId : string) => {
    
    //const token = await getToken();
    const token = await getToken();
      
    let config = {
        maxBodyLength: Infinity,
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': token
        },
    };
      
    try {
        const response = await axios.get(url+deckId, config);
        return response.data;

    } catch (error) {
        return null;
    }

  }

    static newCard = async (question: string, answer: string, deckId: string) => {
        const token = await getToken();

        let data = JSON.stringify({
            "question": question,
            "answer": answer,
            "deckId": deckId
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
        }
        
        try {
            const response = await axios.request(config);
            return response.data;
    
        } catch (error) {
            return null;
        }


    }

    static deleteCard = async (cardId: string) => {
        const token = await getToken();

        let data = JSON.stringify({
            "cardId": cardId
        });
      
        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: url,
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': token
            },

            data : data
        }
        
        try {
            await axios.request(config);
            return true;
    
        } catch (error) {
            return null;
        }
    }


    static editCard = async ( question: string, answer: string, isKnown: boolean, cardId: string) => {
        const token = await getToken();

        let data = JSON.stringify({
            "question": question,
            "answer": answer,
            "isKnown": isKnown,
            "cardId": cardId
        });
      
        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: url,
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': token
            },

            data : data
        }
        
        try {
            const response = await axios.request(config);
            return response.data;
    
        } catch (error) {
            return null;
        }
    }


}



export default CardService;