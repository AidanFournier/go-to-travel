import { View, Text, SafeAreaView, Image, TouchableOpacity, ImageBackground } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

import { HomeMorning, LogoLarge, WhitePin } from '../assets';

const HomeScreen = () => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    return (
        <SafeAreaView className="flex-1 relative">
            
            {/* Background Image */}
            <Image
                source={HomeMorning}
                className="absolute w-screen h-screen"
            />

            {/* Logo */}
            <Animatable.View animation={"bounceInDown"} duration={3000}>
                <View className="flex-row items-start justify-center space-x-2 mt-10 relative">
                    <View className="relative">
                        <Image source={WhitePin} className="w-14 h-14 flex absolute -right-0.5 -top-2"/>
                        <Text className="text-[#336699] mr-2 text-2xl font-medium">Go</Text>
                    </View>
                    <Text className="text-white text-2xl font-medium text-shadow-xl">To Travel</Text>
                </View>
            </Animatable.View>

            <Animatable.View 
                animation={"bounceInUp"}
                duration={6000}
                className="absolute bottom-0 bg-white/75  h-60 w-full rounded-t-[40px] border-solid border-white border-2">
                <View className="">

                </View>
            </Animatable.View>

            {/* Logo */}
            {/* <Animatable.View 
                animation={"bounceInDown"}
                duration={1400}
                className="flex-1 relative items-center justify-start mt-20"
            >
                <Image 
                    source={LogoLarge}
                    className="object-contain w-80 h-80"
                />
            </Animatable.View> */}

            {/* CTA Button */}
            {/* <View className="flex-1 relative items-center justify-center">
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
            </View> */}
            
        </SafeAreaView>
    );
};

export default HomeScreen;