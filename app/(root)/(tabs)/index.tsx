import { Text, View, SafeAreaView, Image } from "react-native";
import { useGlobalContext } from "@/lib/global-provider";
import icons from "@/constants/icons";
import Search from "@/components/Search";
import { Card, FeaturedCard } from "@/components/Cards";
import Filters from "@/components/Filters";

export default function Index() {
  const { user, refetch } = useGlobalContext();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
      return "Good Morning";
    } else if (hour < 18) {
      return "Good Afternoon";
    } else {
      return "Good Night";
    }
  };

  return (
    <SafeAreaView className="bg-white h-full p-5">
      <View className="px-5">
        <View className="flex flex-row items-center justify-between">
          <View className="flex flex-row items-center gap-3">
            <Image source={{ uri: user?.avatar }} className="size-12 relative rounded-full"/>
            <View>
              <Text className="text-s font-rubik-light text-black-200">
                {getGreeting()},
              </Text>
              <Text className="text-xl font-rubik-medium text-black-300">
                {user?.name}
              </Text>
            </View>
          </View>
          <Image source={icons.bell} resizeMode="contain" className="size-5"/>
        </View>
          <Search />
        <View className="flex flex-row items-center justify-between">
          <Text className="text-xl font-rubik-bold text-black-300 mt-5">
            Featured
          </Text>
          <Text className="text-lg font-rubik-medium text-primary-300 mt-5">
            See all
          </Text>
        </View>
        <View className="flex flex-row items-center justify-between gap-5">
          <FeaturedCard />
          <FeaturedCard />
          <FeaturedCard />
        </View>
        <View className="flex flex-row items-center justify-between">
          <Text className="text-xl font-rubik-bold text-black-300 mt-5">
            Our Recommendation
          </Text>
          <Text className="text-lg font-rubik-medium text-primary-300 mt-5">
            See all
          </Text>
        </View>
        <Filters />
        <View className="flex flex-row items-center justify-between gap-5">
          <Card />
          <Card />
          <Card />
        </View>
      </View>
    </SafeAreaView>
  );
}
