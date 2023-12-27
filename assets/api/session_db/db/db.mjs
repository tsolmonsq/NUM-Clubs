import postgres from 'postgres'

const sql = postgres('postgres://postgres:0607@localhost:5432/postgres');

export default sql;