const _URL = window.location.href

window.onload = () => {
    const deviceInput = document.querySelector('.device-name')
    insertMachineData(deviceInput);

    const userInput= document.querySelector('.user-name')
    const form = document.querySelector('form')
    const editIcon = document.querySelector('.icon-pencil')

    if(!form || !deviceInput || !editIcon || !userInput){
        alert('Erro no elemento')
        throw new Error('Element not found')
    }

    
    form.onsubmit = (e) => {
        e.preventDefault()
        
        if(deviceInput.value === "" || userInput.value === ""){
            alert('Preencha os campos corretamente')
            throw new Error('Invalid Inputs')
        }

        sendData({
            deviceName: deviceInput.value,
            user: userInput.value
        })
    
    }

    editIcon.addEventListener('click', () => {
        deviceInput.removeAttribute('readonly')
    })

}


const insertMachineData = async (element) => {
    const {data} = await axios.get(_URL.concat('data'));
    element.value = data.deviceInfo.hostname
}

const registerDone = () => {

    const main = document.querySelector('main')
    const div = document.querySelector('.authorization-done')

    if(!main || !div){
        alert('Erro no elemento do registro')
        throw new Error('Element not found')
    }
    
    main.className = main.className.concat('hidden')
    div.className = div.className.replace('hidden', '')
} 


const closeServer = async () => {
    await axios.post(_URL.concat('close'), {});
    window.close();
}

const sendData = async(data) => {
    try{
        await axios.post(_URL.concat('register'),data)
        console.log('Request sended')
        registerDone()
        setTimeout(() => {
            closeServer()
        },10000)
    }catch(e){
        console.log(e)
        alert(`Error no servidor: ${e.response.data}`)
    }
}