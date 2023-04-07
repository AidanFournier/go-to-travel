import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, WhiteHeart } from '../assets';

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
                            <Text className="text-[12px] font-bold text-gray-100">
                                {data?.price_level}
                            </Text>
                        </View>

                        <View className="px-2 rounded-md bg-white items-center justify-center">
                            {data?.open_now_text === "Open Now" ? 
                                <Text className="text-[#336699] font-bold px-2">{data?.open_now_text}</Text>
                                :
                                <Text className="text-[#E77587] font-bold px-2">{data?.open_now_text}</Text>
                            }
                        </View>
                            
                        
                    </View>
                </View>


            </ScrollView>
        </SafeAreaView>
    );
};

export default ItemScreen;