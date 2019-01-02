document.addEventListener('DOMContentLoaded', () => {
    const endPoint = 'http://localhost:3000/api/v1/categories';
    const categoryListEl = document.querySelector('#categories-list')
    const cardListEl = document.querySelector('#greeting-card-list')
    // API.getCategories()
    // .then(category => category.greeting_cards.forEach(
    //     greeting_card => {
    //         const markup = `
    //     <li>
    //       <h3>${greeting_card.title}
    //         <button>edit</button>
    //       </h3>
    //     </li>`;
    //         document.querySelector('#greeting_cards-list').innerHTML += markup;
    //     }
    // ))

    fetch(endPoint)
        .then(res => res.json())
        .then(json =>
            json.forEach(category => {
                const markup = `
        <div class= 'square' id= 'category-${category.id}'>
          <h3>${category.name}</h3>
        </div>`;

                categoryListEl.innerHTML += markup;
                const allCategoryEls = document.querySelectorAll('.square');
                allCategoryEls.forEach(singleCategoryEl => {
                  singleCategoryEl.addEventListener('click', (event) => handleSingleCategoryClick(event));
                })

            })
        );

    const handleSingleCategoryClick = (event) => {
        let categoryID = event.path[0].id.replace(/\D/g,'')
        fetch(`${endPoint}/${categoryID}`)
          .then(res => res.json())
          .then(data => renderCategory(data))
    };

    const renderCategory = singleCategory => {
        categoryListEl.style.display ='none';
        singleCategory.greeting_cards.forEach(greeting_card => {
          const markup = `
          <div class= 'card' id= 'greeting-card-${greeting_card.id}'>
            <h3>${greeting_card.title}</h3>
            <h4>${greeting_card.description}</h4>
          </div>`;
          // cardListEl.style.background =`${greeting_card.image}`
          cardListEl.innerHTML += markup;
        });
        
    };

});
