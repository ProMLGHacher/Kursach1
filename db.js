import sql from 'postgres'

export const sql = await postgres({
    host: 'localhost',
    port: 5432,
    db: 'test',
    username: 'postgres',
    password: '123'
})