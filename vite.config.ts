import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import Components from '@uni-helper/vite-plugin-uni-components';
import { WotResolver } from '@uni-helper/vite-plugin-uni-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // make sure put it before `Uni()`
    Components({
      resolvers: [WotResolver()]
    }),
    uni()
  ]
});
