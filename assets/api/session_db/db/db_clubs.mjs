import sql from './db.mjs'

class DbClub{
    constructor(){
        
    }
    async selectClubs(){
        const clubs = await sql`
        SELECT * FROM public.clubs
        `
        return clubs;
    }
}

const dbClub = new DbClub();

export default dbClub;