import React, { Component } from 'react';

class RoomCreate extends Component {
    constructor(props) {
        super(props);
        
    }

    
    
    render() {
        return (
            <div>
                <label htmlFor="roomNumber"></label>
                <input id="roomNumber" type="text" />

                <label htmlFor="playerName"></label>
                <input id="playerName" type="text" />
                <button>Create</button>
            </div>
        );
    }
}

export default RoomCreate;