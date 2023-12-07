import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Avatar, withTheme , Text} from "react-native-paper";

interface ScannerScreenProps {
  theme: any;
  navigation: any;
}

const ScannerScreen: React.FC<ScannerScreenProps> = ({ theme, navigation }) => {
  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.colors.primary,
        },
        button: {
          marginTop: 15,
          paddingVertical: 8,
          width: "50%",
          backgroundColor: theme.colors.secondary,
          marginBottom: 6,
          
        },
        title: {
          marginBottom: 30,
          color: theme.colors.sec2,
        },
      }),
    [theme]
  );

  const handleScan = () => {
    // Handle scanning logic
    console.log("Scanning...");
  };

  return (
    <View style={styles.container}>
      <Text variant="displayMedium" style={styles.title}>
        Add a Book
      </Text>
      <Avatar.Icon
        icon="camera"
        style={{ backgroundColor: "transparent" }}
        size={150}
        color={theme.colors.accent}
      />
      <Button
        mode="contained"
        onPress={handleScan}
        style={styles.button}
        icon="camera"
        labelStyle={{ fontSize: 20, color: theme.colors.black }}
        contentStyle={{ flexDirection: "row-reverse" }}
        uppercase={false}
      >
        Scan
      </Button>
    </View>
  );
};

export default withTheme(ScannerScreen);
