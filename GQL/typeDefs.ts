export const typeDefs = `#graphql

    type Contacto{
        id: ID!
        nombres_apellidos: String!
        telefono: String!
        pais: String!
        hora: String!
    }

    type Query {

        getContact(id: ID!): Contacto!
        
        getContacts: [Contacto!]!

    }

    type Mutation {

        addContact( nombres_apellidos: String!, telefono: String!): Contacto!

        deleteContact(id: ID!): Contacto!

        updateContact( id: ID!, nombres_apellidos: String!, telefono: String!): Contacto!

    }

`;