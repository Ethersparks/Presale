import ReactDOM from 'react-dom';
import React from 'react'; // necessary to import for compilation
import PresaleForm from './components/Presale';

require('./globals.scss');

ReactDOM.render(
    <PresaleForm />,
    document.getElementById('Homepage')
);
