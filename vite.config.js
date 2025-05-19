
import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    include: ['@babel/runtime/helpers/createSuper']
  }
});