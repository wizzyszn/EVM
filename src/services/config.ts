

import { getToken } from "@/lib/helpers";

//const baseUrl = "https://api.aspacenetwork.com/api/v1";
const baseUrl = "https://evm-backend-t47a.onrender.com";
const routeBaseUrl = {
    auth: `${baseUrl}/auth`,
    users: `${baseUrl}/users`,
    properties :  `${baseUrl}/properties`,
    tenants :  `${baseUrl}/tenants`,
    estate :  `${baseUrl}/estates`,
};

const options = <T>(
    method: "GET" | "POST" | "PUT" | "DELETE",
    data?: T,
    token?: boolean,
    formData?: FormData
): RequestInit => {
    const headers: HeadersInit = formData
        ? {}
        : {
              "Content-Type": "application/json",
          };

    if (token) headers.Authorization = `Bearer ${getToken()}`;
    switch (method) {
        case "GET":
            return { method, headers };
        case "POST":
            if (!data && !formData)
                throw new Error("Data must be provided for POST requests");
            return formData
                ? { method, headers, body: formData }
                : { method, headers, body: JSON.stringify(data) };
        case "PUT":
            if (!data && !formData)
                throw new Error("Data must be provided for PUT requests");
            return formData
                ? { method, headers, body: formData }
                : { method, headers, body: JSON.stringify(data) };
        case "DELETE":
            return { method, headers, body: JSON.stringify(data) };
        default:
            throw new Error("Unsupported method");
    }
};

const requestHandler = async <T>(
    url: string,
    options: ResponseInit = {}
): Promise<T> => {
    const response = await fetch(url, options);
    if (!response.ok) {
        const errMsg = await response.json();
        throw new Error(`${errMsg.message}, status: ${response.status}`);
    }
    const contentTypes: string[] = [
        "text/csv; charset=UTF-8",
        "text/csv; charset=utf-8",
        "text/csv; charset=ISO-8859-1",
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "image/png",
    ];
    if (contentTypes.includes(response.headers.get("Content-Type") as string)) {
        return response.blob() as Promise<T>;
    }
    return response.json();
};

const urlGenerator = (
    key: keyof typeof routeBaseUrl,
    path: string,
    isToken = true,
    param: string = ""
) => {
    let modParam = isToken ? `?token=${getToken()}` : "?";
    modParam = modParam + param;
    return `${routeBaseUrl[key]}/${path}${modParam.length === 1 ? "" : modParam}`;
};

export { urlGenerator, options, requestHandler };
