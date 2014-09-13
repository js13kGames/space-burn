var loader = require('./loader.js');

loader.done(function() {
    var raf = require('./raf');
    var player = require('./player');
    var key = require('./keys');
    var particles = require('./particles');
    var enemies = require('./enemies');
    var collisions = require('./collisions');
    var menus = require('./menus.js');

    var canvas = document.querySelector('#game');
    var ctx = canvas.getContext('2d');

    window.state = 'menu';
    raf.start(function(elapsed) {
        if (window.state === 'menu') {
            menus.drawMenu(ctx);
        }
        else if (window.state === 'game') {
            player.gravity(elapsed);
            if (key.up()) {
                player.up(elapsed);
                particles.createParticles(player.x + player.width / 2, player.y + player.height, player.angle, Math.PI / 10, 10, 10);
            } else {
                player.move(elapsed);
            }

            if (key.right()) {
                player.right(elapsed);
            }
            if (key.left()) {
                player.left(elapsed);
            }

            collisions.check(player, particles, enemies);

            // Clear the screen
            ctx.fillStyle = '#0f0d20';
            ctx.fillRect(0, 0, 800, 600);

            enemies.loop(elapsed, ctx, player.offsetX, player.offsetY);
            particles.draw(elapsed, ctx, player);
            player.draw(elapsed, ctx);
            menus.ingame(ctx, player.fuel, player.health);

            if (player.dead || player.fuel <= 0) {
                window.state = 'end';
            }
        }
        else if (window.state === 'end') {
            menus.drawEnd(ctx);
        }

    });
});