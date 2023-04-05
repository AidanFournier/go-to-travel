import axios from "axios";
import { REACT_NATIVE_TRAVEL_ADVISOR_API_KEY } from "@env"

const url = `https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary`;
const headers = {
    'X-RapidAPI-Key': REACT_NATIVE_TRAVEL_ADVISOR_API_KEY,
    'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
}
const params = {
    bl_latitude: '25.15543993776612',
    tr_latitude: '25.41257834546226',
    bl_longitude: '51.39587210719369',
    tr_longitude: '51.62812119686502',
    restaurant_tagcategory_standalone: '10591',
    restaurant_tagcategory: '10591',
    limit: '30',
    currency: 'USD',
    open_now: 'false',
    lunit: 'km',
    lang: 'en_US'
}

export const getPlacesData = async () => {
    try {
        const response = await axios.get(url, {headers: headers, params: params});
        const data = response.data.data;
        return data;
    } catch (error) {
        console.log(error.response);
    }
};
