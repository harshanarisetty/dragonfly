import React, { Component } from 'react';
import Loader from '../asserts/loader.js';
import './main.css';
import CustomCard from '../customcard/customcard';
var base64 = require('base-64');
export default class main extends Component {
    constructor() {
        super();
        this.state = {
            events: '',
            root: 'http://dev.dragonflyathletics.com:1337/api/dfkey/events',
            username: 'anything',
            password: 'evalpass',
            eventsSlice: ''
        }

    }

    componentWillMount() {
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        let headers = new Headers();
        headers.append('Authorization', 'Basic ' + base64.encode(this.state.username + ":" + this.state.password));
        const url = proxyurl + this.state.root;
        this.doRecursiveRequest(url, headers, 10);
    }

    doRecursiveRequest(url, headers, limit = Number.MAX_VALUE) {
        fetch(url, {
            headers: headers
        }).then(response => {
            if (!response.ok && --limit) {
                return this.doRecursiveRequest(url, headers, limit);
            }
            return response.json()
        }).then(data => {
            console.log(data);
            this.setState({ events: data });
            this.setState({ eventsSlice: data.slice(0, 1) });
            this.recursive();
        })
            .catch(err => {
                console.log(err);
            })
    }





    recursive() {
        setTimeout(() => {
            // let hasMore = this.state.eventsSlice.length + 1 < this.state.events.length;
            let hasMore = this.state.eventsSlice.length + 1 < 40;
            const s = this.state.events;
            this.setState((prev) => ({
                eventsSlice: s.slice(0, prev.eventsSlice.length + 1)
            }));
            if (hasMore) this.recursive();
        }, 0);
    }


    render() {
        let event = this.state.eventsSlice;
        return (
            <div>

                {this.state.eventsSlice ?
                    <div>
                        <div className='nav'>
                            <h1 className='title'>DragonFly Assingment</h1>
                        </div>
                        <div className='cards'>
                            {
                                event.map(event =>
                                    <CustomCard key={event.id} data={event} root={this.state.root} username={this.state.username} password={this.state.password} />
                                )}
                        </div>
                    </div> : <Loader />
                }
            </div>
        )
    }
}
