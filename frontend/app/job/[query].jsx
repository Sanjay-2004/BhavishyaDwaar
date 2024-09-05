import { View, Text, Image, TouchableOpacity, Alert, Platform, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { gradient } from '../../constants/images';
import axios from 'axios';
import { BACKEND_URL } from '@env';
import { Arrow, Cross } from '../../constants/icons';
import * as FileSystem from 'expo-file-system'; // Import FileSystem for file downloading
import * as Sharing from 'expo-sharing';
import * as DocumentPicker from 'expo-document-picker';

const JobOpening = () => {
    const companyId = useLocalSearchParams().query;
    const [jobDetails, setJobDetails] = useState({
        companyName: "",
        role: "",
        location: "",
        ctc: "",
        jobDescription: "",  // Assuming this contains the link to the PDF
        internshipDuration: "",
        internshipStart: "",
        internshipStipend: "",
        lastDate: "",
        sectionsAllowed: [],
        additionalDetails: []
    });
    const [resume, setResume] = useState(null);

    const getOpening = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/openings/${companyId}`);
            console.log(response.data);
            setJobDetails(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    }
    const convertToLPA = (ctc) => {
        const ctcInLakhs = Math.round(ctc / 100000);
        return `${ctcInLakhs}LPA`;
    };

    const downloadJobDescription = async () => {
        try {
            const fileUri = FileSystem.documentDirectory + 'job-description.pdf';
            const downloadResumable = FileSystem.createDownloadResumable(jobDetails.jobDescription, fileUri, {});

            const { uri } = await downloadResumable.downloadAsync();
            console.log('Finished downloading to ', uri);

            // Alert that the download is complete
            Alert.alert('Download complete!', `Please share it to open it`);

            // Share the file using expo-sharing
            if (await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(uri);
            } else {
                Alert.alert('Sharing not available', 'Sharing is not available on this device.');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Download failed!', 'There was an error downloading the file.');
        }
    };

    const openPicker = async () => {
        const result = await DocumentPicker.getDocumentAsync({
            type: "*/*",
            copyToCacheDirectory: true
        })

        if (!result.canceled) {
            setResume(result);
            console.log(result.assets[0].name);
        }
    }

    const applyJob = async () => {
        Alert.alert('Application Submitted!', 'Your application has been submitted successfully.');
    }

    useEffect(() => {
        getOpening();
    }, [])

    return (
        <SafeAreaView className="flex-1 bg-lightened">
            <ScrollView className="flex-1">
                <View className="w-full h-[200px] mb-3">
                    <Image
                        source={gradient}
                        className="z-0 w-full h-[200px]"
                    />
                    <View className="w-[90%] h-40 flex-col justify-around absolute top-7 left-5">
                        <TouchableOpacity className="font-smedium text-xl mb-4"
                            onPress={() => router.back()}
                        >
                            <Arrow name="left" size={20} color={"#332C49"} />
                        </TouchableOpacity>
                        <Text className="font-sbold text-3xl">{jobDetails.role}</Text>
                        <Text className="font-sbold text-xl text-darkened">{jobDetails.companyName}</Text>
                    </View>
                </View>
                <View className="px-4 flex-1">
                    <View className="flex-row justify-around">
                        <View className="flex-col justify-center items-center">
                            <Text className="font-smedium text-darkened text-lg mt-2">Location</Text>
                            <Text className="font-sregular text-darkened text-base">{jobDetails.location}</Text>
                        </View>
                        <View className="flex-col justify-center items-center">
                            <Text className="font-smedium text-darkened text-lg mt-2">CTC</Text>
                            <Text className="font-sregular text-darkened text-base">{convertToLPA(jobDetails.ctc)}</Text>
                        </View>
                        <View className="flex-col justify-center items-center">
                            <Text className="font-smedium text-darkened text-lg mt-2">Last Date</Text>
                            <Text className="font-sregular text-darkened text-base">{formatDate(jobDetails.lastDate)}</Text>
                        </View>
                    </View>
                    <View className="flex-row justify-around gap-2 my-3">
                        {jobDetails.sectionsAllowed.map((section, index) => (
                            <Text key={index} className="text-secondary-300 px-4 py-1 border rounded-full border-secondary-300 text-sm font-smedium">
                                {section}
                            </Text>
                        ))}
                    </View>
                    <View className="w-full h-[2px] shadow-lg rounded-full mb-2 bg-secondary" />

                    {(jobDetails.internshipDuration && jobDetails.internshipStart && jobDetails.internshipStipend) && (
                        <>
                            <Text className="font-smedium text-darkened text-xl">Internship Details</Text>
                            <View className="flex-row justify-around mb-3">
                                <View className="flex-col justify-center items-center">
                                    <Text className="font-smedium text-darkened text-lg mt-2">Start Date</Text>
                                    <Text className="font-sregular text-darkened text-base">{formatDate(jobDetails.internshipStart)}</Text>
                                </View>
                                <View className="flex-col justify-center items-center">
                                    <Text className="font-smedium text-darkened text-lg mt-2">Duration</Text>
                                    <Text className="font-sregular text-darkened text-base">{jobDetails.internshipDuration}</Text>
                                </View>
                                <View className="flex-col justify-center items-center">
                                    <Text className="font-smedium text-darkened text-lg mt-2">Stipend</Text>
                                    <Text className="font-sregular text-darkened text-base">{jobDetails.internshipStipend}</Text>
                                </View>
                            </View>
                        </>
                    )}

                    {jobDetails.additionalDetails.length > 0 && (
                        <>
                            <Text className="font-smedium text-darkened text-xl">Additional Details</Text>
                            <View className="flex-col gap-2">
                                {jobDetails.additionalDetails.map((detail, index) => (
                                    <Text key={index} className="font-sregular text-darkened text-base">{detail}</Text>
                                ))}
                            </View>
                        </>
                    )}

                    {/* Button to download Job Description */}
                    <TouchableOpacity
                        onPress={downloadJobDescription}
                        className="bg-secondary-100 px-4 py-3 rounded-md my-4">
                        <Text className="text-primary-500 text-center font-sbold">Download Job Description</Text>
                    </TouchableOpacity>

                    <Text className="font-smedium text-darkened mt-2 text-xl">Attach Resume</Text>
                    {resume ? (
                        <View className="border border-secondary-200 flex-row justify-between items-center px-4 py-3 rounded-md my-4">
                            <Text className="text-darkened font-base text-center font-sbold">{resume.assets[0].name}</Text>
                            <TouchableOpacity
                                onPress={() => setResume(null)}
                                className="bg-secondary-400 px-2 py-1 rounded-md">
                                <Cross color='#FCF7FF' />
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <TouchableOpacity
                            onPress={openPicker}
                            className="border border-secondary px-4 py-3 rounded-md my-4">
                            <Text className="text-primary-500 text-center font-sbold">+ Attach File</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </ScrollView>
            <View className="absolute w-full bottom-0 px-4 items-center justify-center flex">
                <TouchableOpacity
                    onPress={applyJob}
                    className="bg-secondary-400 px-4 py-3 rounded-xl mb-7 w-full ">
                    <Text className="text-primary-500 text-center text-2xl text-lightened font-sbold">Apply Now</Text>
                </TouchableOpacity>
            </View>

            <StatusBar style="dark" backgroundColor="#fcf7ff" />
        </SafeAreaView>
    )
}

export default JobOpening;
