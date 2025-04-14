export default () => ({
    port: process.env.PORT || 3000,
    database: {
        url: process.env.DATABASE_URL,
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'secretKey',
        expiresIn: '1d',
    },
    openai: {
        apiKey: process.env.OPENAI_API_KEY || 'fake-key',
    },
});
