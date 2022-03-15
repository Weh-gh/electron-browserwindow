const electron = require('electron');
const url = require('url');
const path = require('path');

const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow;

app.on('ready', () => {

    mainWindow = new BrowserWindow({});

    console.log(process.platform);

    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, "/public/src/index.html"),
            protocol: "file:",
            slashes: true
        })
    );

    const mainMenu =  Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);

    ipcMain.on("key", (err, data) => {
        console.log(data);
    });
});

const mainMenuTemplate = [
    {
        label: "Application",
        submenu: [
            {
                label: "Download"
            },
            {
                label: "Safety"
            },
            {
                label: "Support"
            },
            {
                label: "Blog"
            },
            {
                label: "Careers"
            },
            {
                label: "Exit",
                accelerator: process.platform == "darwin" ? "Command+Q" : "Ctrl+Q",
                role: "quit"
            }
        ]
    },
    {
        label: "Your account",
        submenu: [
            {
                label: "Your profile"
            },
            {
                label: "Log out"
            }
        ]

    }
]

// If you are using Win11, delete it. Those who use below Win11 should keep this section.
if (process.platform == "darwin") {
    mainMenuTemplate.unshift({
        label: app.getName(),
        role: "TODO"
    })
} 

if (process.env.NODE_ENV !== "production") {
    mainMenuTemplate.push(
        {
            label: "Dev Tools",
            submenu: [
                {
                    label: "Open",
                    click(item, focusedWindow) {
                        focusedWindow.toggleDevTools();
                    }
                },
                {
                    label: "Reload",
                    role: "reload"
                }
            ]
        }
    )
}