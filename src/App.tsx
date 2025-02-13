import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./AppRouter";
import Layout from "./components/layout/Layout";
import { store } from './redux/store';

function App() {
  return (
    <Provider store={store}>
        <BrowserRouter>
            <Layout>
                <AppRouter />
            </Layout>
        </BrowserRouter>
    </Provider>    
  );
}

export default App;
