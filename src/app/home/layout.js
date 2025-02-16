import { auth } from "../../../Firebase";
import Footer from "../_components/Footer";
import Header from "../_components/Header";

export const metadata = {
    title:"Home"
}
export default function Layout({children}) {
    return (
        <section className="h-full pt-2 flex flex-col items-center">
            <Header user={auth.currentUser} />
            {children}
            <Footer />
        </section>
    );
}