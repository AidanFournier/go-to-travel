import { View, Text, SafeAreaView, Image, ScrollView, ActivityIndicator } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location';

import { REACT_NATIVE_GOOGLE_PLACES_API_KEY } from "@env";
import { AttractionsIcon, Avatar, BluePin, ChevronDown, HotelIcon, NotFound, RestaurantsIcon, Search } from '../assets';
import MenuContainer from '../components/MenuContainer';
import ItemCardContainer from '../components/ItemCardContainer';
import { getPlacesData, getUserLocation } from '../api';

const Discover = () => {
    
    const navigation = useNavigation();

    const [type, setType] = useState("attractions");
    const [isLoading, setIsLoading] = useState(false);
    const [mainData, setMainData] = useState([]);
    const [geoCoords, setGeoCoords] = useState({});
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [locality, setLocality] = useState();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    useEffect(() => {
        setIsLoading(true);
        getPlacesData(geoCoords, type).then(data => {
            setMainData(data);
            setInterval(() => {
                setIsLoading(false);
            }, 1000)
        });
    }, [geoCoords, type]);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
    
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            getUserLocation(location).then(userData => {
                setLocality(userData.results[0].formatted_address)
            })
        })();
    }, []);
    
    return (
        <SafeAreaView className="flex-1 bg-[#F6F6F6] relative">
            
            {/* Header */}
            <View className="flex-row items-start justify-between px-8 pt-5">
                <View className="mr-12">
                    <Text style={{ fontFamily: 'Inter_300Light'}} className="mb-2">Hello
                        <Text style={{ fontFamily: 'Inter_500Medium'}}> traveller,</Text>
                    </Text>
                    <Text style={{ fontFamily: 'Inter_600SemiBold'}} className="text-3xl text-black flex-wrap max-w-[245px]">Where will you go today?</Text>
                </View>
                <View className="rounded-full border-2 border-white shadow-lg">
                    <Image source={Avatar} className="w-12 h-12 object-cover"/>
                </View>
            </View>
            <View className="flex-row items-start px-8 pt-5 space-x-2">
                <Image source={BluePin} className="w-5 h-5 object-cover" />
                <Text>
                    <Text style={{ fontFamily: 'Inter_300Light'}}>Currently in </Text>
                    <Text style={{ fontFamily: 'Inter_500Medium'}}>{locality ? locality : "Adventure Land"}</Text>
                </Text>
            </View>

            {/* Google Places Search Input */}
            <View className="flex-row items-start bg-white mx-4 rounded-full py-1 px-4 shadow-md m-8">
                <Image source={Search} className="w-4 h-4 object-cover mr-1 mt-4"/>
                <GooglePlacesAutocomplete
                    GooglePlacesDetailsQuery={{ fields: "geometry" }}
                    fetchDetails={true}
                    placeholder='Discover a city'
                    onPress={(data, details = null) => {
                        setGeoCoords(prevCoords => ({
                            ...prevCoords,
                            bl_lat: details?.geometry?.viewport?.southwest?.lat,
                            bl_lng: details?.geometry?.viewport?.southwest?.lng,
                            tr_lat: details?.geometry?.viewport?.northeast?.lat,
                            tr_lng: details?.geometry?.viewport?.northeast?.lng
                        }));
                        console.log(geoCoords);
                    }}
                    query={{
                        key: REACT_NATIVE_GOOGLE_PLACES_API_KEY,
                        language: 'en',
                        components: "country:jp"
                    }}
                    onFail={(error) => console.error(error)}
                />
            </View>

            {/* Browse Section */}
            {isLoading ? (
                <View className="flex-1 items-center justify-center">
                    <ActivityIndicator size="large" color="#336699" />
                </View>
            ) : ( 
                <>
                    {/* Search results */}
                    <Text style={{ fontFamily: 'Inter_500Medium'}} className="text-2xl px-8 mb-4">Explore Japan</Text>
                    <ScrollView horizontal={true}>
                        <View className="px-8 flex-row items-start justify-evenly">
                            {mainData?.length > 0 ? (
                                <>
                                    {mainData?.map((data, i) => (
                                        data?.name && (
                                            <ItemCardContainer 
                                                key={i} 
                                                imageSrc={
                                                    data?.photo?.images?.medium?.url ?
                                                    data?.photo?.images?.medium?.url :
                                                    "https://res.cloudinary.com/diyvlobep/image/upload/v1680617719/restaurant-default_ml2fb9.png"
                                                } 
                                                name={data?.name}
                                                location={data?.location_string}
                                                data={data}
                                            />
                                        )
                                    ))}
                                </> 
                                ) : (
                                <>
                                    <View className="w-full h-full px-10 flex items-center space-y-4 justify-center">
                                        <Image source={NotFound} className="w-28 h-28 object-cover" />
                                        <Text style={{ fontFamily: 'Inter_500Medium'}}>Try searching by a different keyword.</Text>
                                    </View>
                                </>
                            )}
                        </View>
                    </ScrollView>
                                        
                    {/* Categories */}
                    <Text style={{ fontFamily: 'Inter_500Medium'}} className="text-2xl px-8">Categories</Text>
                    <View className="flex-row items-center justify-between px-8 mt-4 mb-8">
                        <MenuContainer 
                            key={"hotels"}
                            title="Hotels"
                            imageSrc={HotelIcon}
                            type={type}
                            setType={setType}
                        />
                        <MenuContainer 
                            key={"attractions"}
                            title="Attractions"
                            imageSrc={AttractionsIcon}
                            type={type}
                            setType={setType}
                        />
                        <MenuContainer 
                            key={"restaurants"}
                            title="Restaurants"
                            imageSrc={RestaurantsIcon}
                            type={type}
                            setType={setType}
                        />
                    </View>
                </>
            )}
        </SafeAreaView>
    );
};

export default Discover;