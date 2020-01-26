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
            start: '0px',
        }
        this.onChange = this.onChange.bind(this);
        this.onSwipe = this.onSwipe.bind(this);
    }

    onSwipe(img, swipe, startVal) {
        const setCheck = this.state.checked.map(data => data = false)

        if (swipe === 'swiperight') {
            const setCheck = this.state.checked.map(data => data = false)
            setCheck[img.index + 1] = true;
            this.setState({checked: setCheck})
            this.onChange(this.state.img[img.index + 1])
        }

        if (swipe === 'swipeleft') {
            const setCheck = this.state.checked.map(data => data = false)
            setCheck[img.index - 1] = true;
            this.setState({ checked: setCheck })
            this.onChange(this.state.img[img.index - 1])
        }

        this.setState({start: startVal})
    }

    onChange(img) {
        const setCheck = this.state.checked.map(data => data = false)

        this.setState({ checked: setCheck })
        setCheck[img.index] = true;
        this.setState({ checked: setCheck })

        this.setState({ end: img.end })
        if (this.state.end !== this.state.start) {
            this.setState({ start: this.state.end })
        }

        console.log(this.state.end + "  <-- end")
        console.log(this.state.start + "  <-- start")

        this.setState({startVal: this.state.start})
    }

    render() {
        return (
            <div className="App">
                <Carousel {...this.state} onChange={this.onChange} onSwipe={this.onSwipe} />
            </div >
        );
    }
}

export default App;