module.exports = {
    apps: [
        {
            name: 'api',
            script: './database/app.js',
            env: {
                NODE_ENV: 'production',
                DB_NAME: 'aiwa_web',
                DB_USER: 'aiwa_web',
                DB_PASSWORD: '@BaseSitioAiwa2024@',
                DB_HOST: 'totalhome.xvserver.com',
                DB_DIALECT: 'mysql',
            }
        },
        {
            name: 'nextjs',
            script: 'npm',
            args: 'start',
            cwd: './aiwa_front',
            env: {
                NODE_ENV: 'production',
                NEXT_PUBLIC_API_URL: 'http://www.aiwaelectronics.com.ar',
                API_URL: 'http://www.aiwaelectronics.com.ar',
            }
        }
    ]
};
