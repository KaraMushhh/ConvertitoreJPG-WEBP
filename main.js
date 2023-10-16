const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const webp = require('webp-converter');
webp.grant_permission();

let mainWindow

const createWindows = () => {
    mainWindow = new BrowserWindow({
        width:800, //crea una finestra di browser di queste dimebnsioni 
        height:600,
        webPreferences : {
            nodeIntegration:true,
            contextIsolation: false,
            preload: path.join(__dirname, 'preload.js') //carica il file preload.js
        }
})

    mainWindow.loadFile('index.html') //in quella dfinestra caricami index.html
    
}

app.whenReady().then(() => {
    createWindows()
}) //appena app pronta allora caricami quella funzione che carica la pagina

// ipcMain.on('prova', (e,data) => {
//     console.log(data)
//     mainWindow.webContents.send('risposta', {nome:'marco', congome: 'verdi'})
// })

ipcMain.on('immagine:converti', () => {
const result = webp.cwebp("Cat03.jpg","Cat03.webp","-q 80",logging="-v");
result.then((response) => {
    console.log(response);
    mainWindow.webContents.send('immagine:convertita')
});
})