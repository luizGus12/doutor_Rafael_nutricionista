const autentication = async(e)=>{
    e.preventDefault()

    const user = document.querySelector("#user").value;
    const password = document.querySelector("#password").value;

    const response = await fetch("/login" , {
        method : "POST",
        headers : {
            "content-type" : "application/json"
        },
        body : JSON.stringify({
            user,
            password
        })
    })

    const data = await response.json();
    // document.querySelector("#msg").textContent = data.msg;

    if(!response.ok){
            document.querySelector("#msg").textContent = data.msg;
            return;
        }

        localStorage.setItem(
            "token",
            data.token
        );

        window.location.href = "/admin";

    
}

document.querySelector("#enviar").addEventListener('click' , autentication);
