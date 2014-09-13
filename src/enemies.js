var enemies = [];

var sprites = [
    'rock-1.png',
    'rock-2.png',
    'rock-3.png',
    'rock-4.png',
    'rock-5.png',
    'rock-alt-1.png',
    'rock-alt-2.png',
    'rock-alt-3.png',
    'rock-alt-4.png',
    'rock-alt-5.png',
    'rock-odd-1.png',
    'rock-odd-2.png',
    'rock-odd-3.png',
    'rock-odd-4.png'
];

var rocks = {};
for (var i = 0; i < sprites.length; i++) {
    rocks[sprites[i]] = new Image();
    rocks[sprites[i]].src = 'images/' + sprites[i];
}

var rnd = function() {
    return Math.random();
};
var choose = function() {
    return arguments[Math.floor(rnd() * arguments.length)];
};

var SPAWN_RANGE = 100;
var MIN_SPEED = 0.3, MAX_SPEED = 2;
var MAX_WIDTH = 50, MAX_HEIGHT = 50;
var MIN_WIDTH = 5, MIN_HEIGHT = 5;
var WIDTH = 800, HEIGHT = 600;

var spawn = function(n) {
    console.log('Spawned enemies:', n);
    var obj, targetY, targetX;
    for (var i = 0; i < n; i++) {
        obj = {
            x: (choose(-1, 1) * SPAWN_RANGE * rnd()) + (choose(0, 1) * WIDTH),
            y: (choose(-1, 1) * SPAWN_RANGE * rnd()) + (choose(0, 1) * HEIGHT),
            width: rnd() * (MAX_WIDTH - MIN_WIDTH) + MIN_WIDTH,
            height: rnd() * (MAX_HEIGHT - MIN_HEIGHT) + MIN_HEIGHT,
            speed: rnd() * (MAX_SPEED - MIN_SPEED) + MIN_SPEED,
            type: choose.apply(this, sprites)
        };
        targetY = rnd() * WIDTH;
        targetX = rnd() * HEIGHT;
        obj.angle = Math.atan2(targetY - obj.y, targetX - obj.x);
        enemies.push(obj);
    }
};

var draw = function(elapsed, ctx, offsetX, offsetY) {
    var enemy;
    for (var i = 0, len = enemies.length; i < len; i++) {
        enemy = enemies[i];
        enemy.x += Math.cos(enemy.angle) * enemy.speed - offsetX;
        enemy.y += Math.sin(enemy.angle) * enemy.speed - offsetY;
        ctx.fillStyle = 'red';
        // ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
        ctx.drawImage(rocks[enemy.type], enemy.x, enemy.y);
    }
};


module.exports = {
    draw: draw,
    array: enemies,
    spawn: spawn
};