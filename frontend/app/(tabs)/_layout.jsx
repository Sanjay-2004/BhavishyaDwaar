import { View, Text } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import { HomeIcon, ListIcon, ResumeIcon, UserIcon } from '../../constants/icons';

const TabIcon = ({ IconComponent, color, name, focused }) => {
    return (
        <View className="items-center justify-center gap-1">
            <IconComponent color={color} size={focused ? 30 : 24} />
            <Text style={{ color: color }} className={`${focused ? 'font-sbold' : 'font-sregular'} text-sm`}>
                {name}
            </Text>
        </View>
    );
}



const TabsLayout = () => {
    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarHideOnKeyboard: true,
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: '#3134CE',
                    tabBarInactiveTintColor: '#332C49',
                    tabBarStyle: {
                        backgroundColor: '#d7c9ff',
                        height: 75
                    }
                }}
            >
                <Tabs.Screen
                    name="home"
                    options={{
                        title: 'Home',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                IconComponent={HomeIcon}
                                color={color}
                                name="Home"
                                focused={focused}
                            />
                        )
                    }}
                />
                <Tabs.Screen
                    name="resume"
                    options={{
                        title: 'Resume',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                IconComponent={ResumeIcon}
                                color={color}
                                name="Resume"
                                focused={focused}
                            />
                        )
                    }}
                />
                <Tabs.Screen
                    name="applications"
                    options={{
                        title: 'Applications',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                IconComponent={ListIcon}
                                color={color}
                                name="Applications"
                                focused={focused}
                            />
                        )
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: 'Profile',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                IconComponent={UserIcon}
                                color={color}
                                name="Profile"
                                focused={focused}
                            />
                        )
                    }}
                />
            </Tabs>
        </>
    );
}

export default TabsLayout;
