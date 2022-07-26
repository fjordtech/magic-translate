import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons'; 
import { BottomNavigation, Text, withTheme } from 'react-native-paper';

import Home from '@/pages/Home'
import History from '@/pages/History'

const AppRoutes = ({ navigation } : any) => {
  const [index, setIndex] = useState(0);

  const routes = [
    { key: 'home', title: 'Home' },
    { key: 'list-circle', title: 'Histórico'},
  ];

  // const renderScene = BottomNavigation.SceneMap({
  //   home: () => <Home />,
  //   'list-circle': History,
  // });

  const renderScene = ({ route }: any) => {
    switch (route.key) {
      case 'home':
        return <Home navigate={navigation.navigate} />;
      case 'list-circle':
        return <History navigate={navigation.navigate} />;
    }
  }

  return (
    <BottomNavigation
      sceneAnimationEnabled
      renderIcon={({ route, color, focused }) => <Ionicons name={focused ? route.key : `${route.key}-outline` as any} size={24} color={color} />}
      renderLabel={({ route }) => <Text style={{ fontSize: 12, textAlign: 'center' }}>{route.title}</Text>}
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default withTheme(AppRoutes);