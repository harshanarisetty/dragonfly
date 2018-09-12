import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './components/route';
import registerServiceWorker from './registerServiceWorker';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
// import registerServiceWorker from './sw';
ReactDOM.render(<Routes />, document.getElementById('root'));
// registerServiceWorker();

registerServiceWorker();