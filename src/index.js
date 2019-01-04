document.addEventListener('DOMContentLoaded', () => {

      const endPoint = 'http://localhost:3000/api/v1/categories';
      const greetingCardUrl = 'http://localhost:3000/api/v1/greeting_cards';
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
          categoryListEl.style.display = 'none';
          cardListEl.innerHTML = '';
          singleCategory.greeting_cards.forEach(greeting_card => {
               let singleCardElInCategory = document.createElement('div');
               singleCardElInCategory.className = 'card card-image';
               singleCardElInCategory.id = `greeting-card-${greeting_card.id}`;
               const markup = `
                 <h3>${greeting_card.title}</h3>
                 <h4>${greeting_card.description}</h4>
               `;
               singleCardElInCategory.innerHTML = markup;
               singleCardElInCategory.style.backgroundImage =`url(${greeting_card.image})`;
               singleCardElInCategory.addEventListener('click', (event) => {
                 handleSingleCardClick(event, greeting_card)
               });
               cardListEl.appendChild(singleCardElInCategory)
          });
          let backToCategoriesEl = document.createElement('p');
          backToCategoriesEl.setAttribute("id", "back-to-categories")
          backToCategoriesEl.innerHTML = "Still feeling mean and want to see all of the Card Categories again? Just click <strong>HERE</strong>."
          cardListEl.appendChild(backToCategoriesEl);
          backToCategoriesEl.addEventListener('click', event => handleBackToCategoriesClick(event));
          cardListEl.style.display = 'block';
      };

      const handleBackToCategoriesClick = event => {
          cardListEl.style.display = 'none';
          categoryListEl.style.display = 'block';
      };

      const handleSingleCardClick = (event, greeting_card) => {
          cardListEl.style.display = 'none';
          let singleCardEl = document.createElement('div');
          const markup = `
            <h3>${greeting_card.title}</h3>
            <h4>${greeting_card.description}</h4>
            <img src="${greeting_card.image}">
            <button class='edit-btn' id='edit-btn-${greeting_card.id}'>Customize this Card!</button>
          `;
          singleCardEl.innerHTML = markup;
          document.body.appendChild(singleCardEl);
          let backToCategoryEl = document.createElement('p');
          backToCategoryEl.setAttribute("id", "back-to-category")
          backToCategoryEl.innerHTML = "Still feeling mean and want to see all of this Card Category again? Just click <strong>HERE</strong>."
          singleCardEl.appendChild(backToCategoryEl);
          backToCategoryEl.addEventListener('click', (event) => handleBackToCategoryClick(event, singleCardEl));
          singleCardEl.style.display = 'block';
      };

      const handleBackToCategoryClick = (event, singleCardEl) => {
          singleCardEl.style.display = 'none';
          cardListEl.style.display = 'block';
      };

      const renderSingleCard = (card) => {
          const cardEl = document.createElement("div")
          cardEl.className = "card"
          cardEl.dataset.id = card.id
          cardEl.innerHTML = `
            <div class='card card-image' id='greeting-card-${card.id}' style="background-image: url("${card.image}")">
              <h3>${card.title}</h3>
              <h4>${card.description}</h4>
            </div>
          `;
          cardListEl.appendChild(cardEl)
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
          let categorySelect = document.querySelector("select");
          let title = inputs[0].value;
          let description = inputs[1].value;
          let image = inputs[2].value;
          let category = categorySelect.value

          let data = {
              title: title,
              description: description,
              image: image,
              category_id: category
          }

          let fetchData = {
              method: 'POST',
              body: JSON.stringify(data),
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              }
          }

          fetch(greetingCardUrl, fetchData)
              .then(resp => resp.json())
              .then(renderSingleCard)

      }

});

  // -----------edit button for single card--------------------
  // <button class='edit-btn' id='edit-btn-${greeting_card.id}'>Customize this Card!</button>
