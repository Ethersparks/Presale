import ReactDOM from 'react-dom';
import React from 'react'; // necessary to import for compilation
import Homepage from './components/Homepage';

require('./globals.scss');

ReactDOM.render(
    <Homepage />,
    document.getElementById('Homepage')
);
