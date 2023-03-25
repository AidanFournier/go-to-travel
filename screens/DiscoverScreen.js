import { View, Text, SafeAreaView, Image } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
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
            <View className="flex-row items-center justify-between px-8 pt-5">
                <View>
                    <Text className="text-[38px] text-[#336699] font-bold">Discover</Text>
                    <Text className="text-[32px] text-[#336699]">the beauty of Japan</Text>
                </View>

                <View className="w-12 h-12 bg-gray-400 rounded-full items-center justify-center shadow-lg">
                    <Image source={Avatar} className="w-full h-full rounded-full object-cover"/>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Discover