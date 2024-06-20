import { useState } from "react";
import axios from "../utils/axios";

function useRoom() {
    const [roomId, setRoomId] = useState(null);
    const [error, setError] = useState(null);
    const [jwt, setJwt] = useState(null);

    async function createRoom(username, numberOfPlayers, usePassword, password) {
        try {
            const response = await axios.post("/rooms", {
                username,
                numberOfPlayers,
                usePassword,
                password,
            });
            setRoomId(response.data.roomId);
            setJwt(response.data.jwt);
        } catch (error) {
            setError(error.response.data.message);
        }
    }

    async function joinRoom(roomId, username, password) {
        try {
            const response = await axios.post(`/rooms/${roomId}/join`, {
                username,
                password,
            });
            setRoomId(response.data.roomId);
            setJwt(response.data.jwt);
        } catch (error) {
            setError(error.response.data.message);
        }
    }

    return [roomId, jwt, error, createRoom, joinRoom];
}

export default useRoom;