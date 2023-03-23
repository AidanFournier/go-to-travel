import { View, Text, SafeAreaView, Image } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { HeroImage, HeroImageSlide1, HeroImageSlide2 } from '../assets';

const HomeScreen = () => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [])

    return (
        <SafeAreaView className="bg-[#FFE6FC] flex-1 relative">
            {/* Header */}
            <View className="flex-row px-6 mt-8 items-center space-x-2">
                <View className="w-16 h-16 bg-[#336699] rounded-full items-center justify-center">
                    <Text className="text-white text-3xl font-semibold">Go</Text>
                </View>
                <Text className="text-[#336699] text-3xl font-semibold">To Travel</Text>
            </View>
            {/* Subtext */}
            <View className="px-6 mt-8 space-y-3">
                <Text className="text-[#E77587] text-[42px]">Travelling in Japan</Text>
                <Text className="text-[#E77587] text-[38px] font-bold">Is just a tap away</Text>
                <Text className="text-base">Enjoy yourself, and let us handle the details. With Go To Travel, planning your dream trip becomes a breeze.</Text>
            </View>

            {/* Image Container */}
            <View className="flex-1 relative items-center justify-center">
                <Image 
                 source={HeroImage}
                 className="object-contain"
                />
                <Image 
                 source={HeroImageSlide1}
                 className="absolute"
                />
                <Image 
                 source={HeroImageSlide2}
                 className="absolute"
                />
            </View>

        </SafeAreaView>
    );
};

export default HomeScreen