import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { usePathname } from 'expo-router';
import { SearchIcon } from '../constants/icons';

const SearchInput = ({ initialQuery }) => {

    const pathName = usePathname();
    const [query, setQuery] = useState(initialQuery || "");

    return (
        <View className="w-full h-16 px-4 bg-lightened border border-secondary rounded-2xl focus:border-darkened flex-row items-center">
            <TextInput
                className="flex-1 text-darkened font-sregular text-xl"
                value={query}
                placeholder="Search for a Job"
                placeholderTextColor="#332c49"
                onChangeText={(e) => setQuery(e)}
            />
            <TouchableOpacity
                onPress={() => {
                    if (!query) return Alert.alert("Missing Query", "Please enter a search query")
                    if (pathName.startsWith('/search')) router.setParams({ query })
                    else router.push(`/search/${query}`)
                }
                }
            >
                <SearchIcon />
            </TouchableOpacity>
        </View>
    )
}

export default SearchInput