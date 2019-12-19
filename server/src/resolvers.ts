import { IResolvers } from "apollo-server-express";
import * as bcrypt from "bcryptjs";

import { User } from "./entity/User";
import { stripe } from "./stripe";

export const resolvers: IResolvers = {
    Query: {
        me: async (_: any, __: any, { req }): Promise<User | null> => {
            try {
                const { userId } = req.session;
                if(userId) {
                    const user: User | undefined = await User.findOne({
                        id: userId
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
        },
        createSubscription: async (_, { source, ccLast4 }, { req }): Promise<User | null> => {
            if(req.session && req.session.userId) {
                const user: User | undefined = await User.findOne({
                    id: req.session.userId
                });
                if(user) {
                    const customer = await stripe.customers.create({
                        email: user.email,
                        source,
                        plan: process.env.STRIPE_PLAN_KEY || ""
                    });
                    
                    user.stripeId = customer.id;
                    user.type = "paid";
                    user.ccLast4 = ccLast4;

                    await user.save();
                    
                    return user;
                } else {
                    console.log("createSubscription no user");
                    return null;
                }
            } else {
                // console.log("createSubscription No Authorized");
                throw new Error("No authenticated");
            }
        },
        changeCreditCard: async (_, { source, ccLast4 }, { req }): Promise<User | null> => {
            const userId = req.session.userId;
            if(userId) {
                try {
                    const user: User | undefined = await User.findOne({
                        id: userId
                    });
                    if(user && user.stripeId && user.type === "paid") {
                        await stripe.customers.update(user.stripeId, {
                            source
                        });
                        user.ccLast4 = ccLast4;
                        await user.save();
                        return user;                        
                    } else {
                        console.log("changeCreditCard no user Or no register creditcard");
                        return null;
                    }
                } catch(error) {
                    return null;
                }
            } else {
                throw new Error("changeCreditCard no authenticated");
            }
        }
    }
};