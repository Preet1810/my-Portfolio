// const canvas=document.getElementById('canvas'),
//     context=canvas.getContext('2d');


// make_base();

// function make_base() {
//     base_image=new Image();
//     base_image.src='https://i.pinimg.com/originals/c9/f2/5c/c9f25cd1e26a0c7528480848ad9b8e69.gif';
//     context.drawImage(base_image, 200, 100);
// }

const contactForm=document.querySelector('.contact-form');
let Sendername=document.getElementById('name');
let email=document.getElementById('email');
let message=document.getElementById('message');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let formData={
        name: Sendername.value,
        email: email.value,
        subject: 'YOUR SITE',
        message: message.value

    }

    let xhr=new XMLHttpRequest();
    xhr.open('POST', '/');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onload=function () {
        console.log(xhr.responseText);
        if (xhr.responseText=='success') {
            alert('Email Sent');
            Sendername.value='';
            email.value='';
            subject.value='';
            message.value='';
        } else {
            alert('Something Went Wrong!')
        }
    }

    xhr.send(JSON.stringify(formData))

})


