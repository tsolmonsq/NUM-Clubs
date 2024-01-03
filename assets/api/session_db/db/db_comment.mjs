import sql from './db.mjs';

//Ugugdliin san dahi commentiin medeeleltei haritsah
class DbComment{
    constructor(){}

    async addComment(text, username, clubId){
        try{
            const result = await sql`
            INSERT INTO public.comments
            (text, username, "clubId")
            VALUES (${text}, ${username}, ${clubId})
            RETURNING "commentId";
            `;

            const commentId = result[0].commentId;
            return commentId;
        }
        catch(error){
            console.error("Error adding comment: ", error);
            throw error;
        }
    }
    async selectCommentsByClubId(clubId){
        const comments = await sql`
        SELECT * FROM public.comments
        WHERE "clubId" = ${clubId}
        `;
        return comments;
    }
}

const dbComment = new DbComment();

export default dbComment;