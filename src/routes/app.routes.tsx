import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons'; 
import { BottomNavigation, Text } from 'react-native-paper';

import Home from '@/pages/Home'
import History from '@/pages/History'

const AppRoutes = () => {
  const [index, setIndex] = useState(0);

  const routes = [
    { key: 'home', title: 'Home' },
    { key: 'list-circle', title: 'Histórico'},
  ];

  const renderScene = BottomNavigation.SceneMap({
    home: Home,
    'list-circle': History,
  });

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

export default AppRoutes;