import { Request } from "express";

export const validateFieldsForRequest = <T>(req: Request, validateFields: string[]) => {

    const missingFields: string[] = []
    const object: Record<string, any> = {}
    
    const keys = Object.keys(req.body)

    for (let index = 0; index < validateFields.length; index++) {
        const field = validateFields[index];    
        
        if(!keys.includes(field)){
            missingFields.push(field)
        }
    }

    if(missingFields.length > 0)
    {
        throw new Error(`fields are missing: ${missingFields.join(', ')}`);
    }

    console.log(validateFields.map(element => {element}))

    validateFields.map((element) => {object[element]= req.body[element]})

    return object as T
}