export default function Layout({children}) {
    return (
        <section className="h-full flex flex-col justify-center gap-12 py-10">
            <span className="flex flex-col gap-4">
                <p className="text-center text-4xl font-bold">Welcome to Regenix!</p>
                <p className="text-center text-clip font-semibold">Your friendly neighbourhood sustainablity guide</p>
            </span>
            {children}
        </section>
    );
}