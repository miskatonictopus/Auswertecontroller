// apps/desktop/preload.js
const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  ping: () => 'pong from preload'
})
