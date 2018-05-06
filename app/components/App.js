import React from 'react';


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

export default App;
