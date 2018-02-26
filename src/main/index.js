import { app, BrowserWindow, Menu, Tray, dialog, ipcMain, Notification, shell } from 'electron'; // eslint-disable-line
import pkg from '../../package.json';
import Db from '../renderer/libs/storage';
import schedule from '../renderer/libs/schedule';

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\') // eslint-disable-line
}

let tray;
let settingWindow;
let scheduleNotify;
let isWin = process.platform === 'win32';
let isOsx = process.platform === 'darwin';
let downloading = false;
const settingWinURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9080/#'
  : `file://${__dirname}/index.html#`;

const createSettingWindow = () => {
  const options = {
    height: 450,
    width: 800,
    vibrancy: 'medium-light',
    transparent: true,
    titleBarStyle: 'hidden-inset',
    backgroundColor: 'none',
    resizable: false,
    maximizable: false,
    webPreferences: {
      backgroundThrottling: false,
      webSecurity: false,
    },
  };
  settingWindow = new BrowserWindow(options);

  settingWindow.loadURL(settingWinURL);
  settingWindow.on('closed', () => {
    settingWindow = null;
  });
};

function notify(time) {
  Db.getData('bugs', (data) => {
    if (data.length > 0) {
      data.forEach((v) => {
        const notification = new Notification({
          title: '你有一条新的bug',
          body: v.title,
        });
        notification.addListener('click', () => {
          shell.openExternal(v.url);
        });
        notification.show();
      });
    }
  });
}

function interval(data) {
  console.log(data.time);
  scheduleNotify = setTimeout(notify, data.time);
}

function stopInterval() {
  if (scheduleNotify) {
    clearTimeout(scheduleNotify);
  }
}

function startSchedule() {
  Db.getData('config', (data) => {
    // const contextMenu = Menu.buildFromTemplate(trayMenu);
    if (data.time) {
      schedule();
      interval(data);
    } else {
      dialog.showMessageBox({
        type: 'error',
        icon: `${__static}/icon_win.png`,
        message: '错误',
        detail: '请先设置定时任务',
      });
      // contextMenu.items[0].submenu.items[0].checked = false;
    }
  });
}

/* jslint browser:true */
let trayMenu = [
  {
    label: '选择默认缺陷管理',
    type: 'submenu',
    submenu: [
      {
        label: '禅道',
        type: 'radio',
        checked: Db.get('current') === 'zentao',
        click() {
          startSchedule();
          // Db.setData('current', 'zentao', true);
        },
      },
    ],
  },
  {
    label: '设置...',
    click() {
      if (!settingWindow) {
        createSettingWindow();
        settingWindow.show();
      } else {
        settingWindow.show();
        settingWindow.focus();
      }
    },
  },
  {
    type: 'separator',
  },
  {
    label: '检查更新',
    click() {
      // checkForUpdates();
    },
  },
  {
    label: '关于',
    click() {
      dialog.showMessageBox({
        type: 'info',
        icon: `${__static}/icon_win.png`,
        message: '缺陷通知',
        detail: `作者: tookbra\n版本: ${pkg.version}\nGithub: https://github.com/tookbra/bug-notify`,
      });
    },
  },
  {
    label: '退出',
    accelerator: 'Command+Q',
    selector: 'terminate:',
    click() {
      app.quit();
    },
  },
];

/* global someFunction */
function createTray(title = '选择默认缺陷管理') {
  const menuBarPic = process.platform === 'darwin' ? `${__static}/icon.png` : `${__static}/icon_win.png`;
  trayMenu[0].label = title;
  if (!tray) {
    tray = new Tray(menuBarPic);
  }
  const contextMenu = Menu.buildFromTemplate(trayMenu);
  contextMenu.items[0].label = title;
  tray.setImage(menuBarPic);
  tray.setContextMenu(contextMenu);
}

app.setName(pkg.name);
app.on('ready', () => {
  createTray();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (tray === null) {
    createTray();
  }
});

ipcMain.on('reset-scheduleNotify', (event, arg) => {
  stopInterval();
  interval(arg.notifyConfig);
  console.log(arg);
});

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
