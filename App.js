import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GoalsScreen } from './src/routes/screens/GoalsScreen';
import { DetailGoalScreen } from './src/routes/screens/DetailGoalScreen';
import { StatusBar } from 'expo-status-bar';
import { NewGoalScreen } from './src/routes/screens/NewGoalScreen';
import { ScheduleScreen } from './src/routes/screens/SchedulesScreen';

const Stack = createNativeStackNavigator();

function App() {
  const screenOptions = {
    headerStyle: {
      backgroundColor: '#282A36',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Goals" component={GoalsScreen} options={screenOptions} />
          
          <Stack.Screen name="DetailGoal" component={DetailGoalScreen} options={screenOptions} />

          <Stack.Screen name="NewGoal" component={NewGoalScreen} options={screenOptions} />
          
          <Stack.Screen name="Schedules" component={ScheduleScreen} options={screenOptions} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="light" />
    </>
  );
}

export default App;