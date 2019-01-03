document.addEventListener('DOMContentLoaded', () => {

      const endPoint = 'http://localhost:3000/api/v1/categories';
      const addBtn = document.querySelector('#new-card-btn');
      const cardForm = document.querySelector('.container');
      const realForm = document.querySelector(".add-card-form");
      let addCard = false;
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
          .then(json => {
              json.forEach(category => {
                  const markup = `
                      <div class='square' id='category-${category.id}'>
                        <h3>${category.name}</h3>
                      </div>
                  `;
                  categoryListEl.innerHTML += markup;
                  const allCategoryEls = document.querySelectorAll('.square');
                  allCategoryEls.forEach(singleCategoryEl => {
                    singleCategoryEl.addEventListener('click', (event) => handleSingleCategoryClick(event));
                  });
              });
          });

      const handleSingleCategoryClick = (event) => {
          const containerEl = event.target.classList.contains('square')
              ? event.target
              : event.target.parentElement
          let categoryID = containerEl.id.replace(/\D/g,'');
          fetch(`${endPoint}/${categoryID}`)
              .then(res => res.json())
              .then(data => renderCategory(data))
      };

      const renderCategory = singleCategory => {
          console.log(singleCategory)
          categoryListEl.style.display = 'none';
          cardListEl.innerHTML = '';
          singleCategory.greeting_cards.forEach(greeting_card => {
              const markup = `
              <div class='card card-image' id='greeting-card-${greeting_card.id}'>
                <h3>${greeting_card.title}</h3>
                <h4>${greeting_card.description}</h4>
                <button class='edit-btn' id='edit-btn-${greeting_card.id}'>Customize this Card!</button>
              </div>`;
              cardListEl.innerHTML += markup;
              let cardImage = document.querySelector(`#greeting-card-${greeting_card.id}`);
              cardImage.style.backgroundImage =`url(${greeting_card.image})`;
              // let cardEditButton = document.querySelector(`#edit-btn-${greeting_card.id}`);
              // cardEditButton.addEventListener('click', (event) => {
              //   handleEditButtonClick(event)
              // });
          });
          let backToCategoriesEl = document.createElement('p');
          backToCategoriesEl.setAttribute("id", "back-to-categories")
          backToCategoriesEl.innerHTML = "Still feeling mean and want to see all of the Card Categories again? Just click <strong>HERE</strong>."
          cardListEl.appendChild(backToCategoriesEl);
          let backToCategories = document.querySelector('#back-to-categories');
          backToCategories.addEventListener('click', event => handleBackToCategoriesClick(event));
          cardListEl.style.display = 'block';
      };

      const handleBackToCategoriesClick = event => {
          cardListEl.style.display = 'none';
          categoryListEl.style.display = 'block';
      };

      // const handleEditButtonClick = (event) => {
      //   console.log(event)
      // }

      // const renderSingleCard = (card) => {
      // //   inside here create all the elements for a single card and I've already set up the function for a new card
      // }

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
