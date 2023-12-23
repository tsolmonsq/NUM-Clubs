import dbClubs from "../db/db_clubs.mjs";

class Clubs{
    constructor(){
        this.clubs = new Map();
        this.sessions = new Map();
    }

    async getClubs(req, res){
        try{
            const result = await dbClubs.selectClubs();
            res.status(200).send(result);
        } catch(error){
            res.status(400).send("error occured");
        }
    }
}
const clubs = new Clubs();
export default clubs;