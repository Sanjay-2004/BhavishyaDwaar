import { View, Text, Image, FlatList, RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { gradient } from '../../constants/images';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchInput from '../../components/SearchInput';
import EmptyState from '../../components/EmptyState';
import JobOpening from '../../components/JobOpening';
import axios from 'axios';
import { BACKEND_URL } from '@env';

const Home = () => {

    const [jobs, setJobs] = useState([]);
    const [refreshing, setRefreshing] = useState(false)

    const getJobs = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/openings`);
            console.log(`${BACKEND_URL}/openings`)
            // console.log(response.data);
            setJobs(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    const onRefresh = async () => {
        setRefreshing(true)
        await getJobs();
        setRefreshing(false)
    }

    useEffect(() => {
        getJobs();
    }, [])
    return (
        <>
            <StatusBar style="dark" backgroundColor="#fcf7ff" />
            <SafeAreaView className="h-full flex-1 bg-lightened">
                <FlatList
                    // data={[{ id: 1, companyName: "Micron", role: "Full Stack Developer", ctc: "12LPA", jobDescription: "hello", lastDate: "24 Jan", sectionsAllowed: ["Elite", "A1-1", "A1-2", "A2"] }, { id: 2 }]}
                    data={jobs}
                    keyExtractor={(item) => item._id}
                    ListHeaderComponent={() => (
                        <View className="w-full h-[200px] mb-5">
                            <Image
                                source={gradient}
                                className="z-0 w-full h-[200px]"
                            />
                            <View className="w-[90%] h-40  flex-col absolute top-7 left-5">
                                <Text className="font-smedium text-xl mb-3">Hello</Text>
                                <Text className="font-sbold text-5xl">Sanjay Agamamidi</Text>
                                {/* <SearchInput /> */}
                            </View>
                        </View>
                    )}
                    ListEmptyComponent={() => (
                        <EmptyState
                            title="No Jobs found"
                            subtitle="New Job Upload Soon..."
                        />
                    )}
                    renderItem={({ item }) => (
                        <JobOpening job={item} />
                    )}
                    refreshControl={<RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={["#3134CE"]}
                        tintColor="#FCF7FF"
                    />}
                />
            </SafeAreaView>
        </>
    );
}

export default Home;
