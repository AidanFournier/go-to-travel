import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';

import { BlueStar, ChevronLeft, Email, Map, Medal, Phone, PriceTag, WhiteHeart } from '../assets';

const ItemScreen = ({ route }) => {
    const navigation = useNavigation();

    const data = route?.params?.param;

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    console.log(data);
  
    return (
        <SafeAreaView className="flex-1 bg-white relative">
            <ScrollView className="flex-1 px-4 py-6">

                {/* Image Card */}
                <View className="relative bg-white shadow-lg">
                    <Image
                        source={
                            {uri: 
                                data?.photo?.images?.large?.url ?
                                data?.photo?.images?.large?.url :
                                "https://res.cloudinary.com/diyvlobep/image/upload/v1680617719/restaurant-default_ml2fb9.png"
                            }
                        }
                        className="w-full h-72 object-cover rounded-2xl"
                    />

                    <View className="absolute flex-row inset-x-0 top-5 justify-between px-6">
                        <TouchableOpacity 
                            className="w-10 h-10 rounded-md items-center justify-center bg-white" 
                            onPress={() => navigation.navigate("Discover")}
                        >
                            <Image source={ChevronLeft} className="w-8 h-8 object-cover"/>
                        </TouchableOpacity>
                        <TouchableOpacity className="w-10 h-10 rounded-md items-center justify-center bg-[#336699]">
                            <Image source={WhiteHeart} className="w-8 h-8 object-cover"/>
                        </TouchableOpacity>
                    </View>

                    <View className="absolute flex-row inset-x-0 bottom-5 justify-between px-6">
                        <View className="flex-column items-start">
                            <Text className="text-[32px] font-bold text-gray-100">
                                {data?.price}
                            </Text>
                            <Text className="text-[12px] px-1 font-bold text-gray-100">
                                {data?.price_level}
                            </Text>
                        </View>
                    </View>

                    <View className="absolute px-2 py-2 placeholder:rounded-md shadow-sm bg-white items-center justify-center mr-2 right-0 -bottom-14">
                        {data?.open_now_text === "Open Now" ? 
                            <Text className="text-[#336699] font-bold px-2">{data?.open_now_text}</Text>
                            :
                            <Text className="text-[#E77587] font-bold px-2">{data?.open_now_text}</Text>
                        }
                    </View>
                </View>

                {/* Name and Location */}
                <View className="mt-6 px-2">
                    <View className="flex-row justify-between">
                        <Text className="text-[#336699] text-[24px] mr-32 font-bold pb-1 flex-wrap">
                            {data?.name}
                        </Text>
                        
                    </View>

                    <View className="flex-row items-center space-x-2 mt-2">
                        <FontAwesome5 name="map-marker-alt" size={20} color="#8C9EA6" />
                        <Text className="text-[#8C9EA6] text-[20px] font-bold">
                            {data?.location_string}
                        </Text>
                    </View>
                </View>

                {/* Bite-sized info */}
                <View className="mt-4 flex-row items-center justify-between">
                    {data?.rating && (
                        <View className="flex-row items-center space-x-2">
                            <View className="w-12 h-12 rounded-2xl bg-red-100 items-center justify-center shadow-md">
                                <Image source={BlueStar} className="w-8 h-8 object-cover"/>
                            </View>
                            <View>
                                <Text className="text-[#8C9EA6]">{data?.rating}</Text>
                                <Text className="text-[#8C9EA6]">Rating</Text>
                            </View>
                        </View>
                    )}

                    {data?.ranking && (
                        <View className="flex-row items-center space-x-2">
                            <View className="w-12 h-12 rounded-2xl bg-red-100 items-center justify-center shadow-md">
                                <Image source={Medal} className="w-8 h-8 object-cover"/>
                            </View>
                            <View>
                                <Text className="text-[#8C9EA6]">#{data?.ranking_position}</Text>
                                <Text className="text-[#8C9EA6]">In {data?.location_string}</Text>
                            </View>
                        </View>
                    )}

                    {data?.price_level && (
                        <View className="flex-row items-center space-x-2">
                            <View className="w-12 h-12 rounded-2xl bg-red-100 items-center justify-center shadow-md">
                                <Image source={PriceTag} className="w-8 h-8 object-cover"/>
                            </View>
                            <View>
                                <Text className="text-[#8C9EA6]">{data?.price_level}</Text>
                                <Text className="text-[#8C9EA6]">Price Level</Text>
                            </View>
                        </View>
                    )}
                </View>

                {/* Description */}
                {data?.description && (
                    <Text className="mt-4 tracking-wide text-[16px] font-semibold text-[#8C9EA6]">
                        {data?.description}
                    </Text>
                )}

                {/* Cuisine Tags */}
                {data?.cuisine && (
                    <View className="flex-row gap-2 items-center justify-start flex-wrap mt-4">
                        {data?.cuisine.map((cuisine) => (
                            <TouchableOpacity
                                key={cuisine.key}
                                className="px-2 py-1 rounded-md bg-[#8C9EA6]"
                            >
                                <Text className="text-white">{cuisine.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}

                {/* Contact Info */}
                <View className="px-4 py-2 space-y-2 mt-4 bg-gray-100 rounded-2xl">
                    {data?.phone && (
                        <View className="flex-row items-center space-x-6">
                            <Image source={Phone} className="w-8 h-8 object-cover"/>
                            <Text className="text-[#336699] text-lg mr-2 flex-wrap">{data?.phone}</Text>
                        </View>
                    )}
                    {data?.email && (
                        <View className="flex-row items-center space-x-6">
                            <Image source={Email} className="w-8 h-8 object-cover"/>
                            <Text className="text-[#336699] text-lg mr-4 flex-wrap">{data?.email}</Text>
                        </View>
                    )}
                    {data?.address && (
                        <View className="flex-row items-center space-x-6">
                            <Image source={Map} className="w-8 h-8 object-cover"/>
                            <Text className="text-[#336699] text-lg mr-5 flex-wrap">{data?.address}</Text>
                        </View>
                    )}
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

export default ItemScreen;