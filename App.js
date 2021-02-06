import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Image, Animated } from "react-native";
import faker from "faker";

const IMAGE_SIZE = 60;
const SPACING = 20;
const ITEM_HEIGHT = 100;
const ITEM_SIZE = ITEM_HEIGHT + SPACING;
const BACKGROUND_IMAGE =
  "https://images.pexels.com/photos/2552418/pexels-photo-2552418.jpeg?cs=srgb&dl=pexels-lisa-fotios-2552418.jpg&fm=jpg";

const list = [...Array(30).keys()].map((_, i) => ({
  key: faker.random.uuid(),
  name: faker.name.firstName(),
  jobTitile: faker.name.jobTitle(),
  avatar: `https://randomuser.me/api/portraits/${faker.helpers.randomize([
    "men",
    "women",
  ])}/${i}.jpg`,
  email: faker.internet.email(),
}));

export default function App() {
  const scrollY = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: BACKGROUND_IMAGE }}
        style={StyleSheet.absoluteFillObject}
        blurRadius={40}
        opacity={0.5}
      />
      <Animated.FlatList
        data={list}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollY,
                },
              },
            },
          ],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={1}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: SPACING,
          paddingTop: StatusBar.currentHeight || 42,
        }}
        renderItem={({ item, index }) => {
          const inputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 2),
          ];

          const opacityInputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 1),
          ];

          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0],
          });

          const opacity = scrollY.interpolate({
            inputRange: opacityInputRange,
            outputRange: [1, 1, 1, 0],
          });

          return (
            <Animated.View
              style={{
                height: ITEM_HEIGHT,
                alignItems: "center",
                flexDirection: "row",
                marginBottom: SPACING,
                borderRadius: 12,
                backgroundColor: "#FFF",
                padding: SPACING,
                shadowColor: "$00ff66",
                shadowOffset: {
                  width: 0,
                  height: 10,
                },
                shadowOpacity: 0.3,
                shadowRadius: 10,
                elevation: 4,
                opacity,
                transform: [
                  {
                    scale,
                  },
                ],
              }}
            >
              <Image
                style={{
                  width: IMAGE_SIZE,
                  height: IMAGE_SIZE,
                  borderRadius: IMAGE_SIZE,
                  marginRight: SPACING,
                }}
                source={{ uri: item.avatar }}
              />
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  flexWrap: "nowrap",
                }}
              >
                <Text
                  numberOfLines={1}
                  style={{ fontSize: 18, fontWeight: "bold" }}
                >
                  {item.name}
                </Text>
                <Text numberOfLines={1} style={{ fontSize: 14, opacity: 0.6 }}>
                  {item.jobTitile}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{ fontSize: 12, color: "#00CC1D" }}
                >
                  {item.email}
                </Text>
              </View>
            </Animated.View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
