import dbComment from "../db/db_comment.mjs";

class Comment{
    constructor(){

    }

    async writeComment(req, res){
        try{
            const {text, username, clubId} = req.body;

            await dbComment.addComment(text, username, clubId);

            res.status(201).json({
                message: 'Comment added successfully'
            });
        }
        catch(error){
            console.error(error);
            res.status(500).json({
                message: 'Internal server error.'
            });
        }
    }
    async getCommentsByClubId(req, res){
        const clubId = req.params.id;

        try{
            const comments = await dbComment.selectCommentsByClubId(clubId);

            if(!comments){
                res.status(404).send("Not Found");
            }
            else{
                res.status(200).send(comments);
            }
        }
        catch(error){
            console.error("Error fetching comments by clubId:", error);
            res.status(500).send("Internal Server Error");
        }
    }
}

const comment = new Comment();
export default comment;