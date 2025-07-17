"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { profileFormSchema } from "@/schema";
import { useEffect, useState, useTransition } from "react";
import { ProfileImageUpload } from "./upload-image";
import { useIsMounted } from "usehooks-ts";
import { useSession } from "next-auth/react";
import { Profile } from "@/actions/profile/profile";
import { Toaster } from "@/components/toaster";
import { SettingLoadingState } from "../loading-state";

type ProfileFormValues = z.infer<typeof profileFormSchema>

export function ProfileForm() {
    const [isPending, startTransition] = useTransition();
    const { data: session } = useSession();
    const isMounted = useIsMounted();
    const [showProfile, setShowProfile] = useState<boolean>(false);
    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            username: "",
            email: "",
            first_name: "",
            last_name: ""
        },
        mode: "onChange",
    });
    useEffect(() => {
        if (isMounted() && session?.user != undefined) {
            form.setValue("email", session.user.email);
            form.setValue("username", session.user.username);
            form.setValue("first_name", session.user.first_name);
            form.setValue("last_name", session.user.last_name);
            setShowProfile(true);
        };
    }, [isMounted, session, form]);
    const [imageFile, setImageFile] = useState<File | null>(null);
    function handleSubmit(data: ProfileFormValues) {
        //if (imageFile) {
        //    const formData = new FormData();
        //    formData.append("image", imageFile);
        //    await updateUserProfileImage(formData);
        //};
        startTransition(async () => {
            try {
                data.email = session?.user.email as string;
                const submitedData = await Profile(data);
                if (submitedData?.success) {
                    Toaster("Success", "Your profile updated successfuly.");
                };
                if (submitedData?.error) {
                    Toaster("Error!", "There was an error while updating profile.");
                };
            } catch (err) {
                Toaster("Error!", "There was an unknown error.");
            };
        });
    };
    return (
        <Form {...form}>
            {
                showProfile
                ?
                <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="space-y-8"
                >
                    <ProfileImageUpload
                        onImageChange={setImageFile} 
                        //initialImage={user.imageUrl} // Pass existing image URL if available
                    />
                    {/* <Button onClick={handleSubmit}>
                        Save Changes
                    </Button> */}
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="example" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your public display name. It can be your real name or a
                                    pseudonym. You can only change this once every 30 days.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="first_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="First Name" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your public first name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="last_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Last Name" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your public last name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        disabled={true}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="example@gmail" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your email, you cannot change your email
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={isPending}>Update profile</Button>
                </form>
                :
                <SettingLoadingState />
            }
        </Form>
    );
};