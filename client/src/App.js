import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import FormCreate from './pages/form-create/FormCreate';
import FormEdit from './pages/form-edit/FormEdit';
import FormView from './pages/form-view/FormView';
import HomePage from './pages/home-page/HomePage';
import Error404page from './pages/message-page/Error404page';
import MessagePage from './pages/message-page/MessagePage';
import ResponseDetails from './pages/response-page/ResponseDetails';
import ResponsePage from './pages/response-page/ResponsePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/new/:url' element={<FormCreate />} />
        <Route path='/view/:url' element={<FormView />} />
        <Route path='/edit/:url' element={<FormEdit />} />
        <Route path='/thank-you' element={<MessagePage />} />
        <Route path='/admin/responses' element={<ResponsePage />} />
        <Route path='/admin/responses/list/:id' element={<ResponseDetails />} />
        <Route path='*' element={<Error404page />} />
      </Routes>
    </Router>
  );
}

export default App;
