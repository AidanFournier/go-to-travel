import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from "expo-linear-gradient";

import { HeroImage, LogoLarge } from '../assets';

const HomeScreen = () => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    return (
        <SafeAreaView className="bg-white flex-1 relative">
            
            {/* Background Image */}
            <Image
                source={HeroImage}
                className="absolute flex-1 object-fit"
            />

            {/* Header */}
            <Animatable.View animation={"bounceInDown"} duration={1600}>
                <View className="flex-row items-center justify-center space-x-2 mt-20 mb-4">
                    <View className="w-16 h-16 bg-[#E77587] rounded-full items-center justify-center">
                        <Text className="text-white text-3xl font-semibold">Go</Text>
                    </View>
                    <Text className="text-[#E77587] text-3xl font-semibold text-shadow-xl">To Travel</Text>
                </View>

                <View className="w-full flex-row justify-center ">
                    <Text className="text-[#E77587] text-[20px] font-bold">Are you ready to explore Japan?</Text>
                </View>
            </Animatable.View>

            {/* Logo */}
            <Animatable.View 
                animation={"bounceInDown"}
                duration={1400}
                className="flex-1 relative items-center justify-start mt-20"
            >
                <Image 
                    source={LogoLarge}
                    className="object-contain w-80 h-80"
                />
            </Animatable.View>

            {/* CTA Button */}
            <View className="flex-1 relative items-center justify-center">
                <TouchableOpacity
                    onPress={() => navigation.navigate("Discover")}
                    className="w-28 h-28 rounded-full items-center justify-center"
                    >
                    <Animatable.View
                        animation={"pulse"}
                        easing="ease-in-out"
                        iterationCount={"infinite"}
                        className="w-24 h-24 items-center justify-center rounded-full bg-[#336699]"
                    >
                        <Text className="text-gray-50 text-[40px] font-semibold">Go</Text>
                    </Animatable.View>
                </TouchableOpacity>
            </View>
            
        </SafeAreaView>
    );
};

export default HomeScreen;