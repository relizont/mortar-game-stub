
window.onload = function() {

    // A cross-browser requestAnimationFrame
    // See https://hacks.mozilla.org/2011/08/animating-with-javascript-from-setinterval-to-requestanimationframe/
    var requestAnimFrame = (function(){
        return window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            function(callback){
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    /*// Want to install the app locally? This library hooks up the
    // installation button. See <button class="install-btn"> in
    // index.html
    require('./install-button');*/



    // Create the canvas
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    canvas.width = 512;
    canvas.height = 480;
    document.body.appendChild(canvas);

    // The player's state
    var player = {
        x: 0,
        y: 0,
        sizeX: 50,
        sizeY: 50
    };

    // Don't run the game when the tab isn't visible
    window.addEventListener('focus', function() {
        unpause();
    });

    window.addEventListener('blur', function() {
        pause();
    });

    // Let's play this game!
    reset();
    var then = Date.now();
    var running = true;
    main();


    // Functions ---


    // Reset game to original state
    function reset() {
        player.x = 0;
        player.y = 0;
    }

    // Pause and unpause
    function pause() {
        running = false;
    }

    function unpause() {
        running = true;
        then = Date.now();
        main();
    }

    // Update game objects.
    // We'll use GameInput to detect which keys are down.
    // If you look at the bottom of index.html we load GameInput before app.js
    function update(dt) {
        // Speed in pixels per second
        var playerSpeed = 100;

        if(GameInput.isDown('DOWN')) {
            // dt is the number of seconds passed, so multiplying by
            // the speed gives you the number of pixels to move
            player.y += playerSpeed * dt;
        }

        if(GameInput.isDown('UP')) {
            player.y -= playerSpeed * dt;
        }

        if(GameInput.isDown('LEFT')) {
            player.x -= playerSpeed * dt;
        }

        if(GameInput.isDown('RIGHT')) {
            player.x += playerSpeed * dt;
        }

        // You can pass any letter to `isDown`, in addition to DOWN,
        // UP, LEFT, RIGHT, and SPACE:
        // if(GameInput.isDown('a')) { ... }
    }

    // Draw everything
    function render() {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'green';
        ctx.fillRect(player.x, player.y, player.sizeX, player.sizeY);
    }

    // The main game loop
    function main() {
        if(!running) {
            return;
        }

        var now = Date.now();
        var dt = (now - then) / 1000.0;

        update(dt);
        render();

        then = now;
        requestAnimFrame(main);
    }


};