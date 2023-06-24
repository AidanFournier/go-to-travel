import { View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';
import React from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { GreyPin } from '../assets';

const ItemCardContainer = ({ imageSrc, name, location, data }) => {
    const navigation = useNavigation();
  
    return (
        <Animatable.View animation={"bounceInRight"} duration={1600}>
            <TouchableOpacity 
                onPress={() => navigation.navigate("Item", { param: data })} 
                className="w-64 h-64 rounded-3xl border border-white space-y-2 px-2 py-2 mr-4 shadow-md bg-white">
                <ImageBackground
                    source={{ uri: imageSrc }}
                    className="w-full h-full rounded-2xl object-cover overflow-hidden flex justify-end"
                >
                    {name ? (
                        <View className="m-2 p-2 bg-white/75 rounded-lg">
                            <Text style={{ fontFamily: 'Inter_700Bold'}} className="text-sm mb-1">
                                {name?.length > 14 ? `${name.slice(0,24)}..` : name}
                            </Text>

                            <View className="flex-row items-center space-x-1">
                                <Image source={GreyPin} className="w-3 h-3 object-cover" />
                                <Text style={{ fontFamily: 'Inter_400Regular'}} className="text-gray-600 text-sm">
                                    {location?.length > 18 ? `${location.slice(0,24)}..` : location}
                                </Text>
                            </View>
                        </View>
                    ) : (
                        <></>
                    )}
                </ImageBackground> 

                
            </TouchableOpacity>
        </Animatable.View>
    )
}

export default ItemCardContainer;