import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity, Linking, Button } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import MapView, { Marker, Callout } from 'react-native-maps';
import Modal from "react-native-modal";
import Octicons from 'react-native-vector-icons/Octicons';

import { ChevronLeftWhite, GreyStar, WhiteHeart, PinkHeart, BluePinSmall, BluePinNavi, GreyPin } from '../assets';

const ItemScreen = ({ route }) => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    const data = route?.params?.param;

    const [ text, setText ] = useState(data.description.slice(0, 180));
    const [ readMore, setReadMore ] = useState(false);
    const [ saved, setSaved ] = useState(false);
    const [ isModalVisible, setIsModalVisible ] = useState(false);

    const handleModal = () => setIsModalVisible(() => !isModalVisible);

    const openMap = async (address=data?.address, city=data?.address_obj.city, zipCode=data?.address_obj.postalcode) => {
        const destination = encodeURIComponent(`${address}`);
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
            
            {/* Background Image */}
            <Image 
                source={
                    {uri: 
                        data?.photo?.images?.large?.url ?
                        data?.photo?.images?.large?.url :
                        "https://res.cloudinary.com/diyvlobep/image/upload/v1680617719/restaurant-default_ml2fb9.png"
                    }
                }
                className="absolute w-full h-4/6"
            />

            {/* Image Card Buttons */}
            <View className="absolute flex-row inset-x-0 top-12 justify-between px-4">
                <TouchableOpacity 
                    className="w-12 h-12 rounded-full items-center justify-center bg-white/40" 
                    onPress={() => navigation.navigate("Discover")}
                >
                    <View className="w-10 h-10 rounded-full items-center justify-center bg-white/70">
                        <Image source={ChevronLeftWhite} className="w-6 h-6 object-cover"/>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    className="w-12 h-12 rounded-full items-center justify-center bg-white/40" 
                    onPress={() => setSaved(!saved)}
                >
                    <View className="w-10 h-10 rounded-full items-center justify-center bg-white/70">
                        <Image source={saved ? PinkHeart : WhiteHeart} className="w-6 h-6 object-cover" />
                    </View>
                </TouchableOpacity>
            </View>
            
            {/* Destination Info */}
            <ScrollView className="flex-1 bg-white rounded-t-[40px] shadow-2xl absolute inset-x-0 bottom-0 h-4/6 overflow-hidden px-8 pt-8">
                
                {/* Title Section */}
                <View className="flex-row justify-between items-start">

                    {/* Name and Location */}
                    <View className="w-8/12">
                        <Text style={{ fontFamily: 'Inter_600SemiBold'}} className="text-2xl font-semibold flex-wrap">
                            {data?.name}
                        </Text>

                        <View className="flex-row items-center space-x-2 mt-3 mb-6">
                            <Image source={GreyPin} className="w-5 h-5 object-cover" />
                            <Text style={{ fontFamily: 'Inter_400Regular'}} className="text-gray-400">
                                {data?.ranking_geo}
                            </Text>
                        </View>
                    </View>

                    <View>
                        {/* Open/Closed Label */}
                        {data?.open_now_text && 
                            <View className="pt-1">
                                {data?.open_now_text === "Open Now" ? 
                                    <Text style={{ fontFamily: 'Inter_400Regular'}} className="text-[#336699]">{data?.open_now_text}</Text>
                                    :
                                    <Text style={{ fontFamily: 'Inter_400Regular'}} className="text-gray-400">{data?.open_now_text}</Text>
                                }
                            </View>
                        }
                        {/* Rating */}
                        <View className="flex-row items-center justify-end space-x-1 mt-3">
                            <Image source={GreyStar} className="w-4 h-4 object-cover" />
                            <Text style={{ fontFamily: 'Inter_400Regular'}}  className="text-gray-400 text-right">
                                {data?.rating}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Cuisine Tags */}
                {data?.cuisine && (
                    <View className="flex-row gap-2 items-center justify-start flex-wrap mb-2">
                        {data?.cuisine.map((cuisine) => (
                            <TouchableOpacity
                                key={cuisine.key}
                                className="px-2 py-1 rounded-full bg-gray-300"
                            >
                                <Text style={{ fontFamily: 'Inter_400Regular'}} className="text-white">{cuisine.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
 
                {/* Description */}
                {data?.description && (
                    <Text>
                        <Text style={{ fontFamily: 'Inter_400Regular'}} className="tracking-wide text-gray-400">
                            {text}
                            {!readMore && '...'}
                        </Text>
                        <Text
                            style={{ fontFamily: 'Inter_400Regular'}}
                            className="mt-2 text-[#336699]"
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
                    </Text>
                )}

                {data?.address && (
                    <View className="mt-5 mb-3 flex-row space-x-2">
                        <Image source={BluePinNavi} className="w-4 h-5 object-cover" />
                        <TouchableOpacity onPress={() => openMap()}>
                            <Text className="text-[#336699] font-semibold">
                                Get Directions
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}

                {/* Map */}
                <View className="rounded-3xl h-full w-full overflow-hidden flex items-center justify-center relative">
                    <MapView
                        className="rounded-3xl h-full w-full"
                        initialRegion={{
                            latitude: data?.latitude,
                            longitude: data?.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    >
                        <Marker
                            draggable
                            coordinate={{
                            latitude: data?.latitude,
                            longitude: data?.longitude,
                            }}
                            onDragEnd={
                            (e) => alert(JSON.stringify(e.nativeEvent.coordinate))
                            }
                            image={BluePinSmall}
                            title={data?.name}
                            description={data?.address}
                        >
                            <Callout tooltip>
                                <View>
                                    <View className="flex bg-white/70 rounded-2xl px-4 py-3">
                                        <Text className="font-semibold mb-1">{data?.name}</Text>
                                        <Text>{data?.address}</Text>
                                    </View>
                                </View>
                            </Callout>
                        </Marker>
                    </MapView>

                    {/* Full-Screen Button */}
                    <TouchableOpacity className="absolute right-3 top-3 rounded-lg flex justify-center items-center bg-white/70 overflow-hidden">
                        <Octicons 
                            name="screen-full" 
                            size={25}
                            color="#336699" 
                            className="p-1 rounded-full" 
                            onPress={handleModal} 
                        />
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Map Modal */}
            <Modal isVisible={isModalVisible}>
                <View className="rounded-3xl h-4/6 w-full overflow-hidden flex items-center justify-center">
                    <MapView
                        className="rounded-3xl h-full w-full"
                        initialRegion={{
                            latitude: data?.latitude,
                            longitude: data?.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    >
                        <Marker
                            draggable
                            coordinate={{
                            latitude: data?.latitude,
                            longitude: data?.longitude,
                            }}
                            onDragEnd={
                            (e) => alert(JSON.stringify(e.nativeEvent.coordinate))
                            }
                            image={BluePinSmall}
                            title={data?.name}
                            description={data?.address}
                        >
                            <Callout tooltip>
                                <View>
                                    <View className="flex bg-white/70 rounded-2xl px-4 py-3">
                                        <Text className="font-semibold mb-1">{data?.name}</Text>
                                        <Text>{data?.address}</Text>
                                    </View>
                                </View>
                            </Callout>
                        </Marker>
                    </MapView>

                    {/* Full-Screen Button */}
                    <TouchableOpacity className="absolute right-3 bottom-6 rounded-lg flex justify-center items-center bg-white/70 overflow-hidden">
                        <Octicons 
                            name="screen-normal" 
                            size={25}
                            color="#336699" 
                            className="p-1 rounded-full" 
                            onPress={handleModal} 
                        />
                    </TouchableOpacity>
                </View>
            </Modal>

            {/* Footer (price/person and CTA button) */}
            <View className="items-center absolute flex-row inset-x-0 bottom-0 justify-center px-4 bg-white/70 pt-3 pb-5">
                <View className="">
                    {data?.price ?
                        <View className="flex-column items-center justify-center pr-6">
                            <Text>
                                <Text style={{ fontFamily: 'Inter_600SemiBold'}}  className="font-bold text-xl text-[#336699]">¥</Text>
                                <Text style={{ fontFamily: 'Inter_600SemiBold'}}  className="font-bold text-xl">
                                    {data?.price.slice(1, 3) + "00"}
                                </Text>
                            </Text>
                            
                            <Text style={{ fontFamily: 'Inter_400Regular'}}  className="text-gray-400">/ person</Text>
                        </View>
                    : <></>}
                </View>
                
                <TouchableOpacity
                    onPress={()=>{Linking.openURL(`${data?.website}`);}}
                    className="w-8/12"
                    >
                    <View className="w-full h-16 rounded-full">
                        <LinearGradient
                            colors={["#80BEED", "#336699"]}
                            start={[0, 0]}
                            end={[1, 1]}
                            location={[0.25, 0.4, 1]}
                            className="w-full h-16 items-center justify-center rounded-full"
                        >
                            <Text style={{ fontFamily: 'Inter_500Medium'}} className="text-white text-xl bg-gradient-to-tr from-[#5CA7F1] from-10% to-[#336699] to-90%">Book Now</Text>
                        </LinearGradient>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default ItemScreen;