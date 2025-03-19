import { lazy, Suspense } from "react";
import { Header } from "./header";

const RemoteApp = lazy(() => import("microfront/App"));
 
const TransactionsPage = () => {
    return (
        <div style={{margin: 16}}>
            <Header />

            <Suspense fallback="Loading Remote App...">
                <RemoteApp />
            </Suspense>
        </div>
    )
}

export default TransactionsPage;