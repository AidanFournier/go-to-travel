import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { FontAwesome5 } from '@expo/vector-icons';

import { REACT_NATIVE_GOOGLE_PLACES_API_KEY } from "@env";
import { AttractionsIcon, Avatar, HotelIcon, NotFound, RestaurantsIcon } from '../assets';
import MenuContainer from '../components/MenuContainer';
import ItemCardContainer from '../components/ItemCardContainer';
import { getPlacesData } from '../api';

const Discover = () => {
    
    const navigation = useNavigation() ;

    const [type, setType] = useState("restaurants");
    const [isLoading, setIsLoading] = useState(false);
    const [mainData, setMainData] = useState([]);
    const [bl_lat, setBl_lat] = useState(null);
    const [bl_lng, setBl_lng] = useState(null);
    const [tr_lat, setTr_lat] = useState(null);
    const [tr_lng, setTr_lng] = useState(null);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [])

    useEffect(() => {
      setIsLoading(true);
      getPlacesData(bl_lat, bl_lng, tr_lat, tr_lng, type).then(data => {
        setMainData(data);
        setInterval(() => {
            setIsLoading(false);
        }, 1000)
      });
    }, [bl_lat, bl_lng, tr_lat, tr_lng, type]);
    
  
    return (
        <SafeAreaView className="flex-1 bg-white relative">
            {/* Header */}
            <View className="flex-row items-center justify-between px-8 pt-5">
                <View>
                    <Text className="text-[38px] text-[#336699] font-bold">Discover</Text>
                    <Text className="text-[32px] text-[#336699]">the beauty of Japan</Text>
                </View>

                <View className="w-12 h-12 bg-gray-400 rounded-full items-center justify-center shadow-lg">
                    <Image source={Avatar} className="w-full h-full rounded-full object-cover"/>
                </View>
            </View>

            {/* Google Places Search Input */}
            <View className="flex-row items-center bg-white mx-4 rounded-xl py-1 px-4 shadow-lg mt-5">
                <GooglePlacesAutocomplete
                    GooglePlacesDetailsQuery={{ fields: "geometry" }}
                    fetchDetails={true}
                    placeholder='Search'
                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        setBl_lat(details?.geometry?.viewport?.southwest?.lat);
                        setBl_lng(details?.geometry?.viewport?.southwest?.lng);
                        setTr_lat(details?.geometry?.viewport?.northeast?.lat);
                        setTr_lng(details?.geometry?.viewport?.northeast?.lng);
                    }}
                    query={{
                        key: REACT_NATIVE_GOOGLE_PLACES_API_KEY,
                        language: 'en',
                        components: "country:jp"
                    }}
                    onFail={(error) => console.error(error)}
                />
            </View>

            {/* Menu Container */}
            {isLoading ? (
                <View className="flex-1 items-center justify-center">
                    <ActivityIndicator size="large" color="#E77587" />
                </View>
            ) : ( 
                <ScrollView>
                    <View className="flex-row items-center justify-between px-8 mt-8">
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

                    <View>
                        <View className="flex-row items-center justify-between px-8 mt-8">
                            <Text className="text-[#336699] text-[28px] font-bold">Top Results</Text>
                            <TouchableOpacity className="flex-row items-center justify-center space-x-2">
                                <Text className="text-[#336699] text-[20px] font-bold">Explore</Text>
                                <FontAwesome5 name="long-arrow-alt-right" size={24} color="#E77587" />
                            </TouchableOpacity>
                        </View>
                    

                        <View className=" px-1 mt-8 flex-row items-center justify-evenly flex-wrap">
                            {mainData?.length > 0 ? (
                                <>
                                    {mainData?.map((data, i) => (
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
                    </View>
                </ScrollView>
            )}
        </SafeAreaView>
    );
};

export default Discover;