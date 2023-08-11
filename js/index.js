var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);

var infoBox;
var infoText;
var hideInfoTimer;

function preload() {
    this.load.image('nucleo', 'img/nucleo.png');
    this.load.image('nucleolo', 'img/nucleolo.png');
    this.load.image('citoplasma', 'img/citoplasma.png');
    this.load.image('mitocondria', 'img/mitocondria.png');
    this.load.image('lisosoma', 'img/lisosoma.png');
    this.load.image('centrosoma', 'img/centrosoma.png');
    this.load.image('endoplasma', 'img/endoplasma.png');
    this.load.image('golgi', 'img/aparatogolgi.png');
    this.load.image('membrana', 'img/membrana.png');
}

function create() {
    // Cambiar el color del fondo a blanco
    this.cameras.main.setBackgroundColor('#ffffff');

    // Crear la zona de construcción (build zone) como un rectángulo
    var buildZone = this.add.rectangle(400, 300, 800, 600, 0xcccccc);
    buildZone.setAlpha(0.3);

    var nucleo = this.add.image(100, 75, 'nucleo').setInteractive().setScale(0.5);
    var nucleolo = this.add.image(100, 150, 'nucleolo').setInteractive().setScale(0.5);
    var mitocondria = this.add.image(100, 225, 'mitocondria').setInteractive().setScale(0.5);
    var lisosoma = this.add.image(100, 300, 'lisosoma').setInteractive().setScale(0.5);
    var centrosoma = this.add.image(100, 375, 'centrosoma').setInteractive().setScale(0.5);
    var endoplasma = this.add.image(100, 425, 'endoplasma').setInteractive().setScale(0.5);
    var golgi = this.add.image(100, 500, 'golgi').setInteractive().setScale(0.5);

    var membrana = this.add.image(600, 150, 'membrana').setInteractive().setScale(0.5);
    var citoplasma = this.add.image(600, 425, 'citoplasma').setInteractive().setScale(0.5);

    this.input.setDraggable([nucleo, nucleolo, citoplasma, mitocondria, lisosoma, centrosoma, endoplasma, membrana, golgi]);

    this.input.on('dragstart', function (pointer, gameObject) {
        this.children.bringToTop(gameObject);
        this.children.bringToTop(infoBox);
        this.children.bringToTop(infoText);
    }, this);

    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
        gameObject.x = dragX;
        gameObject.y = dragY;
    });

    infoBox = this.add.graphics();
    infoBox.fillStyle(0xffffff, 0.8);
    infoBox.visible = false;

    infoText = this.add.text(0, 0, '', { fontSize: '16px', fill: '#000', wordWrap: { width: 180, useAdvancedWrap: true } });

    [nucleo, nucleolo, citoplasma, mitocondria, lisosoma, centrosoma, endoplasma, golgi, membrana].forEach(function (gameObject) {
        gameObject.on('pointerover', function (pointer) {
            clearTimeout(hideInfoTimer); // Limpiar el temporizador si ya estaba en marcha
            var imageKey = gameObject.texture.key;
            var description = getImageDescription(imageKey);
            infoText.setText(description);
            infoBox.clear();
            infoBox.fillRect(pointer.x + 10, pointer.y - infoText.height - 30, infoText.width + 20, infoText.height + 20);
            infoText.setPosition(pointer.x + 20, pointer.y - infoText.height - 25);
            infoBox.visible = true;
        });

        gameObject.on('pointerout', function () {
            hideInfoTimer = setTimeout(function () {
                infoBox.visible = false;
                infoText.setText(''); // Limpiar el texto
            }, 100); // Retrasar la ocultación del cuadro de texto
        });
    });
}

// Función para obtener la descripción de la imagen
function getImageDescription(imageKey) {
    switch (imageKey) {
        case 'nucleo':
            return 'El núcleo es el centro de control de la célula.';
        case 'nucleolo':
            return 'El nucléolo es responsable de la producción de ribosomas.';
        case 'mitocondria':
            return 'Las mitocondrias son las centrales energéticas de la célula.';
        case 'lisosoma':
            return 'Los lisosomas contienen enzimas para digerir sustancias.';
        case 'centrosoma':
            return 'El centrosoma está involucrado en la división celular.';
        case 'endoplasma':
            return 'El retículo endoplasmático es importante para la síntesis de proteínas.';
        case 'golgi':
            return 'El aparato de Golgi modifica y empaqueta proteínas para su transporte.';
        case 'membrana':
            return 'La membrana celular regula el paso de sustancias dentro y fuera de la célula.';
        case 'citoplasma':
            return 'El citoplasma es el fluido que llena la célula y contiene organelos.';
        default:
            return '';
    }
}
