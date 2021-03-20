import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { enableScreens } from "react-native-screens";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import RootNavigation from "./Navigation/RootNavigation";
import { Provider as StoreProvider } from "react-redux";
import { createStore, combineReducers } from "redux";
import GoalReducers from "./store/reducers/GoalReducers";

enableScreens();

export default function App() {
  const [loadState, setloadState] = useState(false);

  const reducers = combineReducers({
    goalReducers: GoalReducers,
  });

  const store = createStore(reducers);

  function cacheImages(images) {
    return images.map((image) => {
      if (typeof image === "string") {
        return Image.prefetch(image);
      } else {
        return Asset.fromModule(image).downloadAsync();
      }
    });
  }

  function cacheFonts(fonts) {
    return fonts.map((font) => Font.loadAsync(font));
  }

  const handleResourcesAsync = async () => {
    // we're caching all the images
    // for better performance on the app

    const imageAssets = cacheImages([
      require("./assets/splash.png"),
      require("./assets/icon.png"),
      require("./assets/Images/Logo.png")
    ]);

    const fontAssets = cacheFonts([]);

    return Promise.all([...imageAssets, ...fontAssets]);
  };

  if (!loadState) {
    return (
      <AppLoading
        startAsync={handleResourcesAsync}
        onError={(error) => console.warn(error)}
        onFinish={() => setloadState(true)}
      />
    );
  }

  return (
    <StoreProvider store={store}>
      <RootNavigation>
        <StatusBar style="auto" />
      </RootNavigation>
    </StoreProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
