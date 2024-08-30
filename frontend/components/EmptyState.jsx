import { View, Text, Image } from 'react-native'
import React from 'react'
import CustomButton from './CustomButton'
import { router } from 'expo-router'
import { empty } from '../constants/images'

const EmptyState = ({ title, subtitle }) => {
    return (
        <View className="justify-center items-center px-4">
            <Image
                source={empty}
                className="w-[325px] h-[300px]"
                resizeMode='contain'
            />
            <Text className="font-sblack text-4xl text-center mt-2 text-darkened">{title} </Text>
            <Text className="font-smedium text-xl text-secondary-200"> {subtitle}</Text>

        </View>
    )
}

export default EmptyState