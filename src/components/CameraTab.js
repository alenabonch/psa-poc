import React, {Component} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Camera, Permissions, FileSystem } from 'expo';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class CameraTab extends Component {
    outboxDirectory = `${FileSystem.documentDirectory}outbox`;
    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back
    };

    componentDidMount() {
        console.log(this.outboxDirectory, 'trying to make outbox directory');
        FileSystem.makeDirectoryAsync(this.outboxDirectory).catch(e => {
            console.log(e, 'Directory exists');
        });
    }

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    async takePicture() {
        if (this.camera) {
            const photo = await this.camera.takePictureAsync();
            await this.movePhotoToOutbox(photo);
        }
    }

    async uploadImageAsync(uri, name) {
        let apiUrl = 'http://psa-lb-672808281.us-east-1.elb.amazonaws.com/upload';

        let uriParts = uri.split('.');
        let fileType = uriParts[uriParts.length - 1];

        let formData = new FormData();
        formData.append('photo', {
            uri,
            name: name,
            type: `image/${fileType}`,
        });

        let options = {
            method: 'POST',
            body: formData,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            },
        };
        return fetch(apiUrl, options);
    }

    async movePhotoToOutbox(photo) {
        try {
            console.log(photo);
            const photoName = `Photo_${new Date().getTime().toString(36)}`;
            const newUri = `${this.outboxDirectory}/${photoName}`;
            await FileSystem.moveAsync({
                from: photo.uri,
                to: newUri
            });
            const info = await FileSystem.getInfoAsync(newUri);
            // await this.uploadImageAsync(newUri, photoName);
            console.log(`Photo moved to outbox:`);
            console.log(info);
        } catch (e) {
            console.log(e, 'Error moving photo');
        }
    }

    //
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
                                <Icon size={86} color="white" name="fiber-manual-record" />
                            </TouchableOpacity>
                        </View>
                    </Camera>
                </View>
            );
        }
    }
}