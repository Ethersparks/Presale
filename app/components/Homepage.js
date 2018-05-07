import React from 'react';
import ReactDOM from 'react-dom'

class Homepage extends React.Component {
    
    constructor() {
        super();
        this.state = {
            users : [],
            showWPHtml:false,
            wpPost:undefined,
        };
        
        this.iframeStyle = {
            width: '100%',
            height: '100%',
            border: '0',
            position: 'absolute',
        }
    };
    
    setExternalHTML(vis) {
        this.setState({showWPHtml: vis});
    };

    iframeOnLoadCb() {

    }
    getiFrame(src) {
        return <iframe
            ref="iframe"
            src={src} 
            frameBorder={'0'}
            onLoad={this.iframeOnLoadCb}
            width={'100%'}
            height={'100%'}
            style={this.iframeStyle}
        />
    }
    componentDidMount() {
        this.iframe = ReactDOM.findDOMNode(this.refs.iframe);
        this.iframe.addEventListener('load', this.iframeOnLoadCb);
        this.setExternalHTML(true);
    }
           
    getwpPost() {    
        return this.getiFrame('http://ethersparks.io');
    }
    
    render() {
        return (
            this.getwpPost()           
        );
    }    
}

export default Homepage;
