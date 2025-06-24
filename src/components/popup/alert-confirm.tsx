'use client';

import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction
} from "@/components/ui/alert-dialog";
import {ReactNode} from "react";

interface AlertConfirmProps {
    onConfirm: () => void;
    onCancel?: () => void;
    children: ReactNode;
    title?: string;
    description?: string
}

const AlertConfirm = ({
                          title = "Are you absolutely sure?",
                          description = "This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
                          children,
                          onConfirm,
                          onCancel
                      }: AlertConfirmProps) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger>{children}</AlertDialogTrigger>
            <AlertDialogContent className="sm:max-w-md">
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    {description && <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>}
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default AlertConfirm;
