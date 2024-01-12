var bookmarkNameInput = document.getElementById("bookmarkNameInput");
var bookmarkUrlInput = document.getElementById("bookmarkUrlInput");
var bookmarks = [];

if (localStorage.getItem("My Bookmarks")) {
    bookmarks = JSON.parse(localStorage.getItem("My Bookmarks"))
    displayData();
}

function addBookmark(){
    if( validationName() && validationUrl() ){
        var bookmark = {
            bookmarkName:bookmarkNameInput.value,
            bookmarkUrl:bookmarkUrlInput.value
        }
        bookmarks.push(bookmark);
        clearForm();
        localStorage.setItem("My Bookmarks" , JSON.stringify(bookmarks))
        displayData();
    }
    else{
        document.getElementById("boxMassage").classList.remove('d-none');
    }
}

function clearForm(){
    bookmarkNameInput.value = "";
    bookmarkUrlInput.value = "";
}

function displayData(){
    box="";
    for(var i=0 ; i<bookmarks.length ; i++){
        box += `<tr>
        <td>${i+1}</td>
        <td>${bookmarks[i].bookmarkName}</td>
        <td> <a target="_blank" href="${bookmarks[i].bookmarkUrl}"/> <button  class="btn btn-warning"><i class="fa-solid fa-eye pe-2"></i> Visit</button></td>
        <td><button onclick = "delateBookmark(${i})" class="btn btn-success"><i class="fa-solid fa-trash-can"></i> Delate</button></td>
    </tr>`
    }
    document.getElementById("tableBody").innerHTML = box;
}

function delateBookmark(index){
    bookmarks.splice(index , 1);
    displayData();
}

function validationName(){
    var regexName = /^[a-z]{3,}$/;
    var text = bookmarkNameInput.value;
    if (regexName.test(text)) {
        bookmarkNameInput.classList.add("is-valid");
        bookmarkNameInput.classList.remove("is-invalid");
        return true;
    }
    else{
        bookmarkNameInput.classList.add("is-invalid");
        bookmarkNameInput.classList.remove("is-valid");
        return false;
    }

}


function validationUrl(){
    var regexUrl = /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?/;
    var text = bookmarkUrlInput.value;

    if (regexUrl.test(text)) {
        bookmarkUrlInput.classList.add("is-valid");
        bookmarkUrlInput.classList.remove("is-invalid");
        return true;
    }
    else{
        bookmarkUrlInput.classList.add("is-invalid");
        bookmarkUrlInput.classList.add("is-valid");
        return false;
    }
}
function closeMassage(){
    document.getElementById("boxMassage").classList.add('d-none');
}