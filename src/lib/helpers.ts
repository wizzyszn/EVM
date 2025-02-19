import { StorageKeysEnum } from "@/types";

export class Storages {
    static setStorage<T>(
        type: "local" | "session",
        key: StorageKeysEnum,
        data: T
    ) {
        if (type === "local")
            localStorage.setItem(`fibre_${key}`, JSON.stringify(data));
        else sessionStorage.setItem(`fibre_${key}`, JSON.stringify(data));
    }

    static checkStorage(
        type: "local" | "session",
        key: StorageKeysEnum
    ): boolean {
        if (type === "local") return !!localStorage.getItem(`fibre_${key}`);
        else return !!sessionStorage.getItem(`fibre_${key}`);
    }

    static getStorage<T>(
        type: "local" | "session",
        key: StorageKeysEnum
    ): T | null {
        let data: T | null;
        if (type === "local")
            data = Storages.checkStorage(type, key)
                ? JSON.parse(localStorage.getItem(`fibre_${key}`)!)
                : null;
        else
            data = Storages.checkStorage(type, key)
                ? JSON.parse(sessionStorage.getItem(`fibre_${key}`)!)
                : null;
        return data;
    }

    static clearStorage(type: "local" | "session") {
        if (type === "local") localStorage.clear();
        else sessionStorage.clear();
    }

    // ? There is no removeStorage, cause I felt it won't be needed
}

export const getToken = () =>
    Storages.getStorage<string>("session", StorageKeysEnum.token) ?? "";

export const handleDrops = (
    containerEl: HTMLElement,
    contentEl: HTMLElement,
    isDrop: boolean
) => {
    if (isDrop)
        containerEl.style.height =
            contentEl.getBoundingClientRect().height + "px";
    else containerEl.style.height = "0px";
};

export function excelDateToJSDate(serial: number) {
    const excelEpoch = new Date(1900, 0, 1);

    const daysSinceEpoch = Math.floor(serial) - 1;
    const timeFraction = serial % 1;

    const dateInMs =
        excelEpoch.getTime() +
        daysSinceEpoch * 86400000 +
        timeFraction * 86400000;
    return new Date(dateInMs);
}

export const dateFormatter = (
    date: Date | string | null,
    format: "mmmm 12, 1234" | "mm/dd/yyyy" | "dd/mm/yy"
): string => {
    const modDate =
        typeof date === "string" || date === null ? new Date(date ?? "") : date;

    const formatedDate: string =
        format === "mmmm 12, 1234"
            ? modDate.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
              })
            : format === "mm/dd/yyyy"
              ? !isNaN(modDate.getTime())
                  ? Intl.DateTimeFormat("en-US").format(modDate)
                  : ""
              : format === "dd/mm/yy"
                ? !isNaN(modDate.getTime())
                    ? modDate.toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "2-digit",
                      })
                    : ""
                : "";
    return formatedDate;
};

/* function to download blob */
//@params -> filename
//@args -> Blob
//@params -> date:  SetStateAction<DateRange | undefined>
//@params -> exportFormat :  SetStateAction<string>
//@params -> exportOpen : SetStateAction<boolean>


export function formatDate(dateString: Date): string {
    const date: Date = new Date(dateString);
    return date.toISOString().split("T")[0];
}

export function formatDateToYMD(date: Date): string {
    if (isNaN(date.getTime())) {
        throw new Error("Invalid Date object provided");
    }

    // Extract components in local time
    const year = date.getFullYear(); // Local year
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Local month (zero-based)
    const day = String(date.getDate()).padStart(2, "0"); // Local day

    return `${year}-${month}-${day}`;
}
