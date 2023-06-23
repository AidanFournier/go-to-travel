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
            <LinearGradient
                colors={["rgba(44, 173, 204, 0.2)", "rgba(165, 218, 200, 0.2)"]}
                start={[0, 0]}
                end={[1, 1]}
                location={[0.25, 0.4, 1]}
                className={`w-24 h-20 rounded-xl mt-2 shadow-sm items-center justify-center`}
            >
                <Image 
                    source={imageSrc}
                    className="w-16 h-16 object-cover"
                />
            </LinearGradient>
            <Text className={`text-lg my-1 ${type === title.toLowerCase() ? "text-black" : "text-[#babbbc]" }`}>{title}</Text>
        </TouchableOpacity>
    )
}

export default MenuContainer;