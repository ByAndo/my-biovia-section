import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from "fs";
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
        '@': path.resolve(__dirname, './src'),
    },
  },  
  server:{
    host : "10.10.21.154",
    port : 5173,
    cors : true,
    https: {
        key : fs.readFileSync("D:/50.WORK/01.Project/05.BIOVIA/TEST_SECTION/my-biovia-section/src/cert/ulm.dsk.com.key"),
        cert : fs.readFileSync("D:/50.WORK/01.Project/05.BIOVIA/TEST_SECTION/my-biovia-section/src/cert/ulm.dsk.com.crt"),
        ca : fs.readFileSync("D:/50.WORK/01.Project/05.BIOVIA/TEST_SECTION/my-biovia-section/src/cert/root_ulm_ca.crt"),
    },
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization"
    }
  },
  build:{
    sourcemap : true,
  }
});
