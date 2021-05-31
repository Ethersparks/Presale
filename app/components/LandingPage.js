import React from 'react';

class Homepage extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            users : [],
            showWPHtml:false,
            content:undefined,
        };
    };
    
    componentDidUpdate() {
    };

    componentDidMount() {
    };
           
    render() {
        return (
            <div/>           
        );
    };    
}

export default Homepage;
