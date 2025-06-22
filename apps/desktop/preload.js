const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld("electronAPI", {
  guardarAsignaturaJSON: (filename, data) =>
    ipcRenderer.invoke("guardar-asignatura-json", filename, data),

  leerAsignaturasLocales: () =>
    ipcRenderer.invoke("leer-asignaturas-locales"),

  guardarAlumno: (alumno) =>
    ipcRenderer.invoke("guardar-alumno", alumno)
})
