import React, {Component} from 'react';
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class BottomBar extends Component {
    render() {
        return (
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
            </BottomNavigation>);
    }
}