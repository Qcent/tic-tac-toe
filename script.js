function player(sym) {
    return {
        sym,

    }
}

player1 = player('x');
player2 = player('o');

const board = (() => {
    const spacesArr = Array.from(document.getElementsByClassName('space'));
    const playboardArray = ['','','','','','','','',''];
    let isPlaying = player1;

    for (let i=0; i < spacesArr.length; i++) {
        spacesArr[i].addEventListener('click', function(e) {
            const idx = parseInt(e.target.getAttribute('data-index'))
            if (spaceIsEmpty(playboardArray[idx])) {
                recordMove(idx);
                renderBoard();
            }
        })
    }
    const renderBoard = () => {
        for (let i=0; i < spacesArr.length; i++) {
            spacesArr[i].textContent = playboardArray[i];
        }
    }
    const spaceIsEmpty = (item) => {
        return item === '';
    };
    const recordMove = (idx) => {
        if (spaceIsEmpty(playboardArray[idx])) {
            playboardArray[idx] = isPlaying.sym;
        }
        isPlaying = (isPlaying == player1) ? player2 : player1;
    }
    const getArray = function() {
        return playboardArray
    }

    return {
        getArray,
        renderBoard
    }
})();

