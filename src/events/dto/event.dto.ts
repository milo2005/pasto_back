import {IsNotEmpty, IsDate, IsUrl, ValidateIf, Min, ValidationOptions} from "class-validator";

export class EventDto {
    id?: string;
    
    @IsNotEmpty()
    name: string;
    
    @IsNotEmpty()
    description: string;
    
    @IsDate()
    date: string;
    
    @IsUrl()
    image: string;
    
    @IsNotEmpty()
    owner: string;
    
    @IsNull()
    address?: string;
    
    @IsNull()
    @Min(0)
    cost?: number;
}


function IsNull(validationOptions?: ValidationOptions){
    return ValidateIf((_, value)=> value != undefined, validationOptions)
}