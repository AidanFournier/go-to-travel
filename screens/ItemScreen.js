import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity, ImageBackground, Linking, Platform } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { BlueStar, ChevronLeftWhite, Email, Link, Map, Medal, Phone, PriceTag, WhiteHeart } from '../assets';

const ItemScreen = ({ route }) => {
    const navigation = useNavigation();

    const data = route?.params?.param;

    const [ text, setText ] = useState(data.description.slice(0, 180));
    const [ readMore, setReadMore ] = useState(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    const openMap = async (address=data?.address, city=data?.address_obj.city, zipCode=data?.address_obj.postalcode ) => {
        const destination = encodeURIComponent(`${address}`);  
        const provider = Platform.OS === 'ios' ? 'apple' : 'google'
        const link = `http://maps.google.com/?daddr=${destination}`;
    
        try {
            const supported = await Linking.canOpenURL(link);
    
            if (supported) Linking.openURL(link);
        } catch (error) {
            console.log(error);
        }
    };
  
    return (
        <SafeAreaView className="flex-1 bg-white relative">
            <ScrollView className="flex-1 px-4 py-6">

                {/* Image Card */}
                <View className="relative bg-white rounded-2xl shadow-lg">
                        <ImageBackground
                            source={
                                {uri: 
                                    data?.photo?.images?.large?.url ?
                                    data?.photo?.images?.large?.url :
                                    "https://res.cloudinary.com/diyvlobep/image/upload/v1680617719/restaurant-default_ml2fb9.png"
                                }
                            }
                            imageStyle={{ borderRadius: 18}}
                            className="w-full h-72 object-cover rounded-2xl"
                        >
                            <LinearGradient
                                colors={[ 'rgba(255,255,255,0)', 'rgba(0,0,0,0.7)']}
                                style={{borderRadius: 18}}
                                className="w-full h-72 object-cover"
                            ></LinearGradient>
                        </ImageBackground>
                    
                    {/* Image Card Buttons */}
                    <View className="absolute flex-row inset-x-0 top-4 justify-between px-4">
                        <TouchableOpacity 
                            className="w-12 h-12 rounded-full items-center justify-center bg-slate-500/[0.40]" 
                            onPress={() => navigation.navigate("Discover")}
                        >
                            <Image source={ChevronLeftWhite} className="w-6 h-6 object-cover"/>
                        </TouchableOpacity>

                        <TouchableOpacity className="w-12 h-12 rounded-full items-center justify-center bg-slate-500/[0.40]">
                            <Image source={WhiteHeart} className="w-6 h-6 object-cover"/>
                        </TouchableOpacity>
                    </View>

                    <View className="absolute flex-row inset-x-0 bottom-5 justify-between px-6">
                        {data?.price ?
                            <View className="flex-column items-start">
                                <Text className="text-[24px] font-bold text-gray-100">
                                    {data?.price} 
                                </Text>
                                <Text className="text-gray-100">/ per person</Text>
                            </View>
                        : <></>}
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

                    <View className="flex-row items-center space-x-1 mt-2">
                        <FontAwesome5 name="map-marker-alt" size={16} color="#8C9EA6" />
                        <Text className="text-[#8C9EA6] text-[16px] font-bold">
                            {data?.ranking_geo}
                        </Text>
                    </View>
                </View>

                {/* Bite-sized info */}
                <View className="mt-4 flex-row items-center justify-between">
                    {data?.rating && (
                        <View className="flex-row items-center space-x-2">
                            <View className="w-12 h-12 rounded-2xl bg-white items-center justify-center shadow-md">
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
                            <View className="w-12 h-12 rounded-2xl bg-white items-center justify-center shadow-md">
                                <Image source={Medal} className="w-8 h-8 object-cover"/>
                            </View>
                            <View>
                                <Text className="text-[#8C9EA6]">#{data?.ranking_position}</Text>
                                <Text className="text-[#8C9EA6]">In {data?.ranking_geo.length > 14 ? `${data?.ranking_geo.slice(0,8)}..` : data?.ranking_geo}</Text>
                            </View>
                        </View>
                    )}

                    {data?.price_level && (
                        <View className="flex-row items-center space-x-2">
                            <View className="w-12 h-12 rounded-2xl bg-white items-center justify-center shadow-md">
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
                    <>
                        <Text className="mt-4 tracking-wide text-[16px] font-semibold text-[#8C9EA6] px-2">
                            {text}
                            {!readMore && '...'}
                        </Text>
                        <Text
                            className="mt-2 text-[16px] font-semibold text-[#336699] px-1"
                            onPress={() => {
                                if(!readMore) {
                                    setText(data.description);
                                    setReadMore(true);
                                } else {
                                    setText(data.description.slice(0, 180));
                                    setReadMore(false);
                                }
                            }}
                        >
                            {readMore ? ' Show Less' : ' Read More'}
                        </Text>
                    </>
                )}
                
                {/* Cuisine Tags */}
                {data?.cuisine && (
                    <View className="flex-row gap-2 items-center justify-start flex-wrap mt-4 px-2">
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
                <View className="px-4 py-2 space-y-2 mt-4 bg-gray-100 rounded-2xl mb-12">
                    {data?.phone && (
                        <View className="flex-row items-center space-x-6">
                            <Image source={Phone} className="w-8 h-8 object-cover"/>
                            <Text className="text-[#336699] text-[16px] mr-2 flex-wrap" onPress={()=>{Linking.openURL(`tel:${data?.phone}`);}}>{data?.phone}</Text>
                        </View>
                    )}
                    {data?.email && (
                        <View className="flex-row items-center space-x-6">
                            <Image source={Email} className="w-8 h-8 object-cover"/>
                            <Text className="text-[#336699] text-[16px] mr-4 flex-wrap" onPress={()=>{Linking.openURL(`mailto:${data?.email}`);}}>{data?.email}</Text>
                        </View>
                    )}
                    {data?.address && (
                        <View className="flex-row items-center space-x-6">
                            <Image source={Map} className="w-8 h-8 object-cover"/>
                            <TouchableOpacity onPress={() => openMap()}>
                                <Text className="text-[#336699] text-[16px] mr-5 flex-wrap">
                                    {data?.address}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    {data?.website && (
                        <View className="flex-row items-center space-x-6">
                            <Image source={Link} className="w-8 h-8 object-cover"/>
                            <Text className="text-[#336699] text-[16px] mr-5 flex-wrap" onPress={()=>{Linking.openURL(`${data?.website}`);}}>{data?.website}</Text>
                        </View>
                    )}
                </View>

            </ScrollView>

            {/* Call to Action */}
            <TouchableOpacity className="mx-6 px-4 py-4 rounded-xl bg-[#336699] items-center justify-center">
                <Text className="text-3xl font-semibold tracking-wider text-gray-100">Book Now</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default ItemScreen;