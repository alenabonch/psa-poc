import React, {Component} from 'react';
import { View, Text, TouchableOpacity, AppRegistry, StyleSheet, ToolbarAndroid } from 'react-native';
import Camera from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation'

export default class Bananas extends Component {
    // state = {
    //     hasCameraPermission: null,
    //     type: Camera.Constants.Type.back,
    // };
    //
    // async componentWillMount() {
    //     const { status } = await Permissions.askAsync(Permissions.CAMERA);
    //     this.setState({ hasCameraPermission: status === 'granted' });
    // }

    action() {
        //code..
    }

    takePicture() {
        const options = {};
        //options.location = ...
        this.camera.capture({metadata: options})
            .then((data) => console.log(data))
            .catch(err => console.error(err));
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <ToolbarAndroid style={styles.toolbar}>
                    <TouchableOpacity onPress={this.action.bind(this)}>
                        <Icon name="menu" size={26} color="white" style={styles.menuButton} />
                    </TouchableOpacity>
                </ToolbarAndroid>

                <View style={styles.container}>
                    <Camera
                        ref={(cam) => {
                            this.camera = cam;
                        }}
                        style={styles.preview}
                        aspect={Camera.constants.Aspect.fill}>
                        <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
                    </Camera>
                </View>

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

const styles = StyleSheet.create({
    toolbar: {
        height: 50,
        backgroundColor: '#009688'
    },
    menuButton: {
        marginTop: 10
    },
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        color: '#000',
        padding: 10,
        margin: 40
    }
});

// skip this line if using Create React Native App
AppRegistry.registerComponent('AwesomeProject', () => Bananas);