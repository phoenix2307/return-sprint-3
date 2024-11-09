import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from "./app/App";
import {Provider} from "react-redux";
import {store} from "./app/store";
import App_defrag from "./app/App_defrag";

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<React.StrictMode>
		<Provider store={store}>
			{/*<App/>*/}
			<App_defrag/>
		</Provider>
	</React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

