import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
  Alert,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { settings } from "@/constants/data";
import { useGlobalContext } from "@/lib/global-provider";
import { logout } from "@/lib/appwrite";

interface SettingsItemProps {
  icon: ImageSourcePropType;
  title: string;
  OnPress?: () => void;
  textStyle?: string;
  showArrow?: boolean;
}

const SettingsItem = ({
  icon,
  title,
  OnPress,
  textStyle = "text-lg font-rubik-medium text-black-300",
  showArrow = true,
}: SettingsItemProps) => {
  return (
    <TouchableOpacity
      onPress={OnPress}
      className="flex flex-row items-center justify-between py-3"
    >
      <View className="flex flex-row items-center gap-3">
        <Image source={icon} className="size-5" />
        <Text className={textStyle}>{title}</Text>
      </View>
      {showArrow && (
        <Image
          source={icons.rightArrow}
          className="size-5"
          resizeMode="contain"
        />
      )}
    </TouchableOpacity>
  );
};

const Profile = () => {
  const { user, refetch } = useGlobalContext();

  const handleLogout = async () => {
    const result = await logout();

    if (!result) {
      Alert.alert("Failed to logout. Please try again later.");
    }

    refetch({});
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView className="h-full">
        <View className="flex flex-row items-center justify-between p-4">
          <Text className="text-xl font-rubik-medium">Profile</Text>
          <Image source={icons.bell} resizeMode="contain" className="size-5" />
        </View>
        <View className="flex flex-row justify-center mt-5">
          <View className="flex flex-col items-center relative mt-5">
            <Image
              source={{ uri: user?.avatar }}
              className="size-44 relative rounded-full"
            />
            <TouchableOpacity className="absolute bottom-11 right-1">
              <Image source={icons.edit} className="size-9" />
            </TouchableOpacity>
            <Text className="font-rubik-bold text-2xl mt-2">{user?.name}</Text>
          </View>
        </View>

        <View className="flex flex-col mt-5 px-5">
          <SettingsItem icon={icons.calendar} title="My Bookings" />
          <SettingsItem icon={icons.wallet} title="Payments" />
          <View className="flex flex-col mt-5 border-t border-primary-200 pt-5">
            {settings.slice(2).map((setting, index) => (
              <SettingsItem
                key={index}
                icon={setting.icon}
                title={setting.title}
              />
            ))}
          </View>
          <View className="flex flex-col mt-5 border-t border-primary-200 pt-5">
            <SettingsItem
              icon={icons.logout}
              title="Logout"
              OnPress={handleLogout}
              textStyle="text-lg font-rubik-medium text-danger"
              showArrow={false}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Profile;
