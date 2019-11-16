import React, { Component } from 'react';
import * as signalR from '@aspnet/signalr';

class RoomJoin extends Component {
    constructor(params) {
        super(params);
        var connection = new signalR.HubConnectionBuilder().withUrl("http://domino.bryht.net:8080/room", {
            skipNegotiation: true,
            transport: signalR.HttpTransportType.WebSockets
        }).build();

        this.state = {
            roomNumber: '',
            playerName: '',
            roomState: 'none',
            connection: connection
        };
    }
    joinRoom = async () => {
        await this.state.connection.invoke('JoinRoomAction', this.state.roomNumber, this.state.playerName, 'confirmed');
    }
    componentDidMount() {
        this.state.connection.start().then(function () {
            console.log('Connection started!');
        }).catch(function (err) {
            return console.error(err.toString());
        });

    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <div>
                <label htmlFor="roomNumber">Room Number</label>
                <input name="roomNumber" type="text" value={this.state.roomNumber} onChange={this.handleInputChange} />
                <label htmlFor="playerName">Player Name</label>
                <input name="playerName" type="text" value={this.state.playerName} onChange={this.handleInputChange} />
                <button onClick={this.joinRoom}>Join</button>
            </div>
        );
    }
}

export default RoomJoin;