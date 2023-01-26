import { IsEmail, IsEmpty, Length } from "class-validator";

export class CustomerCustomerInputs {

    @IsEmail()
    email: string;

    @Length(7, 14)
    phone: number;

    @Length(5, 12)
    password: string;
}

export interface CustomerPayLoad {
    _id: string;
    email: string;
    verified: boolean;
}
