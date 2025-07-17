import { toast } from "sonner";

export function Toaster(
    title: string = "",
    description: string = ""
) {
    toast.message(title, {
        description: (
            description
        ),
    });
};