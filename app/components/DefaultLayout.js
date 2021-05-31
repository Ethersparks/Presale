'use strict';

import React from 'react';



class SectionLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value : null, //need to decide what this holds
        };
    };
    
    render() {
        return (
            <div className="container">
                <div className="content">
                    { props.children }
                </div>
            </div>
        );
    }

}
export default DefaultLayout;