import "./App.css";
import { Provider  } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AppLayout from "./AppLayout";
import store from './redux/store.js';

function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <Provider store={store}>
      <AppLayout/>
      </Provider>
    </GoogleOAuthProvider>
  );
}

export default App;
