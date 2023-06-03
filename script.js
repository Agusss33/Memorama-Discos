
class Memorama {

    constructor() {

        this.Jugar = false;

        this.carta1 = null;
        this.carta2 = null;

        this.availableImages = [1, 2, 3, 4, 5, 6];
        this.orderForThisRound = [];
        this.cards = Array.from( document.querySelectorAll(".Juego figure") );

        this.maxPairNumber = this.availableImages.length;

        this.iniciarJuego();

        const boton2El = document.querySelector(".btn-2")

        boton2El.addEventListener("click",()=>{
            
               this.NuevoJuego();
        })

    }

    iniciarJuego() {

        this.foundPairs = 0;
        this.nuevoOrden();
        this.imagenesCarta();
        this.abrirCartas();

    }

    nuevoOrden() {

        this.orderForThisRound = this.availableImages.concat(this.availableImages);
        this.orderForThisRound.sort( () => Math.random() - 0.5 );

    }

    imagenesCarta() {

        for (const key in this.cards) {
            
            const card = this.cards[key];
            const image = this.orderForThisRound[key];
            const imgLabel = card.children[1].children[0];

            card.dataset.image = image;
            imgLabel.src = `./Fotos/${image}.png`;

        }

    }

    abrirCartas() {

        this.cards.forEach(card => card.classList.add("abierta"));

        setTimeout(() => {
            this.cerrarCartas();
        }, 2000);

    }

    cerrarCartas() {

        this.cards.forEach(card => card.classList.remove("abierta"));
        this.addClickEvents();
        this.Jugar = true;

    }

    addClickEvents() {

        this.cards.forEach(_this => _this.addEventListener("click", this.darVuelta.bind(this)));

    }

    removeClickEvents() {

        this.cards.forEach(_this => _this.removeEventListener("click", this.darVuelta));

    }

    darVuelta(e) {

        const clickedCard = e.target;

        if (this.Jugar && !clickedCard.classList.contains("abierta")) {
            
            clickedCard.classList.add("abierta");
            this.checkearCartas( clickedCard.dataset.image );

        }

    }

    checkearCartas(image) {

        if (!this.carta1) this.carta1 = image;
        else this.carta2 = image;

        if (this.carta1 && this.carta2) {
            
            if (this.carta1 == this.carta2) {

                this.Jugar = false;
                setTimeout(this.Verificar.bind(this), 300)
                
            }
            else {

                this.Jugar = false;
                setTimeout(this.resetearCartas.bind(this), 800)

            }

        }

    }

    resetearCartas() {
        
        const firstOpened = document.querySelector(`.Juego figure.abierta[data-image='${this.carta1}']`);
        const secondOpened = document.querySelector(`.Juego figure.abierta[data-image='${this.carta2}']`);

        firstOpened.classList.remove("abierta");
        secondOpened.classList.remove("abierta");

        this.carta1 = null;
        this.carta2 = null;

        this.Jugar = true;

    }

    Verificar() {
    
        this.foundPairs++;

        this.carta1 = null;
        this.carta2 = null;
        this.Jugar = true;

        if (this.maxPairNumber == this.foundPairs) {

            swal({
                text: "Ganaste!",
                timer: 1000,
                button: false
                })

                this.NuevoJuego();
        }
       

    }

    NuevoJuego() {

        this.removeClickEvents();
        this.cards.forEach(card => card.classList.remove("abierta"));

        setTimeout(this.iniciarJuego.bind(this), 2000);

    }

}

const BotonEl = document.querySelector(".btn")

BotonEl.addEventListener("click", () => {
      
    new Memorama();
    BotonEl.disabled = true;
   
});



