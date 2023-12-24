import inquirer from 'inquirer';
import qr from "qr-image";
import fs from "fs";

inquirer
  .prompt([
    /* Pass your questions in here */
    {
        message: "Type in your URL: ",
        name: "URL",
    },
    {
      message: "Enter the site name: ",
      name: "site",
    },
    {
      message: "do you want to see the contents of the file? y/n",
      name: "choice",
    },
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
    const url = answers.URL;
    const site = answers.site;
    var qr_svg = qr.image(url);
    qr_svg.pipe(fs.createWriteStream(site+'.png'));

    fs.appendFile("URL.txt", `${site} - ${url}\n`, (err)=>{
      if(err) throw err;
      console.log("the file has been saved!");
    });
    if(choice === "y"){
    fs.readFile("URL.txt","utf8", (err,data)=>{
      if(err) throw err;
      console.log(`The contents of the file are: \n ${data}`);
    });
  }
})
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });