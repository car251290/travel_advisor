import axios from "axios";

const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'

export const getPlacesData = async ( sw, ne) => {
    try {
        const {data: { data } } = await axios.get (URL,{
            params: {
              bl_latitude: sw.lat,
              bl_longitude: sw.lng,
              tr_longitude: ne.lng,
              tr_latitude: ne.lat,
            },
            headers: {
              'x-rapidapi-key': 'c99cc830e0msh76f422f629600a2p15a917jsn2d05516f88d4',
              'x-rapidapi-host': 'travel-advisor.p.rapidapi.com'
            }
          
        });

        return data;

    } catch (error) {
        console.log(error)

    }
}
