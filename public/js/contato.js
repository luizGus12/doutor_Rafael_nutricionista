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

const sendInfo = async(e) => {
    e.preventDefault();

    const nome = document.querySelector("#nome").value;
    const email = document.querySelector("#email").value;
    const telefone = document.querySelector("#telefone").value;
    const mensagem = document.querySelector("#mensagem").value;

    const response = await fetch("/contato" , {

        method: "POST",
        headers : {
            "content-type" : "application/json"
        },
        body : JSON.stringify({
            nome,
            email,
            telefone,
            mensagem

        })

        


    })
    const data = await response.json();
    document.querySelector("#msg").textContent = data.msg;

    localStorage.setItem(
        "token" , data.token
    );


}

document.querySelector("#enviar").addEventListener('click' , sendInfo)



const renderdata = async ()=> {
    


            

    const response = await fetch('/edit');
    const result  = await response.json();
    const content = result.data[0];
    
    document.querySelectorAll(".nome").forEach(el => {
        el.textContent = content.nome
        
    });
    
    document.querySelector(".telefone").textContent = `telefone : ${content.telefone}`;
    document.querySelector(".email").textContent = `email : ${content.email}` ;
    document.querySelector("#endereco").textContent = `endereço : ${content.endereco}` ;
    document.querySelector("#descricao").textContent = content.descricao;
    document.querySelectorAll(".profile").forEach( el => {
        el.src = `imagens/${content.imagem}`;
    })
    
    


    
    

      

                

    
}
renderdata()

perfilPopUp();
clickMenu();
