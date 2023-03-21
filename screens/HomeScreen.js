import { View, Text, SafeAreaView } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [])

    return (
        <SafeAreaView className="bg-white flex-1 relative">
            {/* Header */}
            <View className="flex-row px-6 mt-8 items-center space-x-2">
                <View className="w-16 h-16 bg-[#f78172] rounded-full items-center justify-center">
                    <Text className="text-white text-3xl font-semibold">Go</Text>
                </View>
                <Text className="text-[#E8AF0A] text-3xl font-semibold">To Travel</Text>
            </View>
            {/* Subtext */}
            <View className="px-6 mt-8 space-y-3">
                <Text className="text-[#f78172] text-[42px]">Your next travel destination</Text>
                <Text className="text-[#E8AF0A] text-[38px] font-bold">is a tap away</Text>
                <Text className="text-base">Enjoy your trip, and let us handle the details. With Go To Travel, planning your next outing becomes a breeze.</Text>
            </View>

        </SafeAreaView>
    );
};

export default HomeScreen