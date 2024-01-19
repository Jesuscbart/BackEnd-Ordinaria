import {ApolloServer} from "@apollo/server";
import {startStandaloneServer} from "@apollo/server/standalone";
import { GraphQLError } from "graphql";
import mongoose from "mongoose";
import {typeDefs} from "./GQL/typeDefs.ts";
import {Mutation} from "./resolvers/Mutation.ts";
import {Query} from "./resolvers/Query.ts";

try{
    const MONGO_URL = Deno.env.get("MONGO_URL");

    if(!MONGO_URL){throw Error("MONGO_URL is missing \n");}
    await mongoose.connect(MONGO_URL);
    console.log("Conexión a la Base de datos exitosa");

    const resolvers = {Mutation, Query};
    const server = new ApolloServer({
        typeDefs,
        resolvers
    });

    const {url} = await startStandaloneServer(server, {listen: {port:3000}});
    console.log(`Servidor corriendo en el puerto ${url}`);
}
catch(Error){
    console.error(Error);
}