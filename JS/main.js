const speaker=window.speechSynthesis;

const  mainform=document.querySelector('#main-form')
const  input=document.querySelector('#input')
const  rate=document.querySelector('#rate')
const  rlabel=document.querySelector('#rate-input')
const  plabel=document.querySelector('#pitch-input')
const  pitch=document.querySelector('#pitch')
const  voice=document.querySelector('#voice')
const  bn=document.querySelector('#speak')
const body=document.querySelector('.holder')
const icon=document.querySelector('.icon')

let voices=[];

const getVoices=()=>{
    voices=speaker.getVoices();
    voices.forEach((v)=>{
        const option=document.createElement('option');
        option.textContent=`${v.name} (${v.lang})`
        option.setAttribute('data-name',v.name)
        voice.appendChild(option)

    });
    
}

if(speaker.onvoiceschanged !== undefined){
    speaker.onvoiceschanged=getVoices;
}

const speak=()=>{

    if(speaker.speaking)
        return;
    
    if(input.value==="")
    return;

    const speak_Object=new SpeechSynthesisUtterance(input.value);

    let selected_voice=voice.options[voice.selectedIndex].getAttribute('data-name');

    voices.forEach((v)=>{
        if(v.name===selected_voice){
            speak_Object.voice=v;
        }
    })

    speak_Object.rate=rate.value;
    speak_Object.pitch=pitch.value;


    speaker.speak(speak_Object);
    bn.textContent="Speaking..."
    bn.classList.add('bg-primary')
    body.style=`
        background:black url(YdBO.gif);
        background-size:contain;
        background-repeat:repeat;
    `
    icon.style=`
        font-size:50px;
        color:blue;
        transition:.5s;
    `

    speak_Object.onend = (e)=>{
        bn.textContent="Speak"
        body.style=`
        background:black ;
    `
    icon.style=`
        font-size:100px;
        color:white;
        transition:.5s;
    `
    bn.classList.remove('bg-primary')
    }
}

bn.addEventListener('click',(e)=>{
    e.preventDefault();
    console.log("12")
    console.log()
    speak();
})

rate.addEventListener('change',()=>{
    rlabel.textContent=rate.value;


})
pitch.addEventListener('change',()=>{
    plabel.textContent=pitch.value;


})
