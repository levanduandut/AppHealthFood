import axios from 'axios';

const options = {
    method: 'GET',
    url: 'https://nutrition-by-api-ninjas.p.rapidapi.com/v1/nutrition',
    params: {
        query: 'snakehead fish soup'
    },
    headers: {
        'X-RapidAPI-Key': '10a70d537bmsh80e40618efcf552p179c73jsn70e5aa136bdc',
        'X-RapidAPI-Host': 'nutrition-by-api-ninjas.p.rapidapi.com'
    }
};

try {
    const response = await axios.request(options);
    console.log(response.data);
} catch (error) {
    console.error(error);
}


