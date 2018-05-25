import { app, BrowserWindow } from 'electron'
import fs from 'fs'
import path from 'path'
const ipc = require('electron').ipcMain
const dialog = require('electron').dialog

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

// console.log(workSheetsFromBuffer);

// import xlsx from 'node-xlsx';
// Or var xlsx = require('node-xlsx').default;

// Parse a buffer
// const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(`${__dirname}/chengji.xlsx`));
// Parse a file
// const workSheetsFromFile = xlsx.parse(`${__dirname}/chengji.xlsx`);

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    width: 1140,
    height: 700,
    // useContentSize: true,
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */

// 打开文件保存窗口
ipc.on('save-dialog', function (event) {
    const options = {
        title: '保存表格',
        filters: [
            { name: 'Excel', extensions: ['xlsx'] }
        ]
    }
    dialog.showSaveDialog(options, function (filename) {
        event.sender.send('saved-file', filename)
    })
})


/**
 * 读取static目录下的studentGrade.json，ipc双向通信传值(存疑：不知道是否有性能问题)
 * 待做：需要抽离出更通用的读取文件和保存文件的接口
 */
// let fileContents = fs.readFileSync(path.join(__static, '/studentGrade.json'), 'utf8')

ipc.on('read-stu-grade',  (event) => {
    fs.readFile(path.join(__static, '/studentGrade.json'), 'utf8', (err, data) => {
        if (err) throw err;
        event.returnValue = data;
    });
})

ipc.on('save-stu-grade',  (event,args) =>{
    console.log('now the args.data is',args.data);
    fs.writeFile(path.join(__static, '/studentGrade.json'), JSON.stringify(args.data), (err) => {
        if (err) throw err;
    });
})