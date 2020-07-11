
const CST_WINNER_NONE = 0;
const CST_WINNER_P1 = 1;
const CST_WINNER_P2 = 2;

const CST_TURN_P1 = 1;
const CST_TURN_P2 = 2;

const game = {};

exports.get_instance = () => {
    if(Object.keys(game).length < 1) {
        this.initialize();
    }
    return game;
}

exports.initialize = () => {
    game.winner = CST_WINNER_NONE;
    game.turn = CST_TURN_P1;
    game.board = [];
    for(var i = 0; i < 4; i++) {
        game.board [i] = [];
        for(var j = 0; j < 4; j++) {
            game.board [i][j] = [0, 0, 0, 0];
        }
    }
    game.error = "";
}

exports.play = (player, x, y, z) => {

    // init error
    this.get_instance().error = "";

    // check if winner
    if(this.get_instance().winner != CST_WINNER_NONE) {
        this.get_instance().error = 'There is already a winner';
        return false;
    }

    // check player
    if(player != this.get_instance().turn) {
        this.get_instance().error = 'Wrong player';
        return false;
    }

    // check if already played
    if(this.get_instance().board[x][y][z] != 0) {
        this.get_instance().error = 'This move has been already played';
        return false;
    }

    // check out of board
    if(isOutOfBoard(x) || isOutOfBoard(y) || isOutOfBoard(z)) {
        this.get_instance().error = 'This play is out of the board';
        return false;
    }

    // set board
    this.get_instance().board[x][y][z] = player;

    // check winner
    if(isWinner(this.get_instance().board, player, x, y, z)) {
        this.get_instance().winner = player;
    }

    // check if winner then end game
    if(this.get_instance().winner != CST_WINNER_NONE) {
        return true;
    }

    // change player turn
    if(player == CST_TURN_P2)
    {
        this.get_instance().turn = CST_TURN_P1;
    } else 
    {
        this.get_instance().turn = CST_TURN_P2;
    }

    return true;
}

function isOutOfBoard(index) {
    if(index < 0 || index > 3) {
        return true;
    }
    return false;
}

function isWinner(board, player, x, y, z) {

    var lineCountX = 0;
    var lineCountY = 0;
    var lineCountZ = 0;
    var lineCountXY1 = 0;
    var lineCountXY2 = 0;
    var lineCountXZ1 = 0;
    var lineCountXZ2 = 0;
    var lineCountYZ1 = 0;
    var lineCountYZ2 = 0;
    var lineCountXYZ1 = 0;
    var lineCountXYZ2 = 0;
    var lineCountXYZ3 = 0;
    var lineCountXYZ4 = 0;

    for(var i = 0; i < 4; i++) {
        // check x-axis
        if(board[i][y][z] == player) {
            lineCountX++;
        }
        // check y-axis
        if(board[x][i][z] == player) {
            lineCountY++;
        }
        // check z-axis
        if(board[x][y][i] == player) {
            lineCountZ++;
        }
        // x-y plan diagonal 1
        if(board[i][i][z] == player) {
            lineCountXY1++;
        }
        // x-y plan diagonal 2
        if(board[i][3-i][z] == player) {
            lineCountXY2++;
        }
        // x-z plan diagonal 1
        if(board[x][i][i] == player) {
            lineCountXZ1++;
        }
        // x-z plan diagonal 2
        if(board[x][i][3-i] == player) {
            lineCountXZ2++;
        }
        // y-z plan diagonal 1
        if(board[i][y][i] == player) {
            lineCountYZ1++;
        }
        // y-z plan diagonal 2
        if(board[i][y][3-i] == player) {
            lineCountYZ2++;
        }
        // x-y-z 3d diagonal 1
        if(board[i][i][i] == player) {
            lineCountXYZ1++;
        }
        // x-y-z 3d diagonal 2
        if(board[i][3-i][i] == player) {
            lineCountXYZ2++;
        }
        // x-y-z 3d diagonal 3
        if(board[3-i][i][i] == player) {
            lineCountXYZ3++;
        }
        // x-y-z 3d diagonal 4
        if(board[i][i][3-i] == player) {
            lineCountXYZ4++;
        }
    }

    if(lineCountX == 4 ||
        lineCountY == 4 ||
        lineCountZ == 4 ||
        lineCountXY1 == 4 ||
        lineCountXY2 == 4 ||
        lineCountXZ1 == 4 ||
        lineCountXZ2 == 4 ||
        lineCountYZ1 == 4 ||
        lineCountYZ2 == 4 ||
        lineCountXYZ1 == 4 ||
        lineCountXYZ2 == 4 ||
        lineCountXYZ3 == 4 ||
        lineCountXYZ4 == 4) {
        return true;
    } else {
        return false;
    }
}