"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { accountTwoFASchema } from "@/schema";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState, useTransition } from "react";
import { useSession } from "next-auth/react";
import { useIsMounted } from "usehooks-ts";
import { SettingLoadingState } from "../loading-state";
import { TwoFactorState } from "@/actions/account/twofactor-state";
import { Toaster } from "@/components/toaster";

type AccountTwoFAFormValues = z.infer<typeof accountTwoFASchema>;
type AccountFormProps = {
    is_guard: boolean;
};

export function AccountForm({
    is_guard
}: AccountFormProps) {
    const [isPending, startTransition] = useTransition();
    const { data: session } = useSession();
    const isMounted = useIsMounted();
    const [showProfile, setShowProfile] = useState<boolean>(false);
    const accountTwoFAForm = useForm<AccountTwoFAFormValues>({
        resolver: zodResolver(accountTwoFASchema),
        defaultValues: {
            is_guard: is_guard,
        },
        mode: "onChange"
    });
    useEffect(() => {
        if (isMounted() && session?.user != undefined) {
            setShowProfile(true);
        };
    }, [isMounted, session]);
    async function onTwoFASubmit(data: AccountTwoFAFormValues) {
        startTransition(async () => {
            try {
                const submitedData = await TwoFactorState(data);
                if (submitedData?.success) {
                    Toaster("Success", "Your account setting updated successfuly.");
                };
                if (submitedData?.error) {
                    Toaster("Error!", "There was an error while updating setting.");
                };
            } catch (err) {
                Toaster("Error!", "There was an unknown error.");
            };
        });
    };
    return (
        <>
            {
                showProfile
                ?
                <div className="space-y-8">
                    <Form {...accountTwoFAForm}>
                        <form
                            className="space-y-8"
                        >
                            <div className="relative">
                                <h3 className="mb-4 text-lg font-medium">Account settings</h3>
                                <div className="space-y-4">
                                    <FormField
                                        control={accountTwoFAForm.control}
                                        name="is_guard"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                                <div className="space-y-0.5">
                                                    <FormLabel className="text-base">
                                                        Two-Step verification
                                                    </FormLabel>
                                                    <FormDescription>
                                                        Receive a unique code everytime you login
                                                    </FormDescription>
                                                </div>
                                                <FormControl>
                                                    <Switch
                                                        disabled={isPending}
                                                        checked={field.value}
                                                        onCheckedChange={async (value) => {
                                                            field.onChange(value);
                                                            await onTwoFASubmit({
                                                                is_guard: value
                                                            });
                                                        }}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </form>
                    </Form>
                </div>
                :
                <SettingLoadingState />
            }
        </>
    );
};