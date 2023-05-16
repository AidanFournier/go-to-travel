import { View, Text, SafeAreaView, Image, TouchableOpacity, ImageBackground } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

import { Banner, HeroImage, HeroImageSlide1, HeroImageSlide2, LogoLarge } from '../assets';

const HomeScreen = () => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [])

    return (
        <SafeAreaView className="bg-white flex-1 relative">
            <Image
                source={HeroImage}
                className="absolute flex-1 object-fit"
            />

            <View className="w-full flex-row justify-center mt-24">
                <Text className="text-[#E77587] text-[20px] font-bold">Are you ready to explore Japan?</Text>
            </View>
            
            {/* Logo Container */}
            <View className="flex-1 relative items-center justify-start mt-24">
                <Image 
                    source={LogoLarge}
                    className="object-contain w-80 h-80"
                />
            </View>

            <View className="flex-1 relative items-center justify-center mb-10">
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

            {/* Header */}
            

            {/* <ImageBackground source={Banner} className="absolute h-80 w-80 -left-16 bottom-0">
                <View className="flex-row ml-20 items-center space-x-2 absolute left-0 bottom-32">
                    <View className="w-16 h-16 bg-[#E77587] rounded-full items-center justify-center">
                        <Text className="text-white text-3xl font-semibold">Go</Text>
                    </View>
                    <Text className="text-white text-3xl font-semibold">To Travel</Text>
                </View>
            </ImageBackground> */}

            {/* <View className="flex-row px-6 mt-4 items-center space-x-2">
                <View className="w-16 h-16 bg-[#336699] rounded-full items-center justify-center">
                    <Text className="text-white text-3xl font-semibold">Go</Text>
                </View>
                <Text className="text-[#336699] text-3xl font-semibold">To Travel</Text>
            </View> */}

            {/* Subtext */}
            {/* <View className="px-6 mt-8 space-y-3"> */}
                {/* <Text className="text-[#E77587] text-[42px]">Are you ready to see Japan?</Text> */}
                
                {/* <Text className="text-base">Enjoy yourself, and let us handle the details. With Go To Travel, planning your dream trip becomes a breeze.</Text> */}
            {/* </View> */}

            {/* Image Container */}
            {/* <View className="flex-1 relative items-center justify-center"> */}
                {/* <Image 
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
                /> */}

                {/* CTA Button */ }
                {/* <Animatable.View animation={"pulse"} easing="ease-in-out" iterationCount={"infinite"} className="absolute bottom-70">
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Discover")}
                    >
                        <LinearGradient colors={['#8AC6D3', '#C2E6B1']} className="w-[110] h-[100] rounded-full items-center justify-center">
                            <Text className="text-white text-[40px] font-semibold">Go</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </Animatable.View>  */}
            {/* /* </View> */}
            
        </SafeAreaView>
    );
};

export default HomeScreen