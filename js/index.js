
var bookmarkName = document.getElementById('bookmarkName');
var bookmarkUrl = document.getElementById('bookmarkUrl');

var bockDataContainer =[];
checkDataInLocal();

function checkDataInLocal(){
    if (localStorage.getItem('bookmarkData') !== null){
        bockDataContainer = JSON.parse(localStorage.getItem("bookmarkData"));
        display();
    }
    else {
        noData();
    }
}

function localDataUpdate(){

    localStorage.setItem("bookmarkData" , JSON.stringify(bockDataContainer));

}

function noData(){
    document.getElementById('tableContent').innerHTML = `
    <tr>
    <td colspan="4">
    <h2 class = "myFontColor">No bookmarks yet!</h2>
    </td>
    </tr>
    `;
}

function  saveData() {

if (validateName() && validateUrl()) {

        var ste = Boolean();
        for(var i = 0; i < bockDataContainer.length; i++){
        if( bockDataContainer[i].name.toUpperCase() == bookmarkName.value.toUpperCase() || bockDataContainer[i].url.toUpperCase() == bookmarkUrl.value.toUpperCase() ){
        
            Swal.fire({
                icon: "error",
                title: "The website already exists with the same (Name Or URL).",
                text:"",
            });
            document.getElementById('swal2-html-container').innerHTML = `
            <p class = "text-black"> Website Name is: <span class = "text-danger fw-bold">${bockDataContainer[i].name} </span></p>
            <p class = "text-black"> Website URL is: <span class = "text-info fw-bold ">${bockDataContainer[i].url} </span></p>
            `
            ste = true;
            break;
        }
        else {
            ste = false ;
        }
        }
        if (ste == false){
            var bockData = {
                name : capitalize(bookmarkName.value),
                url : bookmarkUrl.value,
                }
            bockDataContainer.push(bockData);
            localDataUpdate();
            display();
            clrarForm();
        }

    }

else {
        Swal.fire({
            icon: "error",
            title: "The data you entered is incorrect.",
            text:"",
        });
        document.getElementById('swal2-html-container').innerHTML = `
        <ul class="fa-ul" style="--fa-li-width: 3em;">
        <li class = "fw-semibold fs-5 text-black"><span class="fa-li"><i class="fa-solid fa-check fa-bounce fa-lg" style="color: #ff0000;"></i></span>Site name <span class = "text-danger"> must </span> contain at least 3 characters</li>
        <li class = "fw-semibold fs-5 text-black"><span class="fa-li"><i class="fa-solid fa-check fa-bounce fa-lg" style="color: #ff0000;"></i></span>Site URL <span class = "text-danger"> must </span> be a valid one<p class = "text-info fs-6">Ex: https://example.com</p></li>
      </ul>`;

    }

}

function display(){ 
    var carttona = '';
    for (var i = 0; i < bockDataContainer.length; i++) {
            
        carttona += `
        <tr>
         <td>${[i+1]}</td>
          <td>${bockDataContainer[i].name}</td>              
          <td>
          <a href="${bockDataContainer[i].url}" target="_blank" class="btn btn-warning">
          <i class="fa-solid fa-eye pe-2"></i>Visit
         </a>
         </td>
          <td>
         <button class="btn btn-danger pe-2" onclick="deletElement(${i})">
         <i class="fa-solid fa-trash-can"></i> Delete</button>
         </td>
        </tr>`
      
    }
    document.getElementById('tableContent').innerHTML = carttona;
}

function deletElement(int) {
    bockDataContainer.splice(int,1);

    if(bockDataContainer.length == 0){
        localStorage.removeItem("bookmarkData");
        noData();
    }
    else {
        localDataUpdate();
        display();
    }
}

function clrarForm() {
    bookmarkName.value = null;
    bookmarkUrl.value = null;
    bookmarkName.classList.remove("is-valid", "is-invalid");
    bookmarkUrl.classList.remove("is-valid", "is-invalid");
}

function capitalize(str) {

    var string = str.split("");
    string[0] = string[0].toUpperCase();
    return string.join("");

}

function validateName() {
    var trimmedValue = bookmarkName.value.trim();
    var hasSpaces = /\s/.test(trimmedValue);

    if (trimmedValue.length < 3 || hasSpaces) {
        bookmarkName.classList.add("is-invalid");
        bookmarkName.classList.remove("is-valid");
        return false;
    } else {
        bookmarkName.classList.add("is-valid");
        bookmarkName.classList.remove("is-invalid");
        return true;
    }
}

function validateUrl() {
    if (isValidUrl(bookmarkUrl.value)) {
        bookmarkUrl.classList.add("is-valid");
        bookmarkUrl.classList.remove("is-invalid");
        return true;
    } else {
        bookmarkUrl.classList.add("is-invalid");
        bookmarkUrl.classList.remove("is-valid");
        return false;
    }
}

function isValidUrl(str) {
    var pattern = new RegExp(
        '^(https?:\\/\\/)?' + 
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
        '((\\d{1,3}\\.){3}\\d{1,3}))' + 
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + 
        '(\\?[;&a-z\\d%_.~+=-]*)?' + 
        '(\\#[-a-z\\d_]*)?$',
        'i'
    );
    return pattern.test(str);
}



