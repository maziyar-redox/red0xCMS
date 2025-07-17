"use client";

import { useState, useCallback, ChangeEvent } from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IoMdClose } from "react-icons/io";
import { MdOutlineFileUpload } from "react-icons/md";
import { LuUser } from "react-icons/lu";

interface ProfileImageUploadProps {
    className?: string;
    initialImage?: string | null;
    onImageChange: (file: File | null) => void;
};

export function ProfileImageUpload({
    className,
    initialImage = null,
    onImageChange,
}: ProfileImageUploadProps) {
    const [preview, setPreview] = useState<string | null>(initialImage);
    const [file, setFile] = useState<File | null>(null);
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file) {
            setFile(file);
            const reader = new FileReader();
            reader.onload = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
            onImageChange(file);
        };
    }, [onImageChange]);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/jpeg": [".jpeg", ".jpg"],
            "image/png": [".png"],
            "image/webp": [".webp"],
        },
        maxFiles: 1,
        maxSize: 5 * 1024 * 1024, // 5MB
    });
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFile(file);
            const reader = new FileReader();
            reader.onload = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
            onImageChange(file);
        };
    };
    const handleRemove = () => {
        setPreview(null);
        setFile(null);
        onImageChange(null);
    };
    return (
        <div className={cn("space-y-4", className)}>
            <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="relative">
                    <Avatar className="h-24 w-24">
                        {preview ? (
                            <AvatarImage src={preview} alt="Preview" />
                        ) : (
                            <AvatarFallback className="bg-muted">
                                <LuUser className="h-12 w-12" />
                            </AvatarFallback>
                        )}
                    </Avatar>
                    {preview && (
                        <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute -right-2 -top-2 rounded-full"
                            onClick={handleRemove}
                        >
                            <IoMdClose className="h-4 w-4" />
                        </Button>
                    )}
                </div>
                <div className="flex flex-col items-center md:items-start space-y-2">
                    <Label htmlFor="profile-image">Profile Image</Label>
                    <div
                        {...getRootProps()}
                        className={cn(
                            "border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors",
                            isDragActive ? "border-primary bg-primary/10" : "border-muted-foreground/30"
                        )}
                    >
                        <input {...getInputProps()} id="profile-image" onChange={handleFileChange} />
                        <div className="flex flex-col items-center justify-center gap-2">
                            <MdOutlineFileUpload className="h-5 w-5 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">
                                {isDragActive
                                ? "Drop the image here"
                                : "Drag & drop an image here, or click to select"}
                            </p>
                            <p className="text-xs text-muted-foreground/70">
                                JPG, PNG, or WEBP (Max. 5MB)
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};