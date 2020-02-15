import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

const mermttDiv = document.getElementById('mermtt')
const tei = mermttDiv.dataset.tei;

ReactDOM.render(<App tei={tei}/>, mermttDiv);

serviceWorker.unregister();
