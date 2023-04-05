import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

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
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ItemScreen;