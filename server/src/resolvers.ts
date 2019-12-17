
import { IResolvers } from "apollo-server-express";
import * as bcrypt from "bcryptjs";

import { User } from "./entity/User";

export const resolvers: IResolvers = {
    Query: {
        me: async (_: any, __: any, { req }): Promise<User | null> => {
            try {
                const { userId } = req.session;
                if(userId) {
                    const user: User | undefined = await User.findOne({
                        where: {
                            id: userId
                        }
                    });
                    if(user) {
                        console.log("req.session: ", req.session);
                        return user;
                    } else {
                        console.log("me not found user");
                        return null;
                    }
                } else {
                    console.log("me not found userId");
                    return null;
                }
            } catch(error) {
                console.log("me error: ", error.message);
                return null;    
            }
        }
    },
    Mutation: {
        register: async (_, { email, password }): Promise<boolean> => {
            console.log("email: ", email);
            console.log("password: ", password);
            try {
                const hashed: string = bcrypt.hashSync(password, 10);
                await User.create({
                    email,
                    password: hashed
                }).save();
                
                return true;
            } catch(error) {
                console.log("regsiter error: ", error);
                return false;
            }
        },
        login: async (_: any, args: any, { req }: any): Promise<User | null> => {
            const { email, password } = args;
            try {
                const user: User | undefined = await User.findOne({
                    where: {
                        email
                    }
                });
                if(user) {
                    const valid: boolean = bcrypt.compareSync(password, user.password);
                    if(valid) {
                        req.session.userId = user.id;
                        console.log("req: ", req);
                        return user;
                    } else {
                        console.log("loginResolvers: wrong password");
                        return null;
                    }
                } else {
                    console.log("loginResolvers: not found email");
                    return null;
                }
            } catch(error) {
                console.log("lgoinResolvers error: ", error.message);
                return null;
            };
        }
    }
};