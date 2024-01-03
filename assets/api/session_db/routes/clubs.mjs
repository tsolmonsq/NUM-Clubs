import dbClubs from "../db/db_clubs.mjs";

//Clubiin medeeleltei haritsah 
class Clubs{
    constructor(){
        this.clubs = new Map();
        
    }

    async getClubs(req, res){
        try{
            const result = await dbClubs.selectClubs();
            res.status(200).send(result);
        } catch(error){
            res.status(400).send("error occured");
        }
    }

    async getClubById(req, res){
        const clubId = req.params.id;

        try{
            const club = await dbClubs.selectClubById(clubId);

            if(!club){
                res.status(404).send("Not Found");
            }
            else{
                res.status(200).send(club);
            }
        } catch(error){
            console.error("Error fetching club by ID:", error);
            res.status(500).send("Internal Server Error");
        }
    }
    
}
const clubs = new Clubs();
export default clubs;