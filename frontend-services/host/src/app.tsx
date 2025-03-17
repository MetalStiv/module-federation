import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import { LazyStartPage } from "./pages/start-page";
import { LazyTransactionsPage } from "./pages/transactions-page";
import { Suspense } from "react";

function App() {
  return (
    <div className="App" style={{ height: '100%' }}>
      <Router>
        <Routes>
          <Route path="/" element={
            <Suspense fallback='Loading'>
              <LazyStartPage />
            </Suspense>
          } />
          <Route path="/home" element={<Suspense fallback='Loading'>
              <LazyTransactionsPage />
            </Suspense>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
