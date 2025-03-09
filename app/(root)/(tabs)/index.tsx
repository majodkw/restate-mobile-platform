import {
  Text,
  View,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
  Button,
  StyleSheet,
} from "react-native";
import { useGlobalContext } from "@/lib/global-provider";
import icons from "@/constants/icons";
import Search from "@/components/Search";
import { Card, FeaturedCard } from "@/components/Cards";
import Filters from "@/components/Filters";
import seed from "@/lib/seed";

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
      <FlatList
        data={[1, 2, 3, 4]}
        renderItem={({ item }) => <Card />}
        keyExtractor={(item) => item.toString()}
        numColumns={2}
        contentContainerClassName="pb-20"
        columnWrapperClassName="flex gap-5 px-5"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View className="px-5">
            <View className="flex flex-row items-center justify-between">
              <View className="flex flex-row items-center gap-3">
                <Image
                  source={{ uri: user?.avatar }}
                  className="size-12 relative rounded-full"
                />
                <View>
                  <Text className="text-s font-rubik-light text-black-200">
                    {getGreeting()},
                  </Text>
                  <Text className="text-xl font-rubik-medium text-black-300">
                    {user?.name}
                  </Text>
                </View>
              </View>
              <Image
                source={icons.bell}
                resizeMode="contain"
                className="size-5"
              />
            </View>
            <Search />
            <View className="flex flex-row items-center justify-between">
              <Text className="text-xl font-rubik-bold text-black-300 mt-5">
                Featured
              </Text>
              <TouchableOpacity>
                <Text className="text-lg font-rubik-medium text-primary-300 mt-5">
                  See all
                </Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={[5, 6, 7]}
              horizontal
              renderItem={({ item }) => <FeaturedCard />}
              keyExtractor={(item) => item.toString()}
              bounces={false}
              showsHorizontalScrollIndicator={false}
              contentContainerClassName="flex gap-5"
            ></FlatList>
            <View className="flex flex-row items-center justify-between">
              <Text className="text-xl font-rubik-bold text-black-300 mt-5">
                Our Recommendation
              </Text>
              <TouchableOpacity>
                <Text className="text-lg font-rubik-medium text-primary-300 mt-5">
                  See all
                </Text>
              </TouchableOpacity>
            </View>
            <Filters />
          </View>
        }
      ></FlatList>
    </SafeAreaView>
  );
}
