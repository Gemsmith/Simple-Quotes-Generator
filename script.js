let quotesArray = [];
let pageLoaded = false;
const quoteContainer = document.getElementById("quote-container");
const quoteTag = document.getElementById("quote");
const authorTag = document.getElementById("author");
const loader = document.getElementById("loader");

// Get All Quotes from API
async function getAllQuotes() {
  loading();
  const api_url = "https://type.fit/api/quotes";
  try {
    const response = await fetch(api_url);
    quotesArray = await response.json();
    getNewQuote();
  } catch (error) {
    // Catch Error here
  }
}

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function loaded() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// Get 1 new Quote from All Quotes
function getNewQuote() {
  loading();
  min = 0;
  max = quotesArray.length - 1;

  newQuote = quotesArray[Math.floor(Math.random() * (max - min + 1) + min)];

  // Check if Author Name is there or not
  if (newQuote.author == null) {
    authorTag.textContent = "Unknown";
  } else {
    authorTag.textContent = newQuote.author;
  }

  // Quote Length Check
  if (quoteTag.textContent.length > 120) {
    quoteTag.classList.add("long-quote");
  } else {
    quoteTag.classList.remove("long-quote");
  }
  loaded();
  quoteTag.textContent = newQuote.text;
}

// On Twitter button click
function onTwitterClick() {
  // To remove the trailing period in the quotes
  let str = quoteTag.textContent;
  if (str.charAt(str.length - 1) === ".") {
    str = str.substr(0, str.length - 1);
  }
  const twitterUrl = `https://twitter.com/intent/tweet?text=${str} - ${authorTag.textContent}`;

  window.open(twitterUrl, "_blank");
}

getAllQuotes();
