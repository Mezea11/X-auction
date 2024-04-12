import { GlobalProvider } from './GlobalContext.jsx';
import Router from './components/Router.jsx';
import './App.css';

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
