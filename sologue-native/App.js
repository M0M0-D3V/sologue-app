import React from "react";
import { StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";

const App = () => {
  return (
    <View style={styles.container}>
      <WebView source={{ uri: "https://sologue-app.web.app/" }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
