import {player} from './player'
import {platforms, initPlatforms} from './platforms'

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const scoreWrapper = document.querySelector('.score')
const highestScoreWrapper = document.querySelector('.highest-score')

const entryArc = {
    x: 300,
    y: 470,
    size: 10,
    dx: 5,
    dy: 4
}

let arc = {...entryArc}

let score = 0

let highestScore = localStorage.getItem('score') || 0
highestScoreWrapper.innerHTML = highestScore

function drawArc() {
    ctx.beginPath()
    ctx.fillStyle = '#4a76a8'
    ctx.arc(arc.x, arc.y, arc.size, 0, Math.PI * 2)
    ctx.fill()
}

function detectWalls() {
    if(arc.x - arc.size < 0 || arc.x + arc.size > canvas.width) { // side walls
        arc.dx *= -1 
    } else if (arc.y < 0) { // top wall
        arc.dy *= -1 
    }
}

function detectLose() {
    if(arc.y + arc.size > canvas.height - 15) {
        reset()
        if (score > highestScore) {
            setHighestScore()
        }
        score = 0
        scoreWrapper.innerHTML = score
    }
}

function detectPlayer() {
    if (arc.y + arc.size > player.y && arc.x + arc.size > player.x && arc.x - arc.size < player.x + player.w) {
        arc.dy *= -1
    }
}

function detectPlatform() {
    if(platforms.some(plat => {
        return arc.y - arc.size < plat.y + plat.h && arc.x > plat.x && arc.x < plat.x + plat.w
    })) {
        let platIndex = platforms.findIndex(plat => {
            return arc.y - arc.size < plat.y + plat.h && arc.x > plat.x && arc.x < plat.x + plat.w
        })
        platforms.splice(platIndex, 1)
        score++
        scoreWrapper.innerHTML = score
        arc.dy *= -1
        if(platforms.length === 0) {
            reset()
        }
    }
}

function reset() {
    arc = {...entryArc}
    player.x = 250
    player.y = 480
    initPlatforms()
}

function setHighestScore() {
    highestScore = score
    highestScoreWrapper.innerHTML = highestScore
    localStorage.setItem('score', highestScore)
}

function newArcPos() {
    arc.x += arc.dx
    arc.y -= arc.dy

    detectWalls()
    detectPlayer()
    detectLose()
    detectPlatform()
}

export {
    drawArc,
    newArcPos
}