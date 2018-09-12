import React, { Component } from 'react'
import '../customcard/customcard.css';
import SVGHolder from '../asserts/card-image.svg'
import ExpandCard from '../expandcard/expandcard';
import { Motion, spring } from 'react-motion';
var base64 = require('base-64');
export default class CustomCard extends Component {
    constructor() {
        super();
        this.state = {
            Image: false,
            cardexpand: false
        }
        this.cardhandler = this.cardhandler.bind(this);
        this.cardclosehandler = this.cardclosehandler.bind(this);
    }
    componentDidMount() {
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        if (this.props.data.images.length) {
            let headers = new Headers();
            headers.append('Authorization', 'Basic ' + base64.encode(this.props.username + ":" + this.props.password));
            headers.append('mode', 'no-cros');
            const url = proxyurl+this.props.root + '/' + this.props.data.id + '/media/' + this.props.data.images[0].id;
            this.doRecursiveRequest(url, headers, 2);
        }
    }

    doRecursiveRequest(url, headers, limit = Number.MAX_VALUE) {
        fetch(url, {
            headers: headers
        }).then((response) => {

            if (!response.ok && --limit) {
                return this.doRecursiveRequest(url, headers, limit);
            }
            console.log('succes')
                response.arrayBuffer().then((buffer) => {
                    var base64Flag = 'data:image/jpeg;base64,';
                    var imageStr = arrayBufferToBase64(buffer);
                    this.setState({ Image: base64Flag + imageStr });
                });
        }).catch(err => {
            console.log(err);
        });

        function arrayBufferToBase64(buffer) {
            var binary = '';
            var bytes = [].slice.call(new Uint8Array(buffer));

            bytes.forEach((b) => binary += String.fromCharCode(b));
            return window.btoa(binary);
        }
    }



    cardhandler() {
        this.setState({ cardexpand: true })
    }
    cardclosehandler = () => {
        this.setState({ cardexpand: false })
    }
    render() {
        const config = { stiffness: 140, damping: 14 };
        const toCSS = (scale) => ({ transform: `scale3d(${scale}, ${scale}, ${scale})` })
        return (

            <div>

                {
                    this.state.cardexpand && <div  className='expandcard' ><div onClick={this.cardclosehandler} className='blackout' > </div><ExpandCard closethis={this.cardclosehandler}  username={this.props.username} root={this.props.root} password={this.props.password}  imagedata={this.state.Image} data={this.props.data} /> </div>
                }

                <Motion
                    defaultStyle={{ scale: 0 }}
                    style={{ scale: spring(1, config) }}
                >
                    {
                        (value) => <div className='cardout' onClick={this.cardhandler} style={toCSS(value.scale)}>
                            <div  className='cardimg'>
                                {
                                    this.state.Image ?
                                        <img className='tumbnail' src={this.state.Image} onError={(e) =>{this.setState({Image:false})}} alt='This is Thumbnail' />
                                        // <div>{this.state.Image}</div>
                                        : <img alt='Tumbnail' src={SVGHolder} className='tumbnail' />
                                }
                            </div>
                            <div className='cardcontent'>
                                <h1 className='cardtitle'>{this.props.data.name}</h1>
                                <p className='description'>{this.props.data.description}</p>
                                <h5 className='location'>	<span role='img' aria-labelledby="globe">&#127758;</span> {this.props.data.location.name}</h5>
                                <p className='address'> {this.props.data.location.address} , {this.props.data.location.city} , {this.props.data.location.state}</p>
                            </div>
                            <div className="cardbutton" onClick={this.cardhandler} >Learn More</div>

                        </div>
                    }
                </Motion>

            </div>
        )
    }
}
