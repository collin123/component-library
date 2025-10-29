import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
    // Example: exposed API
});
