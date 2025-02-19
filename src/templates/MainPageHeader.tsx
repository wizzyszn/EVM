import {
    Dialog,
    DialogContent,
    DialogDescription,
    //DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Dispatch, ReactNode, SetStateAction } from "react";
interface PropInt {
    title: string;
    desc?: string;
    btnTitle: string;
    noBtn?: boolean;
    modal?: {
        title: string;
        component: ReactNode;
        isOpen?: boolean;
        setIsOpen?: Dispatch<SetStateAction<boolean>>;
    };
}

const MainPageHeader = ({ btnTitle, title, desc, noBtn, modal }: PropInt) => {

    return (
        <>
           
                <header className="flex items-center justify-between">
                    <div className="text-key-9">
                        <h1 className="text-xl font-bold">{title}</h1>
                        <p className="text-sm opacity-75">{desc}</p>
                    </div>

                    {noBtn || (
                        <Dialog
                            open={modal?.isOpen}
                            onOpenChange={modal?.setIsOpen}
                        >
                            <DialogTrigger className="rounded-md bg-black from-accent-9 to-accent-6 px-3 py-2 text-white shadow hover:to-accent-7 dark:bg-gradient-to-r dark:text-white">
                                {btnTitle}
                            </DialogTrigger>

                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>{modal?.title}</DialogTitle>
                                </DialogHeader>

                                <DialogDescription></DialogDescription>
                                {modal?.component}
                            </DialogContent>
                        </Dialog>
                    )}
                </header>
            
        </>
    );
};

export default MainPageHeader;
