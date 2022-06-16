function rectangularCollision({rectangel1,rectangel2,}){
    return(
    rectangel1.attackBox.position.x + rectangel1.attackBox.width >= rectangel2.position.x &&
        rectangel1.attackBox.position.x <= rectangel2.position.x + rectangel2.width &&
        rectangel1.attackBox.position.y + rectangel1.attackBox.height >= rectangel2.position.y &&
        rectangel1.attackBox.position.y <= rectangel2.position.y + rectangel2.height
        )}

function determinWinner({player, enemy, timerId}){
    clearTimeout(timerId)
    document.querySelector('.tie').style.display = 'flex'
    if (player.health === enemy.health){
        document.querySelector('.tie').innerHTML = 'tie'
    } else if (player.health > enemy.health){
        document.querySelector('.tie').innerHTML = 'player 1 wins'
    } else if (enemy.health > player.health){
        document.querySelector('.tie').innerHTML = 'player 2 wins'
    }
}

let timer = 60
let timerId 
function decreaceTimer() {
    if (timer > 0) {
    timerId = setTimeout(decreaceTimer, 1000)
        timer--
        document.querySelector('.timer').innerHTML = timer
    }
    if (timer === 0){
        determinWinner({player, enemy})
    }
}