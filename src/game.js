import { Preguntas } from './preguntas.js';

export class Mapa extends Phaser.Scene {
    constructor() {
        super({ key: 'Mapa' });
    }

    preload() {
        this.load.tilemapCSV('map', './mapa.csv');
        this.load.image('tiles', './Imagen.png');
    }
    create() {
        var map = this.make.tilemap({ key: 'map', tileWidth: 32, tileHeight: 32 });
        var tiles = map.addTilesetImage('tiles', null, 32, 32, 0, 0);
        var layer = map.createLayer(0, tiles);

        const preguntas = Preguntas();

        const div = document.getElementById('con_preguntas');
        const divOs = document.getElementById('oscuro');
    
        const button = document.getElementById('boton-personalizado');
    
        const Probar = () => {
            var preguntaActual;
            var respuestaSeleccionada;
      
            var textoPregunta = this.add.text(400, 100, '', { fontSize: '32px', fill: '#F700FF' });
            var opciones = [];
      
            function mezclarRespuestas(respuestas) {
              // Crear un array con los índices de las respuestas
              var indices = [...Array(respuestas.length).keys()];
      
              // Mezclar los índices
              for (var i = indices.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = indices[i];
                indices[i] = indices[j];
                indices[j] = temp;
              }
      
              // Crear un nuevo array con las respuestas en el orden mezclado
              var respuestasMezcladas = [];
              for (var i = 0; i < indices.length; i++) {
                respuestasMezcladas.push(respuestas[indices[i]]);
              }
              return respuestasMezcladas;
            }
      
            function preguntar() {
              // Obtener pregunta aleatoria
              preguntaActual = Phaser.Math.Between(0, preguntas.length - 1);
      
              // Mezclar respuestas
              var respuestasMezcladas = mezclarRespuestas(preguntas[preguntaActual].respuestas);
      
              // Crear un elemento p para mostrar la pregunta
              var preguntaEl = document.createElement('a');
              preguntaEl.classList.add('Op_pre');
              preguntaEl.textContent = preguntas[preguntaActual].pregunta;
      
              // Agregar el elemento p como hijo del div con_preguntas
              const divP = document.getElementById('preguntas');
              div.innerHTML = '';
              div.appendChild(preguntaEl);
      
              respuestasMezcladas.forEach((respuesta, index) => {
                const opcion = document.createElement('a');
                opcion.classList.add('Op_res');  //AGREGAR ESTILOS
                opcion.textContent = respuesta;
                opcion.addEventListener('click', function () {
                  respuestaSeleccionada = respuesta;
                  validarRespuesta();
                });
                div.appendChild(opcion);
              });
      
            }
      
            function validarRespuesta() {
              var respuestaCorrecta = preguntas[preguntaActual].correcta;
      
              if (respuestaSeleccionada === respuestaCorrecta) {
                console.log("Respuesta correcta!");
                // Incrementa el puntaje en 10
                puntaje += 10;
                // Actualiza el texto del objeto de texto
                puntajeTexto.setText(`Experiencia: ${puntaje}`);
      
              } else {
                console.log("Respuesta incorrecta.");
              }
              preguntar();
            }
      
            // Crear opciones de respuesta
            for (var i = 0; i < 4; i++) {
              var opcion = this.add.text(400, 200 + i * 50, '', { fontSize: '24px', fill: '#F700FF' });
              opcion.setInteractive();
              opcion.on('pointerdown', function () {
                respuestaSeleccionada = this.text;
                validarRespuesta();
              });
              opciones.push(opcion);
            }
      
      
            preguntar();
          }



          button.addEventListener('click', function () {

            if (divOs.style.display === 'block') {
              divOs.style.display = 'none';
            } else {
              divOs.style.display = 'block';
              Probar();
            }
          });
      
          let puntaje = 0;
          let puntajeTexto = this.add.text(10, 10, `Experiencia: ${puntaje}`, { fontSize: '24px', fill: '#FFF', fontFamily: 'Comic Sans' });
      
    }
}
