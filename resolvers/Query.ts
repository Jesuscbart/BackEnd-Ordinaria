import { Contacto } from "../types.ts";
import { GraphQLError } from "graphql";
import { ContactoModel, ContactoModelType } from "../DB/Contacto.ts";
import { validacion_telefono_pais } from "../LIB/validacion_telefono_pais.ts";
import { validacion_telefono_timezone } from "../LIB/validacion_telefono_timezone.ts";

export const Query = {

    getContact: async (_:unknown, args: {id: string}): Promise<ContactoModelType> => {

        const {id} = args;
        try{

            const contacto_db = await ContactoModel.findById(id);

            if(!contacto_db) {
                throw new GraphQLError("No existe el contacto");
            }

            const Contacto = {
                id: contacto_db._id,
                nombres_apellidos: contacto_db.nombres_apellidos,
                telefono: contacto_db.telefono,
                pais: validacion_telefono_pais(contacto_db.telefono),
                hora: validacion_telefono_timezone(validacion_telefono_pais(contacto_db.telefono)),
            }

            return Contacto;    
        }
        catch(Error){throw GraphQLError(Error);}
    },

    getContacts: async (_:unknown): Promise<ContactoModelType[]> => {

        try {

            const contactos_db = await ContactoModel.find();

            if(!contactos_db){
                throw new GraphQLError("No hay contactos");
            }
            
            const contactos = contactos_db.map((contacto_db: ContactoModelType) => {
                const Contacto = {
                    id: contacto_db._id,
                    nombres_apellidos: contacto_db.nombres_apellidos,
                    telefono: contacto_db.telefono,
                    pais: contacto_db.pais,
                    hora: contacto_db.hora,
                }
                return Contacto;
            });

            return contactos;
        }
        catch(Error){throw new GraphQLError(Error);}
    }

};