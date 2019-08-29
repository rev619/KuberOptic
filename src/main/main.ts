const fetchLocal = require('./local/local').default
const fetchGCP = require('./gcp/getGCPdata').default
const { app, ipcMain, BrowserWindow } = require('electron');
// console.log('Entering GCP...');
// const container = require('@google-cloud/container');

const GOOGLE_APPLICATION_CREDENTIALS:object = {
  "type": "service_account",
  "project_id": "demogorgan",
  "private_key_id": "845faaf256e89c6792fcfadf2059a8879e4ef94c",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCM+SKJciIGmJuX\nhblsexFlSL6b8zHIO1E/RpP6F0IYJTwry9nmWg5WPx9+Ow+KFSpLneoBwdbcp5Db\ngbXKN9S8UnMufCPSY43Indp5wACPjQ/0ejMChwwCZF/LtWshH3MIo7aTu69b7AVA\nh3nD/54cSUm/yohqlf20sVTtEeFsClGvbq3A9t53WYWIW0eJ/w0iy9wPZpx3+/vW\nykpoNdHtK57oB7+1wbdQTEPYIXKsyvGMG2Jhl0uiAPOk63LHM0ZyEukPfKdlj7SI\nY6H5FdpF03YD7CTrpdqq4xd7FvxRE8IWzLEP245GFtP1z75jhBVGczX+h7aLJS9R\nqpumJqXZAgMBAAECggEAAUkGMRWazM+YX43HDn+ivXcn0bkqY4Zy665DjBypLBou\nzcFqh6ibh9rEeTylnB8sRws2BnUTdeiLMA0jMKhIprzjsvFLzE+/C6ywwLpo5uYk\n1phEncnIaL8shmlthBxKyrHfaMJly2M/+wIhMJHEicJ7SyXYD4y1hu+09AJdOURt\nWmPr5pnemva6ZAAoYKGTgfaoJAa1V1csDE6t5jZMflOqOVG9I3gPmCZU2jHedrTO\np1lk4aj/O4MwpMc11B5GKnMNWYqLlUwT2tBHMNBtL3+3ia3rPJgq+tLzWvSU+xIU\nBS+PC52NkDiymvcCY3Rup8iPGwGc7zBDszMqRHZMWQKBgQDAFOceznF0QOkCFVmM\n0087pqCNAkPXfkIxA3YlNQdFsomd8SPuqWqrSBcay1X8U5MMyChMli721wVs+Znr\nCrLcVPF9LIOUmT8qOJPJ98x33xm49LSzA79c20uKXLPacbjCKuZMMZ4Cr+OQm0cE\nzn24u4yUfcJ0ZoOL+2lyJhSqFQKBgQC74mRM9MMGBr0N9Je9X/H0YwjGFSB4QvxA\nBBMlde96LiPNjpPtqlpyjlhK4u0HIgvStBOMc9dYpRkFuAU4VPyLORnLmwm60Zn0\nZnaCfUX09romt53hgwpzGmL9MvrU5mZQklHWHndPRYoZS7QPt2C3td5S2qbdHQxe\nzMd+7AMRtQKBgHhDXiXKqfxYu8sDJQtoLl6xyCohdeqRcc4QVcOb/Q6lZ0aNearv\nRgsx2s167D5M8W/6TkkNayA/pnUBnl4sV6peQMjXuxaqEINV4yp8TPfspsVH6W9/\n9CumXhimTDGELGLdy01/b2hNShT7M68NvmeQfcdnKf4JRWm6ot3Ge/+1AoGAUmYZ\nYv69QTlXVHV+ztjzPiDoyiad1OBbzJ983iL44fa2UQJEsijR/gebhUw8c7JkyQWc\nxS5QtVnCvZVVBL2Q/GYQgBEAlWQzRtJhCx1xvtsuDKjenvZfcNeTrkPbad+Z46Ao\nL+WwoZ130Vw4HeRokGk8lc26/KIuuKzKmUlclzkCgYEArjE7YdmOVErBJpWnM0d7\n9Z7BMZSNRufqkDoWwknePi7VS2Crae3/NEd3nV3M7bgzUG/W3QwQuSupBHbPKDFL\n4780GODd9yjIfTyxyi955aVc72XEr8U5K07yolyom/2yeaR0G6uIsekbr2tweb81\nXp1S/oDa95ek7IaGac8ttTs=\n-----END PRIVATE KEY-----\n",
  "client_email": "dg-420@demogorgan.iam.gserviceaccount.com",
  "client_id": "106459053858529781779",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/dg-420%40demogorgan.iam.gserviceaccount.com"
}

 async function getLocal() {
    const res = await fetchLocal();
    //console.log(res)
    return res
 }
 async function getGcp(GOOGLE_APPLICATION_CREDENTIALS) {
    const res = await fetchGCP(GOOGLE_APPLICATION_CREDENTIALS);
    //console.log(res)
    return res;
 }
 //getLocal();
 //getGcp(GOOGLE_APPLICATION_CREDENTIALS);

 ipcMain.on('asynchronous-message', (event: any, arg: any) => {
     console.log(arg) // prints "ping"
     getGcp(GOOGLE_APPLICATION_CREDENTIALS).then(res=>{
        event.sender.send('cluster-client', res)
     })
     getLocal().then(res=>{
      event.sender.send('cluster-client', res)
     })
     // arg should be the users credentials in the future
     //event.sender.send('cluster-client',[gcpData, locals]);
 })

// Even listeners

// start up the main process
app.on('ready', () => {
  // This creates a window on startup
  const window = new BrowserWindow({ width: 800,
    height: 600 ,
    webPreferences: {
      nodeIntegration: true // allow node integration on BrowserWindow
    },
  });

  // This loads the html page we bundled with webpack to display
  window.loadURL(`file://${__dirname}/index.html`);
});
