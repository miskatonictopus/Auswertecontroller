const { app, BrowserWindow, ipcMain } = require("electron")
const path = require("path")
const fs = require("fs")

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  })

  win.loadURL('http://localhost:5173')
  win.webContents.openDevTools()  
}


app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// Manejar la escritura del JSON
ipcMain.handle("guardar-asignatura-json", async (event, filename, data) => {
  try {
    const saveDir = path.join(app.getPath("documents"), "Auswertecontroller")
    const filePath = path.join(saveDir, filename)

    fs.mkdirSync(saveDir, { recursive: true })
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8")
    return { success: true, path: filePath }
  } catch (err) {
    console.error("❌ Error al guardar asignatura:", err)
    return { success: false, error: err.message }
  }
})

ipcMain.handle("leer-asignaturas-locales", async () => {
  const dir = path.join(app.getPath("documents"), "Auswertecontroller")
  try {
    const archivos = fs.readdirSync(dir)
    const jsonFiles = archivos.filter((f) => f.endsWith(".json"))
    const asignaturas = jsonFiles.map((nombreArchivo) => {
      const contenido = fs.readFileSync(path.join(dir, nombreArchivo), "utf-8")
      return JSON.parse(contenido)
    })
    return asignaturas
  } catch (e) {
    console.error("❌ Error al leer asignaturas locales:", e)
    return []
  }
})
