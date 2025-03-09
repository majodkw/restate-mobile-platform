import {
  Text,
  View,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useGlobalContext } from "@/lib/global-provider";
import icons from "@/constants/icons";
import Search from "@/components/Search";
import { Card, FeaturedCard } from "@/components/Cards";
import Filters from "@/components/Filters";
import { router, useLocalSearchParams } from "expo-router";
import { useAppwrite } from "@/lib/useAppwrite";
import { getLastestPorperties, getProperties } from "@/lib/appwrite";
import { useEffect } from "react";
import NoResults from "@/components/NoResults";

export default function Explore() {
  const params = useLocalSearchParams<{ query?: string; filter?: string }>();

  const {
    data: properties,
    loading,
    refetch,
  } = useAppwrite({
    fn: getProperties,
    params: { filter: params.filter!, query: params.query!, limit: 20 },
    skip: true,
  });

  const handleCardPress = (id: string) => {
    router.push(`/properties/${id}`);
  };

  useEffect(() => {
    refetch({ filter: params.filter!, query: params.query!, limit: 20 });
  }, [params.filter, params.query]);

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
        data={properties}
        renderItem={({ item }) => (
          <Card item={item} onPress={() => handleCardPress(item.$id)} />
        )}
        keyExtractor={(item) => item.$id.toString()}
        numColumns={2}
        contentContainerClassName="pb-20"
        columnWrapperClassName="flex gap-5 px-5"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator size="large" className="text-primary-300 mt-5" />
          ) : (
            <NoResults />
          )
        }
        ListHeaderComponent={
          <View className="px-5">
            <View className="flex flex-row items-center justify-between">
              <TouchableOpacity
                onPress={router.back}
                className="flex flex-row bg-primary-100 rounded-full size-11 items-center justify-between"
              >
                <Image source={icons.backArrow} className="size-5 ml-3" />
              </TouchableOpacity>
              <Text className="text-lg mr-2 text-center font-rubik-medium text-black-300">
                Search for your ideal home
              </Text>
              <Image source={icons.bell} className="size-5 mr-2" />
            </View>
            <Search />
            <View className="mt-5">
              <Filters />
              <Text className="text-xl font-rubik-bold text-black-300 mt-5">
                Found {properties?.length ?? 0} properties
              </Text>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}
