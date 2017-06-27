import React, {Component} from 'react';
import {
    View,
    WebView,
    StyleSheet,
    Dimensions,
    TextInput,
    Text
}from 'react-native';

import {WebViewBridge} from '../../../react-native-webview-bridge-2';
import CrosswalkWebView from '../../../react-native-webview-crosswalk';

var {width, height}=Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    }
});
const injectScript = `
  (function () {
    if (WebViewBridge) {
      WebViewBridge.onMessage = function (message) {
        if (message === "hello from react-native") {
          WebViewBridge.send("got the message inside webview");
        }
      };
      WebViewBridge.send("hello from webview");
    }
  }());
`;

export default class KSWebView extends Component {


    onBridgeMessage(message) {
        const {webviewbridge} = this.refs;

        switch (message) {
            case "hello from webview":
                console.warn("-----在JS中调用sendToBridge")
                webviewbridge.sendToBridge("hello from react-native");
                break;
            case "got the message inside webview":
                console.warn("got the message inside webview")
                console.log("we have got a message from webview! yeah");
                break;
        }
    }

    render() {
        return (
            <View style={styles.container}>

                <Text
                    onPress={this.onBridgeMessage.bind(this, "hello from webview")}
                >hello from webview</Text>

                <WebView
                    ref="webviewbridge"
                    onBridgeMessage={this.onBridgeMessage.bind(this)}
                    javaScriptEnabled={true}
                    injectedJavaScript={injectScript}
                    style={{width: Dimensions.get('window').width, flex: 1}}
                    source={{uri:'http://www.qq.com'}}
                />
                <CrosswalkWebView
                    onBridgeMessage={()=>{console.warn("CrosswalkWebView 收到来自原生的消息")}}
                    source={require('./test.html')}
                    style={{width:width,flex:2}}

                />
            </View>
        );
    }
}