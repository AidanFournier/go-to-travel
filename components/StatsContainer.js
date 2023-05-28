import React from 'react';
import { View, Text, Image } from 'react-native';

function StatsContainer({ imageSrc, ratingData, title }) {
  return (
        <View className="flex-row items-center space-x-2">
            <View className="w-12 h-12 rounded-2xl bg-white items-center justify-center shadow-md">
                <Image source={imageSrc} className="w-8 h-8 object-cover"/>
            </View>
            <View>
                <Text className="text-[#8C9EA6]">{ratingData}</Text>
                <Text className="text-[#8C9EA6]">{title}</Text>
            </View>
        </View>
  )
}

export default StatsContainer;