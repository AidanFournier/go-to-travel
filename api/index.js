import axios from "axios";
import { REACT_NATIVE_TRAVEL_ADVISOR_API_KEY } from "@env"

export const getPlacesData = async ( bl_lat, bl_lng, tr_lat, tr_lng, type ) => {
    
    const url = `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`;
    
    const headers = {
        'X-RapidAPI-Key': REACT_NATIVE_TRAVEL_ADVISOR_API_KEY,
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
    }

    const params = {
        bl_latitude: bl_lat ? bl_lat : '34.5776326',
        tr_latitude: tr_lat ? tr_lat : '36.4408483',
        bl_longitude: bl_lng ? bl_lng : '138.2991098',
        tr_longitude: tr_lng ? tr_lng : '141.2405144',
        restaurant_tagcategory_standalone: '10591',
        restaurant_tagcategory: '10591',
        limit: '30',
        currency: 'USD',
        open_now: 'false',
        lunit: 'km',
        lang: 'en_US'
    }
    
    try {
        const response = await axios.get(url, {headers: headers, params: params});
        const data = response.data.data;
        return data;
    } catch (error) {
        console.log(error.response);
    }
};
