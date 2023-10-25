import "../styles/globals.css";
import { Provider } from "react-redux";
import store, { Persistor } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import axios from "axios";

axios.defaults.baseURL = "https://codingbacklog.azurewebsites.net";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={Persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
