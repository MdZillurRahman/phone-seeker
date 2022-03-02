const errorSearchText = document.getElementById('errorSearchText').style.display;

// search Text input field

const search_input_text = () => {
    const searchInputField = document.getElementById('search-text');
    const searchInputText = searchInputField.value;
   
    searchInputField.value = '';
    const errorSearchText = document.getElementById('errorSearchText').style.display;
    if(searchInputText === ''){
        errorSearchText = 'block';
    }


    const url =`https://openapi.programming-hero.com/api/phones?search=${searchInputText}`;
    fetch(url)
    .then(res => res.json())
    .then(info => display_search_result(info.data));

    // 

    //     swal({
    //         title: "No Result Found",
    //         text: "please write something to display!",
    //         icon: "warning",
    //         button: "Previous",
    //       });
    // } else{
    
    // //load search input field data
    // const url =`https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    // fetch(url)
    // .then(res => res.json())
    // .then(data => displaySearchResult(data.data))
    // .catch(error => displayError(error));
    // }
}

// display search result
const display_search_result = phones => {
    const searchResultFull = document.getElementById('search_resultFull');
    searchResultFull.textContent = '';

    for(const phone of phones.slice(0, 20)){
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML=`
        <div class="card">
                    <img src="${phone.image}" class="card-img-top w-50 mx-auto rounded-3 mt-3 h-50" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">Name: ${phone.phone_name}</h5>
                      <p class="card-text">Brand Name: ${phone.brand}</p>
                      <button onclick="Phone_details('${phone.slug}')" type="button" class="btn btn-primary">Details</button>
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
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <img src="${details.image}" class="card-img-top w-50 mx-auto rounded-3 mt-3 mb-3" alt="...">
    <div class="card-body">
        <h5 class="card-title">Released Date: ${details.releaseDate ? details.releaseDate : 'Not Availabe'}</h5>
        <h5 class="card-title">Storage:  ${details.mainFeatures.storage}</h5>
        <h5 class="card-title">Chipset:  ${details.mainFeatures.chipSet}</h5>
        <h5 class="card-title">DisplaySize: ${details.mainFeatures.displaySize}</h5>
        <h5 class="card-title">Memory: ${details.mainFeatures.memory}</h5>
        <h5 class="card-title">Sensor: ${details.mainFeatures.sensors}</h5>
        <h5 class="card-title">Others:${details.others?.WLAN ? details.others.WLAN : 'No Data Availabe'} </h5>

    </div>
    `;
    phone_details.appendChild(div);
}
