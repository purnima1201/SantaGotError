import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {AppTabNavigator} from './AppTabNavigator';
import CustomSideBarMenu from './CustomSideBarMenu';
import SettingScreen from '../screens/SettingScreen';
import MyDonationScreen from '../screens/MyDonationScreen';
import NotificationScreen from '../screens/NotificationScreen';
import MyReceivedBooksScreen from '../screens/MyRecievedBooksScreen';

export const AppDrawerNavigator =createDrawerNavigator({
    Home:{screen:AppTabNavigator},
    Settings:{screen:SettingScreen},
    MyDonations:{screen:MyDonationScreen},
    Notification : {screen : NotificationScreen},
    MyReceivedBooks :{
        screen: MyReceivedBooksScreen
    }
},
{
    contentComponent:CustomSideBarMenu
},
{
    initialRouteName:'Home'
}

)

