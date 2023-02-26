const loadData = async(search,dataLImit) =>{

url = `https://openapi.programming-hero.com/api/phones?search=${search}`
try{
const res = await fetch(url);
const data = await res.json();

displayPhone((data.data),dataLImit);
}
catch(err){
console.log(err);
}
}

const displayPhone = (phones, dataLImit) =>{
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML ='';

    const showAll = document.getElementById('showAll');
    if(dataLImit && phones.length > 10){
      phones = phones.slice(0, 9);
      showAll.classList.remove('d-none');
    }else{
      showAll.classList.add('d-none');
    }

const noPhoneAlert = document.getElementById('no-phone');
    if(phones.length === 0){
      noPhoneAlert.classList.remove('d-none');
    }else{
      noPhoneAlert.classList.add('d-none');
    }
    phones.forEach(phone => {
        // console.log(phone)
        const  {image,phone_name,brand,slug} = phone
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML =`
        <div class="card p-2 w-75 mx-auto bg-warning-subtle view overlay">
        <img src="${image}" class="card-img-top w-50 mx-auto" alt="...">
        <div class="card-body mx-auto ">
          <h5 class="card-title">${phone_name}</h5>
          <p class="card-text">Brand : ${brand}</p>
          <button onclick="detailsData('${slug}')" data-bs-toggle="modal" data-bs-target="#detailsModal" class="btn btn-primary">See Details</button>
        </div>
      </div>
        `
        phoneContainer.appendChild(phoneDiv);
    });
    spinner(false)
}



const processSearch = (dataLImit) =>{
  const search = document.getElementById('search-field').value;
  spinner(true)
   loadData(search,dataLImit);
}

const searchData = () =>{
  processSearch(10)
  
 }
document.getElementById('search-field').addEventListener('keyup', function(e){
// console.log(e.key);
  if(e.key === 'Enter'){
    processSearch(10)
}
})


const spinner = isLoading =>{
  const spinnerDiv = document.getElementById('spinner-div');
  if(isLoading){
    spinnerDiv.classList.remove('d-none');
  }
  else{
    spinnerDiv.classList.add('d-none')
  }

}

document.getElementById('btn-show-all').addEventListener('click', function(){
processSearch();
})


const detailsData = (id) =>{
  url = `https://openapi.programming-hero.com/api/phone/${id}`
  fetch(url)
  .then(res => res.json())
  .then(data => detailsShow(data.data))
}

const detailsShow = data =>{
  console.log(data)
  const {releaseDate,brand,mainFeatures
  }= data
const modalTitle = document.getElementById('detailsModalLabel');
modalTitle.innerText =data.name;

const others = document.getElementById('others');
others.innerHTML =`
<p>Brand : ${brand}</p>
<p>Release Date : ${releaseDate ?  releaseDate : 'No Release Date'}</p>
<p>ChipSet : ${mainFeatures.chipSet ? mainFeatures.chipSet : 'Not Found'}</p>
` 
}

loadData('iphone');