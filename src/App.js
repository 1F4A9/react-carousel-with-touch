import React from 'react';
import Carousel from './Carousel';

import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            img: [
                { src: "https://picsum.photos/id/1025/250", end: "500px", index: 0 },
                { src: "https://picsum.photos/id/1003/250", end: "250px", index: 1 },
                { src: "https://picsum.photos/id/1084/250", end: "0px", index: 2 },
                { src: "https://picsum.photos/id/200/250", end: "-250px", index: 3 },
                { src: "https://picsum.photos/id/433/250", end: "-500px", index: 4 },
            ],
            checked: [ false, false, true, false, false ],
            end: '0px',
            start: '0px'
        }
        this.onChange = this.onChange.bind(this);
    }

    onChange(img, swipe = false) {

        const setCheck = this.state.checked.map(data => data = false)
        setCheck[img.index + 1] = true;
        this.setState({ checked: setCheck })

        // kolla hur man endast läser av "ETT" svep och var gång det svepet skedde --> 
        // bytar radio-button ett steg till höger respektive vänster

        // efter det skapa logik för att kunna byta bild

        if (swipe === 'panright') {
            const setCheck = this.state.checked.map(data => data = false)
            setCheck[img.index - 1] = true;
            this.setState({checked: setCheck})
            console.log(this.state.checked)
        }

        if (swipe === 'panleft') {
            const setCheck = this.state.checked.map(data => data = false)
            setCheck[img.index] = true;
            this.setState({ checked: setCheck })
        }

        if (!swipe) {
            this.setState({ end: img.end })
                
            if (this.state.end !== this.state.start) {
                this.setState({ start: this.state.end })
            }
        }
    }

    render() {
        return (
            <div className="App">
                <Carousel {...this.state} onChange={this.onChange} />
            </div >
        );
    }
}

export default App;