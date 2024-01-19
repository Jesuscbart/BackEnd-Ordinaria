import mongoose from "mongoose";
import { Contacto } from "../types.ts"
import { validacion_telefono_pais } from "../LIB/validacion_telefono_pais.ts";
import { validacion_telefono_timezone } from "../LIB/validacion_telefono_timezone.ts"

const Schema = mongoose.Schema;

const ContactoSchema = new Schema(
    {
        nombres_apellidos: {type: String, required: true},
        telefono: {type: String, required: true, unique: true},
        //pais: {type: String, required: true},
        //hora: {type: String, required: true}

    },
    {timestamps: true}  //Para que salga en la BD cuando ha sido modificado
);

//Validación número
ContactoSchema
.path("telefono")
.validate(async (telefono: string) => {

    try{
        const tfno = await validacion_telefono_pais(telefono); //Si no hay error, es válido
        if(tfno === undefined) return false;
        else return true;
    }
    catch (Error){return false;}

});

export type ContactoModelType = mongoose.Document;

export const ContactoModel = mongoose.model<ContactoModelType>("Contacto", ContactoSchema);
