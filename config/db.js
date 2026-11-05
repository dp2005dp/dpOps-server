import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    user : process.env.USER,
    port : process.env.PORT,
    database :process.env.DATABASE,
    host: process.env.HOST,
    password : process.env.PASSWORD
})

export default pool;