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
        const { img, onChange } = this.props;

        this.mc0= new Hammer(this.state.hammer[0].container.current);
        this.mc1= new Hammer(this.state.hammer[1].container.current);
        this.mc2= new Hammer(this.state.hammer[2].container.current);
        this.mc3= new Hammer(this.state.hammer[3].container.current);
        this.mc4= new Hammer(this.state.hammer[4].container.current);

        this.mc0.on("panleft panright", (ev) => {
            onChange(img[0], ev.type)
            console.log(img[0]);
        });

        this.mc1.on("panleft panright", (ev) => {
            onChange(img[1], ev.type)
            console.log(img[1]); 
        });

        this.mc2.on("panleft panright", (ev) => {
            onChange(img[2], ev.type)
            console.log(img[2]); 
        });

        this.mc3.on("panleft panright", (ev) => {
            onChange(img[3], ev.type)
            console.log(img[3]); 
        });

        this.mc4.on("panleft panright", (ev) => {
            onChange(img[4], ev.type)
            console.log(img[4]); 
        });
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