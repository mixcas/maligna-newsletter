fs = require('fs');
Mailgun = require('mailgun-js');
path = require('path');

templatePath = process.env.TEMPLATE;
campaignId = process.env.CAMPAIGN;
to = process.env.TO;
api_key = process.env.APIKEY;
attachmentPath = process.env.ATTACHMENT;
attatchment = path.join(__dirname, attachmentPath);

//Your domain, from the Mailgun Control Panel
var domain = 'mg.maligna.net';

//Your sending email address
var from_who = 'hola@maligna.net';

// Read template file
fs.readFile(templatePath, 'utf8', function (error, template) {

  // If error reading template file
  if ( error ) {
    return console.log("File ", template, " couldn't be loaded: ", error);
  }

  // Prepate Mailgun
  var mailgun = new Mailgun({apiKey: api_key, domain: domain});

  var data = {
    //Specify email data
    from: from_who,
    //The email to contact
    to: to,
    //to: "test@mg.maligna.net",
    //Subject and text data  
    subject: 'ON | AX, el nuevo lanzamiento de MALIGNA',
    html: template,
    attachment: attatchment, 
    'o:campaign': campaignId
  }

  //Invokes the method to send emails given the above data with the helper library
  mailgun.messages().send(data, function (err, body) {
    //If there is an error, render the error page
    if (err) {
      console.log("got an error: ", err);
    }
    //Else we can greet    and leave
    else {
      //Here "submitted.jade" is the view file for this landing page 
      //We pass the variable "email" from the url parameter in an object rendered by Jade
      console.log(body);
    }
  });
});
