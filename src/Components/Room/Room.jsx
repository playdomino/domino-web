import React, { Component } from 'react';
import RoomCreate from './RoomCreate';
class Room extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomChoice: 'none'
        }
    }
    createRoom = () => {
        this.setState({
            ...this.state,
            roomChoice: 'create'
        })
    }
    render() {
        var body = null;
        switch (this.state.roomChoice) {
            case 'none':
                body = (<div>
                    <button onClick={this.createRoom}>Create a room</button>
                </div>);
                break;
            case 'create':
                body = (<RoomCreate />);
                break;

        }
        return (body);
    }
}

export default Room;