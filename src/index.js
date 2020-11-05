document.addEventListener("DOMContentLoaded", () => {
  const dogTable = document.getElementById("dog-table");
  const dogBreed = document.getElementById("dog-breed");
  const dogName = document.getElementById("dog-name");
  const dogSex = document.getElementById("dog-sex");
  const dogForm = document.getElementById("dog-form");
  let formDogBreed = document.getElementById("form-dog-breed");
  let formDogName = document.getElementById("form-dog-name");
  let formDogSex = document.getElementById("form-dog-sex");
  let dogId;

  function getDogs() {
    fetch("http://localhost:3000/dogs")
      .then((resp) => resp.json())
      .then((data) => renderDogs(data));
  }

  function renderDogs(data) {
    console.log(data);
    data.forEach((dog) => {
      const tableRow = document.createElement("tr");
      const editBtn = document.createElement("button");
      let dogNameData = document.createElement("td");
      let dogBreedData = document.createElement("td");
      let dogSexData = document.createElement("td");
      dogNameData.textContent = dog.name;
      dogBreedData.textContent = dog.breed;
      dogSexData.textContent = dog.sex;
      editBtn.textContent = "Edit Dog";
      dogTable.append(tableRow);
      tableRow.append(dogNameData, dogBreedData, dogSexData, editBtn);
      tableRow.id = `O${dog.id}`;
      editDog(dog, editBtn);
    });
  }

  function editDog(data, btn) {
    btn.addEventListener("click", (e) => {
      formDogBreed.value = data.breed;
      formDogName.value = data.name;
      formDogSex.value = data.sex;
      dogId = data.id;
    });
  }
  updateDog();

  function updateDog() {
    dogForm.addEventListener("submit", (e) => {
      e.preventDefault();
      fetch(`http://localhost:3000/dogs/${dogId}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formDogName.value,
          breed: formDogBreed.value,
          sex: formDogSex.value,
        }),
      })
        .then((resp) => resp.json())
        .then((data) => {
          const dog_table = document.querySelector(`#O${data.id}`);
          const myNodeList = dog_table.querySelectorAll("td")
          myNodeList[0].innerText = data.name 
          myNodeList[1].innerText = data.breed
          myNodeList[2].innerText = data.sex 

        });
    });
  }

  getDogs();
});
