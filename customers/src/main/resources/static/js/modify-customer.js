async function loadCustomer() {
    if(isNew()){
        return;
    }

    let id = getCustomerId();
    let customer = await getCustomerById(id);

    document.getElementById("txtFirstname").value = customer.firstName;
    document.getElementById("txtLastname").value = customer.lastName;
    document.getElementById("txtEmail").value = customer.email;
    document.getElementById("txtAddress").value = customer.address;
}

function getCustomerId() {
    let auxSplit = window.location.href.split('id=');
    return auxSplit[1];
}

async function getCustomerById(id) {
    let url = URL_SERVER + 'customer/' + id;
    let response = await fetch(url);
    return await response.json();
}

function isNew(){
    let hasIdUnURL = window.location.href.includes('id=');
    return !hasIdUnURL;
}

function clickCreate(){

    let firstname = document.getElementById("txtFirstname").value;
    let lastname = document.getElementById("txtLastname").value;
    let email = document.getElementById("txtEmail").value;
    let address = document.getElementById("txtAddress").value;

    let customer = {
        "firstName": firstname,
        "lastName": lastname,
        "email": email,
        "address": address,
    };
    save(customer);
}

async function save(customer){
    let url = URL_SERVER + 'customer';
    let methodType = isNew() ? 'POST' : 'PUT';

    if (!isNew()){
        url += '/' + getCustomerId();
    }

    let config = {
        "method": methodType,
        "body": JSON.stringify(customer),
        "headers": {
            "Content-Type": "application/json"
        }
    }
    await fetch(url, config);
    alert("Successfully saved customer!");
    window.location.href = 'customers.html';
}
loadCustomer();

