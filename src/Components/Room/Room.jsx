import React, { Component } from 'react';
import RoomCreate from './RoomCreate';
import RoomJoin from './RoomJoin';
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
    joinRoom = () => {
        this.setState({
            ...this.state,
            roomChoice: 'join'
        })
    }
    render() {
        var body = null;
        switch (this.state.roomChoice) {
            case 'none':
                body = (<div>
                    <button onClick={this.createRoom}>Create a room</button>
                    <button onClick={this.joinRoom}>Join a room</button>
                </div>);
                break;
            case 'create':
                body = (<RoomCreate />);
                break;
            case 'join':
                body = (<RoomJoin />);
                break;
        }
        return (body);
    }
}

export default Room;