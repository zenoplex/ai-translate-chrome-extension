import type { Config } from 'tailwindcss/types/config';
import daisyui from 'daisyui';

export default {
  theme: {
    extend: {},
  },
  plugins: [daisyui],
} as Omit<Config, 'content'>;
