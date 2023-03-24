import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

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
                <Animatable.Image 
                    animation="slideInRight"
                    easing="ease-in"
                    source={HeroImageSlide1}
                    className="absolute"
                />
                <Animatable.Image 
                    animation="slideInUp"
                    easing="ease-in"
                    source={HeroImageSlide2}
                    className="absolute"
                />

                {/* CTA Button */}
                <Animatable.View animation={"pulse"} easing="ease-in-out" iterationCount={"infinite"} className="absolute bottom-70">
                    <TouchableOpacity>
                        <LinearGradient colors={['#8AC6D3', '#C2E6B1']} className="w-[110] h-[100] rounded-full items-center justify-center">
                            <Text className="text-white text-[40px] font-semibold">Go</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </Animatable.View>
            </View>

        </SafeAreaView>
    );
};

export default HomeScreen