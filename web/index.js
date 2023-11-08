// alert('JS is working');

const checkPython = async ()=>{
    let text = await eel.get_text_in_python()();
    document.getElementById("text-view").innerText = text;
}

const button = document.getElementById("btn-check-python");
button.addEventListener("click", ()=>{
    checkPython();
})