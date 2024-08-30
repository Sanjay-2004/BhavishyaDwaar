import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = ({ title, handlePress, containerStyles, textStyles, isLoading }) => {
    return (
        <TouchableOpacity
            onPress={handlePress}
            antiveOpacity={0.8}
            className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${isLoading ? "opacity-90" : ""}`}
            disabled={isLoading}>
            <Text className={`text-primary text-xl font-smedium ${textStyles}`}>{title}</Text>
        </TouchableOpacity>
    )
}

export default CustomButton