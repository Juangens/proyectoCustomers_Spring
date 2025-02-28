function init() {
    renderCustomers();
}

async function getCustomers() {
    let url = URL_SERVER + 'customer';
    let response = await fetch(url);
    return await response.json();
}

async function renderCustomers() {
    let customers = await getCustomers();
    console.log("Clientes recibidos:", customers);
    let html = "";
    for (let customer of customers) {
        html += getHtmlRowCustomer(customer);
    }
    let tbody = document.getElementById("tbody-customers");
    tbody.innerHTML = html;
}


async function onClickRemove(id){
    let response = confirm("Seguro?")
    if (!response){
        return;
    }

    let url = URL_SERVER + 'customer/' + id;
    let config = {
        method: 'DELETE',
    }
    await fetch(url, config);
    await renderCustomers();
}
async function onClickEdit(id){
    window.location.href = 'modify-customer.html?id=' + id;
}

function getHtmlRowCustomer(customer) {
    return `
            <tr>
                <td>${customer.id}</td>
                <td>${customer.firstName} ${customer.lastName}</td>
                <td>${customer.address}</td>
                <td>${customer.email}</td>
                <td> 
                    <a href="#" onclick="onClickRemove(${customer.id})" class="btn btn-danger btn-circle btn-sm">
                    <i class="fas fa-trash"></i></a>
                    <a href="#" onclick="onClickEdit(${customer.id})" class="btn btn-primary btn-circle btn-sm">
                        <i class="fas fa-edit"></i>
                    </a>
            </td>
            </tr>
    `
}

init();