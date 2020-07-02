import {stopPlayer, movePlayer, newPlayerPos, drawPlayer} from './player'
import {drawArc, newArcPos} from './arc'
import { drawPlatforms } from './platforms'

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

function clear() {
    ctx.clearRect(0 , 0, canvas.width, canvas.height)
}

document.addEventListener('keydown', movePlayer)
document.addEventListener('keyup', stopPlayer)


function updatePlayer() {
    clear()

    newPlayerPos()

    drawPlayer()

    requestAnimationFrame(updatePlayer)
}

function updateArc() {
    drawArc()

    newArcPos()

    requestAnimationFrame(updateArc)
}

function updatePlatfroms() {
    drawPlatforms()

    requestAnimationFrame(updatePlatfroms)
}

updatePlayer()
updateArc()
updatePlatfroms()