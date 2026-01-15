import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Carrega as variáveis de ambiente baseadas no modo (dev/prod)
  // Fix: Property 'cwd' does not exist on type 'Process' - casting to any to ensure access to Node.js built-ins
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  return {
    plugins: [react()],
    define: {
      // Garante que process.env.API_KEY seja substituído pelo valor real
      // Fix: Casting process to any for safe property access in the build configuration
      'process.env.API_KEY': JSON.stringify(env.API_KEY || (process as any).env.API_KEY)
    }
  };
});
