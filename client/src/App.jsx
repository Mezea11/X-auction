//reviewed

import { GlobalProvider } from './GlobalContext.jsx';
import Router from './components/Router.jsx';

function App() {
    return (
        <>
            <GlobalProvider>
                <Router />
            </GlobalProvider>
        </>
    );
}

export default App;
