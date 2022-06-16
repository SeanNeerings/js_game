const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.7

const background = new sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './fighting_game_assets/background.png'
})

const shop = new sprite({
    position: {
        x: 600,
        y: 128
    },
    imageSrc: './fighting_game_assets/shop.png',
    scale: 2.75,
    framesMax: 6
})

const player = new Fighter({
    position: {
    x: 0,
    y: 0
    },
    velocity: {
    x: 0,
    y: 0
    },
    offset: {
    x: 0,
    y: 0
    },
    imageSrc: './fighting_game_assets/samuraiMack/idle.png',
    framesMax: 8,
    scale:  2.5,
    offset: {
        x: 215,
        y: 157,
    },
    sprites: {
        idle: {
        imageSrc: './fighting_game_assets/samuraiMack/idle.png',
        framesMax: 8
        },
        run: {
        imageSrc: './fighting_game_assets/samuraiMack/run.png',
        framesMax: 8,
        },
        jump: {
        imageSrc: './fighting_game_assets/samuraiMack/jump.png',
        framesMax: 2,
        },
        fall: {
        imageSrc: './fighting_game_assets/samuraiMack/fall.png',
        framesMax: 2,
        },
        attack1: {
        imageSrc: './fighting_game_assets/samuraiMack/attack1.png',
        framesMax: 6,
        }
    }
})



const enemy = new Fighter({
    position: {
    x: 400,
    y: 100
    },
    velocity: {
    x: 0,
    y: 0
},
color: 'blue',  
offset: {
    x: -50,
    y: 0
},    imageSrc: './fighting_game_assets/kenji/idle.png',
framesMax: 4,
scale:  2.5,
offset: {
    x: 215,
    y: 167,
},
sprites: {
    idle: {
    imageSrc: './fighting_game_assets/kenji/idle.png',
    framesMax: 4
    },
    run: {
    imageSrc: './fighting_game_assets/kenji/run.png',
    framesMax: 8,
    },
    jump: {
    imageSrc: './fighting_game_assets/kenji/jump.png',
    framesMax: 2,
    },
    fall: {
    imageSrc: './fighting_game_assets/kenji/fall.png',
    framesMax: 2,
    },
    attack1: {
    imageSrc: './fighting_game_assets/kenji/attack1.png',
    framesMax: 4,
    }
}
})

enemy.draw()

console.log(player)

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    } ,
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    }
}

decreaceTimer()

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
    shop.update()
    player.update()
    enemy.update()
    
    
    player.velocity.x = 0
    enemy.velocity.x = 0

    // player movements
    if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5
        player.switchSprite('run')
    } else if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -5
        player.switchSprite('run')
    } else {
    player.switchSprite('idle')
    }

    // jumping
    if (player.velocity.y < 0){
        player.switchSprite('jump')
    } else if (player.velocity.y > 0) {
        player.switchSprite('fall')  
    }

    // enemy movements
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -5
        enemy.switchSprite('run')
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 5
        enemy.switchSprite('run')
    }   else { 
    enemy.switchSprite('idle')
    }

    // jumping
    if (enemy.velocity.y < 0){
        enemy.switchSprite('jump')
    } else if (enemy.velocity.y > 0) {
        enemy.switchSprite('fall')  
    }

    // detect for collision
    if (
        rectangularCollision({
            rectangel1: player,
            rectangel2: enemy
        }) &&
        player.isAttacking
        ){
        player.isAttacking = false
        enemy.health -=20
        document.querySelector('.healthbar').style.width = enemy.health + '%'
    }
    //end game based on health
    if (enemy.health <= 0 || player.health <=0){
        determinWinner({player, enemy, timerId})
    }


    if (
        rectangularCollision({
            rectangel1: enemy,
            rectangel2: player
        }) &&
        enemy.isAttacking
        ){
        enemy.isAttacking = false
        player.health -=20
        document.querySelector('.playerhealthbar').style.width = player.health + '%'

    }
}


animate()

window.addEventListener('keydown', (event) => {
    switch(event.code){
        case 'KeyD':
            keys.d.pressed = true
            player.lastKey = 'd'
            break
        case 'KeyA':
            keys.a.pressed = true
            player.lastKey = 'a'
            break
        case 'KeyW':
            player.velocity.y = -20
            break
        case 'Space':
            player.attack()
            break
        
        //enemy moves
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = "ArrowRight"
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey = "ArrowLeft"
            break
        case 'ArrowUp':
            enemy.velocity.y = -20
            break
        case 'ArrowDown':
            enemy.attack() = true
            break
    }
})

window.addEventListener('keyup', (event) => {
    switch(event.code){
        case 'KeyD':
            keys.d.pressed = false
            break
        case 'KeyA':
            keys.a.pressed = false
            break
        case 'KeyW':
            keys.w.pressed = false
            break
    }

    // enemy keys
    switch(event.key){
    case 'ArrowRight':
        keys.ArrowRight.pressed = false
        break
    case 'ArrowLeft':
        keys.ArrowLeft.pressed = false
        break
    case 'arrowUp':
        keys.arrowUp.pressed = false
        break
}
})