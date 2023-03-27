const _URL = window.env.url_api()

window.onload = () => {
    const deviceInput = document.querySelector('.device-name')
    deviceInput.value = devices.name()
    const userInput= document.querySelector('.user-name')
    const form = document.querySelector('form')
    const editIcon = document.querySelector('.icon-pencil')

    if(!form || !deviceInput || !editIcon || !userInput){
        alert('Erro no elemento')
        window.windowState.error('Erro no elemento')
        throw new Error('Element not found')
    }

    
    form.onsubmit = (e) => {
        e.preventDefault()
        
        if(deviceInput.value === "" || userInput.value === ""){
            alert('Preencha os campos corretamente')
            throw new Error('Invalid Inputs')
        }

        sendData({
            nome: deviceInput.value,
            usuario: userInput.value
        })
        
    }

    editIcon.addEventListener('click', () => {
        deviceInput.removeAttribute('readonly')
    })

}


const sendData = async(data) => {
    try{
        const {token} = await window.axios.register(data)
        registerDone()
        setTimeout(() => {
            window.windowState.closeWindow(token)
        },10000)
    }catch(e){
        window.windowState.error(JSON.stringify(e))
        alert(`Error no servidor: ${e.message}`)
        throw new Error('Could not send data')
    }
}


const registerDone = () => {

    const main = document.querySelector('main')
    const div = document.querySelector('.authorization-done')

    if(!main || !div){
        window.windowState.error('Erro no elemento do registro')
        alert('Erro no elemento do registro')
        throw new Error('Element not found')
    }
    
    main.className = main.className.concat('hidden')
    div.className = div.className.replace('hidden', '')
} 

