from flask import Flask
from minesweeper import *
from threading import Thread
import json
import socket


class Room:
    def __init__(self, room_id, dimensions, num_mines, max_players=2):
        self.room_id = room_id
        self.board = Board(dimensions, num_mines)
        self.players = []
        self.winner = None

        self.socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.socket.bind(("localhost", 6969))
        self.socket.listen(max_players)

        self.accept_thread = Thread(target=self.accept_players)
        self.accept_thread.start()

    def accept_players(self):
        for _ in range(self.max_players):
            conn, addr = self.socket.accept()
            print(f"Connection from {addr}")
            self.players.append(conn)

    def broadcast(self, message):
        for player in self.players:
            player.send(message)


app = Flask(__name__)
app.run(host="localhost", port=5000, debug=True)


@app.route("room/<room_id>", methods=["POST"])
def create_room(room_id):
    room = Room(room_id)
    return json.dumps({"room_id": room_id})