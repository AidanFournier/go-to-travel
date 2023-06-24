import { View, Text, SafeAreaView, Image, ScrollView, ActivityIndicator } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { REACT_NATIVE_GOOGLE_PLACES_API_KEY } from "@env";
import { AttractionsIcon, Avatar, ChevronDown, HotelIcon, NotFound, RestaurantsIcon, Search } from '../assets';
import MenuContainer from '../components/MenuContainer';
import ItemCardContainer from '../components/ItemCardContainer';
import { getPlacesData } from '../api';

const Discover = () => {
    
    const navigation = useNavigation();

    const [type, setType] = useState("restaurants");
    const [isLoading, setIsLoading] = useState(false);
    const [mainData, setMainData] = useState([]);
    const [geoCoords, setGeoCoords] = useState({});

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
    
    return (
        <SafeAreaView className="flex-1 bg-[#F6F6F6] relative">
            
            {/* Header */}
            <View className="flex-row items-start justify-between px-8 pt-5">
                <View className="mr-12">
                    <Text className="text-xl text-black mb-4">Hello
                        <Text className="text-xl text-black font-bold"> Olivia,</Text>
                    </Text>
                    <Text className="text-3xl font-extrabold text-black flex-wrap max-w-[260px]">Where do you want to go today?</Text>
                </View>
                <Image source={Avatar} className="w-12 h-12 rounded-full object-cover border-solid border-2 border-white"/>
            </View>

            {/* Google Places Search Input */}
            <View className="flex-row items-start bg-white mx-4 rounded-xl py-1 px-4 shadow-md m-8">
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
                    <Text className="text-2xl px-8 mb-4">Explore Japan</Text>
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
                                    <View className="w-full h-[400px] items-center space-y-8 justify-center">
                                        <Image source={NotFound} className="w-32 h-32 object-cover" />
                                        <Text className="text-2xl text-[#336699] font-semibold">Eh! No data found.</Text>
                                    </View>
                                </>
                            )}
                        </View>
                    </ScrollView>
                                        
                    {/* Categories */}
                    <Text className="text-2xl px-8">Categories</Text>
                    <View className="flex-row items-center justify-between px-8 mt-4">
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