const FetchData = async () => {
    const promise = await fetch("./data/data.json");
    const data = await promise.json();

    return data.People;
}

const pageDeterminator = (page, perPage, numOfPeople) => {
    if (perPage == 0) {
        return "Display None";
    }

    if (page == 1 && perPage) {
        return "Display Only NextPage";
    }

    let lastPage = numOfPeople / perPage;

    if (page >= lastPage) {
        return "Display only PrevPage";
    }

    return "Display Both";
}

const SortArray = (array, method, reverse) => {

    if (!method) {
        if (reverse == "reverse") {
            array.reverse();
        }
        return array;
    }

    switch (method) {
        case "id":
            array.sort((a, b) => {
                return a.Id - b.Id
            })
            break;
        case "firstName":
            array.sort((a, b) => {
                if (a.FirstName > b.FirstName) {
                    return 1;
                }
                if (a.FirstName < b.FirstName) {
                    return -1;
                }
                return 0;
            })
            break;
        case "lastName":
            array.sort((a, b) => {
                if (a.LastName > b.LastName) {
                    return 1;
                }
                if (a.LastName < b.LastName) {
                    return -1;
                }
                return 0;
            })
            break;
        case "height":
            array.sort((a, b) => {
                const heightA = parseInt(a.Height);
                const heightB = parseInt(b.Height);
                return heightA - heightB;
            })
            break;
        case "age":
            array.sort((a, b) => a.Age - b.Age)
            break;
        default:
    }

    if (reverse == "reverse") {
        array.reverse();
    }

    return array;
}

export { FetchData, pageDeterminator, SortArray }