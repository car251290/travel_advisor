import axios from "axios";

//const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'
//const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'
export const getPlacesData = async (type, sw, ne) => {
    try {
        const {data: { data } } = await axios.get (`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,{
            params: {
              bl_latitude: sw.lat,
              bl_longitude: sw.lng,
              tr_longitude: ne.lng,
              tr_latitude: ne.lat,
              query: "",
              locale: "",
            },
            headers: {
              'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_API_KEY,
              //process.env.REACT_APP_RAPIDAPI_TRAVEL_API_KEY,
              'x-rapidapi-host': 'travel-advisor.p.rapidapi.com'
            }
           
          
        });

        return data;
       // console.log(data)

    } catch (error) {
        console.log(error)

    }
}

export const getWeatherData = async (lat,lng) => {
  try {
    const {data: { data } } = await axios.get ('https://community-open-weather-map.p.rapidapi.com/find',{
      params: { lon: lng ,lat:lat },
      headers: {
        'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_API_KEY,
        'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
      },
    });


    return data;

}  catch (error) {
    console.log(error)

  }
}

export const getAirportData = async (lat,lng) => {
  try {
    const {data: { data } } = await axios.get ('https://community-open-weather-map.p.rapidapi.com/find',{
      params: {lon: lng, lat:lat},
      headers: {
        'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
        'x-rapidapi-key': '43d2beeb25msh36d559905cdc3b1p1d60b6jsn66d5f6d71470'
      }
    });

    return data;

}  catch (error) {
    console.log(error)

  }
}
