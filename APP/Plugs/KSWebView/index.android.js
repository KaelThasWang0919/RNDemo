import React, {Component} from 'react';
import {
    View,
    WebView,
    StyleSheet,
    Dimensions,
    TextInput
}from 'react-native';

import WebViewBridge from 'react-native-webview-bridge';
import WebViewAndroid from 'react-native-webview-android';
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
export default class KSWebView extends Component {

    render() {
        return (
            <View style={styles.container}>


                <WebViewAndroid
                    onScrollChanged={(event) => {
                        console.log("--------在JS中回调OnscrollChanged--------------")
                    }}
                    style={{width: Dimensions.get('window').width, flex: 1}}
                    source={{uri: 'https://www.baidu.com'}}
                />
            </View>
    );
    }
    }