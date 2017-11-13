import React, {Component} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Camera, Permissions, FileSystem } from 'expo';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class CameraTab extends Component {
    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
        photoId: 1,
        photos: []
    };

    componentDidMount() {
        console.log('did mount');
        console.log(FileSystem.documentDirectory + 'photos');
        FileSystem.makeDirectoryAsync(
            FileSystem.documentDirectory + 'photos'
        ).catch(e => {
            console.log(e, 'Directory exists');
        });
    }

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    // take picture and move it to directory
    takePicture = async function() {
        if (this.camera) {
            console.log('camera is present');
            let data = await this.camera.takePictureAsync();
            console.log('we got picture!');
            console.log(data);
            try {
                const newUri = `${FileSystem.documentDirectory}photos/Photo_${this.state.photoId}.jpg`;
                await FileSystem.moveAsync({
                    from: data.uri,
                    to: newUri,
                });
                this.setState({
                    photoId: this.state.photoId + 1,
                });
                console.log('moved');
            } catch(e) {
                console.log(e, 'error moving picture');
            }
        }
    };

    render() {
        const {hasCameraPermission} = this.state;
        if (hasCameraPermission === null) {
            return <View/>;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <View style={{flex: 1}}>
                    <Camera ref={ref => {
                        this.camera = ref;
                    }}
                            style={{flex: 1, flexDirection: 'row'}}
                            type={this.state.type}>
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: 'transparent',
                                flexDirection: 'column',
                                alignSelf: 'flex-end'
                            }}>
                            <TouchableOpacity
                                style={[
                                    { flex: 0.25, alignSelf: 'center' },
                                ]}
                                onPress={this.takePicture.bind(this)}>
                                <Icon size={76} color="white" name="fiber-manual-record" />
                            </TouchableOpacity>
                        </View>
                    </Camera>
                </View>
            );
        }
    }
}