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
    };
    
    setExternalHTML(vis) {
        this.setState({showWPHtml: vis});
    };

    componentDidMount() {
        let dataURL = "http://localhost:3001/page";
        fetch(dataURL)
        .then(res => res.json())
        .then(res => {
            this.setState({wpPost:res.post});
            this.setExternalHTML(true);
        })

    }
    getwpPost() {
        return {__html: this.state.wpPost};
    }
    render() {
        return (
            <div>
            {this.state.showWPHtml ? <div>
                <div dangerouslySetInnerHTML={this.getwpPost()} ></div>
            </div> : null}
            </div>
        );
    }    
}


App.childContextTypes = {
    muiTheme: React.PropTypes.object
};


export default App;
