import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';

const MenuContainer = ({ title, imageSrc, type, setType }) => {

    const handlePress = () => {
        setType(title.toLowerCase());
    }

    return (
        <TouchableOpacity 
            className={`bg-white h-30 w-28 rounded-2xl items-center ${type === title.toLowerCase() ? "shadow-xl" : "" }`} 
            onPress={handlePress}
        >

            <View className={`w-24 h-20 rounded-xl mt-2 items-center justify-center bg-[#80BEED]/50`}>
                <Image 
                    source={imageSrc}
                    className="w-16 h-16 object-cover"
                />
            </View>
            <Text style={{ fontFamily: 'Inter_500Medium'}} className={`my-2 ${type === title.toLowerCase() ? "text-black" : "text-gray-400" }`}>{title}</Text>
        </TouchableOpacity>
    )
}

export default MenuContainer;