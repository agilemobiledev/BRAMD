
require.config({
                "paths" : {
                           "backbone" : "libs/backbone/0.9.2/backbone-0.9.2.min",
                           "css" : "../css/", 
                           "images" : "../images/",                         
                           "jquery" : "libs/jquery/1.8.3/jquery-1.8.3.min", 
                           "locale" : "../locale/",
                           "root" : "../milan/",                          
                           "underscore" : "libs/underscore/1.4.1/underscore-1.4.1.min",
                           "templates" : "../templates/"
                        },
                // ,"urlArgs" : "bust=" +  (new Date()).getTime()
               });


require([
         "jquery",
         "backbone",
         "underscore",
         "root/main"
        ],
        function ($,
                  Backbone,
                  _,   
                  root)  // [Boilerplate Instructions]
                         // This can be whatever you want it to be - if you leave it abstract you can simply
                         // copy and paste the same code across projects since at this point it doesn't
                         // really matter.  Normally if my company was ACME I would probably import it as
                         // the acme identifier.
         {
          // [Boilerplate Instructions]
          // Here we re-configure Underscore to interpolate Moustache-like delimiters.  This is especially
          // helpful if you will inline ASP, PHP, JSP tags that may otherwise interfere.  
          _.templateSettings = {
                                "interpolate" : /\{\{([\s\S]+?)\}\}/g
                               };
          
          // [Boilerplate Instructions]  
          // If we want to start our application in a more traditional architecture we may want to begin
          // our app via a BackboneJS View for ACME's flower bakery department, we may do something like
          // this:       
          // new acme.bakery.View();
          //
          // If we want to have an Single Page Application architecture (SPA) then we want to start our
          // app with a BackboneJS Router.
          new root.Router();
          
         });
