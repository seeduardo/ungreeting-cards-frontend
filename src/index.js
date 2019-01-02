document.addEventListener('DOMContentLoaded', () => {
    const endPoint = 'http://localhost:3000/api/v1/categories';
    const addBtn = document.querySelector('#new-card-btn');
    const cardForm = document.querySelector('.container');
    const realForm = document.querySelector(".add-card-form");
    let addCard = false;
      
    fetch(endPoint)
    .then(res => res.json())
    .then(json =>
        json.forEach(category => {
        const markup = `
        <div class= 'square'>
          <h3>${category.name}</h3>
        </div>`;
        document.querySelector('#categories-list').innerHTML += markup;
        })
    );

    const renderSingleCard = (card) => {
    //   inside here create all the elements for a single card and I've already set up the function for a new card
    }

    addBtn.addEventListener('click', () => {
        addCard = !addCard
        if (addCard) {
            cardForm.style.display = 'block'
            // event listener here
            realForm.addEventListener('submit', createNewCard)
        } else {
            cardForm.style.display = 'none'
        }
    })

    function createNewCard(e) {
        e.preventDefault()

        let inputs = document.querySelectorAll(".input-text");
        let title = inputs[0].value;
        let description = inputs[1].value;
        let image = inputs[2].value;
        let category = inputs[3].value


        let data = {
            title: title,
            description: description,
            image: image,
            category_id: category,
        }

        let fetchData = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }

        fetch(url, fetchData)
            .then(resp => resp.json())
            .then(renderSingleCard)


    }

});