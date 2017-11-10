import React, {Component} from 'react';
import { View, Text, TouchableOpacity, AppRegistry, StyleSheet, ToolbarAndroid } from 'react-native';
import { Camera, Permissions } from 'expo';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation'

export default class Bananas extends Component {
    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
    };

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    onActionSelected(position) {
        if (position === 0) { // index of 'Settings'
            console.log('show settings');
            // showSettings();
        }
    }

    action() {
        //code
    }

    render() {
        const {hasCameraPermission} = this.state;
        if (hasCameraPermission === null) {
            return <View/>;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <View style={{flex: 1}}>
                    <ToolbarAndroid style={styles.toolbar}>
                        <TouchableOpacity onPress={this.action.bind(this)}>
                            <Icon name="menu" size={26} color="white" style={styles.menuButton} />
                        </TouchableOpacity>
                    </ToolbarAndroid>
                    <Camera style={{flex: 1}} type={this.state.type}>
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: 'transparent',
                                flexDirection: 'row'
                            }}>
                            <TouchableOpacity
                                style={{
                                    flex: 0.1,
                                    alignSelf: 'flex-end',
                                    alignItems: 'center'
                                }}
                                onPress={() => {
                                    this.setState({
                                        type: this.state.type === Camera.Constants.Type.back
                                            ? Camera.Constants.Type.front
                                            : Camera.Constants.Type.back
                                    });
                                }}>
                                <Text
                                    style={{fontSize: 18, marginBottom: 10, color: 'white'}}>
                                    {' '}Flip!{' '}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </Camera>
                    <BottomNavigation
                        labelColor="white"
                        rippleColor="white"
                        activeTab={1}
                        style={{ height: 56, elevation: 8, position: 'absolute', left: 0, bottom: 0, right: 0 }}
                        onTabChange={(newTabIndex) => alert(`New Tab at position ${newTabIndex}`)}
                    >
                        <Tab
                            barBackgroundColor="#37474F"
                            label="Video"
                            icon={<Icon size={24} color="white" name="switch-video" />}
                        />
                        <Tab
                            barBackgroundColor="#00796B"
                            label="Photo"
                            icon={<Icon size={24} color="white" name="camera-alt" />}
                        />
                        <Tab
                            barBackgroundColor="#5D4037"
                            label="Audio"
                            icon={<Icon size={24} color="white" name="keyboard-voice" />}
                        />
                        <Tab
                            barBackgroundColor="#3E2723"
                            label="Note"
                            icon={<Icon size={24} color="white" name="insert-comment" />}
                        />
                    </BottomNavigation>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    toolbar: {
        height: 50,
        backgroundColor: '#009688'
    },
    menuButton: {
        marginTop: 10
    }
});

// skip this line if using Create React Native App
AppRegistry.registerComponent('AwesomeProject', () => Bananas);