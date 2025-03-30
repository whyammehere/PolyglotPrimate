//console.log("TEST")

const url = 'https://api-free.deepl.com/v2/translate'; // DeepL API URL
const authKey = '4e9489c3-f4ca-44c0-9e61-8bcd30cd6006:fx'; // USE ENVIRO VARIABLE


var selectedLanguage = "EN"
var pageText = ""

//Get the active tab and execute a script to extract the text

chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const activeTab = tabs[0];
    
    // Execute content script on the active tab
    chrome.scripting.executeScript(
      {
        target: { tabId: activeTab.id },
        function: getTextFromPage
      },
      (results) => {
        // Output the extracted text in the popup
        //console.log(results);
        console.log(results[0].result);
        pageText = results[0].result;
        
      }
    );

  function getTextFromPage() {
      const html = document.body.innerText;
  
      //console.log("html");
      //console.log(html);

      // const regex = /(?<=^|>)[^<>]+(?=<|$)/g; // The 'g' flag for global search
      // let match;
      // const results = [];
  
      // while ((match = regex.exec(html)) !== null) {
      //     console.log(match);
      //     results.push(match[1]); // match[1] contains the content between '>' and '<'
      // }
  
      
      return html
  }
});



document.getElementById('translate').addEventListener('click', function() {
    // Get the dropdown element
    const languageSelect = document.getElementById('languages');
    
    //console.log(languageSelect)

    selectedLanguage = languageSelect.value; // Get the selected language code   

    //console.log(selectedLanguage)



    console.log("text:");
    console.log(pageText);


    // Data to send in the request body
    var data = {
        text: [pageText],
        target_lang: selectedLanguage
    };

    // Set up the request options
    const options = {
        method: 'POST',
        headers: {
            'Authorization': `DeepL-Auth-Key ${authKey}`,
            'Content-Type': 'application/json',
            //'User-Agent': 'YourApp/1.2.3'  // Optional, you can adjust as needed
        },
        body: JSON.stringify(data) // Convert data to JSON string
    };

    //query
    fetch(url, options)
    .then(response => {
        if (response.ok) {
        return response.json(); // Parse the JSON response
        } else {
        throw new Error(`Error: ${response.status}`);
        }
    })
    .then(translatedData => {
        // Print the translated result
        console.log(translatedData["translations"][0].text);
        const out = document.getElementById("output");
        out.textContent = translatedData["translations"][0].text;
        console.log("successful translation")
    })
    .catch(error => {
        console.error('There was an error!', error);
    });
});


