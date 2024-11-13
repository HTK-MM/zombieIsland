let canvas;
let world;
let keyboard = new Keyboard();


/**
 * Initializes the game by setting up the level, creating the canvas, instantiating the world,
 * playing the game sound, checking the end of the game, and enabling sound. Logs information about
 * the character, enemies, and endboss.+ *
 * @return {void} This function does not return a value.
 */
function init() {
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    document.getElementById('gameSound').play();
    CheckEndofGame();
    soundOn();  
}

document.addEventListener("DOMContentLoaded", function () {
    handleOrientationChange();
    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', handleOrientationChange);

    window.addEventListener('orientationchange', adjustHeightScreen);
    window.addEventListener('resize', adjustHeightScreen);
    adjustHeightScreen();

    addMobileTouchStartEvents();
    addMobileTouchEndEvents();
});

/**
 * Handles the orientation change event by showing or hiding elements based on window dimensions.
 */
function handleOrientationChange() {
    if (window.innerHeight > window.innerWidth && window.innerWidth < 900) {
        document.getElementById('overlay').classList.remove('d-none');
        document.getElementById('game').classList.add('d-none');
    }
    else {
        document.getElementById('overlay').classList.add('d-none');
        document.getElementById('game').classList.remove('d-none');
    }
}

/**
 * Adjusts the height of the game screen based on the window inner height. *
 */
function adjustHeightScreen() {
    if (window.innerHeight < 675) {
        adjustHeightImages(window.innerHeight);
        let gameScreen = document.getElementById('game');
        gameScreen.style.height = `${window.innerHeight}px`;
        document.getElementById('gameTitle').classList.add('d-none');
        document.getElementById('btnControls').classList.remove('d-none');
    } else {
        adjustHeightImages((Math.min(1200, window.innerWidth) * 673) / 1200);
        document.getElementById('gameTitle').classList.remove('d-none');
        document.getElementById('btnControls').classList.add('d-none');
    }
}

/**
 * Adjusts the height of images based on the input height value.+ *
 * @param {number} height - The height value in pixels to set for the images.
 */
function adjustHeightImages(height) {
    let startScreen = document.getElementById('imgStartScreen');
    startScreen.style.height = `${height}px`;
    let lostScreen = document.getElementById('imgEndLostScreen');
    lostScreen.style.height = `${height}px`;
    let winScreen = document.getElementById('imgEndWinScreen');
    winScreen.style.height = `${height}px`;
    let gameOverScreen = document.getElementById('imgEndGameOverScreen');
    gameOverScreen = `${height}px`;
}

/**
 * Opens the dialog for displaying the game rules by removing the 'd-none' class from the 'dialogRules' element. *
 * @return {void} This function does not return a value.
 */
function openDialogRules() {
    document.getElementById('dialogRules').classList.remove('d-none');
}

/**
 * Closes the dialog by adding the 'd-none' class to the element with the id 'dialogRules'.
 * @return {void} This function does not return a value.
 */
function closeDialog() {
    document.getElementById('dialogRules').classList.add('d-none');
}

/**
 * Function to start the game by hiding the start screen and showing the game screen.
 * @return {void} This function does not return a value.
 */
function gameStart() {
    document.getElementById('sectionStartscreen').classList.add('d-none');
    document.getElementById('sectionEndscreen').classList.add('d-none');
    document.getElementById('sectionGame').classList.remove('d-none');
    init();
}

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowDown':
        case 'T':
        case 't': keyboard.Down = true; break;
        case 'ArrowRight':
        case 'F':
        case 'f': keyboard.Right = true; break;
        case 'ArrowLeft':
        case 'A':
        case 'a': keyboard.Left = true; break;
        case 'ArrowUp':
        case ' ': keyboard.Space = true; break;
    }
});

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'ArrowDown':
        case 'T':
        case 't': keyboard.Down = false; break;
        case 'ArrowRight':
        case 'F':
        case 'f': keyboard.Right = false; break;
        case 'ArrowLeft':
        case 'A':
        case 'a': keyboard.Left = false; break;
        case 'ArrowUp':
        case ' ': keyboard.Space = false; break;
    }
});


/**
 * Adds touchstart event listeners to the mobile touch controls.
 * @return {void} This function does not return a value.
 */
function addMobileTouchStartEvents() {
    document.getElementById('btnMoveLeft').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.Left = true;
    });
    document.getElementById('btnMoveRight').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.Right = true;
    });
    document.getElementById('btnJump').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.Space = true;
    });
    document.getElementById('btnThrow').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.Down = true;
    });    
    document.getElementById('btnPlayAgain').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.Enter = true;
    });    
}

/**
 * Adds touchend event listeners to the mobile touch controls.
 * @return {void} This function does not return a value.
 */
function addMobileTouchEndEvents() {
    document.getElementById('btnMoveLeft').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.Left = false;
    });
    document.getElementById('btnMoveRight').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.Right = false;
    });
    document.getElementById('btnJump').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.Space = false;
    });
    document.getElementById('btnThrow').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.Down = false;
    });
    document.getElementById('btnPlayAgain').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.Enter = false;
    });    
}

/**
 * Enters fullscreen mode for the game screen.
 * @return {void} This function does not return a value.
 */
function enterFullscreen() {
    let gameScreen = document.getElementById('game');
    if (gameScreen.requestFullscreen) {
        gameScreen.requestFullscreen();
    } else if (gameScreen.msRequestFullscreen) {
        gameScreen.msRequestFullscreen();
    } else if (gameScreen.webkitRequestFullscreen) {
        gameScreen.webkitRequestFullscreen();
    }
    document.getElementById('btnFullscreen').classList.add('d-none');
    document.getElementById('btnFullscreenOff').classList.remove('d-none');
}

/**
 * Exits fullscreen mode for the game screen.
 * @return {void} This function does not return a value.
 */
function fullscreenOff() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
    document.getElementById('btnFullscreen').classList.remove('d-none');
    document.getElementById('btnFullscreenOff').classList.add('d-none');
}

/**
 * Turns off all sounds in the game by muting the world, the endboss, and all enemies.
 * Pauses the game sound and hides the speaker button while showing the speaker off button.
 * @return {void} This function does not return a value.
 */
function soundOff() {
    world.sound_mute = true;
    world.endboss.isMuted = true;
    world.level.enemies.forEach(enemy => {
        enemy.isMuted = true;
    });
    document.getElementById('gameSound').pause();
    document.getElementById('btnSpeaker').classList.add('d-none');
    document.getElementById('btnSpeakerOff').classList.remove('d-none');
}

/**
 * Turns on all sounds in the game by unmuting the world, playing the game sound, and adjusting speaker buttons.
 * @return {void} This function does not return a value.
 */
function soundOn() {
    world.sound_mute = false;
    document.getElementById('gameSound').play();
    document.getElementById('btnSpeaker').classList.remove('d-none');
    document.getElementById('btnSpeakerOff').classList.add('d-none');
}

/**
 * Checks the end of the game by periodically checking if the character is dead,
 * if the end boss is dead, and if both the character and end boss are dead.
 * If the end boss's x position is less than 400, the character is considered dead.
 * @return {void}
 */
function CheckEndofGame() {
    setInterval(() => {
        if (world.character.isDead()) {
            characterIsDead();
        }
        if (world.endboss.isDead()) {
            endbossIsDead();
        }
        if (world.character.isDead() && world.endboss.isDead()) {
            bothAreDead();
        }
        if(world.endboss.x < 120){
            characterIsDead();
        }
    }, 200);
}

/**
 * Opens the end screen section by removing the 'd-none' class from the 'sectionEndscreen' element,
 * adding the 'd-none' class to the 'sectionGame' element, pausing the 'gameSound', and clearing all intervals.
 * @return {void} This function does not return a value.
 */
function sectionEndscreenOpen() {
    document.getElementById('sectionEndscreen').classList.remove('d-none');
    document.getElementById('sectionGame').classList.add('d-none');
    document.getElementById('gameSound').pause();
    clearAllIntervals();
}

/**
 * Sets a timeout to handle the character's death by manipulating different elements on the page and calling sectionEndscreenOpen after 3 seconds.
 * @return {void} This function does not return a value.
 */
function characterIsDead() {
    setTimeout(() => {
        document.getElementById('imgEndLostScreen').classList.remove('d-none');
        document.getElementById('imgEndWinScreen').classList.add('d-none');
        document.getElementById('imgEndGameOverScreen').classList.add('d-none');
        sectionEndscreenOpen();
    }, 3000);
}

/**
 * Sets a timeout to handle the end boss's death by manipulating different elements on the page and calling sectionEndscreenOpen after 3 seconds.
 * @return {void} This function does not return a value.
 */
function endbossIsDead() {
    setTimeout(() => {
        document.getElementById('imgEndWinScreen').classList.remove('d-none');
        document.getElementById('imgEndLostScreen').classList.add('d-none');
        document.getElementById('imgEndGameOverScreen').classList.add('d-none');
        sectionEndscreenOpen();
    }, 3000);
}

/**
 * Sets a timeout to handle the scenario where both the character and the end boss are dead by manipulating different elements on the page and calling sectionEndscreenOpen after 3 seconds.
 * @return {void} This function does not return a value.
 */
function bothAreDead() {
    setTimeout(() => {
        document.getElementById('imgEndGameOverScreen').classList.remove('d-none');
        document.getElementById('imgEndLostScreen').classList.add('d-none');
        document.getElementById('imgEndWinScreen').classList.add('d-none');
        sectionEndscreenOpen();
    }, 3000);
}

/**
 * Clears all intervals set by window.setInterval.
 * @return {void} This function does not return a value.
 */
function clearAllIntervals() {
    setTimeout(() => {
        for (let i = 1; i < 9999; i++) {
            window.clearInterval(i);
        };
    }, 1000)
};

