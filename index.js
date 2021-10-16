const NodeMediaServer = require('node-media-server');


const template = function(templateString, templateVars){
    return new Function("return `"+templateString +"`;").call(templateVars);
}
function uuidv4() {
	const crypto = require('crypto')
	  let token = ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
	    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
	  );
	console.log("============================")
	console.log("since you didn't set a secret in the config");
  	console.log(`Your stream secret token is:\n\t${secret}`)
	console.log("============================")
}




let env = process.env;
let secret = env.SECRET || uuidv4();

const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: 8000,
    mediaroot: './media',
    webroot: './www',
    allow_origin: '*',
    api: true
  },
//   https: {
//     port: 8443,
//     key: './privatekey.pem',
//     cert: './certificate.pem',
//   },
  auth: {
    api: true,
    api_user: 'admin',
    api_pass: 'admin',
    play: false,
    publish: false,
    secret: secret
  },
    trans: {
    ffmpeg: '/usr/bin/ffmpeg',
    tasks: [
      {
        app: 'live',
        mp4: true,
        mp4Flags: '[movflags=faststart]',
      },
	  {
        app: 'live',
        hls: true,
        hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
        dash: true,
        dashFlags: '[f=dash:window_size=3:extra_window_size=5]'
      }
    ]
  },
  relay: {
  ffmpeg: '/usr/bin/ffmpeg',
  tasks: []
  },
};



let delimiter = env.DELIMITER || '_';
let prefix = env.PREFIX || 'SERVICE';
let prefixes = []

Object.keys(env).forEach(function(key){
	let args = key.split(delimiter)
	if(args.length && args[0] == prefix){
		prefixes.push(array[1])
	}
})



Object.keys(env).forEach(function(key){
	let args = key.split(delimiter)
	//find tokens
	if(args.length && prefixes.indexOf(args[0]) >= 0 ){
		let task = {
			app: 'live',
			mode: 'push',
			edge: template(env[prefix+delimiter+args[0]],env[key]),
			appendName: false
			}
		console.log(`adding task ${JSON.stringify(task)}`)
		config.relay.tasks.push(task);
	}
})




let nms = new NodeMediaServer(config)
nms.run();

nms.on('preConnect', (id, args) => {
  console.log('[NodeEvent on preConnect]', `id=${id} args=${JSON.stringify(args)}`);
  // let session = nms.getSession(id);
  // session.reject();
});

nms.on('postConnect', (id, args) => {
  console.log('[NodeEvent on postConnect]', `id=${id} args=${JSON.stringify(args)}`);
});

nms.on('doneConnect', (id, args) => {
  console.log('[NodeEvent on doneConnect]', `id=${id} args=${JSON.stringify(args)}`);
});

nms.on('prePublish', (id, StreamPath, args) => {
  console.log('[NodeEvent on prePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
  // let session = nms.getSession(id);
  // session.reject();
});

nms.on('postPublish', (id, StreamPath, args) => {
  console.log('[NodeEvent on postPublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
});

nms.on('donePublish', (id, StreamPath, args) => {
  console.log('[NodeEvent on donePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
});

nms.on('prePlay', (id, StreamPath, args) => {
  console.log('[NodeEvent on prePlay]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
  // let session = nms.getSession(id);
  // session.reject();
});

nms.on('postPlay', (id, StreamPath, args) => {
  console.log('[NodeEvent on postPlay]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
});

nms.on('donePlay', (id, StreamPath, args) => {
  console.log('[NodeEvent on donePlay]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
});
