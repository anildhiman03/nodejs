export interface CreateVendorInput {
    name: string;
    ownerName: string;
    foodType: [string];
    pincode: string;
    address: string;
    phone: string;
    email: string;
    password: string;
}

export interface VandorLoginInput {
    email: string;
    password: string;
}

//for jwt
export interface VandorPayload {
    _id: string;
    email: string;
    name: string;
    foodTypes: [string];
}

export interface VandorEditInput {
    name: string;
    address: string;
    phone: string;
    foodTypes: [string];
}