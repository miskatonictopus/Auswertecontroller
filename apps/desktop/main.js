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

    return { success: true }
  } catch (error) {
    console.error("Error al guardar:", error)
    return { success: false, error: error.message }
  }
})



// Ruta segura fuera del repo
const rutaAlumnos = path.join(app.getPath("userData"), "alumnos.json");

// Crear el archivo si no existe
function asegurarArchivoJSON() {
  if (!fs.existsSync(rutaAlumnos)) {
    fs.writeFileSync(rutaAlumnos, "[]", "utf-8");
  }
}

// Handler para guardar un nuevo alumno
ipcMain.handle("guardar-alumno", async (event, alumno) => {
  try {
    const saveDir = path.join(app.getPath("documents"), "Auswertecontroller")
    const filePath = path.join(saveDir, "alumnos.json")

    let alumnos = []
    if (fs.existsSync(filePath)) {
      const contenido = fs.readFileSync(filePath, "utf-8")
      alumnos = JSON.parse(contenido)
    }

    alumnos.push(alumno)
    fs.writeFileSync(filePath, JSON.stringify(alumnos, null, 2), "utf-8")

    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
})



