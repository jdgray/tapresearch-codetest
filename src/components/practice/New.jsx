import React from 'react';


class New extends React.Component {
    contructor() {
        super();

        this.state = {
            test: ''
        };

        this.clickTest = this.clickTest.bind(this);
    }

    clickTest (event) {
        event.target.value;
    }

    render () {
        return (
            <div>
                <a href="#" onClick={this.clickTest}>click test</a>
            </div>
        )
    }

}

export default New;