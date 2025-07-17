export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="relative container grid h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
                <div className="bg-muted relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r">
                    <div className="absolute inset-0 bg-zinc-900" />
                    <div className="relative z-20 flex items-center text-lg font-medium">
                        RED0X CMS
                    </div>
                    <img
                        src="/bg.jpg"
                        className=" absolute top-0 left-0 bottom-0 right-0 w-full h-full object-cover object-center"
                        alt="bg"
                    />
                </div>
                {children}
            </div>
        </>
    );
};