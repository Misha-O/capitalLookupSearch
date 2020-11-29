const searchInput = document.getElementById("search--input");
const searchResult = document.getElementById("search--result");

const searchAndFilter = async (searchText) => {
  const response = await fetch("../data/capitalByCountry.json");
  const countries = await response.json();

  // get matches to current input
  let checkMatches = countries.filter((oneCountry) => {
    const regex = new RegExp(`^${searchText}`, "gi");
    if (regex === null) {
      regex = "no information";
    }
    return oneCountry.country.match(regex) || oneCountry.city.match(regex);
  });

  // if input empty clear it out
  if (searchInput.value === "") {
    checkMatches = [];
    searchResult.innerHTML = "";
  }

  // shows results in html
  const outputResults = (matches) => {
    if (checkMatches.length > 0) {
      const html = checkMatches
        .map(
          (match) => `
      <div>
      <h3>${match.country} <span class="text-info">(${match.city})</span> </h3>
      </div>
      `
        )
        .join("");
      searchResult.innerHTML = html;
    }
  };
  outputResults(checkMatches);
};

searchInput.addEventListener("input", () => searchAndFilter(searchInput.value));
