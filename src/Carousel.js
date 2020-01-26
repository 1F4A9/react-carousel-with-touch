import React from 'react';
import Hammer from 'hammerjs';

import styled, { keyframes } from 'styled-components';

const slide = (end, start) => keyframes`
    from { transform: translateX(${start}); }
    to { transform: translateX(${end}); }
`;

const ImgContainer = styled.div`
    animation: ${props => slide(props.end, props.start)} 0.6s ease-in-out 1 alternate;
    animation-fill-mode: forwards;
`;

class Carousel extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            hammer: [
                { container: React.createRef() },
                { container: React.createRef() },
                { container: React.createRef() },
                { container: React.createRef() },
                { container: React.createRef() },
            ]
        }
    }

    componentDidMount() {
        const { img, onSwipe } = this.props;

        let start = null;

        this.mc0= new Hammer(this.state.hammer[0].container.current);
        this.mc1= new Hammer(this.state.hammer[1].container.current);
        this.mc2= new Hammer(this.state.hammer[2].container.current);
        this.mc3= new Hammer(this.state.hammer[3].container.current);
        this.mc4= new Hammer(this.state.hammer[4].container.current);

        if (!img.index === 0) {
            this.mc0.on("swipeleft swiperight", (ev) => {
                start = '500px'
                onSwipe(img[0], ev.type, start)
            });
        } else {
            this.mc0.on("swiperight", (ev) => {
                start = '500px'
                onSwipe(img[0], ev.type, start)
            });
        }

        this.mc1.on("swipeleft swiperight", (ev) => {
            start = '250px'
            onSwipe(img[1], ev.type, start)
        });

        this.mc2.on("swipeleft swiperight", (ev) => {
            start = '0px'
            onSwipe(img[2], ev.type, start)
        });

        this.mc3.on("swipeleft swiperight", (ev) => {
            start = '-250px'
            onSwipe(img[3], ev.type, start)
        });

        if (!img.index === 4) {
            this.mc4.on("swipeleft swiperight", (ev) => {
                start = '-500px'
                onSwipe(img[4], ev.type, start)
            });
        } else {
            this.mc4.on("swipeleft", (ev) => {
                start = '-500px'
                onSwipe(img[4], ev.type, start)
            });
        }
    }

    componentWillUnmount(){
        this.mc0.destroy();
        this.mc1.destroy();
        this.mc2.destroy();
        this.mc3.destroy();
        this.mc4.destroy();
    }

    render() {
        const { img, onChange, end, start, checked } = this.props;
        return (
            <>
            <div id="img-container">
                <div id="slider" ref={this.state.container}>
                    <div id="mask">
                        {img.map((data, i) => <ImgContainer ref={this.state.hammer[i].container} key={i} end={end} start={start}><img src={data.src}></img></ImgContainer>)}
                    </div>
                </div>
            </div>
            <div id="carousel">
                {img.map((data, i) => {
                    return (
                        <input
                            checked={checked[i]}
                            key={i}
                            className="radio-btn"
                            type="radio"
                            name="carousel"
                            onChange={() => onChange(data)}
                        />
                    )
                })}
            </div>
        </>
        )
    }
}

export default Carousel;