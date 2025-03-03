import {
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import images from "@/constants/images";
import icons from "@/constants/icons";

const SignIn = () => {
  const handleLogin = () => {};

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerClassName="h-full">
        <Image
          source={images.onboarding}
          style={{ alignSelf: "flex-start" }}
          className="w-full h-4/6"
          resizeMode="contain"
        />
        <View className="px-10">
          <Text className="text-base font-rubik text-m text-black-200 text-center uppercase">
            Welcome to ReState
          </Text>
          <Text className="font-rubik-bold text-3xl text-center">
            Let's get you closer to {"\n"}
            <Text className="text-primary-300">your ideal home</Text>
          </Text>
          <Text className="font-rubik mt-12 text-lg text-black-200 text-center">
            Login to ReState with Google
          </Text>
          <TouchableOpacity
            className="bg-white shadow-md shadow-zinc-400 rounded-full w-full py-4 mt-3"
            onPress={handleLogin}
          >
            <View className="flex flex-row items-center justify-center">
              <Image
                source={icons.google}
                className="w-5 h-5"
                resizeMode="contain"
              />
              <Text className="font-rubik-medium text-lg text-black-300 ml-2">
                Continue with Google
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
