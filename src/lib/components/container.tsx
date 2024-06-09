export default function Container(
{
children
}:Readonly<{
children: React.ReactNode;
}>
) {
    return (<main className="md:container md:mx-auto px-4 pt-[6rem] pb-10">
        {children}
    </main>)
}