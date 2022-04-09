// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld('electronAPI', {
	handleColor: (callback:any) => {
		return ipcRenderer.on('update-color', callback)
	},
	updatePositionX: (callback: any) => ipcRenderer.on('update-position-x', callback),
	// writeLEDStatus: (value: 1|0) => {
	// 	ipcRenderer.invoke('write:LEDStatus', value)
	// },
})