


export const EnvConfigurations = () => ({
    JWT_SECRET: process.env.JWT_SECRET,
    MONGODB: process.env.MONGODB,
    PORT: process.env.PORT || 3750,
    LOG_LEVEL: process.env.LOG_LEVEL,
    ENVIROMENT: process.env.ENVIROMENT || 'developer',
    ALLOWEDORIGINS: process.env.ALLOWEDORIGINS,
    EMAILTEST: process.env.EMAILTEST || '',
    EMAILINFO: process.env.EMAILINFO || '',
    DEFAULT_LIMIT: process.env.DEFAULT_LIMIT || 12
})