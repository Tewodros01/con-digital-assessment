// @ts-check
export const apps = [
  {
    name: 'main',
    script: 'dist/src/main.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 4500,
    },
  },
];
