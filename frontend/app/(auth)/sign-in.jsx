import { View, Text, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { gradient, logoName } from '../../constants/images'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import axios from 'axios'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BACKEND_URL } from '@env'

const SignIn = () => {
    const [form, setForm] = useState({
        rollno: '',
        password: '',
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const submit = async () => {
        if (!form.rollno || !form.password) {
            Alert.alert('Error', 'All fields are required');
            return;
        }

        setIsSubmitting(true)
        try {
            console.log(form)
            const response = await axios.get(`${BACKEND_URL}/${form.rollno}`);
            console.log(response.data)
            Alert.alert('Success', 'Log In Successful')
            router.replace("/home")
        } catch (error) {
            Alert.alert('Error', error.message)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <>
            <StatusBar style="dark" translucent backgroundColor="transparent" />
            <SafeAreaView className="h-full flex-1 bg-lightened">
                <View className="absolute top-0 left-0 right-0 w-full h-[225px]">
                    <Image
                        source={gradient}
                        className="z-0 w-full h-[225px]"
                    />
                    <Image
                        source={logoName}
                        resizeMode='cover'
                        className="w-72 h-28 absolute bottom-0 left-[-10px]"
                    />
                </View>
                <View className="w-full min-h-[80vh] px-4 mt-[250px]">
                    <Text className="text-4xl text-darkened mt-5 font-sbold">Sign In</Text>
                    <FormField
                        title="Roll No"
                        value={form.rollno}
                        handleChangeText={(e) => setForm({ ...form, rollno: e })}
                        otherStyles="mt-5"
                    />
                    <FormField
                        title="Password"
                        value={form.password}
                        handleChangeText={(e) => setForm({ ...form, password: e })}
                        otherStyles="mt-5"
                    />
                    <CustomButton
                        title="Sign Up"
                        handlePress={submit}
                        containerStyles="mt-5 mb-10 bg-secondary-100"
                        isLoading={isSubmitting}
                        textStyles="text-darkened"
                    />
                </View>
            </SafeAreaView>
        </>
    )
}

export default SignIn
