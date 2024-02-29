import {BrowserRouter ,Routes,Route} from "react-router-dom"
import Table from './components/Tables';
import Homepage from './pages/Homepage';
import {Provider} from 'react-redux'
import store from "./saga/store";
const App = () => {
  return (
    <Provider store={store}>
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Homepage />} />
        </Routes>
        </BrowserRouter>
    </Provider>
  );
}

export default App