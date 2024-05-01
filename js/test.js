let searchName = document.getElementById('#searchName');
let rowData = document.getElementById(`#rowData`);
let searchNameInpt = document.getElementById(`#searchNameInpt`);
let putSerch = document.getElementById("putSerch");
let sideWidth = $("#linkes").innerWidth();




let prodactContainer = [];
async function getMeals() {
  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=`
  );
  let result = await data.json();
  console.log(result.meals);
  // console.log(result.meals)
  prodactContainer = result.meals;
  console.log(prodactContainer[1].strMeal);
  displayMeals(result.meals);
}
async function getId(elId) {
  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${elId}`
  );
  let finalData = await data.json();
  // console.log(finalData.meals[0]);
  specificMeal(finalData.meals[0]);
}
function displayMeals(array) {
  $("#side-menu").animate({ left: -sideWidth }, 500);
  $(".links li").animate({ top: 300 }, 500);
  $(".open-close-icon").addClass("fa-align-justify");
  $(".open-close-icon").removeClass("fa-x");

  let cartona = ``;
  for (let i = 0; i < array.length; i++) {
    cartona += `

    <div class="md:ms-20 lg:m-0 ms-10 w-full lg:basis-1/4 p-4 ">
    <div class="relative group overflow-hidden rounded-lg">
      <img
        src="${array[i].strMealThumb}"
        class="rounded-lg w-full"
        alt="meel"
      />

      <div
      onclick=" getId('${array[i].idMeal}')"
        class="meal-layer absolute top-full overflow-hidden  text-center md:text-start h-full w-full  lg:max-w-80 text-black md:p-2 bg-opacity-80 bg-white group-hover:top-0 group-hover:cursor-pointer transition-all ease-in-out duration-700"
      >
        <h3 class="font-bold text-2xl ps-2  pt-48 md:pt-80 lg:pt-28">${array[i].strMeal}</h3>

      </div>
    </div>
  </div>

    `;
    // console.log(array[i]);
  }

  // document.getElementById("putSerch").innerHTML = '';
  document.getElementById("rowData").innerHTML = cartona;
}

function specificMeal(meals) {


  $("#loading").slideDown(0)
  $("#side-menu").animate({ left: -sideWidth }, 500);
  $(".links li").animate({ top: 300 }, 500);
  $(".open-close-icon").addClass("fa-align-justify");
  $(".open-close-icon").removeClass("fa-x");
  

  let ingredients = ``;
  putSerch.innerHTML = "";
  for (let i = 1; i <= 20; i++) {
    if (meals[`strIngredient${i}`]) {
      ingredients += ` <li class="bg-cyan-100 px-6 py-1 m-2 rounded-md">${meals[`strMeasure${i}`]
        } ${meals[`strIngredient${i}`]}</li>`;
    }
  }

  let tags = meals.strTags?.split(",");
  // let tags = meals.strTags.split(",")
  if (!tags) tags = [];

  let tagsStr = "";
  for (let i = 0; i < tags.length; i++) {
    tagsStr += `
      <li class="bg-purple-400 text-lg px-1 py-1 rounded-lg mx-4 my-2">${tags[i]}</li>`;
  }



  let cartona = `

    <div class="w-full md:w-1/3  ps-3 ">
    <img
      src="${meals.strMealThumb}"
      class="w-full rounded-lg ms-5"
      alt=" meal"
    />

    <h2 class="font-bold text-4xl ps-6 md:ps-6 text-white">${meals.strMeal}</h2>
  </div>
  <div class=" w-2/3 ps-10 md:mx-auto md:ps-9 md:w-2/3">
    <h2 class="text-white font-bold text-3xl">Instructions</h2>
    <p class="text-white text-lg">
    ${meals.strInstructions}
    </p>

    <h3 class="font-abold pt-4 text-white text-3xl">
      <span class="font-extrabold text-4xl">Area</span> :${meals.strArea}
    </h3>
    <h3 class="font-abold pt-4 text-white text-3xl">
      <span class="font-extrabold text-4xl">Category </span> :  ${meals.strCategory}
    </h3>
    <h3 class="font-abold pt-4 text-white text-3xl">
      <span class="font-extrabold text-4xl">Recipes </span> : Turkish
    </h3>

    <ul class="text-black flex flex-row flex-wrap pt-4">
${ingredients}  
    </ul>
    <h3 class="font-abold pt-4 text-white text-3xl">
      <span class="font-extrabold text-4xl">Tags  </span> :
    </h3>

    <ul class="text-black flex flex-row flex-wrap py-4">
${tagsStr}  
    </ul>

    <a href=" ${meals.strSource}" class="px-3 py-2 rounded-lg ms-2 text-white  hover:bg-green-700 bg-green-600">Source</a>
    <a href=" ${meals.strYoutube}" class="px-3 py-2 rounded-lg text-white mx-1 hover:bg-red-700 bg-red-600">Youtube</a>
  </div>

    `;
    $("#loading").slideUp(800)

  document.getElementById("rowData").innerHTML = cartona;
}

async function apiForSerch(term) {
  let apiSearch = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
  );
  result = await apiSearch.json();
  prodactContainer = result.meals;
  let cartona = ``;
  if (prodactContainer && prodactContainer.length > 0) {
    for (let i = 0; i < prodactContainer.length; i++) {
      // $("#loading").slideUp(0)
      if (
        prodactContainer[i].strMeal.toLowerCase().includes(term.toLowerCase())
      ) {
        $("#loading").slideUp(0)
        // console.log(prodactContainer[i]);
        cartona += `
      
      
        <div class=" w-full ms-10 md:m-0   md:basis-1/4    p-4">
        <div class="relative group overflow-hidden rounded-lg">
          <img
            src="${prodactContainer[i].strMealThumb}"
            class="rounded-lg w-full"
            alt="meel"
          />
    
          <div
          onclick=" getId('${prodactContainer[i].idMeal}')"
            class="meal-layer absolute top-full overflow-hidden text-center md:text-start h-full w-full md:max-w-80 text-black md:p-2 bg-opacity-80 bg-white group-hover:top-0 group-hover:cursor-pointer transition-all ease-in-out duration-700"
          >
            <h3 class="font-bold text-2xl ps-2 pt-60 md:pt-28">${prodactContainer[i].strMeal}</h3>
    
          </div>
        </div>
      </div>
      
        `;
      }
    }
    
  } else {
    cartona =  $("#loading").slideDown(0)
  }


  document.getElementById("rowData").innerHTML = cartona;
}

function displaySerch() {
  
  // $("#loading").slideDown(0)

  
  $("#side-menu").animate({ left: -sideWidth }, 500);
  $(".links li").animate({ top: 300 }, 500);
  $(".open-close-icon").addClass("fa-align-justify");
  $(".open-close-icon").removeClass("fa-x");
  
  let desginSerch = `
  
  <div id="delet" class="md:flex w-3/4 ps-10  mx-auto rounded items-center justify-center">
  <input
  oninput="apiForSerch(this.value)"
    type="search"
    name="search"
    id="searchNameInpt"
    placeholder="Search By Name"
    class="w-full  border z-50 border-white rounded-md bg-transparent py-2 px-4 text-gray-400 foucas:outline-none"
  />
  <input
  oninput="apiForSerchLitter(this.value)"
    type="search"
    name="search"
    id="searchLitter"
    placeholder="Search By Litter"
    class="w-full border z-50 border-white rounded-md bg-transparent my-2  md:ms-12 py-2 px-4 text-gray-400 foucas:outline-none"
  />
</div>




</div>
  
  
  `;

  document.getElementById("putSerch").innerHTML = desginSerch;
  document.getElementById("rowData").innerHTML = "";
  // $("#loading").slideUp(100)

}

async function apiForSerchLitter(term) {
  if (term == "") {
    term = "a";
  }
  if (term.length >1) {
    cartona =  $("#loading").slideDown(0)
  }
  else {
    $("#loading").slideUp(0)
    
    let serchApitLitter = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`
    );
    let result = await serchApitLitter.json();
    prodactContainer = result.meals;
    let cartona = ``;
    if (prodactContainer !== null) {
      for (let i = 0; i < prodactContainer.length; i++) {
        if (
          prodactContainer[i].strMeal.toLowerCase().includes(term.toLowerCase())
        ) {
          // console.log(prodactContainer[i]);
          cartona += `
        
        
          <div class=" w-full md:basis-1/4 p-4">
          <div class="relative group overflow-hidden rounded-lg">
            <img
              src="${prodactContainer[i].strMealThumb}"
              class="rounded-lg w-full"
              alt="meel"
            />
      
            <div
            onclick=" getId('${prodactContainer[i].idMeal}')"
              class="meal-layer absolute top-full overflow-hidden text-center md:text-start h-full w-full md:max-w-80 text-black md:p-2 bg-opacity-80 bg-white group-hover:top-0 group-hover:cursor-pointer transition-all ease-in-out duration-700"
            >
              <h3 class="font-bold text-2xl ps-2 pt-60 md:pt-28">${prodactContainer[i].strMeal}</h3>
      
            </div>
          </div>
        </div>
        
          `;
        }
      }
    }
  
    // console.log(result);
  
    // console.log(prodactContainer);
  
    document.getElementById("rowData").innerHTML = cartona;
  }

}

// meals

// Categories Start
async function getcategories() {
  $("#loading").slideDown(0)

  
  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  let result = await data.json();
  putSerch.innerHTML = "";


  // delet.classList.replace('flex' , 'none')
  // deletSerch()
  // document.querySelector(".search-input").classList.add("hidden");
  displayCategore(result.categories);

  $("#loading").slideUp(800)

}
// getcategories();

function displayCategore(array) {

  $("#side-menu").animate({ left: -sideWidth }, 500);
  $(".links li").animate({ top: 300 }, 500);
  $(".open-close-icon").addClass("fa-align-justify");
  $(".open-close-icon").removeClass("fa-x");
  let cartona = ``;

  for (let i = 0; i < array.length; i++) {
    cartona += `

        <div class="w-full ms-10 md:m-0 md:basis-1/4 p-5 ">
        <div onclick="getcategoriesMeals('${array[i].strCategory }')" class=" relative  group overflow-hidden transition-all  ease-in-out rounded-lg">
          <img
            src="${array[i].strCategoryThumb}"
            class="rounded-lg w-full"
            alt="meel"
          />

          <div
            class="meal-layer absolute top-full overflow-hidden  text-center md:text-start h-full w-full  md:max-w-80 text-black md:p-2 bg-opacity-80 bg-white group-hover:top-0 group-hover:cursor-pointer transition-all ease-in-out duration-700"
          >
            <h3 class="font-bold text-2xl pt-5">${array[i].strCategory}</h3>
            <p class="font-light">
            ${array[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}
            </p>
          </div>
        </div>
      </div>

      `;
  }

  document.getElementById("rowData").innerHTML = cartona;
}

async function getcategoriesMeals(category) {
  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  let result = await data.json();

  // console.log(result)
  // displayCategore(result.categories)
  displayMeals(result.meals);
}

//areaa

async function getAreaa() {
  $("#loading").slideDown(0)

  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  let result = await data.json();
  putSerch.innerHTML = "";


  console.log();
  displayArea(result.meals);
  $("#loading").slideUp(800)

}

function displayArea(array) {
  $("#side-menu").animate({ left: -sideWidth }, 500);
  $(".links li").animate({ top: 300 }, 500);
  $(".open-close-icon").addClass("fa-align-justify");
  $(".open-close-icon").removeClass("fa-x");

  let cartona = ``;

  for (let i = 0; i < array.length; i++) {
    cartona += `

        <div class="w-full md:basis-1/4 ms-0 md:ms-96 py-7 px-5 lg:ms-0 lg:p-5">
        <div onclick="getAreaMeals('${array[i].strArea}')" class="text-center text-white cursor-pointer">
                <i class="fa-solid fa-house-laptop text-white fa-4x"></i>
                <h3 class="text-4xl">${array[i].strArea}</h3>
        </div>
      </div>

      `;
  }

  document.getElementById("rowData").innerHTML = cartona;
}
async function getAreaMeals(area) {
  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  let result = await data.json();

  // console.log(result)
  displayMeals(result.meals);
}

// Ingredients

async function getIngredients() {
  $("#loading").slideDown(0)

  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  let result = await data.json();
  putSerch.innerHTML = "";


  // console.log(result.meals)
  displayIngredients(result.meals.slice(0, 20));
  $("#loading").slideUp(800)

}

function displayIngredients(array) {

  $("#side-menu").animate({ left: -sideWidth }, 500);
  $(".links li").animate({ top: 300 }, 500);
  $(".open-close-icon").addClass("fa-align-justify");
  $(".open-close-icon").removeClass("fa-x");

  let cartona = ``;

  for (let i = 0; i < array.length; i++) {
    cartona += `


        <div class="w-full md:basis-1/4 ms-0 md:ms-96 py-7 px-5 lg:ms-0 lg:p-5">
          <div onclick="getIngredientsMeals('${array[i].strIngredient
      }')" class="text-center text-white cursor-pointer">
                 <i class="fa-solid fa-drumstick-bite fa-4x  text-white "></i>
                  <h3 class="text-4xl">${array[i].strIngredient}</h3>
                  <p class="text-lg px-0 py-3">${array[i].strDescription
        .split(" ")
        .slice(0, 20)
        .join(" ")}</p>
          </div>
        </div>

      `;
  }

  document.getElementById("rowData").innerHTML = cartona;
}
async function getIngredientsMeals(ingredients) {
  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`
  );
  let result = await data.json();

  // console.log(result)
  displayMeals(result.meals);
}





// Validation


function displayContacts() {
  $("#loading").slideDown(0)

  putSerch.innerHTML = "";

  $("#side-menu").animate({ left: -sideWidth }, 500);
  $(".links li").animate({ top: 300 }, 500);
  $(".open-close-icon").addClass("fa-align-justify");
  $(".open-close-icon").removeClass("fa-x");
  let cartona =

    `
  
  <div
  class="flex flex-col mx-auto ms-32 lg:flex-row justify-center items-center  mt-32 lg:mt-40"
>
  <div
    class="w-full flex flex-col lg:flex-col justify-center lg:items-end pe-3"
  >
    <input
      onkeyup="inputsValidation()"
      type="text"
      name="name"
      id="enterName"
      placeholder="Enter Your Name"
      class="w-96 border border-white rounded-md bg-white py-2 px-4 text-black foucas:outline-none"
    />
    <div
      id="nameAlert"
      class="bg-purple-300 w-96 py-2 px-10 rounded-lg mt-2 hidden"
    >
      Special characters and numbers not allowed
    </div>
    <input
      onkeyup="inputsValidation()"
      type="text"
      name="phone"
      id="enterPhone"
      placeholder="Enter Your phone"
      class="w-96 border border-white rounded-md bg-white mt-4 py-2 px-4 text-black foucas:outline-none"
    />
    <div
      id="numberAlert"
      class="bg-purple-300 w-96 py-2 px-24 rounded-lg mt-2 hidden"
    >
      Enter valid Phone Number
    </div>
    <input
      onkeyup="inputsValidation()"
      type="password"
      name="password"
      id="enterPassword"
      placeholder="Enter Your Password"
      class="w-96 border border-white rounded-md bg-white mt-4 py-2 px-4 text-black foucas:outline-none"
    />
    <div
      id="passowrdAlert"
      class="bg-purple-300 py-2 w-96 px-3 rounded-lg mt-2 hidden"
    >
      Enter valid password
    </div>
  </div>
  <div
    class="w-full flex flex-col  lg:flex-col justify-center lg:items-start mt-2 lg:mt-0 lg:ps-3"
  >
    <input
      onkeyup="inputsValidation()"
      type="email"
      name="email"
      id="enterEmail"
      placeholder="Enter Your Email"
      class="w-96 border border-white rounded-md bg-white py-2 px-4 text-black foucas:outline-none"
    />
    <div
      id="emailAlert"
      class="bg-purple-300 w-96 py-2 px-10 rounded-lg mt-2 hidden"
    >
      Email not valid *exemple@yyy.zzz <br />
      Enter valid Email
    </div>
    <input
      onkeyup="inputsValidation()"
      type="number"
      name="age"
      id="enterAge"
      placeholder="Enter Your age"
      class="w-96 border border-white rounded-md bg-white mt-4 py-2 px-4 text-black foucas:outline-none"
    />
    <div
      id="ageAlert"
      class="bg-purple-300 w-96 py-2 px-10 rounded-lg mt-2 hidden"
    >
      Enter valid age
    </div>
    <input
      onkeyup="inputsValidation()"
      type="search"
      name="search"
      id="enterRePassword"
      placeholder="Repasword"
      class="w-96 border border-white rounded-md bg-white mt-4 py-2 px-4 text-black foucas:outline-none"
    />
    <div
      id="rePasswordAlert"
      class="bg-purple-300 w-96 py-2 px-10 rounded-lg mt-2 hidden"
    >
      Enter valid repassword
    </div>
  </div>
</div>
<div class="w-full   md:ms-0 lg:ms-6">
  <button
    id="submitBtn"
    disabled
    class="py-2 px-4 flex justify-center rounded-xl ms-64 md:mx-auto mt-4 bg-transparent text-red-600 border border-red-600 text-center"
  >
    Submit
  </button>
</div>
  
  
  `
  document.getElementById("rowData").innerHTML = cartona;

  submitBtn = document.getElementById("submitBtn")


  document.getElementById("enterName").addEventListener("focus", () => {
    nameInputTest = true
  })

  document.getElementById("enterEmail").addEventListener("focus", () => {
    emailInputTest = true
  })

  document.getElementById("enterPhone").addEventListener("focus", () => {
    phoneInputTest = true
  })

  document.getElementById("enterAge").addEventListener("focus", () => {
    ageInputTest = true
  })

  document.getElementById("enterPassword").addEventListener("focus", () => {
    passwordInputTest = true
  })

  document.getElementById("enterRePassword").addEventListener("focus", () => {
    repasswordInputTest = true
  })
  $("#loading").slideUp(800)

}

let nameInputTest = false;
let emailInputTest = false;
let phoneInputTest = false;
let ageInputTest = false;
let passwordInputTest = false;
let repasswordInputTest = false;

function inputsValidation() {
  if (nameInputTest) {
    if (nameValidation()) {

      document.getElementById("nameAlert").classList.replace("block", "hidden")

    } else {
      document.getElementById("nameAlert").classList.replace("hidden", "block")

    }
  }
  if (emailInputTest) {

    if (emailValidation()) {
      document.getElementById("emailAlert").classList.replace("block", "hidden")
    } else {
      document.getElementById("emailAlert").classList.replace("hidden", "block")

    }
  }

  if (phoneInputTest) {
    if (phoneValidation()) {
      console.log("hello");
      document.getElementById("numberAlert").classList.replace("block", "hidden")
    } else {

      console.log("hello");

      document.getElementById("numberAlert").classList.replace("hidden", "block")

    }
  }

  if (ageInputTest) {
    if (ageValidation()) {
      document.getElementById("ageAlert").classList.replace("block", "hidden")
    } else {
      document.getElementById("ageAlert").classList.replace("hidden", "block")

    }
  }

  if (passwordInputTest) {
    if (passwordValidation()) {
      console.log("omar");
      document.getElementById("passowrdAlert").classList.replace("block", "hidden")
    } else {
      document.getElementById("passowrdAlert").classList.replace("hidden", "block")
      console.log("erorr");
    }
  }
  if (repasswordInputTest) {
    if (repasswordValidation()) {
      document.getElementById("rePasswordAlert").classList.replace("block", "hidden")
    } else {
      document.getElementById("rePasswordAlert").classList.replace("hidden", "block")

    }
  }


  if (nameValidation() &&
    emailValidation() &&
    phoneValidation() &&
    ageValidation() &&
    passwordValidation() &&
    repasswordValidation()) {
    submitBtn.removeAttribute("disabled")
  } else {
    submitBtn.setAttribute("disabled", true)
  }
}

function nameValidation() {
  return (/^[a-zA-Z ]+$/.test(document.getElementById("enterName").value))
}

function emailValidation() {
  return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("enterEmail").value))
}

function phoneValidation() {
  return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("enterPhone").value))
}

function ageValidation() {
  return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("enterAge").value))
}

function passwordValidation() {
  return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("enterPassword").value))
}

function repasswordValidation() {
  return document.getElementById("enterRePassword").value == document.getElementById("enterPassword").value
}







function slider() {
  $("#loading").slideUp(1200, function () {
  });
}



$(function () {
  getMeals();
  slider()

  

  $("#openBtn").click(function () {
    let sideWidth = $("#linkes").innerWidth();
    // console.log(sideWidth);
    if ($("#side-menu").css("left") == "0px") {
      $("#side-menu").animate({ left: -sideWidth }, 500);
      $(".links li").animate({ top: 300 }, 500);

      // $(".links").addClass("hidden")

      $(".open-close-icon").addClass("fa-align-justify");
      $(".open-close-icon").removeClass("fa-x");
    } else {
      $(".open-close-icon").removeClass("fa-align-justify");
      $(".open-close-icon").addClass("fa-x");
      // $(".links").slideDown(2000)
      $("#side-menu").animate({ left: "0px" }, 500);
      // $(".links li").animate({ top: 0 }, 500);
      $(".links .cild-1").animate({ top: 0 }, 200, function () {
        $(".links .cild-2").animate({ top: 0 }, 200, function () {
          $(".links .cild-3").animate({ top: 0 }, 200, function () {
            $(".links .cild-4").animate({ top: 0 }, 200, function () {
              $(".links .cild-5").animate({ top: 0 }, 200);
            });
          });
        });
      });
    }
  });
}































);


