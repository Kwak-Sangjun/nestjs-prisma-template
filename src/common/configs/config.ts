import type { Config } from './config.interface';

const config: Config = {
    nest: {
        port: 3000,
    },
    cors: {
        enabled: true,
    },
    swagger: {
        enabled: true,
        title: 'Inner Loader Rest API',
        description: 'Inner Loader Rest API',
        version: '1.0.0',
        path: 'api-docs',
    },
};

export default (): Config => config;
