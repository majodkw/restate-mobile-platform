import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import images from "@/constants/images";
import icons from "@/constants/icons";
import { Models } from "react-native-appwrite";

interface Props {
  item: Models.Document;
  onPress?: () => void;
}

export const FeaturedCard = ({
  item: { image, name, rating, address, price },
  onPress,
}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex flex-col items-start w-60 h-80 relative mt-5"
    >
      <Image source={{ uri: image }} className="size-full rounded-2xl" />
      <Image
        source={images.cardGradient}
        className="Japan size-full rounded-2xl absolute bottom-0"
      />
      <View className="flex flex-row bg-white rounded-full absolute px-2 py-1 top-2 right-2 items-center justify-center">
        <Image source={icons.star} className="size-3.5" />
        <Text className="text-xs font-rubik-medium text-primary-300 ml-1">
          {rating}
        </Text>
      </View>
      <View className="flex flex-col items-start absolute bottom-2 inset-x-5">
        <Text
          className="text-white font-rubik-bold text-xl mt-2"
          numberOfLines={1}
        >
          {name}
        </Text>
        <Text
          className="text-white font-rubik-regular text-s mt-1"
          numberOfLines={1}
        >
          22 W 15th St, New York, NY 10011
        </Text>
        <View className="flex flex-row items-center justify-between w-full">
          <Text
            className="text-white font-rubik-bold text-lg mt-2"
            numberOfLines={1}
          >
            {price}
          </Text>
          <Image source={icons.heart} className="size-5" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const Card = ({
  item: { image, name, rating, price, address },
  onPress,
}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="w-1/2 mt-4 px-3 py-4 rounded-lg bg-white shadow-lg shadow-black-100/70 relative"
    >
      <View className="flex flex-row items-center absolute px-2 top-5 right-5 bg-white/90 rounded-full z-50">
        <Image source={icons.star} className="size-2.5" />
        <Text className="text-xs font-rubik-medium text-primary-300 ml-0.5">
          {rating}
        </Text>
      </View>
      <Image source={{ uri: image }} className="w-full h-40 rounded-2xl" />
      <View className="flex flex-col mt-2">
        <Text
          className="text-black-300 font-rubik-bold text-base"
          numberOfLines={1}
        >
          {name}
        </Text>
        <Text
          className="text-black-200 font-rubik-light text-xs"
          numberOfLines={1}
        >
          {address}
        </Text>
        <View className="flex flex-row items-center justify-between w-full">
          <Text
            className="text-primary-300 font-rubik-medium text-base mt-1"
            numberOfLines={1}
          >
            {price}
          </Text>
          <Image
            source={icons.heart}
            className="size-5 mr-2"
            tintColor="#191D31"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};
