    import dbUser from "../db/db_user.mjs";

    class User {
        constructor() {
            this.users = new Map();
            this.sessions = new Map();
        }

    
        async isEmailTaken(email) {
            return await dbUser.isEmailTaken(email);
        }

        async signup(req, res) {
            try {
                const { username, email, password } = req.body;

                if (await this.isEmailTaken(email)) {
                    return res.status(400).json({ message: 'Email is already taken.' });
                }

                await dbUser.createUser(username, email, password);

                res.status(201).json({ message: 'User registered successfully.' });
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Internal server error.' });
            }
        }

        async getUsers(req, res) { 
            try {
                const result = await dbUser.selectUsers();
                res.status(200).send(result);
                return;
            } catch (error) {
                res.status(400).send("error occured");
            }
        }

        async verifyLogin(req, res) {
            const email = req.body.email;
            const pass = req.body.password;
        
            try {
                const userDb = await dbUser.login(email, pass);
        
                if (userDb == null || userDb.length === 0) {
                    res.status(403).end();
                    return;
                }
        
                const sid = Math.floor(Math.random() * 100_000_000_000_000);

                const expTime = 30 * 24 * 60 * 60 * 1000; //30 days
                
        
                this.sessions.set(sid, {
                    user: email,
                    username: userDb[0].username,
                    logged: Date.now(),
                });
        
                console.log(this.sessions);
        
                res.status(200).cookie("session_id", sid, { 
                    httpOnly: true,
                    expires: new Date(Date.now() + expTime)
                }).json({
                    result: "OK",
                    username: userDb[0].username,
                });
            } catch (error) {
                console.error('Login Error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }        
    }
    const user = new User();
    export default user;