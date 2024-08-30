import { View, Text } from 'react-native'
import React from 'react'
import { Arrow } from '../constants/icons'

// Function to split text at the second space
const splitTextAtSecondSpace = (text) => {
    const words = text.split(' ')
    if (words.length > 2) {
        const firstPart = words.slice(0, 2).join(' ')
        const secondPart = words.slice(2).join(' ')
        return [firstPart, secondPart]
    }
    return [text]
}

// Function to format date to "10 Sep"
const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })
}

const JobOpening = ({ job: { companyName, role, ctc, jobDescription, lastDate, sectionsAllowed = [] } }) => {
    const [roleLine1, roleLine2] = splitTextAtSecondSpace(role)
    const formattedDate = formatDate(lastDate)

    return (
        <View className="w-11/12 rounded-lg py-2 px-4 border-secondary-200 self-center mb-3 shadow-xl bg-lightened shadow-secondary-200">
            <Text className="text-warning-500 absolute right-2 bg-warning-100 rounded-sm px-1 top-2 text-xs font-smedium">
                Last Date: {formattedDate}
            </Text>
            <View className="flex justify-between">
                <View>
                    <Text className="text-darkened text-xl font-sblack">{roleLine1}</Text>
                    {roleLine2 && <Text className="text-darkened text-xl font-sblack">{roleLine2}</Text>}
                </View>
                <Text className="text-secondary-400 text-lg font-sbold">{companyName}</Text>
                <Text className="text-secondary-300 text-sm font-smedium mt-2">{ctc}</Text>
                <View className="flex-row justify-start gap-2 my-3">
                    {sectionsAllowed.length === 5 ? (
                        <Text className="text-secondary-300 text-sm font-smedium">All sections allowed</Text>
                    ) : sectionsAllowed.map((section, index) => (
                        <Text key={index} className="text-secondary-300 px-4 py-1 border rounded-full border-secondary-300 text-sm font-smedium">
                            {section}
                        </Text>
                    ))}
                </View>
            </View>
            <View className="absolute bottom-3 right-5 bg-secondary-100 px-2 py-1 rounded-md">
                <Arrow name="right" size={20} color={"#5F4D8B"} />
            </View>
        </View>
    )
}

export default JobOpening
