import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { EyeHide, EyeShow } from '../constants/icons'

const FormField = ({ title, value, placeHolder, handleChangeText, otherStyles, ...props }) => {

    const [showpass, setShowpass] = useState(false)

    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <Text className="text-lg text-darkened font-smedium">{title}</Text>

            <View className="w-full h-16 px-4 bg-black-100 border-2 border-darkened rounded-2xl focus:border-secondary flex-row items-center">
                <TextInput
                    className="flex-1 text-darkened font-sregular text-xl"
                    value={value}
                    placeholder={placeHolder}
                    placeholderTextColor="#7b7b8b"
                    onChangeText={handleChangeText}
                    secureTextEntry={title === "Password" && !showpass}
                />
                {title === "Password" && (
                    <TouchableOpacity onPress={() => { setShowpass(!showpass) }}>
                        {showpass ? <EyeHide /> : <EyeShow />}
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

export default FormField