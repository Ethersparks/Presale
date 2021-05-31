import React from 'react';
import ReactDOM from 'react-dom'

class Homepage extends React.Component {
    
    constructor() {
        super();
        this.state = {
            users : [],
            showWPHtml:false,
            content:undefined,
        };
        
        this.iframeStyle = {
            width: '100%',
            height: '100%',
            border: '0',
            position: 'absolute',
        }
        this.iframe = undefined;
        window.addEventListener("message", this.receiveMessage, false);
    };
    
    setExternalHTML(vis) {
        this.setState({showWPHtml: vis});
    };
    receiveMessage(event) {
        console.log(event);
        var origin = event.origin || event.originalEvent.origin; 
        // For Chrome, the origin property is in the event.originalEvent object.
        if (origin !== "http://example.org:8080")
          return;
    };
    updateIFrame() {
        if(this) {
            let iframe = this.refs.iframe;
            if(iframe){
                // const formId = iframe.contentWindow.document.getElementById('wpforms-submit-2213');
                // console.log("it worked");
                // console.log(formId);
            }
        }
    };

    getiFrame() {
        return <iframe
            ref="iframe"
            src='http://localhost:8080/page.html' 
            frameBorder={'0'}
            onLoad={this.updateIFrame}
            width={'100%'}
            height={'100%'}
            style={this.iframeStyle}
        >
        </iframe>
    };

    componentDidUpdate() {
        this.updateIFrame();
        console.log("updated");
    };

    componentDidMount() {
        let dataURL = "http://localhost:3001/page";
        fetch(dataURL)
        .then(res => res.json())
        .then(res => {
            this.setState({content:res.post});
            this.setExternalHTML(true);
            this.updateIFrame();
        })
        this.updateIFrame();
    };
           
    getwpPost() {  
        let frame= this.getiFrame();            
        return frame;
    };

    render() {
        return (
            this.getwpPost()           
        );
    };    
}

export default Homepage;
