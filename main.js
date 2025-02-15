let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");


let mode="Create";
let tmp;

//1-Get Total
function getTotal() {
  if (price.value !="") {

    let result = (+price.value + +taxes.value + +ads.value) - +discount.value;

    total.innerHTML = result;
    total.style.background="#040"
  }else{
    total.innerHTML = "";
    total.style.background="#9f0a0a"
  }

}


//2-Create Product
let dataPro;

if(localStorage.Product != null){
  dataPro=JSON.parse(localStorage.Product);
}else{
  dataPro=[];
}


submit.onclick=function(){
  let newPro={
    title:title.value.toLowerCase(),
    price:price.value,
    taxes:taxes.value,
    ads:ads.value,
    discount:discount.value,
    total:total.innerHTML,
    count:count.value,
    category:category.value.toLowerCase(),
  }
 
  if(title.value !="" &&
    price.value !="" &&
    category.value !="" &&
     newPro.count<100){
    if(mode ==="Create"){
    //6-Count 
  if(newPro.count>1){
    for(let i=0;i<newPro.count;i++){
      dataPro.push(newPro);

    }
  }else{
    dataPro.push(newPro);
  }
}else{
   dataPro[tmp]=newPro;
   mode="Create";
   submit.innerHTML="Create"
   count.style.display="block";
}
clearData();
  }else{

  }


  //Svae Product in localStorage
  localStorage.setItem("Product",JSON.stringify(dataPro))
  console.log(dataPro);


  showData();
}


//3-Clear Inputs
function clearData(){
  title.value="";
  price.value="";
  taxes.value="";
  ads.value="";
  discount.value="";
  total.innerHTML="";
  count.value="";
  category.value="";
}

//4-Read Product

function showData(){
  getTotal();

  let table= ``;
  for(let i=0;i<dataPro.length;i++){
    table += `
     <tr>
              <td>${i+1}</td>
              <td>${dataPro[i].title}</td>
              <td>${dataPro[i].price}</td>
              <td>${dataPro[i].taxes}</td>
              <td>${dataPro[i].ads}</td>
              <td>${dataPro[i].discount}</td>
              <td>${dataPro[i].total}</td>
              <td>${dataPro[i].category}</td>
              <td><button onclick="updateData(${i})" id="update">update</button></td>
              <td><button onclick="deleteData(${i}) " id="delete">delete</button></td>
            </tr>
    `
  }

  document.getElementById("tbody").innerHTML=table;

  let btnDelete=document.getElementById("deletAll");
  if(dataPro.length > 0){
    btnDelete.innerHTML=`
      <button onclick="deletAll()">Delete All(${dataPro.length})</button>
    `
  }else{
    btnDelete.innerHTML='';
  }

}
showData();



//5- Delete Product
function deleteData(id)
{

  dataPro.splice(id,1);
  localStorage.Product=JSON.stringify(dataPro);
  showData();
}

function deletAll(){
  localStorage.clear();
  dataPro.splice(0);
  showData();
}




//7-Update Product

function updateData(id){

  title.value=dataPro[id].title;
  price.value=dataPro[id].price;
  ads.value=dataPro[id].ads;
  taxes.value=dataPro[id].taxes;
  discount.value=dataPro[id].discount;
  getTotal();
  count.style.display="none";

  category.value=dataPro[id].category;

  submit.innerHTML="Update";
  mode="Update";

  tmp=id;

  scroll({
    top:0,
    behavior:"smooth"
  })

}


//8-Search

let SearchMode="title";

function getSearchMode(id)
{

  let search=document.getElementById("search");

  if(id == "searchTitle"){
    SearchMode="title";

  }else{
    SearchMode="category";

  }
  search.placeholder="Search By "+ SearchMode;


  search.focus();
  search.value="";
  showData();

}


function searchData(value )
{

  let table='';

  if(SearchMode=="title"){
    for(let i=0; i<dataPro.length; i++){
      if(dataPro[i].title.includes(value.toLowerCase()))
        {
               table += `
               <tr>
              <td>${i}</td>
              <td>${dataPro[i].title}</td>
              <td>${dataPro[i].price}</td>
              <td>${dataPro[i].taxes}</td>
              <td>${dataPro[i].ads}</td>
              <td>${dataPro[i].discount}</td>
              <td>${dataPro[i].total}</td>
              <td>${dataPro[i].category}</td>
              <td><button onclick="updateData(${i})" id="update">update</button></td>
              <td><button onclick="deleteData(${i}) " id="delete">delete</button></td>
              </tr>
    `
      
  }
}

  }else{
    for(let i=0; i<dataPro.length; i++){
      if(dataPro[i].category.includes(value.toLowerCase()))
        {
               table += `
               <tr>
              <td>${i}</td>
              <td>${dataPro[i].title}</td>
              <td>${dataPro[i].price}</td>
              <td>${dataPro[i].taxes}</td>
              <td>${dataPro[i].ads}</td>
              <td>${dataPro[i].discount}</td>
              <td>${dataPro[i].total}</td>
              <td>${dataPro[i].category}</td>
              <td><button onclick="updateData(${i})" id="update">update</button></td>
              <td><button onclick="deleteData(${i}) " id="delete">delete</button></td>
              </tr>
    `
      
  }
}

  }
  document.getElementById("tbody").innerHTML=table;

}

//9- clean Data