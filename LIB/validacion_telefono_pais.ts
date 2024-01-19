export const validacion_telefono_pais = async (number: string): Promise<{country}> => {

    const API_KEY = Deno.env.get("API_KEY");
    
    try{
        const BASE_URL = "https://api.api-ninjas.com/v1/validatephone?number=";

        const URL = `${BASE_URL}${number}`;

        const data = await fetch (URL, {headers: { 'X-Api-Key': 'TfpVmv+UNcY626HCsahRoA==UyGoFdRAAVjDkxeC'}});

        if (data.status !== 200){
            throw new Error("Bad request")
        }

        const json = await data.json();

        return {
            country: json.country,
        };
    }
    catch(Error){
        console.log("Error con el número de teléfono")
    }
};