import random


class Tile:
    BOMB = "💣"
    FLAG = "🚩"
    UNKNOWN = "⬛"

    NUMBERS = ["🟦", "1️⃣ ", "2️⃣ ", "3️⃣ ", "4️⃣ ", "5️⃣ ", "6️⃣ ", "7️⃣ ", "8️⃣ "]

    def __init__(self, x, y):
        self.x = x
        self.y = y

        self.is_bomb = False
        self.is_flagged = False
        self.is_revealed = False


    def __repr__(self):
        if self.is_revealed:
            if self.is_bomb:
                return Tile.BOMB
            else:
                return Tile.NUMBERS[self.adjacent_bombs]
        else:
            if self.is_flagged:
                return Tile.FLAG
            else:
                return Tile.UNKNOWN
            

class Board:
    def __init__(self, dimensions, num_mines):
        self.width = dimensions[0]
        self.height = dimensions[1]

        self.board = [[Tile(x, y) for x in range(self.width)] for y in range(self.height)]
        self.not_revealed = self.width * self.height - num_mines

        self._setup_board(num_mines)

    def click(self, x, y):
        if self.board[y][x].is_bomb:
            raise Exception("Can't use click function on a bomb tile.")

        if self.board[y][x].is_revealed and self.board[y][x].adjacent_bombs == 0: return
        if self.board[y][x].is_flagged: return

        # clicking on a revealed tile 
        if self.board[y][x].is_revealed:
            f = 0
            for neighbor in self.neighbors(x, y):
                if neighbor.is_flagged:
                    f += 1

            if f != self.board[y][x].adjacent_bombs: return

            for neighbor in self.neighbors(x, y):
                if not neighbor.is_flagged and not neighbor.is_revealed:
                    self.click(neighbor.x, neighbor.y)
            return 

        self.board[y][x].is_revealed = True
        self.not_revealed -= 1

        if self.board[y][x].adjacent_bombs == 0:
            for neighbor in self.neighbors(x, y):
                if not neighbor.is_revealed:
                    self.click(neighbor.x, neighbor.y)

    @property
    def is_won(self):
        return self.not_revealed == 0

    def neighbors(self, x, y):
        for dx in [-1, 0, 1]:
            for dy in [-1, 0, 1]:
                if x + dx < 0 or x + dx >= self.width: continue
                if y + dy < 0 or y + dy >= self.height: continue
                if dx == 0 and dy == 0: continue

                yield self.board[y + dy][x + dx]

    def _setup_board(self, num_mines):
        c = 0

        while c != num_mines:
            x = random.randint(0, self.width - 1)
            y = random.randint(0, self.height - 1)

            if not self.board[y][x].is_bomb:
                self.board[y][x].is_bomb = True
                c += 1

        for y in range(self.height):
            for x in range(self.width):
                if not self.board[y][x].is_bomb:
                    c = 0
                    for neighbor in self.neighbors(x, y):
                        if neighbor.is_bomb:
                            c += 1
                        
                    self.board[y][x].adjacent_bombs = c

    def __repr__(self):
        return "\n".join(["".join([str(tile) for tile in row]) for row in self.board])
        

b = Board((10, 10), 10)

while not b.is_won:
    print(b)
    print(f"Not revealed: {b.not_revealed}")
    x, y, f = map(int, input("Enter x, y, f: ").split())
    if f:
        b.board[y][x].is_flagged = not b.board[y][x].is_flagged
    else:
        b.click(x, y)