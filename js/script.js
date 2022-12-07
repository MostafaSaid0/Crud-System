var productName = document.getElementById("productNameInput");
var productCategory = document.getElementById('productCategoryInput');
var productPrice = document.getElementById('productPriceInput');
var productDesc = document.getElementById('productDescription');
var searchInput = document.getElementById('search');
var addProductBtn = document.getElementById('AddProduct')

var currentIndex = 0;

// create

if(localStorage.getItem("allProduct")== null){
    var containerProduct = [];
}else{
    containerProduct = JSON.parse(localStorage.getItem("allProduct"))
    displayForm()
}

addProductBtn.onclick = function(){
    if ( validatePname() == true && productCategory.value!='' && productPrice.value !='' && productDesc.value !='' ){
        if(addProductBtn.innerHTML == "Add Product"){
            createProduct()
        }else{
            updateProduct()
        }
        localStorage.setItem('allProduct',JSON.stringify(containerProduct));
        displayForm();
        clearForm();
        console.log(containerProduct);
    }else{
        alert('Please write the first Character of name is Capital')
    }
    
}

function createProduct(){
    var product={
        pName : productName.value,
        pCategory :productCategory.value,
        pPrice : productPrice.value,
        pDesc : productDesc.value,
    }
    containerProduct.push(product);

}


function getProductInfo(indexedDB){
    currentIndex = indexedDB;
    productName.value = containerProduct[indexedDB].pName;
    productCategory.value = containerProduct[indexedDB].pCategory;
    productPrice.value = containerProduct[indexedDB].pPrice;
    productDesc.value = containerProduct[indexedDB].pDesc;
    addProductBtn.innerHTML = 'Update Product'
    
}

// update product
function updateProduct(){
    var product={
        pName : productName.value,
        pCategory :productCategory.value,
        pPrice : productPrice.value,
        pDesc : productDesc.value,
    }
    containerProduct[currentIndex] = product;
    addProductBtn.innerHTML = "Add Product"
    
}
// clear

function clearForm(){
    productName.value = '';
    productCategory.value = '';
    productPrice.value = '';
    productDesc.value = '';
}

// display

function displayForm(){
    var trs='';
    for(var i=0;i<containerProduct.length;i++){
        trs+=`<tr>
        <th>${i+1}</th>
        <td>${containerProduct[i].pName}</td>
        <td>${containerProduct[i].pCategory}</td>
        <td>${containerProduct[i].pPrice}</td>
        <td>${containerProduct[i].pDesc}</td>
        <td>
            <button id='updateBtn' onclick='getProductInfo(${i})' class="btn btn-success"><i class="fa-solid fa-edit"></i></button>
        </td>
        <td>
            <button onclick='deleteForm(${i})' class="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
        </td>
    </tr>`
    }
    document.getElementById('bodyTable').innerHTML=trs
}

// delete
function deleteForm(indexedDB){
    containerProduct.splice(indexedDB,1);
    localStorage.setItem("allProduct",JSON.stringify(containerProduct))
    displayForm();
}

// search 

function searchForm(){
    var trs='';
    for(var i=0;i<containerProduct.length;i++){
    if(containerProduct[i].pName.toLowerCase().includes(searchInput.value.toLowerCase())|| 
    containerProduct[i].pCategory.toLowerCase().includes(searchInput.value.toLowerCase()))
    {
        trs+=`<tr>
        <th>${i+1}</th>
        <td>${containerProduct[i].pName}</td>
        <td>${containerProduct[i].pCategory}</td>
        <td>${containerProduct[i].pPrice}</td>
        <td>${containerProduct[i].pDesc}</td>
        <td>
            <button class="btn btn-success"><i class="fa-solid fa-edit"></i></button>
        </td>
        <td>
            <button onclick='deleteForm(${i})' class="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
        </td>
    </tr>`
    }
    }
    document.getElementById('bodyTable').innerHTML=trs
    console.log(searchInput.value)
    
}
// validation

function validatePname(){
    var nameRegx = /^[A-Z][a-z]{3,20}$/;
    var name = productName.value;
    if ( nameRegx.test(name) == true){
        return true
    }else{
        return false
    }
}























// let container = document.querySelector('div')
// let counter = 0 ;

// let x = setInterval(createElement,500)
// function createElement(){
//     let myImg = document.createElement('img')
//     myImg.setAttribute('src',"../img/chicken-game.png")
//     container.append(myImg);
//     counter++;
//     if ( counter == 20){
//         clearInterval(x)
//     }
// }
// createElement()
