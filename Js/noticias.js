// JSON DE NOTICIAS

var noticias = {
    "Noticia1": {
      "Título": "Presentación de la web",
      "Cuerpo": {
        "Texto": "La presente web ha sido realizada como un proyecto. Sin embargo, contiene información real sobre mis proyectos y diseños. Por lo que si te gusta algún diseño o publicación, podrás adquirirlo en la tienda correspondiente haciendo click en su imagen.<br><br>La sección de presupuestos y contacto son puramente ficticias por no estar dado de alta como autónomo. Sin embargo, recomiendo que le eches un vistazo para ver una propuesta de diseño web.",
        "Imagen": "https://pix4free.org/assets/library/2021-06-16/originals/click.jpg",
         },
        },
    "Noticia2": {
      "Título": "Diseños",
      "Cuerpo": {
        "Texto": "Ya puedes conseguir mis diseños en <a href='https://www.latostadora.com/shop/donda/designs/#shop'>LA TOSTADORA</a>. Elige el que más te guste, haz click y podrás poner tu diseño donde prefieras: camisetas, sudaderas, tazas, mochilas, etc.  ",
        "Imagen": "https://srv.latostadora.com/designall.dll/The%20child--i:14138516543311413850;d:1654331;w:322;h:322;b:9f0e04.jpg",
        "Enlace": "Views/Portfolio.html",
         },
        },
    "Noticia3": {
      "Título": "Publicaciones",
      "Cuerpo": {
        "Texto": "Hasta la fecha, cuento con una publicación de un cuento infantil. Si deseas adquirirlo podrás hacerlo en el siguiente <a href='https://www.amazon.es/pincel-orgulloso-Daniel-Mart%C3%ADn-Bernaldo/dp/1520273061/ref=tmm_pap_swatch_0?_encoding=UTF8&qid=&sr='>enlace</a>.",
        "Imagen": "https://m.media-amazon.com/images/I/61u8EKp2T8S.jpg",
         },
        },
  };

  var noticiero = document.getElementById("noticiero");

  // Recorrer el objeto JSON de noticias
  for (var key in noticias) {
    if (noticias.hasOwnProperty(key)) {
      var noticia = noticias[key];

      // Crear elementos HTML para mostrar la noticia
      var noticiaDiv = document.createElement("div");
      noticiaDiv.classList.add("noticia");

      var titulo = document.createElement("h2");
      titulo.textContent = noticia.Título;

      var texto = document.createElement("p");
      texto.innerHTML = noticia.Cuerpo.Texto; 

      var imagen = document.createElement("img");
      imagen.src = noticia.Cuerpo.Imagen;

      // Si la noticia tiene un enlace, crear un elemento de enlace
      if (noticia.Cuerpo.Enlace) {
        var enlace = document.createElement("a");
        enlace.href = noticia.Cuerpo.Enlace;
        enlace.textContent = "Leer más";
        texto.appendChild(enlace);
      }

      // Agregar elementos al div de la noticia
      noticiaDiv.appendChild(titulo);
      noticiaDiv.appendChild(imagen);
      noticiaDiv.appendChild(texto);

      // Agregar la noticia al elemento #noticiero
      noticiero.appendChild(noticiaDiv);
    }
  }
  
//Noticias Rick y Morty
function cargaNoticias(cajanoticias, noticias) {
  cajanoticias.innerHTML = ''; // Limpiamos la caja de noticias antes de agregar nuevas noticias

  noticias.forEach((noticia) => {
    const div = document.createElement('div');
    div.innerHTML = `<img src="${noticia.image}" alt="${noticia.name}">`;
    cajanoticias.appendChild(div);
  });
}

// Obtener noticias de la API de Rick y Morty
const cajanoticias = document.getElementById('cajanoticias');

fetch('https://rickandmortyapi.com/api/character')
  .then((response) => response.json())
  .then((data) => cargaNoticias(cajanoticias, data.results))
  .catch((error) => console.error('Error al cargar noticias:', error));