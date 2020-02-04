import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import {
    HomeScreen
} from '../screens/index';
import { createAppContainer } from 'react-navigation';

export const AppStack = createStackNavigator(
    {
        Home: HomeScreen
    },
    {
        defaultNavigationOptions: {
            header: null
        },
        initialRouteName: 'Home'
    }
)

export const AppContainer = createAppContainer(AppStack)