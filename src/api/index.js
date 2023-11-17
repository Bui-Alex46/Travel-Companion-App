import axios from 'axios';
// Api fetch call
// Restauraunts in boundary
const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'

  

export const getPlacesData = async (sw, ne) => {
    try{
        // Destructuring the data
       const {data: {data} } = await axios.get(URL, {
            params: {
              bl_latitude: sw.lat,
              tr_latitude: ne.lat,
              bl_longitude: sw.lng,
              tr_longitude: ne.lng,
            },
            headers: {
              'X-RapidAPI-Key': 'deb82a2a01mshba74d54cf126919p1ffdd4jsn437cfaa6ec2d',
              'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
            }
       });
     return data;
    }catch(error){
        console.log(error)
    }
}