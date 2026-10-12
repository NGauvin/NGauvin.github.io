let mode = "fv";

// Future Value Tab
document.getElementById("btn-fv").onclick = () => {
    mode = "fv";
    document.getElementById("btn-fv").classList.add("active");
    document.getElementById("btn-pv").classList.remove("active");
    document.getElementById("lbl-amount").innerHTML = "Present Value ($)";
    calculate();
};

// Present Value Tab
document.getElementById("btn-pv").onclick = () => {
    mode = "pv";
    document.getElementById("btn-pv").classList.add("active");
    document.getElementById("btn-fv").classList.remove("active");
    document.getElementById("lbl-amount").innerHTML = "Future Value ($)";
    calculate();
};

// Input Boxes
document.getElementById("txt-amount").onkeyup = () => {
    calculate();
};

document.getElementById("txt-rate").onkeyup = () => {
    calculate();
};

document.getElementById("txt-years").onkeyup = () => {
    calculate();
};

// Calculate Result
const calculate = () => {
    const amount = parseFloat(document.getElementById("txt-amount").value);
    const rate = parseFloat(document.getElementById("txt-rate").value);
    const years = parseInt(document.getElementById("txt-years").value);
    const result = document.getElementById("tvm-result");
    const formula = document.getElementById("result-formula");

    if(amount >= 0 && rate >= 0 && years >= 0 && years <= 100){
        const r = rate / 100;

        let growth = 1;
        for(let i = 0; i < years; i++){
            growth = growth * (1 + r);
        }

        if(mode == "fv"){
            const fv = amount * growth;
            result.innerHTML = "$" + fv.toFixed(2);
            formula.innerHTML = `FV = ${amount} &times; (1 + ${r})<sup>${years}</sup>`;
        } else {
            const pv = amount / growth;
            result.innerHTML = "$" + pv.toFixed(2);
            formula.innerHTML = `PV = ${amount} / (1 + ${r})<sup>${years}</sup>`;
        }

        document.getElementById("result-rate").innerHTML = `Rate: ${rate}% per yr`;
        document.getElementById("result-period").innerHTML = `Period: ${years} yrs`;
        showTimeline(years);
    } else {
        result.innerHTML = "Enter valid numbers";
        formula.innerHTML = "";
        document.getElementById("result-rate").innerHTML = "Rate: -";
        document.getElementById("result-period").innerHTML = "Period: -";
        document.getElementById("timeline").innerHTML = "";
    }
};

// Timeline
const showTimeline = (years) => {
    const timeline = document.getElementById("timeline");
    timeline.innerHTML = "";

    if(years <= 10){
        for(let i = 0; i <= years; i++){
            timeline.append(createNode(i));
        }
    } else {
        timeline.append(createNode(0));
        timeline.append(createNode(years));
    }
};

const createNode = (year) => {
    const div = document.createElement("div");
    div.classList.add("timeline-node");
    div.innerHTML = `<span class="node-yr">${year}</span>`;
    return div;
};

calculate();