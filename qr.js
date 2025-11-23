const PastebinAPI = require('pastebin-js');
const pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL');
const { makeid } = require('./id');
const QRCode = require('qrcode');
const express = require('express');
const path = require('path');
const fs = require('fs');
let router = express.Router();
const pino = require('pino');
const {
    default: BroWaYesu_Tech,
    useMultiFileAuthState,
    jidNormalizedUser,
    Browsers,
    delay,
    makeInMemoryStore,
    fetchLatestBaileysVersion
} = require('@whiskeysockets/baileys');

function removeFile(FilePath) {
    if (!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, {
        recursive: true,
        force: true
    });
}

const { readFile } = require('node:fs/promises');

router.get('/', async (req, res) => {
    const id = makeid();
    async function BROWAYESU_MD_QR_CODE() {
        const { version } = await fetchLatestBaileysVersion();
        const { state, saveCreds } = await useMultiFileAuthState('./temp/' + id);
        try {
            let Qr_Code_By_BroWaYesu_Tech = Toxic_Tech({
                version,
                auth: {
                    creds: state.creds,
                    keys: makeInMemoryStore(state.keys, pino({ level: 'silent' }).child({ level: 'silent' })),
                },
                printQRInTerminal: false,
                logger: pino({ level: 'silent' }).child({ level: 'silent' }),
                browser: ['Ubuntu', 'Chrome'],
                syncFullHistory: false,
                connectTimeoutMs: 60000,
                keepAliveIntervalMs: 30000
            });

            Qr_Code_By_BroWaYesu_Tech.ev.on('creds.update', saveCreds);
            Qr_Code_By_BroWaYesu_Tech.ev.on('connection.update', async (s) => {
                const { connection, lastDisconnect, qr } = s;
                if (qr) await res.end(await QRCode.toBuffer(qr));
                if (connection === 'open') {
                    await Qr_Code_By_BroWaYesu_Tech.sendMessage(Qr_Code_By_BroWaYesu_Tech.user.id, { text: `
◈━━━━━━━━━━━◈
│❒ Hello! 👋 You're now connected to BROWAYESU-MD.

│❒ Please wait a moment while we generate your session ID. It will be sent shortly... 🙂
◈━━━━━━━━━━━◈
` });
                    await delay(5000);
                    let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
                    await delay(8000);
                    let b64data = Buffer.from(data).toString('base64');
                    let session = await Qr_Code_By_BroWaYesu_Tech.sendMessage(Qr_Code_By_BroWaYesu_Tech.user.id, { text: '' + b64data });

                    let BROWAYESU_MD_TEXT = `
           ◈━━━━━━◈
      SESSION CONNECTED
      
│❒ The long code above is your **Session ID**. Please copy and store it safely, as you'll need it to deploy your Toxic-MD bot! 🔐

│❒ Need help? Reach out to us:

『••• Visit For Help •••』
> Owner/Developer:
 _https://wa.me/254746432359_

> WaGroup:
 _https://chat.whatsapp.com/K8mKWGWLrYi4hSGZvb8PIK?mode=hqrt3_

> WaChannel:
 _https://whatsapp.com/channel/0029Vb6YML80VycDvHq6yV3S_


 
 
 > Bot Repo
 _https://github.com/BroWaYesu/BROWAYESU-MD_

│❒ Don't forget to give a ⭐ to our repo and fork it to stay updated! :)
◈━━━━━━━━━━━◈`;

                    await Qr_Code_By_BroWaYesu_Tech.sendMessage(Qr_Code_By_BroWaTesu_Tech.user.id, { text: BROWAYESU_MD_TEXT }, { quoted: session });

                    await delay(100);
                    await Qr_Code_By_BroWaYesu_Tech.ws.close();
                    return await removeFile('./temp/' + id);
                } else if (connection === 'close' && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
                    await delay(5000); 
                    BROWAYESU_MD_QR_CODE();
                }
            });
        } catch (err) {
            console.log('Service restarted due to error:', err);
            await removeFile('./temp/' + id);
            if (!res.headersSent) {
                await res.json({ code: 'Service is Currently Unavailable' });
            }
        }
    }
    return await BROWAYESU_MD_QR_CODE();
});

module.exports = router;
