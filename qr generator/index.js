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
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
    const url = answers.URL;
    const site = answers.site;
    var qr_png = qr.image(url);
    qr_png.pipe(fs.createWriteStream(site+'.png'));

    fs.appendFile("URL.txt", `${site} - ${url}\n`, (err)=>{
      if(err) throw err;
      console.log("the file has been saved!");
    });
    fs.readFile("URL.txt","utf8", (err,data)=>{
      if(err) throw err;
      console.log(`\nThe contents of the file are: \n ${data}`);
    });
})
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
