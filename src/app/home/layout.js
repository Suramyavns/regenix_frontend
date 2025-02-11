import { auth } from "../../../Firebase";
import Header from "../_components/Header";

export const metadata = {
    title:"Home"
}
export default function Layout({children}) {
    return (
        <section className="h-full flex flex-col items-center">
            <Header user={auth.currentUser} />
            {children}
        </section>
    );
}