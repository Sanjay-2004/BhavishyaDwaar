import React, { useEffect } from 'react'
import { SplashScreen, Stack } from 'expo-router'
import { useFonts } from 'expo-font'

const RootLayout = () => {
    const [fontsLoaded, error] = useFonts({
        "Satoshi-Black": require("../assets/fonts/Satoshi-Black.otf"),
        "Satoshi-Regular": require("../assets/fonts/Satoshi-Regular.otf"),
        "Satoshi-Bold": require("../assets/fonts/Satoshi-Bold.otf"),
        "Satoshi-Light": require("../assets/fonts/Satoshi-Light.otf"),
        "Satoshi-Medium": require("../assets/fonts/Satoshi-Medium.otf"),
    })

    useEffect(() => {
        if (error) throw error;

        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded, error]);

    if (!fontsLoaded && !error) {
        return null;
    }

    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            {/* <Stack.Screen name="search/[query]" options={{ headerShown: false }} /> */}
        </Stack>
    )
}

export default RootLayout