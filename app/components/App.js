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
            users : [],
            showWPHtml:false,
            wpPost:undefined,
        };

        
        this.headerStyle ={
            color: '#575757',
            maxWidth: '1100px',
            top: 'auto',
            height: '90px',
            position: 'relative',
            margin: '0 auto',
        };

        this.linkContainer ={
            textAlign: 'center',
            //backgroundImage: url("http://ethersparks.io/wp-content/uploads/2018/04/100620-digital-backgrounds-2880x1800-720p.jpg"),
            paddingTop: '0px',
            paddingBottom: '0px',
            backgroundPosition: 'center 18px',
            backgroundAttachment: 'fixed',
        };

        this.footerStyle ={
            textAlign: 'center',
            //backgroundImage: url("http://ethersparks.io/wp-content/uploads/2018/04/100620-digital-backgrounds-2880x1800-720p.jpg"),
            paddingTop: '0px',
            paddingBottom: '0px',
            backgroundPosition: 'center 18px',
            backgroundAttachment: 'fixed',
        };

        this.imageStyle ={
            backgroundImage: bannerImage,
            maxHeight: '80px',
            width: 'auto',
            height: 'auto',
            position: 'relative'
        };
    };
    
  
    setExternalHTML(vis) {
        this.setState({showWPHtml: vis});
    };

    componentDidMount() {
        let dataURL = "http://localhost:3001/page";
        fetch(dataURL)
        .then(res => res.json())
        .then(res => {
            console.log(res.post);
            this.setState({wpPost:res.post});
            this.setExternalHTML(true);
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
    getwpPost() {
        return {__html: this.state.wpPost};
    }
    render() {
        // if (this.wpPost) {
        //     return ( 
        //         <div> this.wpPost </div>
        //     )
        // } else
        {
            return (
                <div>
                {this.state.showWPHtml ? <div>
                  <div dangerouslySetInnerHTML={this.getwpPost()} ></div>
                </div> : null}
              </div>
            );
        }
    }
}


App.childContextTypes = {
    muiTheme: React.PropTypes.object
};


export default App;
