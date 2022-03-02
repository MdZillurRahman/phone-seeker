document.getElementById('errorSearchText').style.display = 'none';
document.getElementById('errorPhoneName').style.display = 'none';


// error message
const displayError = error => {
    document.getElementById(error).style.display = 'block';
}

// search Text input field

const search_input_text = () => {
    const searchInputField = document.getElementById('search-text');
    const searchInputText = searchInputField.value;
   
    searchInputField.value = '';
    document.getElementById('errorSearchText').style.display = 'none';
    
    if(searchInputText === ''){
        displayError('errorSearchText');
    }
    else{
    const url =`https://openapi.programming-hero.com/api/phones?search=${searchInputText}`;
    fetch(url)
    .then(res => res.json())
    .then(info => display_search_result(info.data));
    }

}

// display search result
const display_search_result = phones => {
    const searchResultFull = document.getElementById('search_resultFull');
    searchResultFull.textContent = '';
    const phone_details = document.getElementById('about_Phone');
    phone_details.textContent = '';

    document.getElementById('errorPhoneName').style.display = 'none';

    if(phones.length == 0){
        displayError('errorPhoneName');
    }
    for(const phone of phones.slice(0, 20)){
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML=`
        <div class="card">
                    <img src="${phone.image}" class="card-img-top w-50 mx-auto rounded-3 mt-3 h-50" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">Name: ${phone.phone_name}</h5>
                      <p class="card-text">Brand Name: ${phone.brand}</p>
                      <p class="text-center"><a onclick="Phone_details('${phone.slug}')" class="btn btn-primary" href="#" role="button">View Details</a></p>

                    </div>
        </div>
        `
        searchResultFull.appendChild(div);
    }
}

// working plan of details button 
const Phone_details = id =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(info => display_details(info.data));
}

const display_details = details =>{
    const phone_details = document.getElementById('about_Phone');
    phone_details.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <img src="${details.image}" class="card-img-top w-50 mx-auto rounded-3 mt-3 mb-3" alt="...">
    <div class="card-body">
        <h5 class="card-title">Released Date: ${details.releaseDate ? details.releaseDate : 'No Data Found'}</h5>
        <h5 class="card-title">Storage:  ${details.mainFeatures.storage}</h5>
        <h5 class="card-title">Chipset:  ${details.mainFeatures.chipSet}</h5>
        <h5 class="card-title">DisplaySize: ${details.mainFeatures.displaySize}</h5>
        <h5 class="card-title">Memory: ${details.mainFeatures.memory}</h5>
        <h5 class="card-title">Sensor: ${details.mainFeatures.sensors}</h5>
        <h5 class="card-title">Others: ${details.others?.WLAN ? details.others.WLAN : 'No Data Found'} </h5>
    </div>
    `;
    phone_details.appendChild(div);
}
