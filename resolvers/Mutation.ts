import { Contacto } from "../types.ts";
import { GraphQLError } from "graphql";
import { ContactoModel, ContactoModelType } from "../DB/Contacto.ts";

export const Mutation = {

    addContact: async (_:unknown, args: {nombres_apellidos: string, telefono: string}): Promise<ContactoModelType> => {

        const {nombres_apellidos, telefono} = args;

        try{
            const newContact = new ContactoModel({
                nombres_apellidos: nombres_apellidos,
                telefono: telefono
            });

            await newContact.save();

            return newContact;
        }
        catch(Error){throw new GraphQLError(Error);}
    },

    deleteContact: async (_:unknown, args: {id: string}): Promise<ContactoModelType> => {

        const {id} = args;

        try{
            const deletedContact = await ContactoModel.findByIdAndDelete(id);

            if(!deletedContact){throw new GraphQLError("No existe el contacto");}

            return deletedContact;
        }
        catch(Error){throw new GraphQLError(Error);}
    },

    updateContact: async (_:unknown, args: {id: string, nombres_apellidos: string, telefono: string}): Promise<ContactoModelType> => {

        const {id, nombres_apellidos, telefono} = args;

        try{
           
            const updatedContact = await ContactoModel.findByIdAndUpdate(
                id,
                {nombres_apellidos, telefono},
                {new: true, runValidators: true}
            );

            if (!updatedContact) {throw new GraphQLError("No existe el contacto");}

            return updatedContact;
        }
        catch(Error){throw new GraphQLError(Error);}
    }

}