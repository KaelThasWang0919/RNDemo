package com.demo;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.RNFetchBlob.RNFetchBlobPackage;
//import com.burnweb.rnwebview.RNWebViewPackage;
//import com.github.alinz.reactnativewebviewbridge.WebViewBridgePackage;
import com.cmcewen.blurview.BlurViewPackage;
import com.brentvatne.react.ReactVideoPackage;
//import com.microsoft.codepush.react.CodePush;
import com.github.alinz.reactnativewebviewbridge.WebViewBridgePackage;
import com.github.yamill.orientation.OrientationPackage;
import com.fileopener.FileOpenerPackage;
import com.jordansexton.react.crosswalk.webview.CrosswalkWebViewPackage;
import com.rnfs.RNFSPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

//    @Override
//    protected String getJSBundleFile() {
//      return CodePush.getJSBundleFile();
//    }

        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
            new RNFetchBlobPackage(),
                    //new RNWebViewPackage(),
                    new WebViewBridgePackage(),
                    new BlurViewPackage(),
                    new ReactVideoPackage(),
                    //new CodePush(null, getApplicationContext(), BuildConfig.DEBUG),
                    //new OrientationPackage(this),
                    new FileOpenerPackage(),
                    new RNFSPackage(),
                    new CrosswalkWebViewPackage()
            );
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
    }
}
