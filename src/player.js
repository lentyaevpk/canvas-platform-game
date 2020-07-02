const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const player = {
    x: 250,
    y: 480,
    w: 100,
    h: 10,
    dx: 0,
    speed: 4
}

function drawPlayer() {
    ctx.fillStyle = '#4a76a8'
    ctx.fillRect(player.x, player.y, player.w, player.h)
}

function movePlayer(e) {
    if (e.key === 'ArrowRight') {
        player.dx = player.speed
    } else if (e.key === 'ArrowLeft') {
        player.dx = -player.speed
    }
}

function stopPlayer(e) {
    if (e.key === 'ArrowRight' || 'ArrowLeft') {
        player.dx = 0
    }
}

function detectWalls() {
    if(player.x - 5 < 0) {
        player.x = 5
    } else if (player.x + player.w > canvas.width - 5) {
        player.x = canvas.width - player.w - 5
    }
}

function newPlayerPos() {
    player.x += player.dx

    detectWalls()
}

export {
    player,
    stopPlayer,
    movePlayer,
    newPlayerPos,
    drawPlayer
}