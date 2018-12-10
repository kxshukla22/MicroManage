const fs = require('fs');
const filePath = "/etc/host";
const redirectPath = "127.0.0.1";
let websites = ["www.facebook.com","facebook.com"];
let delay = 10000;

let blocker = () => {
    let date = new Date();
    let hours = date.getHours();

    if(hours >= 23 && hours <6) {
        console.log('Time to block websites');
        fs.readFile(filePath, (err, data) => {
            fileContents = data.toString();
            for (let i=0; i<websites.length; i++) {
                let addWebsite = "\n" + redirectPath + " " + websites[i];
                if(fileContents.indexOf(addWebsite) < 0) {
                console.log('Website not present in hosts file');
                fs.appendFile(filePath, addWebsite, (err) => {
                    if (err) return console.log(err);
                    console.log('File updated Successfully');
                });
            } else {
                console.log('Website is present');
            }
            }
        });


    } else {
        console.log('Time to unblock websites');
        // Initialize the empty string
        let completeContent = '';

        //Read the file line by line
        fs.readFileSync(filePath)
        .toString()
        .split()
        .forEach((line) => {
            let flag=1;
            for (let i=0; i<websites.length; i++) {
                if (line.indexOf(websites[i]) >= 0) {
                    flag=0;
                    break;
                }
            }
                if (flag == 1) {
                    if (line === '')
                    completeContent += line;
                    else
                    completeContent += line + "\n";
                }
                });
                fs.writeFile(filePath, completeContent, (err) => {
                    if (err) {
                        return console.log('Error!', err);
                    }
                });
    }
      };

     blocker();
     setInterval(blocker,delay);
