import React from 'react';
import IconButton from 'material-ui/IconButton';
import StarIcon from 'material-ui/svg-icons/toggle/star';
import bannerImage from '../../media/LogoMakr_7UpJ13.png';

import Viewport from './Viewport';


class Presale extends React.Component {
    
    constructor() {
        super();
        this.state = {
            users : []
        };
        this.divStyle = {    
            textAlign: 'center',
            backgroundColor: '#add8e6',
            paddingTop: '70px',
            paddingBottom: '70px',
        };

        this.styles ={
            backgroundColor: '#943',
            height: 'auto',
        };

        this.imageStyle ={
            backgroundImage: bannerImage,
            maxHeight: '80px',
            width: 'auto',
            height: 'auto',
            position: 'relative'
        };
    }

    componentDidMount() {
    }

    render() {
        return (
            <div style={this.divStyle}>
            <h2>Star Wars Movies</h2>
            </div>
        );
    }
}


Presale.childContextTypes = {
    muiTheme: React.PropTypes.object
};


export default Presale;
