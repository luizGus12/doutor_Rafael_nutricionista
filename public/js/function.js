history.scrollRestoration = "manual";

window.addEventListener("load", () => {
    window.scrollTo({
        top: 0,
        behavior: "auto"
    });
});

function funcImc(){
    const imcSubmit = document.querySelector("#enviar");


    

    imcSubmit.addEventListener('click' ,function(e){

       e.preventDefault();

       const nome = document.querySelector("#nome").value;
       const idade = parseFloat(document.querySelector("#idade").value || 0);
       const peso = parseFloat(document.querySelector("#peso").value || 0);
       const altura = parseFloat(document.querySelector("#altura").value || 0);

       

       

       const imc = peso / (altura * altura);

        let situacao = "";

        if(imc < 18.5){
            situacao = "Abaixo do peso";
        } else if(imc < 25){
            situacao = "Peso normal";
        } else if(imc < 30){
            situacao = "Sobrepeso";
        } else if(imc < 35){
            situacao = "Obesidade grau I";
        } else if(imc < 40){
            situacao = "Obesidade grau II";
        } else {
            situacao = "Obesidade grau III";
        }


       const valImc = imc.toFixed(2);
       const mensagem = `
       ficha : <br>
       nome : ${nome} <br>
       idade : ${idade} <br>
       peso : ${peso} <br>
       altura : ${altura} <br>
       situação : ${situacao} <br>
     `;

       const printImc = document.querySelector("#imcVal");
       const printFicha = document.querySelector("#ficha");

       printImc.innerHTML = `IMC : ${valImc}`;
       printFicha.innerHTML = mensagem;

    
       

    });
    
    

    
}



function scroll(){
    

    setTimeout(function(){
        window.scrollTo({
            top: 500,
            behavior : "smooth",
        });
        

    },6000);

    

    const goToForm = document.querySelector("#imc-btn");

    goToForm.addEventListener('click', function(){

        const isForm = document.querySelector(".container form");

        isForm.scrollIntoView({
        behavior: "smooth"
      });
        
         
    
        

    });
    

    document.querySelector("#enviar").addEventListener("click", () => {

    const resultsImc = document.querySelector(".imc-results");

     resultsImc.scrollIntoView({
     behavior: "smooth"
      });

    

    const elementos = document.querySelectorAll(".everyone");

    elementos.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add("On");
        }, 400 * index);
        
    });


    

});



    
        





    



}




function animateTitle(){

    const elements = document.querySelectorAll(".sobre-mim .animate");
    const elementsPilar = document.querySelectorAll(".pilar");
    const buttonAnimate = document.querySelector(".contact-me button");


    
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.toggle("is-Active");
        }, 600 * index); // delay progressivo
    });

    setTimeout(function(){
        elementsPilar.forEach((is, index) => {
        setTimeout(() => {
            is.classList.toggle("is-Active");
        }, 700 * index); // delay progressivo
    });
    },3000);

    setTimeout(function(){

        buttonAnimate.classList.toggle("is-Active");
    
    },6000);


}

    


function clickMenu(){
    
    let mobileMenuBtn = document.querySelector(".click-call");
    let menuMobile = document.querySelector(".menu-mobile");

    mobileMenuBtn.addEventListener('click' , function(){
    
      menuMobile.classList.toggle("active");
});
}


function perfilPopUp(){
    let perfil = document.querySelector(".perfil");
    let exitBtn = document.querySelector("#exit-btn");
    let popUpNutricinista = document.querySelector(".popup-nutricionista");

    perfil.addEventListener('click' , function(){
        

        popUpNutricinista.style.display = 'flex';

    });
    exitBtn.addEventListener('click' , function(){
        

        popUpNutricinista.style.display = 'none';

    });
}

function revealOnScroll(){
    const elements = document.querySelectorAll(".scroll-animate");

    elements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if(elementTop < windowHeight - 100){
            el.classList.add("show");
        }
    });
}

const renderdata = async ()=> {
    


            

    const response = await fetch('/edit');
    const result  = await response.json();
    const content = result.data[0];
    
    document.querySelectorAll(".nome").forEach(el => {
        el.textContent = content.nome
        
    });
    
    document.querySelector("#telefone").textContent = `telefone : ${content.telefone}`;
    document.querySelector("#email").textContent = `email : ${content.email}`;
    document.querySelector("#endereco").textContent = `endereço : ${content.endereco}`;
    document.querySelector("#descricao").textContent = content.descricao;
    document.querySelectorAll(".profile").forEach( el => {
        el.src = `imagens/${content.imagem}`;
    })
    
    document.querySelector("button").addEventListener('click' , ()=> {
        window.location.href = `https://wa.me/${content.telefone}`
    })
    


    
    

      

                

    
}
renderdata()
window.addEventListener("scroll", revealOnScroll);

funcImc();
scroll();
animateTitle();
perfilPopUp();
clickMenu();
