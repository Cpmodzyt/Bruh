
const express = require('express');
const fs = require('fs');
const { exec } = require("child_process");
let router = express.Router()
const pino = require("pino");
let pairingInProgress;


const {
    default: makeWASocket,
    useMultiFileAuthState,
    delay,
    makeCacheableSignalKeyStore,
    Browsers,
    jidNormalizedUser
} = require("@whiskeysockets/baileys");
const {upload} = require('./mega')

function removeFile(FilePath){
    if(!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true })
 };
router.get('/', async (req, res) => {
    let num = req.query.number;
        async function XeonPair() {
        const {
            state,
            saveCreds
        } = await useMultiFileAuthState(`./session`)
     try {
            let XeonBotInc = makeWASocket({
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({level: "fatal"}).child({level: "fatal"})),
                },
                printQRInTerminal: false,
                logger: pino({level: "fatal"}).child({level: "fatal"}),
                browser: Browsers.macOS("Safari"),
             });
             if(!XeonBotInc.authState.creds.registered) {
                await delay(1500);
                        num = num.replace(/[^0-9]/g,'');
                            const code = await XeonBotInc.requestPairingCode(num)
                 if(!res.headersSent){
                 await res.send({code});
                     }
                 }
            XeonBotInc.ev.on('creds.update', saveCreds)
            XeonBotInc.ev.on("connection.update", async (s) => {
                const {
                    connection,
                    lastDisconnect
                } = s;
                if (connection == "open") {


		try{
                await delay(10000);
                    const sessionXeon = fs.readFileSync('./session/creds.json');
                 //   const audioxeon = fs.readFileSync('./kongga.mp3');
                 //   XeonBotInc.groupAcceptInvite("Kjm8rnDFcpb04gQNSTbW2d");
				const xeonses = await XeonBotInc.sendMessage(XeonBotInc.user.id, { document: sessionXeon, mimetype: `application/json`, fileName: `creds.json` });
				/*XeonBotInc.sendMessage(XeonBotInc.user.id, {
                    audio: audioxeon,
                    mimetype: 'audio/mp4',
                    ptt: true
                }, {
                    quoted: xeonses
                });*/
		await XeonBotInc.sendMessage(XeonBotInc.user.id, { text: `🛑Do not share this file with anybody` }, {quoted: xeonses});
    
		var auth_path = './session/'	
	const user_jid = jidNormalizedUser(XeonBotInc.user.id);

                const mega_url = await upload(fs.createReadStream(auth_path + 'creds.json'), `${user_jid}.json`);
               
                const string_session = mega_url.replace('https://mega.nz/file/', '')

               const sid = "MXC~" + string_session
    
               const dt = await XeonBotInc.sendMessage(user_jid, {

                    text: sid

                })	

let eco = '*`'
let oce = '`*'
let oc = '>'

let desc = `⚠️ ${eco}Do not share this code with others. Use this to create the MXC bot.${oce}`		

XeonBotInc.sendMessage(user_jid, {

                    text: desc

                },{quoted:dt})		
await delay(300);
await XeonBotInc.ws.close()				
		}catch(e){
	

exec('pm2 restart all')

		}
			
			
	await delay(100);
	
        return await removeFile('./session');
        process.exit(0)
            } else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
               
		await delay(10000);
                    XeonPair();
                }
            });
        } catch (err) {
	     exec('pm2 restart all')
            console.log("service restated");
	XeonPair();
            
         if(!res.headersSent){
            await res.send({code:"Service Unavailable"});
         }
        }
    }
    return await XeonPair()
});

process.on('uncaughtException', function (err) {
console.log('Caught exception: ', err)
	XeonPair();
exec('pm2 restart all')
})



setTimeout(() => {
  console.log('Restarting every 10 minutes is Successful ✅');
XeonPair();
    exec('pm2 restart all', (err, stdout, stderr) => {
        if (err) {
            console.error('Error restarting server:', stderr);
        } else {
            console.log('Server restarted successfully ✅');
        }
    });
}, 600000); 





module.exports = router
