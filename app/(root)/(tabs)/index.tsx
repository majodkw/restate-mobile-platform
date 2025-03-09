import {
  Text,
  View,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useGlobalContext } from "@/lib/global-provider";
import icons from "@/constants/icons";
import Search from "@/components/Search";
import { Card, FeaturedCard } from "@/components/Cards";
import Filters from "@/components/Filters";
import seed from "@/lib/seed";
import { router, useLocalSearchParams } from "expo-router";
import { useAppwrite } from "@/lib/useAppwrite";
import { getLastestPorperties } from "@/lib/appwrite";
import { useEffect } from "react";
import NoResults from "@/components/NoResults";

export default function Index() {
  const { user } = useGlobalContext();
  const params = useLocalSearchParams<{ query?: string; filter?: string }>();

  const { data: latestProperties, loading: latestPropertiesLoading } =
    useAppwrite({
      fn: getLastestPorperties,
    });

  const {
    data: properties,
    loading,
    refetch,
  } = useAppwrite({
    fn: getLastestPorperties,
    params: { filter: params.filter!, query: params.query!, limit: 6 },
    skip: true,
  });

  const handleCardPress = (id: string) => {
    router.push(`/properties/${id}`);
  };

  useEffect(() => {
    refetch({ filter: params.filter!, query: params.query!, limit: 6 });
  }, []);

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

            {latestPropertiesLoading ? (
              <ActivityIndicator
                size="large"
                className="text-primary-300 mt-5"
              />
            ) : !latestProperties || latestProperties.length === 0 ? (
              <NoResults />
            ) : (
              <FlatList
                data={latestProperties}
                horizontal
                renderItem={({ item }) => (
                  <FeaturedCard
                    item={item}
                    onPress={() => handleCardPress(item.$id)}
                  />
                )}
                keyExtractor={(item) => item.$id.toString()}
                bounces={false}
                showsHorizontalScrollIndicator={false}
                contentContainerClassName="flex gap-5"
              />
            )}
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
      />
    </SafeAreaView>
  );
}
