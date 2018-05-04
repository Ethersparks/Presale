import React from 'react';
import AppBar from 'material-ui/AppBar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import IconButton from 'material-ui/IconButton';
import StarIcon from 'material-ui/svg-icons/toggle/star';
import bannerImage from '../../media/LogoMakr_7UpJ13.png';

import Viewport from './Viewport';


class App extends React.Component {
    
    constructor() {
        super();
        this.state = {
            users : []
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
        let dataURL = "http://localhost:3001/page";
        fetch(dataURL)
        .then(res => res.json())
        .then(res => {
            console.log(res);
          this.setState({
            users: res
          })
        })

    }

    // getChildContext(){
    //   return {
    //     muiTheme: getMuiTheme()
    //   };
    // }
    
    // <AppBar 
    // style = {this.styles}
    // iconElementLeft ={<img src={bannerImage} style={this.imageStyle}/>}
    // />

    render() {
        return (
            <div>
            <h2>Star Wars Movies</h2>
            </div>
        );
    }
}


App.childContextTypes = {
    muiTheme: React.PropTypes.object
};


export default App;
