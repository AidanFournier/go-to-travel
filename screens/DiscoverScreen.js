import { View, Text, SafeAreaView, Image } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { REACT_NATIVE_GOOGLE_PLACES_API_KEY } from "@env";
import { Avatar } from '../assets';

const Discover = () => {
    
    const navigation = useNavigation() ;

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
                    placeholder='Search'
                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        console.log(data, details);
                    }}
                    query={{
                        key: REACT_NATIVE_GOOGLE_PLACES_API_KEY,
                        language: 'en',
                    }}
                />
            </View>
        </SafeAreaView>
    )
}

export default Discover