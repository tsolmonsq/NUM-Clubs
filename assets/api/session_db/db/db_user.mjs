import sql from './db.mjs';

import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10; 

class DbUser {
  constructor() {}

  // async isUsernameTaken(username) {
  //   try {
  //     const result = await sql`
  //       SELECT id FROM public.users WHERE username = ${username};
  //     `;
  //     return result.length > 0;
  //   } catch (error) {
  //     console.error('Error checking username:', error);
  //     throw error;
  //   }
  // }

  async isEmailTaken(email) {
    try {
      const result = await sql`
        SELECT id FROM public.users WHERE email = ${email};
      `;
      return result.length > 0;
    } catch (error) {
      console.error('Error checking email:', error);
      throw error;
    }
  }

  async hashPassword(password) {
    return bcrypt.hash(password, SALT_ROUNDS);
  }


  async createUser(username, email, password) {
    try {
  
      if (await this.isEmailTaken(email)) {
        throw new Error('Email is already taken.');
      }

      const hashedPassword = await this.hashPassword(password);

      const result = await sql`
        INSERT INTO public.users
        (username, email, password)
        VALUES
        (${username}, ${email}, ${hashedPassword})
        RETURNING id;
      `;

      const userId = result[0].id;
      return userId;

    } catch (error) {
      console.error('Error adding user:', error);
      throw error;
    }
  }

  async selectUsers() {
    try {
      const users = await sql`
        SELECT 
          *
        FROM 
          public.users;
      `;
      return users;
    } catch (error) {
      console.error('Error selecting users:', error);
      throw error;
    }
  }


  async login(email, password) {
    try {
        const user = await sql`
            SELECT 
                id, username, email, password
            FROM 
                public.users
            WHERE 
                email = ${email};
        `;

        if (user.length === 0) {
            throw new Error('User not found.');
        }

        const match = await bcrypt.compare(password, user[0].password);

        if (!match) {
            throw new Error('Invalid password.');
        }

        return user;

    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
  }
}

const dbUser = new DbUser();

export default dbUser;
