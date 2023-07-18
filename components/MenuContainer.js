import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { LinearGradient } from "expo-linear-gradient";

const MenuContainer = ({ title, imageSrc, type, setType }) => {

    const handlePress = () => {
        setType(title.toLowerCase());
    }

    return (
        <TouchableOpacity 
            className={`bg-white h-30 w-28 rounded-2xl items-center ${type === title.toLowerCase() ? "shadow-xl" : "" }`} 
            onPress={handlePress}
        >
            <View
                // colors={["rgba(44, 173, 204, 0.2)", "rgba(165, 218, 200, 0.2)"]}
                // start={[0, 0]}
                // end={[1, 1]}
                // location={[0.25, 0.4, 1]}
                className={`w-24 h-20 rounded-xl mt-2 items-center justify-center bg-[#80BEED]/50`}
            >
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