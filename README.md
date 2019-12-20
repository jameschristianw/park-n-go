# Park N Go

## How to set your own firebase environment

In file ```environment.ts```, change the following to your own firebase setting

```
export const environment = {
  production: false,
  firebase: {
    apiKey: <your_apiKey>,
    authDomain: <your_authDomain>,
    databaseURL: <your_databaseURL>,
    projectId: <your_projectId>,
    storageBucket: <your_storageBucket>,
    messagingSenderId: <your_messagingSenderId>,
    appId: <your_appId>,
  },
};
```

## Setting API key for Google Maps

in file ```config.xml```, add these
```
<preference name="GOOGLE_MAPS_ANDROID_API_KEY" value="<your_google_maps_android_api_key>" />
<preference name="GOOGLE_MAPS_IOS_API_KEY" value="<your_google_maps_ios_api_key>" />
```
Both key can be the same or different. Different API key can be used for analytics purposes.

Then in the ```index.html```, add html script
```
<script src="https://maps.googleapis.com/maps/api/js?key=<YOUR_API_KEY>&libraries=places"></script>
```
