let formData = {
    name: "",
    email: "",
    phone: "",
    appointmentDate: "",
    appointmentTime: ""
};

function submitFormData(formData) {
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer a61d50bd6662d263803f79cdcce525efc009ea224fb492c9b401873f829879a9"
    },
    body: JSON.stringify(formData)
  };

  let url = "https://gorest.co.in/public-api/users";

  fetch(url, options)
    .then(function(response) {
      return response.json();
    })
    .then(function(jsonData) {
      console.log(jsonData);
      if (jsonData.code === 422) {
        if (jsonData.data[0].message === "has already been taken") {
          emailErrMsgEl.textContent = "Email Already Exists";
        }
      }
    });
}

let myForm = document.getElementById("myForm");
let title = document.getElementById("title");
let name = document.getElementById("name");
let email = document.getElementById("email");
let number = document.getElementById("number");
let address = document.getElementById("address");
let date = document.getElementById("date");
let time = document.getElementById("time");
let button = document.getElementById("button");

name.addEventListener("change", function(event){
    formData.name = event.target.value;
});

email.addEventListener("change", function(event){
    formData.email = event.target.value;
});

number.addEventListener("change", function(event){
    formData.phone = event.target.value;
});

date.addEventListener("change", function(event){
    formData.appointmentDate = event.target.value;
});

time.addEventListener("change", function(event){
    formData.appointmentTime = event.target.value;
});

console.log(formData);

let errorMessage = document.getElementById("errorMessage");
let errorMessagename = document.getElementById("errorMessagename");
let errorMessageemail = document.getElementById("errorMessageemail");
let errorMessageaddress = document.getElementById("errorMessageaddress");
let errorMessagenumber = document.getElementById("errorMessagenumber");
let errorMessagedate = document.getElementById("errorMessagedate");

let capchaEle = document.getElementById("capcha");
let inputcapcha = document.getElementById("inputcapcha");
let capchamessage = document.getElementById("capchamessage");

myForm.addEventListener("submit", function(event) {
    event.preventDefault();
    submitFormData(formData);
});

title.addEventListener("blur", function(event) {
    if (event.target.value === "") {
        errorMessage.textContent = "Title can't be empty";
    } else {
        errorMessage.textContent = "";
    }
});

name.addEventListener("blur", function(event) {
    if (event.target.value === "") {
        errorMessagename.textContent = "Name can't be empty";
    } else {
        errorMessagename.textContent = "";
    }
});

email.addEventListener("blur", function(event) {
    if (event.target.value === "") {
        errorMessageemail.textContent = "Email-Id can't be empty";
    } else if (!event.target.value.endsWith("@gmail.com")) {
        errorMessageemail.textContent = "Please enter valid Email-Id";
    } else {
        errorMessageemail.textContent = "";
    }
});

// number validation
function validate() {
    let number_entered = number.value;
    let valid_number_consition = /[6-9]\d{9}/;
    if (valid_number_consition.test(number_entered)) {
        errorMessagenumber.textContent = "";
    } else {
        errorMessagenumber.textContent = "Please enter valid Number";
    }
}

number.addEventListener("blur", function(event) {
    if (event.target.value === "") {
        errorMessagenumber.textContent = "Number Column can't be left Empty";
    } else {

        validate();
    }
});


address.addEventListener("blur", function(event) {
    if (event.target.value === "") {
        errorMessageaddress.textContent = "Address can't be empty";
    } else {
        errorMessageaddress.textContent = "";
    }
});


// past date disable
let todays_date = new Date();
let year = todays_date.getFullYear();
let month = todays_date.getMonth() + 1;
if (month < 10) {
    month = "0" + month;
}
let day = todays_date.getDay();
if (day < 10) {
    day = "0" + day;
}
let current_date = `${year}-${month}-${day}`;
date.setAttribute("min", current_date);


date.addEventListener("blur", function(event) {
    if (event.target.value === "") {
        errorMessagedate.textContent = "Please Enter Valid Date";
    } else {
        errorMessagedate.textContent = "";
    }
});

// capcha initialization

function capcha() {
    var alpha = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    let a = alpha[Math.floor(Math.random() * 26)];
    let b = alpha[Math.floor(Math.random() * 26)];
    let c = alpha[Math.floor(Math.random() * 26)];
    let d = alpha[Math.floor(Math.random() * 26)];
    let e = alpha[Math.floor(Math.random() * 26)];
    let f = alpha[Math.floor(Math.random() * 26)];
    let final_capcha = a + b + c + d + e + f;
    capchaEle.value = final_capcha;
}

function onSubmit() {
    let chapchaString = capchaEle.value;
    let enteredCapcha = inputcapcha.value;
    if (chapchaString === enteredCapcha) {
        if (title.value !== "" && name.value !== "" && email.value !== "" && number.value !== "" && address.value !== "" && date.value !== "") {
            window.location = "https://appointmntadd.ccbp.tech/";
        } else {
            capchamessage.textContent = "Some Credentials did not added";
        }

    } else {
        if (enteredCapcha === "") {
            capchamessage.textContent = "Capcha can't be blank";
        } else {
            capchamessage.textContent = "Invalid Capcha";
        }
    }
    capcha();
}


capcha();  