//send the form info to web3forms so it emails me
const sendEmail = async(json) => {
    const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers:{
            "Content-Type":"application/json",
            Accept:"application/json"
        },
        body:json
    });

    return response;
};

document.getElementById("contact-form").onsubmit = async(e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    const result = document.getElementById("result");

    result.classList.remove("result-success");
    result.classList.remove("result-error");
    result.innerHTML = "Sending...";

    try {
        const httpResult = await sendEmail(json);

        if(httpResult.status == 200){
            result.innerHTML = "Thanks! Your message was sent.";
            result.classList.add("result-success");
            form.reset();
        } else {
            result.innerHTML = "Sorry, your message wasn't sent. Please try again.";
            result.classList.add("result-error");
        }
    } catch(error) {
        console.log(error);
        result.innerHTML = "Sorry, your message couldn't be sent. Please try again.";
        result.classList.add("result-error");
    }

    //wait a bit before hiding the message so it doesn't flicker
    setTimeout(() => {
        result.innerHTML = "";
        result.classList.remove("result-success");
        result.classList.remove("result-error");
    }, 1500);
};