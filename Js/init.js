
// Colores del menú de navegación al pasar el ratón
  function navhover(actual) {
      document.getElementById("actual").style.backgroundColor = "rgb(92, 187, 155)";
      }

  function normalAgain(actual) {
      document.getElementById("actual").style.backgroundColor = "coral";
  }
// FUNCIONES DEL FORMULARIO
  // Habilitar o desabilitar el primer campo derivado
  function cambio() {
    let selectionElement = document.getElementById("selection");
    let modalidadElement = document.getElementById("modalidad");

    if (selectionElement.value !== "ninguno") {
      modalidadElement.removeAttribute("disabled");
    } else {
      modalidadElement.setAttribute("disabled", "disabled");
      document.getElementById("complejidad").setAttribute("disabled","disabled");
    }
  }
  // Habilitar o desabilitar el segundo campo derivado
  function  complex(){
    let modalidadElement = document.getElementById("modalidad");
    let complejidadElement = document.getElementById("complejidad");

    if (modalidadElement.value !== "0") {
      complejidadElement.removeAttribute("disabled");
    } else {
      complejidadElement.setAttribute("disabled", "disabled");
    }
  }
  // Mostrar u ocultar un texto con enlace a la web de ENAIRE
  function mostrar(value){
    if (value=="drone"){
      document.getElementById("enaire").removeAttribute("hidden");
    }else{
      document.getElementById("enaire").setAttribute("hidden","hidden");
    }
  }
  // Mostrar u ocultar opciones según la selección
  function seleccionInicial(clase) {
    // Mostrar las opciones con la clase seleccionada
    let elementos = document.getElementsByClassName(clase);
    for (let i = 0; i < elementos.length; i++) {
      elementos[i].hidden = false;
    }
    // Ocultar las opciones con clase diferente
    let todosLosElementos = document.querySelectorAll("#modalidad option");
    for (let i = 0; i < todosLosElementos.length; i++) {
      let elemento = todosLosElementos[i];
      if (!elemento.classList.contains(clase)) {
        elemento.hidden = true;
        document.getElementById("modalidad").selectedIndex = 0;
        document.getElementById("complejidad").selectedIndex = 0;
      }
    }
  }

  function seleccionFinal(clase) {
    // Mostrar las opciones con la clase seleccionada
    let elementos = document.getElementsByClassName(clase);
    for (let i = 0; i < elementos.length; i++) {
      elementos[i].hidden = false;
    }
    // Ocultar las opciones con clase diferente
    let todosLosElementos = document.querySelectorAll("#complejidad option");
    for (let i = 0; i < todosLosElementos.length; i++) {
      let elemento = todosLosElementos[i];
      if (!elemento.classList.contains(clase)) {
        elemento.hidden = true;
        document.getElementById("complejidad").selectedIndex = 0;
      }
    }
  }
// JSON con servicios y precios
var servicio = {
  "diseno": {
    "fisico": {
      "logo": 40,
      "imagenSencilla": 60,
      "composicionSencilla": 100,
      "composicionCompleja": 250
    },
    "digital": {
      "logo": 40,
      "imagenSencilla": 60,
      "composicionSencilla": 100,
      "composicionCompleja": 250
    }
  },
  "ilustracion": {
    "fisico": {
      "logo": 80,
      "imagenSencilla": 90,
      "composicionSencilla": 120,
      "composicionCompleja": 280
    },
    "digital": {
      "logo": 60,
      "imagenSencilla": 80,
      "composicionSencilla": 100,
      "composicionCompleja": 250
    }
  },
  "fotografía": {
    "foto":{
      "interior":180,
      "exterior":150,
    },
    "evento":{
      "-1hora":100,
      "1-2 horas":180,
      "2-4 horas":360,
      "+4 horas":500,
      "dia completo":1000,
    }
    
  },
  "drone": {
    "urbana": {
      "CTR": 1300,
      "noCTR": 800,
    },
    "natural":{
      "noprotegido": 500,
      "ZEPACTR": 800,
    }
  },
  "Extras": {
    "SoporteEnRedes": 500,
    "CopiaEnFisico": 300,
    "VideoMakingOf": 800,
    },
  };

// Recorrer el JSON y mostrar el precio en el campo de texto
function calcularPresupuesto() {
  var tipoServicio = document.getElementById('selection').value;
  var modalidad = document.getElementById('modalidad').value;
  var complejidad = document.getElementById('complejidad').value;
  var extras = 0;

  // Calcular el costo de los extras seleccionados
  var checkboxes = document.querySelectorAll('input[name="extras"]:checked');
  checkboxes.forEach(function(checkbox) {
    extras += servicio.Extras[checkbox.id];
  });

  var presupuesto = 0;

  if (servicio.hasOwnProperty(tipoServicio)) {
    if (servicio[tipoServicio].hasOwnProperty(modalidad)) {
      if (servicio[tipoServicio][modalidad].hasOwnProperty(complejidad)) {
        presupuesto = servicio[tipoServicio][modalidad][complejidad] + extras;
      }
    }
  }

  // Mostrar el presupuesto en el textarea
  document.querySelector('.TOTAL').value = presupuesto + "€";

  // Calcular la cuota mensual
  calcularCuotaMensual();
}

function calcularCuotaMensual() {
  var totalPresupuesto = parseFloat(document.querySelector('.TOTAL').value);
  var financiacionElement = document.getElementById('finan');
  var cuotaMensualElement = document.querySelector('#cuotam');

  // Verifica que el total sea un número válido y que la financiación no sea 0
  if (!isNaN(totalPresupuesto) && financiacionElement.value != 0) {
    // Calcula la cuota mensual
    var cuotaMensual = ((totalPresupuesto * 0.1) + totalPresupuesto) / financiacionElement.value;
    cuotaMensualElement.value = cuotaMensual.toFixed(2) + "€/mes";
  } else {
    cuotaMensualElement.value = ""; // Borra el valor si no se cumple la condición
  }
}

// Mostrar el valor seleccionado en meses
function actualizarValor() {
  var range = document.getElementById("finan");
  var valorSeleccionado = document.getElementById("numeroMeses");
  valorSeleccionado.textContent = "Meses: " + range.value;
}

// Agregar eventos input para calcular cuando cambien los valores
var totalElement = document.querySelector('.TOTAL');
var selectionElement = document.getElementById('selection');
var modalidadElement = document.getElementById('modalidad');
var complejidadElement = document.getElementById('complejidad');
var checkboxes = document.querySelectorAll('input[name="extras"]');
var cuotaMensualElement = document.querySelector('#cuotam');

totalElement.addEventListener('input', function () {
  calcularCuotaMensual();
});
selectionElement.addEventListener('change', function () {
  calcularPresupuesto();
});
modalidadElement.addEventListener('change', function () {
  calcularPresupuesto();
});
complejidadElement.addEventListener('change', function () {
  calcularPresupuesto();
});

checkboxes.forEach(function (checkbox) {
  checkbox.addEventListener('change', function () {
    calcularPresupuesto();
  });
});

cuotaMensualElement.addEventListener('input', function () {
  // Puedes agregar código adicional aquí si es necesario
  // Este evento se activará cuando cambie el valor de #cuotam
});



//SLIDERS

  function sliderizda(imagen) {
    var elements = document.getElementsByClassName(imagen);
    
    // Encuentra el elemento visible actual
    var elementoVisible;
    for (var i = 0; i < elements.length; i++) {
      if (!elements[i].hasAttribute('hidden')) {
        elementoVisible = elements[i];
        break;
      }
    }
    
    // Oculta el elemento actual
    if (elementoVisible) {
      elementoVisible.setAttribute('hidden', true);
      
      // Encuentra el índice del elemento visible actual
      var indice = Array.from(elements).indexOf(elementoVisible);
      
      // Calcula el índice del elemento anterior o el último si estamos en el primero
      var indiceAnterior = (indice === 0) ? elements.length - 1 : indice - 1;
      
      // Muestra el elemento anterior
      elements[indiceAnterior].removeAttribute('hidden');
    }
  }
  function sliderdxa(imagen) {
    var elements = document.getElementsByClassName(imagen);
    
    // Encuentra el elemento visible actual
    var elementoVisible;
    for (var i = 0; i < elements.length; i++) {
      if (!elements[i].hasAttribute('hidden')) {
        elementoVisible = elements[i];
        break;
      }
    }
    
    // Oculta el elemento actual
    if (elementoVisible) {
      elementoVisible.setAttribute('hidden', true);
      
      // Encuentra el índice del elemento visible actual
      var indice = Array.from(elements).indexOf(elementoVisible);
      
      // Calcula el índice del elemento siguiente o el último si estamos en el primero
      var indiceSiguiente = (indice === elements.length - 1) ? 0 : indice + 1;
      
      // Muestra el elemento siguiente
      elements[indiceSiguiente].removeAttribute('hidden');
    }
  }