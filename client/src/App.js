import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import FormCreate from './pages/form-create/FormCreate';
import FormView from './pages/form-view/FormView';
import HomePage from './pages/home-page/HomePage';
import MessagePage from './pages/message-page/MessagePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/new/:url' element={<FormCreate />} />
        <Route path='/view/:url' element={<FormView />} />
        <Route path='/thank-you' element={<MessagePage />} />
      </Routes>
    </Router>
  );
}

export default App;
