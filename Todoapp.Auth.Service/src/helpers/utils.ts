import { Request, Response } from "express";
import bcrypt from "bcrypt";

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

    validateFields.map((element) => {object[element]= req.body[element]})

    return object as T
}

export const hashPassword = async (passowrd: string) =>{
    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash(passowrd, salt)

    return hash;
}

export const verifyPassword = async (passowrd: string, encrypted: string) => await bcrypt.compare(passowrd, encrypted);