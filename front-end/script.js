let selectedRow = null;

let id = "";

const taskObj = [
    { status: "backlog", title: "Backlog", color: "#808080" },
    { status: "inprogress", title: "In Progress", color: "#7E46F8" },
    { status: "review", title: "Review", color: "#FCDA3E" },
    { status: "completed", title: "Completed", color: "#5DCA5E" },
    { status: "done", title: "Done", color: "red" },
];

function onFormSubmit() {
  
    let formData = {};
    let formValid = true;

    let titleText = document.getElementById("title");
    if (false) {
        document.getElementById("title").classList.add("invalid");
        document.getElementById("errorMsg").innerHTML = "Please enter the title";
    } else {
        if (false) {
            document.getElementById("title").classList.add("invalid");
            document.getElementById("errorMsg").innerHTML = "The title field must contain 2-40 characters";
        } else {
            document.getElementById("title").classList.remove("invalid");
            document.getElementById("errorMsg").innerHTML = "";
            formValid = false;
        }
    }
    document.getElementById("title").addEventListener("click", enter);
    formData["title"] = document.getElementById("title").value;

    formData["description"] = document.getElementById("description").value;

    for (i = 0; i < taskObj.length; i++) {
        let option = document.createElement("option");
        option.text = taskObj[i].title;
        option.value = taskObj[i].status;
        let select = document.getElementById("status");
        select.appendChild(option);
    }
    formData["status"] = document.getElementById("status").value;

    if (formValid === true) {
        console.log("Not valid");
        return false;
    } else {
        if (id == "") {
            let data = getData();
            formData['id'] = uniqueId();
            data.push(formData);
            setData(data);
            viewData();
            onClear();
        }
        else {
            let data = getData();
            let index = data.findIndex(obj => obj.id === id);
            console.log(index);

            if (index !== -1) {
                data[index] = formData;
                data[index].id = id;

                let cardData = document.getElementById(id);
                console.log("title:", cardData.children[0].innerHTML = formData.title);
                console.log("desc:", cardData.children[1].innerHTML = formData.description);

                setData(data);
                viewData();
                onClear();
            }
        }
    }
    methodForIter();
}

function viewData(searchData) {
    let data = getData();

    if (searchData) {
        data = data.filter(search => {
            if (search.title.includes(searchData) || search.description.includes(searchData)) {
                return true;
            }
            return false;
        });
    }

    document.getElementById("card_wrap").innerHTML = "";

    for (let j = 0; j < taskObj.length; j++) {
        const cardWrap = document.getElementById("card_wrap");
        const card = document.createElement("div");
        card.className = "card";

        const cardBar = document.createElement("div");
        cardBar.className = "card_bar";
        cardBar.innerHTML = taskObj[j].title;
        cardBar.style.backgroundColor = taskObj[j].color;
        card.appendChild(cardBar);

        const cardBarWrap = document.createElement("div");
        cardBarWrap.className = "cardbar_wrap";
        cardBarWrap.style.borderColor = taskObj[j].color;
        card.appendChild(cardBarWrap);
        cardWrap.appendChild(card);

        for (let i = 0; i < data.length; i++) {
            if (data[i].status === taskObj[j].status) {
                const cardDetail = document.createElement("div");
                cardDetail.className = "card_details";
                cardDetail.style.borderColor = taskObj[j].color;

                const leftSide = document.createElement("span");
                leftSide.className = "card_left";
                leftSide.setAttribute("id", data[i].id);

                const heading = document.createElement("h4");
                const headingText = document.createTextNode(data[i].title);
                heading.appendChild(headingText);

                const para = document.createElement("p");
                const paraText = document.createTextNode(data[i].description);
                para.appendChild(paraText);

                leftSide.appendChild(heading)
                leftSide.appendChild(para);
                cardDetail.appendChild(leftSide);

                const rightSide = document.createElement("span");
                rightSide.className = "card_right";

                const editBtn = document.createElement('button');
                editBtn.id = 'edtBtn';
                editBtn.className = 'edit';
                editBtn.addEventListener('click', function () {
                    edtData(data[i]);
                })
                editBtn.innerHTML = 'Edit';

                const deleteBtn = document.createElement('button');
                deleteBtn.id = 'delBtn';
                deleteBtn.className = 'delete';
                deleteBtn.addEventListener('click', function () {
                    delData(data[i].id, cardDetail);
                    deletedata(data[i].id)
                    mainFunction();
                    hi();
                })
                deleteBtn.innerHTML = 'Delete';

                rightSide.appendChild(editBtn);
                rightSide.appendChild(deleteBtn);
                cardDetail.appendChild(rightSide);
                cardBarWrap.appendChild(cardDetail);
                card.appendChild(cardBarWrap);
                cardWrap.appendChild(card);
            }
        }
    }
}
function delData(id, cardDetail) {
    let data = getData();
    let index = data.findIndex(obj => obj.id === id);
    console.log(index);
    if (index !== -1) {
        data.splice(index, 1);
        cardDetail.remove();
        setData(data);
    }
}

function edtData(fetchData) {
    id = fetchData.id;
    let data = getData();
    let index = data.findIndex(obj => obj.id === fetchData.id);
    console.log(index);
    if (index !== -1) {
        document.getElementById("title").value = fetchData.title;
        document.getElementById("description").value = fetchData.description;

        document.getElementById("status").innerHTML = "";

        for (let i = 0; i < taskObj.length; i++) {
            let option = document.createElement("option");
            option.text = taskObj[i].title;
            option.value = taskObj[i].status;
            let select = document.getElementById("status");
            select.appendChild(option);
        }
        document.getElementById("status").value = fetchData.status;
    }
    document.getElementById("cardStatus").style.display = "block";
    document.getElementById("add").value = "Save Task";
}
function searchFunction() {
    let searchVal = document.getElementById("searchbar").value;
    viewData(searchVal);
}
function uniqueId() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}
function getData() {
    mainFunction();
    return localStorage.getItem('todoData') ? JSON.parse(localStorage.getItem('todoData')) : [];
}

function setData(data) {
    localStorage.setItem('todoData', JSON.stringify(data));
}

function onClear() {
    document.getElementById("myForm").reset();
    document.getElementById("cardStatus").style.display = "none";
    document.getElementById("add").value = "Add Task";
    enter();
}

function enter() {
    document.getElementById("title").classList.remove("invalid");
    document.getElementById("errorMsg").innerHTML = "";
}
function clearSearch() {
    document.getElementById("searchbar").value = "";
    viewData();
}
window.addEventListener("DOMContentLoaded", () => {
    document.getElementById("cardStatus").style.display = "none";
});
function hi(){
fetch('http://localhost:8080/allTask')
.then((response) => response.json())
.then(function(data){
localStorage.setItem('databaseData', JSON.stringify(data))
}
)

}
hi();

function methodForIter(){
   let userData= JSON.parse(localStorage.getItem('todoData'))
   let databaseData= JSON.parse(localStorage.getItem('databaseData'))
   for(let i=0;i<userData.length;i++){
    if(!(databaseData.some(e=> e.id==userData[i].id && e.title==userData[i].title && e.description==userData[i].description && e.status==userData[i].status))){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(userData[i]);

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("http://localhost:8080/addTask", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
            }
    }

    for(let i=0;i<databaseData.leftSide;i++){
        if((userData.some(e=> e.id==databaseData[i].id && e.title==databaseData[i].title && e.description==databaseData[i].description && e.status==databaseData[i].status))){
            var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var requestOptions = {
  method: 'DELETE',
  headers: myHeaders,
  redirect: 'follow'
};

fetch(`http://localhost:8080/deleteTaskById/${databaseData[i].id}`, requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
        }
    }

}


function mainFunction()
{
    fetch('http://localhost:8080/allTask')
.then((response) => response.json())
.then((data)=>  localStorage.setItem('todoData', JSON.stringify(data)))
}
mainFunction();


function deletedata(id){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    fetch(`http://localhost:8080/deleteTaskById/${id}`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error)); }
