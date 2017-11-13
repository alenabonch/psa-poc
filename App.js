import React, {Component} from 'react';
import { View, AppRegistry } from 'react-native';
import MenuBar from './src/components/MenuBar';
import BottomBar from './src/components/BottomBar';
import CameraTab from './src/components/CameraTab';

export default class App extends Component {
    render() {
        return (
            <View style={{flex: 1}}>
                <MenuBar />
                <CameraTab />
                <BottomBar />
            </View>
        );
    }
}

AppRegistry.registerComponent('App', () => App);