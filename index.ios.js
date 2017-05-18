/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Button,
    TextInput,
    View,
    Keyboard,
    ListView,
    WebView,
    Dimensions,
    Modal

} from 'react-native';
import RNFS from 'react-native-fs';
import FileOpener from 'react-native-file-opener';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation';
import CodePush from 'react-native-code-push';
import Speech from 'react-native-speech';

var {width, height} = Dimensions.get('window');

this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
export default class Demo extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {orientation: 'PORTRAIT'};
        Orientation.addOrientationListener(this._updateOrientation.bind(this))
        Orientation.addSpecificOrientationListener(this._updateSpecificOrientation.bind(this));
    }

    _updateOrientation(or) {
        console.log(or)
        this.setState({orientation: or});
    }

    _updateSpecificOrientation(sor) {
        console.log('------' + sor)
    }

    handleCapture(e) {
        const focueFailed = TextInput.State.currentlyFocusedField();
        const target = e.nativeEvent.target;
        if (focueFailed != null && target != focueFailed) {
            TextInput.State.blurTextInput(focueFailed)
        }

    }


    componentDidMount() {
        this.checkForUpdate();
    }

    checkForUpdate() {
        CodePush.checkForUpdate().then(
            (update) => {
                if (update) {

                    CodePush.sync(
                        {updateDialog: true, installMode: CodePush.InstallMode.IMMEDIATE},
                        syncStatus => {
                            switch (syncStatus) {
                                case CodePush.SyncStatus.UPDATE_INSTALLED:
                                    CodePush.notifyAppReady();
                                    alert('恭喜你,已成功更新到最新版本');
                                    break;
                            }
                        });
                    //CodePush.sync();
                } else {
                    console.log('已经是最新版本');
                }
            })
    }


    speech() {
        Speech.speak({
            text: '1aaaa2e3r',
            voice: 'zh-TW'
        })
            .then(started => {
                console.log('Speech started');
            })
            .catch(error => {
                console.log('You\'ve already started a speech instance.');
            });
    }

    render() {
        return (
            <View
                onStartShouldSetResponder={this.handleCapture.bind(this)}
                style={styles.container}>


                <Button
                    title="播放"
                    onPress={this.speech.bind(this)}/>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
let codePushOptions = {checkFrequency: CodePush.CheckFrequency.MANUAL};
Demo = CodePush(codePushOptions)(Demo);
AppRegistry.registerComponent('Demo', () => Demo);
