import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity, ImageBackground, Linking, Platform } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import MapView, { Marker, Callout } from 'react-native-maps';

import { BlueStar, ChevronLeftWhite, Email, GreyStar, Link, Map, Medal, MedalGray, Phone, PriceTag, PriceTagGrey, WhiteHeart, PinkHeart, BluePin, BluePinSmall } from '../assets';
import StatsContainer from '../components/StatsContainer';

const ItemScreen = ({ route }) => {
    const navigation = useNavigation();

    const data = route?.params?.param;
    console.log(data);

    const [ text, setText ] = useState(data.description.slice(0, 180));
    const [ readMore, setReadMore ] = useState(false);

    const [ saved, setSaved ] = useState(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

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
                    className="w-12 h-12 rounded-full items-center justify-center bg-slate-500/[0.40]" 
                    onPress={() => navigation.navigate("Discover")}
                >
                    <Image source={ChevronLeftWhite} className="w-6 h-6 object-cover"/>
                </TouchableOpacity>

                <TouchableOpacity
                    className="w-12 h-12 rounded-full items-center justify-center bg-slate-500/[0.40]" 
                    onPress={() => setSaved(!saved)}
                >
                    <Image source={saved ? PinkHeart : WhiteHeart} className="w-6 h-6 object-cover" />
                </TouchableOpacity>
            </View>
            
            {/* Destination Info */}
            <ScrollView className="flex-1 px-8 pt-8 bg-white rounded-t-[40px] shadow-2xl absolute inset-x-0 bottom-0 h-4/6">
                
                {/* Title Section */}
                <View className="flex-row justify-between items-start">

                    {/* Name and Location */}
                    <View className="w-8/12">
                        <Text style={{ fontFamily: 'Inter_600SemiBold'}} className="text-2xl font-semibold flex-wrap">
                            {data?.name}
                        </Text>

                        <View className="flex-row items-center space-x-2 mt-3 mb-6">
                            <Image source={BluePin} className="w-4 h-4 object-cover" />
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

                {/* Map */}
                <View className="mt-8 rounded-3xl h-full w-full overflow-hidden flex items-center justify-center">
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

                </View>

                {/* Place Stats */}
                {/* <View className="mt-4 flex-row items-center justify-between">
                   {data?.rating ? 
                        (
                            <StatsContainer 
                                key={"Rating"}
                                imageSrc={BlueStar}
                                ratingData={data?.rating}
                                title={"Rating"}
                            />
                        ) : (
                            <StatsContainer
                                key={"Rating"}
                                imageSrc={GreyStar}
                                ratingData={"No"}
                                title={"Rating"}
                            />
                        )
                    }

                    {data?.ranking ? 
                        (
                            <StatsContainer 
                                key={"Ranking"}
                                imageSrc={Medal}
                                ratingData={`#${data?.ranking_position} in`}
                                title={data?.ranking_geo.length > 9 ? `${data?.ranking_geo.slice(0,7)}..` : data?.ranking_geo}
                            />
                        ) : (
                            <StatsContainer
                                key={"Ranking"}
                                imageSrc={MedalGray}
                                ratingData={"No Rank"}
                                title={"Found"}
                            />
                        )
                    }

                    {data?.price_level ? 
                        (
                            <StatsContainer 
                                key={"Pricing"}
                                imageSrc={PriceTag}
                                ratingData={data?.price_level}
                                title={"Price Range"}
                            />
                        ) : (
                            <StatsContainer
                                key={"Pricing"}
                                imageSrc={PriceTagGrey}
                                ratingData={"No Price"}
                                title={"Info Found"}
                            />
                        )
                    }
                </View> */}


                {/* Contact Info */}
                {/* <View className="px-4 py-2 space-y-2 mt-4 bg-gray-100 rounded-2xl mb-12">
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
                </View> */}

            </ScrollView>
            
            <View className="items-center absolute flex-row inset-x-0 bottom-6 justify-around px-4">
                <View className="">
                    {data?.price ?
                        <View className="flex-column items-center justify-center">
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

                {/* Footer (price/person and CTA button) */}
                <TouchableOpacity
                    onPress={()=>{Linking.openURL(`${data?.website}`);}}
                    className="w-8/12"
                    >
                    <View className="w-full h-16 rounded-full">
                        <LinearGradient
                            colors={["#2CADCC", "#336699"]}
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