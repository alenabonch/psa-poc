import React, {Component} from 'react';
import { TouchableOpacity, StyleSheet, ToolbarAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class MenuBar extends Component {
    action() {
        //code
    }

    render() {
        return (
            <ToolbarAndroid style={styles.toolbar}>
                <TouchableOpacity onPress={this.action.bind(this)}>
                    <Icon name="menu" size={26} color="white" style={styles.menuButton} />
                </TouchableOpacity>
            </ToolbarAndroid>);
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