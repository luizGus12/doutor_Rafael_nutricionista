const container =
document.querySelector("#container-msg");

const modal =
document.querySelector("#modal");

const fechar =
document.querySelector("#fechar");

async function carregarMensagens(){

    try{

        const response =
        await fetch("/contato");

        const mensagens =
        await response.json();

        document.querySelector(
            "#total-msg"
        ).textContent =
        mensagens.length;

        container.innerHTML = "";

        mensagens.forEach(msg=>{

            container.innerHTML += `
            
            <div class="msg-card">

                <div>

                    <h4>${msg.nome}</h4>

                    <p>${msg.email}</p>

                </div>

                <button
                onclick='abrirMensagem(
                ${JSON.stringify(msg)}
                )'>
                Ler
                </button>

            </div>
            `;
        });

    }
    catch(error){

        console.log(error);

    }

}

window.abrirMensagem =
function(msg){

    modal.style.display = "flex";

    document.querySelector(
        "#modal-nome"
    ).textContent =
    msg.nome;

    document.querySelector(
        "#modal-email"
    ).textContent =
    msg.email;

    document.querySelector(
        "#modal-telefone"
    ).textContent =
    msg.telefone;

    document.querySelector(
        "#modal-msg"
    ).textContent =
    msg.mensagem;
    document.querySelector("#delete-btn").setAttribute("onclick" , `remove('${msg._id}')`);
    document.querySelector("#btn-whatsapp").setAttribute("href" , `https://wa.me/${msg.telefone}`);

}

async function remove(id) {
    
    const response = await fetch(`/contato/${id}` , {
        method : "DELETE"
    })
    // const data = await response.json()
    // document.querySelector("#del-msg").textContent = data.msg;
    carregarMensagens()
    
}

fechar.addEventListener(
"click",
()=>{
modal.style.display="none";
}
);

const editFront = ()=> {

    document.querySelector(".cards").style.display = "none";
    document.querySelector(".mensagens").style.display = "none";
    document.querySelector("#menu-editar").style.background = "#1E5CD9";
    document.querySelector(".editar-site").style.display = "flex";
    document.querySelector(".active").style.backgroundColor = "#0F172A";
    document.querySelector("#menu-mensagens").style.backgroundColor = "#0F172A";



}

const readmessages = ()=>{

    document.querySelector(".cards").style.display = "grid";
    document.querySelector(".mensagens").style.display = "block";
    document.querySelector("#menu-mensagens").style.background = "#1E5CD9";
    document.querySelector(".active").style.backgroundColor = "#0F172A";
    document.querySelector("#menu-editar").style.backgroundColor = "#0F172A";
    document.querySelector(".editar-site").style.display = "none";

}

const logout = async ()=> {

    await fetch('/logout' , {
        method : 'POST',
    });
    window.location.href = "/login";
    
}

document.querySelector("#menu-editar").addEventListener('click' , editFront)
document.querySelector("#menu-mensagens").addEventListener('click' , readmessages)
document.querySelector("#logout").addEventListener('click' , logout)


const editContact = async (e)=> {
    e.preventDefault()

    try{
            

    // const arquivo = document.querySelector("#foto-perfil").files[0];
    // const imagem = arquivo ? arquivo.name : "";
    const imagem = "perfil.jpg"
    const nome = document.querySelector("#nome-medico").value;
    const descricao = document.querySelector("#sobre-medico").value ;
    const telefone = document.querySelector("#telefone").value ;
    const instagram = document.querySelector("#instagram").value ;
    const email = document.querySelector("#email").value ;
    const endereco = document.querySelector("#endereco").value ;


    await fetch(`/edit/6a29d33bde3dbc47d44a4545` , {
        method : "PUT",
        headers : {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
                imagem ,
                nome  , 
                descricao ,
                telefone ,
                instagram ,
                email  , 
                endereco 
        })

    })
    

    const arquivo = document.querySelector("#foto-perfil").files[0];
    if(!arquivo){
        alert("envie um arquivo válido!")
        return;
    }
    
    const formData = new FormData();
    formData.append("image" , arquivo);
    console.log("enviando arquivo")
    const response = await fetch('/imagem' , {
        method : 'POST',
        body : formData 
    });
    
    alert("está funcionando")

    }catch(error){
        console.log(error)
    }


                

    
}
document.querySelector("#btn-send").addEventListener('click' , editContact)

const fillUpform = async ()=> {
    


            

    const response = await fetch('/edit');
    const result  = await response.json();
    const content = result.data[0];
    
    const nome = document.querySelector("#nome-medico").value = content.nome;
    const descricao = document.querySelector("#sobre-medico").value = content.descricao ;
    const telefone = document.querySelector("#telefone").value = content.telefone ;
    const instagram = document.querySelector("#instagram").value = content.instagram;
    const email = document.querySelector("#email").value = content.email ;
    const endereco = document.querySelector("#endereco").value = content.endereco;


    
    

      

                

    
}
fillUpform()

carregarMensagens();
