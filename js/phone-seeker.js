// search Text input field

const searchInputText = () => {
    const searchInputField = document.getElementById('search-text');
    const searchInputText = searchInputField.value;
    console.log(searchInputText);
   
    searchInputField.value = '';

    const url =`https://openapi.programming-hero.com/api/phones?search=${searchInputText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => console.log(data.data));
}