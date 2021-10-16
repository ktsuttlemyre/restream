# restream


Example env var config:
```
SERVICE_YOUTUBE = rtmp://a.rtmp.youtube.com/live2/${token}
SERVICE_TWITCH = rtmp://iad05.contribute.live-video.net/app/{stream_key}
	
TWITCH_SHIPWASH = "MaDeUpStrEamT0ken"
YOUTUBE_SHIPWASH = "An0TherMADEupToKEN"
```


Advanced syntax
Customize your variables with the following env vars
```
DELIMITER = _
PREFIX = SERVICE
```

Developer notes:

Twitch ingests
https://stream.twitch.tv/ingests/


Article that helps set up restreaming
https://calonpintar.wordpress.com/2020/07/16/multiple-rtmp-re-stream-simulcast-using-node-js/

Original custom code example:
https://github.com/calonpintar/node-media-server-simulcast/blob/master/app.js

library:
https://www.npmjs.com/package/node-media-server?activeTab=readme
