import axios from '../utils/axios';
import { useState } from 'react';

function useRoomInfo({ roomId }) {
    const [room, setRoom] = useState(null);
    const [error, setError] = useState(null);

    axios.get(`/rooms/${roomId}`)
        .then((response) => {
            setRoom(response.data);
        })
        .catch((error) => {
            setError(error.response.data.message);
        });

    return [room, error];
}

export default useRoomInfo;