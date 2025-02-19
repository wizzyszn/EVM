interface UserAuthInfoInt {
    id: string;
    role: string;
    name: string;
    email: string;
    created_at: string;
    profile_picture: string;
}

// ? GeneralReturnInt is to be used for all response that have status, message, status_code, data, and access_token(optional)
interface   GeneralReturnInt<T> {
    status: number;
    message: string;
    data: T;
    status_code: number;
    token?: string;
    info ?: string
}

export enum StorageKeysEnum {
    token = "estate_token",
    isAuthenticated = "estate_logged_in",
    user = "estate_user"
}
interface UserInt {
    user :  {
        name: string;
        email: string;
        phone: string;
        password: string;
        authenticated : boolean;
        role: "admin" | "tenant"; // Assuming roles are restricted to these values
        properties: any[]; // Adjust type if properties have a specific structure
        estate: string | null;
        _id: string;
        createdAt: string; // ISO date string
        updatedAt: string; // ISO date string
        __v: number;
      };
}
  type RejectedPayload = {
    status?: number;
    message?: string;
    status_code?: number;
    data?: [];
};

interface Estate {
    _id: string;
    name: string;
  }
  
  interface Owner {
    _id: string;
    name: string;
    email: string;
  }
  
  interface Property {
    _id: string;
    name: string;
    address: string;
    type: string;
    estate: Estate;
    size: number;
    price: number;
    owner: Owner;
    tenants: any[]; // Replace 'any' with a more specific type if available
    status: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  interface PropertyInt {
    properties : Property[]
  }
  export enum PropertyStatus {
    AVAILABLE = "available",
    OCCUPIED = "occupied",
    UNDER_MAINTENANCE = "under_maintenance",
    SOLD = "sold",
  }
 interface PropertyBodyInt {
    name : string
    estate: string,
    owner :  string,
    type : string,
    status ?: PropertyStatus,
    price :  number
    address : string
    tenants ?:  string[]
    size : number
 }
 interface TenantInt {
  tenants : UserInt["user"][]
 }
interface EstateInt{
  estate: {
        name: string,
        location: string,
        admin: string,
        _id: string,
        createdAt:string,
        updatedAt: string,
        __v: number
    }
}
interface EstateBodyInt{
  name : string,
  location : string
}
export type {
    GeneralReturnInt,
    UserAuthInfoInt,
    UserInt,
    RejectedPayload,
    Property,
    PropertyBodyInt,
    PropertyInt,
    TenantInt,
    EstateInt,
    EstateBodyInt
}