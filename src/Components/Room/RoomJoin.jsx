import React, { Component } from 'react';

class RoomJoin extends Component {
    render() {
        return (
            <div>
                <label htmlFor="roomNumber"></label>
                <input id="roomNumber" type="text" />
                <label htmlFor="playerName"></label>
                <input id="playerName" type="text" />
                <button>Join</button>
            </div>
        );
    }
}

export default RoomJoin;