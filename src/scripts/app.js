import { FetchData, pageDeterminator, SortArray } from "./functions.js";

let dataGoesHere = document.getElementById("dataGoesHere");

let displayQuant = document.getElementById("displayQuant");

let filter = document.getElementById("filter");

let revereseIt = document.getElementById("revereseIt");

let prevPageBtn = document.getElementById("prevPageBtn");

let nextPageBtn = document.getElementById("nextPageBtn");

let pageNum = document.getElementById("pageNum");

let page = 1;



const loadData = async () => {
    pageNum.innerText = `Page ${page}`;

    let data = await FetchData();

    let numOfPeople = data.length;
    // console.log(data)
    //sort the array

    data = SortArray(data, filter.value, revereseIt.value);

    let perPage = displayQuant.value;

    switch (pageDeterminator(page, perPage, numOfPeople)) {
        case "Display None":
            prevPageBtn.classList.add("hidden");
            nextPageBtn.classList.add("hidden");
            break;
        case "Display Only NextPage":
            prevPageBtn.classList.add("hidden");
            nextPageBtn.classList.remove("hidden");
            break;
        case "Display only PrevPage":
            prevPageBtn.classList.remove("hidden");
            nextPageBtn.classList.add("hidden");
            break;
        default:
            prevPageBtn.classList.remove("hidden");
            nextPageBtn.classList.remove("hidden");
    }

    dataGoesHere.innerHTML = "";

    for (let i = (page - 1) * perPage; i < page * perPage; i++) {

        let IDCell = document.createElement("div");
        IDCell.classList = "flex justify-center border border-white border-l-4 py-4";
        IDCell.innerText = data[i].Id;

        let firstNameCell = document.createElement("div");
        firstNameCell.classList = "flex justify-center border border-white py-4";
        firstNameCell.innerText = data[i].FirstName;

        let lastNameCell = document.createElement("div");
        lastNameCell.classList = "flex justify-center border border-white py-4";
        lastNameCell.innerText = data[i].LastName;

        let emailCell = document.createElement("div");
        emailCell.classList = "flex justify-center border border-white py-4";
        emailCell.innerText = data[i].Email;

        let heightCell = document.createElement("div");
        heightCell.classList = "flex justify-center border border-white py-4";
        heightCell.innerText = data[i].Height;

        let ageCell = document.createElement("div");
        ageCell.classList = "flex justify-center border-2 border-white border-r-4 py-4";
        ageCell.innerText = data[i].Age;

        dataGoesHere.appendChild(IDCell);
        dataGoesHere.appendChild(firstNameCell);
        dataGoesHere.appendChild(lastNameCell);
        dataGoesHere.appendChild(emailCell);
        dataGoesHere.appendChild(heightCell);
        dataGoesHere.appendChild(ageCell);

    }

}


prevPageBtn.addEventListener("click", () => {

})

nextPageBtn.addEventListener("click", () => {
    page++;
    loadData();
})

prevPageBtn.addEventListener("click", () => {
    page--;
    loadData();
})


displayQuant.addEventListener("input", () => {
    page = 1;
    loadData();
})

filter.addEventListener("input", () => {
    page = 1;
    const defaultOption = filter.options[0];
    defaultOption.value = filter.value;

    const normalWay = revereseIt.options[1];
    const reverseWay = revereseIt.options[2];

    if (filter.value == "id" || filter.value == "height" || filter.value == "age") {
        normalWay.innerText = "Ascending";
        reverseWay.innerText = "Descending"
    } else {
        normalWay.innerText = "A-Z";
        reverseWay.innerText = "Z-A";
    }

    loadData();
})


revereseIt.addEventListener("input", () => {
    page = 1;
    const defaultOption = revereseIt.options[0];
    defaultOption.value = revereseIt.value;
    loadData();
})




loadData();