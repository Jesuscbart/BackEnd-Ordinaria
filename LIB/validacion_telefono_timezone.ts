export const validacion_telefono_timezone = async (city: string): Promise<{timezone}> => {

    const API_KEY = Deno.env.get("API_KEY");
    
    try{
        const BASE_URL = "https://api.api-ninjas.com/v1/worldtime?city=";

        const URL = `${BASE_URL}${city}`;

        const data = await fetch (URL, {headers: { 'X-Api-Key': 'TfpVmv+UNcY626HCsahRoA==UyGoFdRAAVjDkxeC'}});

        if (data.status !== 200){
            throw new Error("Bad request")
        }

        const json = await data.json();

        return {
            timezone: json.datetime,
        };

    }
    catch(Error){
        console.log("Error con la ciudad")
    }
};