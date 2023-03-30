import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { FontAwesome5 } from '@expo/vector-icons';

const ItemCardContainer = ({  imageSrc, name, location }) => {
  return (
    <TouchableOpacity className="w-[170px] rounded-md border border-white space-y-2 px-3 py-2 my-2 shadow-md bg-white">
        <Image 
            source={imageSrc}
            className="w-full h-40 rounded-md object-cover"
        />

        <Text className="text-[#336699] text-[18px] font-bold">
            {name?.length > 14 ? `${name.slice(0,14)}..` : name}
        </Text>

        <View className="flex-row items-center space-x-1">
            <FontAwesome5 name="map-marker-alt" size={20} color="#E77587" />
            <Text className="text-[#336699] text-[14px] font-bold">
                {location?.length > 18 ? `${location.slice(0,18)}..` : location}
            </Text>
        </View>
    </TouchableOpacity>
  )
}

export default ItemCardContainer