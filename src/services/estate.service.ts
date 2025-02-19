import { GeneralReturnInt, PropertyBodyInt, Property, UserInt, PropertyInt, TenantInt, EstateBodyInt, EstateInt } from "@/types";
import { options, requestHandler, urlGenerator } from "./config"

export interface SignUpBodyInt {
    name : string
    email : string,
    password : string, 
    role : string, 
    estateId ?: string,
    phone : string
}
export interface SignInBodyInt {
    email : string,
    password : string, 
  
}

// AutH
export const sigupReq = (data : SignUpBodyInt) =>{
    const url = urlGenerator("auth","register",false);
    return requestHandler<GeneralReturnInt<UserInt>>(url,options("POST",data))
}
export const signInReq = (data : SignInBodyInt) =>{
    const url = urlGenerator("auth","login",false);
    return requestHandler<GeneralReturnInt<UserInt>>(url,options("POST",data))
}

//Property

export const createPropertyReq = (data : PropertyBodyInt) =>{
    const url = urlGenerator("properties","",false);
    return requestHandler<GeneralReturnInt<Property>>(url,options("POST",data))
}

export const getPropertyReq = (estateId : string) =>{
    const url = urlGenerator("properties",estateId,false);
    return requestHandler<GeneralReturnInt<PropertyInt>>(url,options("GET"))
}

// tenant
export interface AddTenantBodyInt {
    name : string,
        email : string,
        phone : string,
        password : string,
        propertyId : string
}
export const addTenantReq = (data :AddTenantBodyInt, adminId : string) =>{
    const url = urlGenerator("tenants",adminId,false);
    return requestHandler<GeneralReturnInt<UserInt>>(url,options("POST",data))
}

export const getAllTenantsReq = (adminId : string) =>{
    const url = urlGenerator("tenants",adminId,false);
    return requestHandler<GeneralReturnInt<TenantInt>>(url,options("GET"))

}

export const   createEstateReq = (data : EstateBodyInt, adminId : string) =>{
    const url = urlGenerator("estate",adminId,false);
    return requestHandler<GeneralReturnInt<EstateInt>>(url,options("POST",data))
}