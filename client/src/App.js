// import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import HomePage        from "./pages/home-page/HomePage"
import FormCreate      from "./pages/form-create/FormCreate"
import FormEdit        from "./pages/form-edit/FormEdit"
import FormView        from "./pages/form-view/FormView"
import Error404page    from './pages/message-page/Error404page'
import MessagePage     from './pages/message-page/MessagePage'
import ResponseDetails from './pages/response-page/ResponseDetails'
import ResponsePage    from './pages/response-page/ResponsePage'

// const HomePage        = lazy(() => import("./pages/home-page/HomePage"))
// const FormCreate      = lazy(() => import("./pages/form-create/FormCreate"))
// const FormEdit        = lazy(() => import("./pages/form-edit/FormEdit"))
// const FormView        = lazy(() => import("./pages/form-view/FormView"))
// const Error404page    = lazy(() => import('./pages/message-page/Error404page'))
// const MessagePage     = lazy(() => import('./pages/message-page/MessagePage'))
// const ResponseDetails = lazy(() => import('./pages/response-page/ResponseDetails'))
// const ResponsePage    = lazy(() => import('./pages/response-page/ResponsePage'))

function App() {
  return (
    // <Suspense fallback={<div>Loading...</div>}>
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
    // </Suspense>
  );
}

export default App;
