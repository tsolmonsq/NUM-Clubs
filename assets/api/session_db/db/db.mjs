import postgres from 'postgres'

const sql = postgres('postgres://postgres:99180293@localhost:5432/postgres');

export default sql;