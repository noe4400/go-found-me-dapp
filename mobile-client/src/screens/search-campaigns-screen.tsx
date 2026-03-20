import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export function SearchCampaignsScreen() {
  return (
    <View style={styles.root}>
      <Text style={styles.body}>Search campaigns — placeholder.</Text>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  root: {
    flex: 1,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
  },
  body: {
    fontFamily: theme.typography.fontFamily.sans.regular,
    fontSize: theme.typography.fontSize.body,
    color: theme.colors.textSecondary,
  },
}));
