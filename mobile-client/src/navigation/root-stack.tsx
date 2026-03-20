import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SplashScreen } from '../components/splash-screen';
import { CreateCampaignScreen } from '../screens/create-campaign-screen';
import { SearchCampaignsScreen } from '../screens/search-campaigns-screen';
import { StartScreen } from '../screens/start-screen';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootStack() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Start" component={StartScreen} />
      <Stack.Screen
        name="CreateCampaign"
        component={CreateCampaignScreen}
        options={{
          headerShown: true,
          title: 'Create a campaign',
        }}
      />
      <Stack.Screen
        name="SearchCampaigns"
        component={SearchCampaignsScreen}
        options={{
          headerShown: true,
          title: 'Search for campaigns',
        }}
      />
    </Stack.Navigator>
  );
}
