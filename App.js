import React, {Component} from 'react';
import { View, Text, TouchableOpacity, AppRegistry, StyleSheet, ToolbarAndroid, Vibration } from 'react-native';
import { Camera, Permissions, FileSystem } from 'expo';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation'

export default class Bananas extends Component {
    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
        photoId: 1,
        photos: []
    };

    componentDidMount() {
        // FileSystem.makeDirectoryAsync(
        //     FileSystem.documentDirectory + 'photos'
        // ).catch(e => {
        //     console.log(e, 'Directory exists');
        // });
    }

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    sayHello = function() {
        console.log('hello!!!');
    };

    takePicture = async function() {
        if (this.camera) {
            this.camera.takePicture().then(data => {
                FileSystem.moveAsync({
                    from: data,
                    to: `${FileSystem.documentDirectory}photos/Photo_${this.state
                        .photoId}.jpg`,
                }).then(() => {
                    this.setState({
                        photoId: this.state.photoId + 1,
                    });
                    Vibration.vibrate();
                });
            });
        }
    };

    action() {
        //code!!!
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

                    <Camera ref={ref => {
                                this.camera = ref;
                            }}
                            style={{flex: 1}}
                            type={this.state.type}>
                        <View
                            style={{
                                flex: 0.8,
                                backgroundColor: 'transparent',
                                flexDirection: 'row'
                            }}>
                            <TouchableOpacity
                                style={[
                                    { flex: 0.5, alignSelf: 'flex-end' },
                                ]}
                                onPress={this.sayHello.bind(this)}>
                                <Icon size={56} color="black" name="photo-camera" />
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