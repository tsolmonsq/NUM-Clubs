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
    async selectClubById(clubId) {
        const club = await sql`
            SELECT * FROM public.clubs
            WHERE "clubId" = ${clubId}
        `;
        return club;
    }
}

const dbClub = new DbClub();

export default dbClub;