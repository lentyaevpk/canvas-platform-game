const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

let platforms = []


function initPlatforms() {
    platforms = []
    let i = 0
    let j = 0

    while(i < 5) { 
        while(j < 5) {
            let platfrom = {
                w: 105,
                h: 10,
                y: 20 + i * 30,
                x: 17 + j * 115
            }
    
            platforms.push(platfrom)
    
            j++
        }
        j = 0
        i++
    }
}

function drawPlatforms() {
    platforms.forEach(plat => {
        ctx.fillStyle = '#4a76a8'
        ctx.fillRect(plat.x, plat.y, plat.w, plat.h)
    })
}

initPlatforms()

export {
    platforms,
    initPlatforms,
    drawPlatforms
}