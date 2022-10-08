const form = document.forms['form'];

let productionDate;
let manufactureTime;
let productName;
let responsibleName;
let selectedPackage;
let selectedType;
let productId;
let products = [];
let products2= ["uva", "pera", "manzana"];
let targetId;
let targetIdActionsTable;
let targetProduct;
let autoIncrement = 1;
let flagEditButton= 0; 

showTime();

$(document).ready(function() { // esta función es para evitar que haya problemas con alguna etiqueta html antes de ejecutar la consulta
    $("#save_product").click(function() {
        selectedType = $('[name="type"]').val();
        // $("#p1").text(products);
    });

});

$(document).click(function(event) { //función para saber a qué elemento se le dio click
    targetIdActionsTable = $(event.target).text(); //investigar sobre text()
    let evento = event.target;
    console.log(targetIdActionsTable);
    console.log(evento);
});

form.onsubmit = function(e){
    
    e.preventDefault();
    console.log(e.submitter.id);  
    // createProduct();
    // console.log(products);
    // $("#p1").text(JSON.stringify(products)); // 'convertir' un objeto o JSON en string

    if (e.submitter.id === "save_product") {
        // createProduct((autoIncrement.toString()));
        createProduct(autoIncrement);
        console.log(products);
        // $("#p1").text(JSON.stringify(products)); // 'convertir' un objeto o JSON en string
        autoIncrement = autoIncrement + 1;
        renderDataInTheTable(products);
    } else {
        targetId = parseInt(document.getElementById("edit_input").value);
        const index = products.findIndex(product => product.id === targetId);

        if (index === -1){
            alert("No existe ningún producto con ese Id");
            throw new Error(message="no se encontró el producto");
            
        } else {
            targetProduct = products[index]; // esto es redundante, la logica de este metodo debe ser revisada
            console.log(targetProduct);
        
            let editedProduct = editProduct(targetId);
            editProductById(targetId, editedProduct, products);
            console.log(products);
            // $("#p1").text(JSON.stringify(products)); // 'convertir' un objeto o JSON en string
            renderDataInTheTable(products);
            $("#save_product").toggle();
            $("#save_changes").toggle();
            flagEditButton = 0;
            form.reset(); // una forma de limpiar los campos
        }
    }
}

// form.onsubmit = function(e){  //onsibmit and onclick obsoletos (DOM0), usar addeventlistener
//     e.preventDefault();
//     createProduct();
//     console.log(products);
//     $("#p1").text(JSON.stringify(products)); // 'convertir' un objeto o JSON en string
// }

// $("#save_product").click(function() { 
//     createProduct();

//     console.log(products);

//     $("#p1").text(JSON.stringify(products)); // 'convertir' un objeto o JSON en string
// });

$("#edit_button").click(function() {
    
    if (flagEditButton === 0){
        
        flagEditButton= 1;
        // document.getElementById("save_changes_button").hidden =false; 
        if (products.length === 0){
            alert("La lista de productos está vacia");
            throw new Error(message="Arreglo de productos vacio");

        } else{
            $("#save_product").toggle();
            $("#save_changes").toggle();
        }    
        // $("#product_name").text("hhhh");
        // document.getElementById("product_name").text(targetProduct.productName);
        // document.getElementById("responsible_name").text(targetProduct.responsibleName);
        // document.getElementsByName("type").text(targetProduct.type);
    } else {
        alert("Debe terminar la edición actual antes de una nueva edición");
        throw new Error(message="Edición de producto sin terminar");
    }
});

$("#delete_button").click(function() {
    
    targetId = document.getElementById("delete_input").value;
    deleteProductById(parseInt(targetId), products); // falta pedir confirmación para eliminar
    console.log(products);
    renderDataInTheTable(products);
});

// $(".span--edit").click(function() { // se debe usar una promesa
 
//     // $("#save_product").toggle();
//     // $("#save_changes").toggle();

//     arraySpan = document.getElementsByClassName("span--edit");
//     // targetId = $(event.target).text();
//     // arraySpan.forEach() //posible solución: posición de la tabla -1 para compar con el indice en el arreglo
//     // console.log(targetId);
//     // $("#p1").text(targetId);
//     // let editedProduct = editProduct(parseInt(targetId));
//     // editProductById(targetId, editedProduct, products);
//     // console.log(products);
//     // renderDataInTheTable(products);
//     // console.log(targetIdActionsTable);
//     // $("#p1").text(targetIdActionsTable);
//     // let editedProduct = editProduct(parseInt(targetIdActionsTable));
//     // editProductById(targetIdActionsTable, editedProduct, products);
//     // console.log(products);
//     // renderDataInTheTable(products);

// });
    

// $("#edit_button").click(function() {
//     document.getElementById("#save_changes_button").hidden = "false";
//     document.getElementById("#save_product").hidden = "true";
// });

// form.onsubmit = function(e){
    
//     e.preventDefault();

//     $("#save_product").click(function() {
//         createProduct();
//         console.log(products);
//         $("#p1").text(JSON.stringify(products)); // 'convertir' un objeto o JSON en string
//     });
    
//     $("#save_changes").click(function() {
//         console.log(products);
//         $("#p1").text("editando");
//     });
// }

function showTime(){
    let date = new Date();
    let h = date.getHours(); // 0 - 23
    let m = date.getMinutes(); // 0 - 59
    let s = date.getSeconds(); // 0 - 59
    let session = "AM";
    
    if(h == 0){
        h = 12;
    }
    
    if(h > 12){
        h = h - 12;
        session = "PM";
    }
    
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;
    
    productionDate = h + ":" + m + ":" + s + " " + session;
    // document.getElementById("clock_display").innerText = productionDate;
    // document.getElementById("clock_display").textContent = productionDate;
    
    setTimeout(showTime, 1000);
}

let timerVar = setInterval(countTimer, 1000);
let totalSeconds = 0;
function countTimer() {
    ++totalSeconds;
    let hour = Math.floor(totalSeconds /3600);
    let minute = Math.floor((totalSeconds - hour*3600)/60);
    let seconds = totalSeconds - (hour*3600 + minute*60);
        
    if(hour < 10) {
        hour = "0"+hour;
    }    
        
    if(minute < 10) {
        minute = "0"+minute;
    }
        
    if(seconds < 10) {
        seconds = "0"+seconds;
        document.getElementById("timer").innerHTML = hour + ":" + minute + ":" + seconds;
    }

    manufactureTime = hour + ":" + minute + ":" + seconds;
}
    

function createProduct(id){
    productId = id;
    productName = document.getElementById("product_name").value;
    responsibleName = document.getElementById("responsible_name").value;
    selectedPackage = document.form.packages.value;
    selectedType = $('[name="type"]').val();   
    
    // no funciona de esta forma, investigar el porqué
    // let selectedType; 
    // $(document).ready(function(){

    //     selectedType = $('[name="type"]').val();      
    
    // });

    //console.log(productName + " " + responsibleName + " " + selectedPackage + " " + selectedType + " " + productionDate);

    let product = {
        id: productId,
        name: productName,
        type: selectedType,
        date: productionDate,
        responsible: responsibleName,
        manufacture: manufactureTime, 
        package: selectedPackage,
    };
    
    console.table(product);

    products = [...products, product];
}

function editProduct(targetId){
    productName = document.getElementById("product_name").value;
    responsibleName = document.getElementById("responsible_name").value;
    selectedPackage = document.form.packages.value;
    selectedType = $('[name="type"]').val();   
    
    // no funciona de esta forma, investigar el porqué
    // let selectedType; 
    // $(document).ready(function(){

    //     selectedType = $('[name="type"]').val();      
    
    // });

    //console.log(productName + " " + responsibleName + " " + selectedPackage + " " + selectedType + " " + productionDate);

    let product = {
        id : targetId,
        name: productName,
        type: selectedType,
        date: productionDate,
        responsible: responsibleName,
        manufacture: manufactureTime, 
        package: selectedPackage,
    };
    
    return product;
}

function deleteProductById(id, productsList=[]){
    const index = productsList.findIndex(product => product.id === id);
    //const index = productsList.findIndex(product => product === id);
    if (index === -1){
        alert("No existe ningún producto con ese Id");
        throw new Error(message="no se encontró el producto");
        
    } else {
        productsList.splice(index, 1);
        alert("Producto eliminado exitosamente");
    }

}

function editProductById(id, editedProduct, productsList=[]){
    const index = productsList.findIndex(product => product.id === id);        

    products.splice(index, 1, editedProduct);
    alert("Producto modificado exitosamente");
}

function editByIcon(targetId){
    console.log(targetId);
    $("#p1").text(targetId);
    let editedProduct = editProduct(parseInt(targetId));
    editProductById(targetId, editedProduct, products);
    console.log(products);
    renderDataInTheTable(products);
    cleanFormField();
}

function deleteByIcon(targetId){
    deleteProductById(parseInt(targetId), products); // falta pedir confirmación para eliminar
    console.log(products);
    renderDataInTheTable(products);

}   

// Duplica el contenido en cada llamado revisar logica
function renderDataInTheTable(products){
    let mytable = document.getElementById("html-data-table");
    // la siguiente linea soluciona el problema de duplicados
    mytable.innerHTML = "<thead><tr><th>Editar</th><th>Borrar</th><th>ID</th><th>Nombre producto</th><th>Tipo de producto</th><th>Fecha de producción</th><th>Operario Responsable</th><th>Tiempo de producción</th><th>Tipo de empaque</th></tr></thead>"
    products.forEach(product => {
        let newRow = document.createElement("tr");
        let cellSpanEdit = document.createElement("td");
        cellSpanEdit.innerHTML = `<span class="material-symbols-outlined"" onclick="editByIcon(${product.id})">edit_note</span>`
        newRow.appendChild(cellSpanEdit);
        let cellSpanDelete = document.createElement("td");
        cellSpanDelete.innerHTML = `<span class="material-symbols-outlined" onclick="deleteByIcon(${product.id})">delete</span>`
        newRow.appendChild(cellSpanDelete);

        Object.values(product).forEach((value) => {
            let cell = document.createElement("td");
            cell.innerText = value;
            newRow.appendChild(cell);
        })
        mytable.appendChild(newRow);
    });
}

function findElementClick() {
    let text;

    $(document).click(function(event) { //función para saber a qué elemento se le dio click
        text = $(event.target).text(); //investigar sobre text()
        let evento = event.target;
        // console.log(text);
        // console.log(evento);
    });

    return text;
}

function cleanFormField(){ // se puede hacer con un queryselector
    let product = document.getElementById("product_name");
    product.value=""; 
    let responsible = document.getElementById("responsible_name");
    responsible.value="";
    $('[name="type"]').val("");

}

// https://codepen.io/afarrar/pen/JRaEjP
// https://stackoverflow.com/questions/18239430/cannot-set-property-innerhtml-of-null
// https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript
// https://bobbyhadz.com/blog/javascript-clear-input-field-after-submit
