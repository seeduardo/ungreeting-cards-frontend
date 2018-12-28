document.addEventListener('DOMContentLoaded', () => {
    const endPoint = 'http://localhost:3000/api/v1/categories';

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
        <li>
          <h3>${category.name}
           
          </h3>
        </li>`;

                document.querySelector('#categories-list').innerHTML += markup;
            })
        );
});