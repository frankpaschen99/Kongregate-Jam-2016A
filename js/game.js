var game = new Phaser.Game(windowSize.width, windowSize.height, Phaser.AUTO, ''), Main = function () {};

Main.prototype = {

    preload: function () {
        game.load.script('loadGame', 'js/game/loadGame.js');
        game.load.script('utils',   'js/game/utils.js');
    },

    create: function () {
        game.state.add('LoadGame', LoadGame);
        game.state.start('LoadGame');
    }

};

game.state.add('Main', Main);
game.state.start('Main');
