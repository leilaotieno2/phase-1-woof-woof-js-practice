document.addEventListener("DOMContentLoaded", () => {
    const dogBar = document.querySelector("#dog-bar");
    const dogInfo = document.querySelector("#dog-info");
    const filterButton = document.querySelector("#good-dog-filter");
  
    let filterOn = false;
  
    filterButton.addEventListener("click", () => {
      filterOn = !filterOn;
      filterButton.textContent = `Filter good dogs: ${filterOn ? "ON" : "OFF"}`;
      showDogs();
    });
  
    function showDogs() {
      fetch("http://localhost:3000/pups")
        .then((response) => response.json())
        .then((dogs) => {
          let filteredDogs = dogs;
          if (filterOn) {
            filteredDogs = dogs.filter((dog) => dog.isGoodDog);
          }
          dogBar.innerHTML = "";
          filteredDogs.forEach((dog) => {
            const span = document.createElement("span");
            span.textContent = dog.name;
            span.addEventListener("click", () => showDogInfo(dog));
            dogBar.appendChild(span);
          });
        });
    }
  
    function showDogInfo(dog) {
      dogInfo.innerHTML = "";
      const img = document.createElement("img");
      img.src = dog.image;
      const name = document.createElement("h2");
      name.textContent = dog.name;
      const goodButton = document.createElement("button");
      goodButton.textContent = dog.isGoodDog ? "Good Dog!" : "Bad Dog!";
      goodButton.addEventListener("click", () => {
        dog.isGoodDog = !dog.isGoodDog;
        goodButton.textContent = dog.isGoodDog ? "Good Dog!" : "Bad Dog!";
        fetch(`http://localhost:3000/pups/${dog.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            isGoodDog: dog.isGoodDog,
          }),
        });
      });
      dogInfo.appendChild(img);
      dogInfo.appendChild(name);
      dogInfo.appendChild(goodButton);
    }
  
    showDogs();
  });
  