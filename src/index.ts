import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
// import { Post } from "./entities/Post";
import microConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { PostResolver } from "./resolver/post";

const main = async () => {
    const orm = await MikroORM.init(microConfig);
    await orm.getMigrator().up();

    const app = express();
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [PostResolver],
            validate: false,
        }),
        context: () => ({ em: orm.em }),
    });
    apolloServer.applyMiddleware({ app });
    app.listen(8000, () => {
        console.log("Server started on localhost:8000");
    });
};

main().catch((err) => {
    console.error(err);
});
