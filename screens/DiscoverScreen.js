import { View, Text, SafeAreaView, Image, ScrollView } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { REACT_NATIVE_GOOGLE_PLACES_API_KEY } from "@env";
import { Avatar, HotelIcon } from '../assets';
import MenuContainer from '../components/MenuContainer';

const Discover = () => {
    
    const navigation = useNavigation() ;

    const [type, setType] = useState("restaurants")

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [])
  
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
                        console.log(details?.geometry?.viewport);
                    }}
                    query={{
                        key: REACT_NATIVE_GOOGLE_PLACES_API_KEY,
                        language: 'en',
                    }}
                    onFail={(error) => console.error(error)}
                />
            </View>

            {/* Menu Container */}
            <ScrollView>
                <View className="flex-row items-center justify-center px-8 mt-8">
                    <MenuContainer 
                        key={"hotel"}
                        title="Hotels"
                        imageSrc={HotelIcon}
                        type={type}
                        setType={setType}
                    />
                </View>
            </ScrollView>

        </SafeAreaView>
    )
};

export default Discover;