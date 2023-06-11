import {ActivityIndicator, useTheme} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';

export default function Loader() {
  const theme = useTheme();

  return (
    <View style={{...styles.container, backgroundColor: theme.colors.backdrop}}>
      <ActivityIndicator size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    position: 'absolute',
    marginHorizontal: -16,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
});
