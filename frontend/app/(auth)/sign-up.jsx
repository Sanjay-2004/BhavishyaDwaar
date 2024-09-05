import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { gradient, logoName } from '../../constants/images'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import axios from 'axios'
import { router } from 'expo-router'
import { BACKEND_URL } from '@env'

const SignUp = () => {

    const [form, setForm] = useState({
        name: '',
        rollno: '',
        password: '',
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const submit = async () => {
        if (!form.name || !form.password || !form.rollno) {
            Alert.alert('Error', 'All fields are required');
            return;
        }

        setIsSubmitting(true)
        try {
            console.log(form)
            const response = await axios.post(`${BACKEND_URL}/students`, form);
            console.log(response.data)
            Alert.alert('Success', 'Account created successfully')
            router.replace("/home")
        } catch (error) {
            Alert.alert('Error', error.message)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <>
            <ScrollView className="flex-1 bg-lightened">
                <View className="relative w-full h-[200px]">
                    <Image
                        source={gradient}
                        className="z-0 w-full h-[200px]"
                    />
                    <Image
                        source={logoName}
                        resizeMode='cover'
                        className="w-72 h-28 absolute bottom-0 left-[-10px]"
                    />
                </View>
                <View className="w-full min-h-[80vh] px-4">
                    <Text className="text-4xl text-darkened mt-5 font-sbold">Sign Up</Text>
                    <FormField
                        title="Name"
                        value={form.name}
                        handleChangeText={(e) => setForm({ ...form, name: e })}
                        otherStyles="mt-5"
                    />
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

            </ScrollView>
            <StatusBar style='dark' />
        </>
    )
}

export default SignUp