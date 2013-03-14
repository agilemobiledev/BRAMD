/**
 * Nested namespace
 * 
 * @namespace milan.personal
 * @author Milan Adamovsky
 */

 define([
         "backbone",
         "root/main",
         "root/personal/header/main",
         "root/personal/navigation/main"
        ],
        function (Backbone,
                  root,
                  rootPersonalHeader,
                  rootPersonalNavigation)
         {
          // [Boilerplate Instructions]
          // We must return our namespace here so that we can dynamically instantiate it on-demand
          // as the page is requested.  In this case we are creating a new namespace that will be
          // accessed as milan.personal
          return root.namespace("personal",
                                {
                                 "Config" : Backbone.Model.extend({
                                                                   "defaults" : {
                                                                                 "locale" : "fr/fr",
                                                                                 "map" : {
                                                                                          // [Boilerplate Instructions]
                                                                                          // We map all CSS selectors throughout the app to abstract keys that
                                                                                          // we will use instead.  This will make your markup completely decoupled
                                                                                          // from your logic, and all you need to do if your markup changes is 
                                                                                          // update this map in one place without negatively impacting the integrity
                                                                                          // of your code.
                                                                                          //
                                                                                          // Example:
                                                                                          //
                                                                                          // "container" : "#some_container",
                                                                                          // "content" : ".some_content" 
                                                                                         }
                                                                                }
                                                                  }),                                 
                                 "Dictionary" : Backbone.Model.extend({
                                                                       "defaults" : {
                                                                                     // [Boilerplate Instructions]
                                                                                     // We introduce a model that will be responsible solely for the localization.
                                                                                     // This will allow us to keep our "data" model separate from our "localization"
                                                                                     // model.  This illustrates a good use case for having multiple models for one
                                                                                     // component.
                                                                                     "welcome" : ""
                                                                                    }
                                                                      }), 
                                 "Model" : Backbone.Model.extend({
                                                                  "defaults" : {
                                                                                // [Boilerplate Instructions]
                                                                                // Here we have a very simple model so we can see how we can interact with
                                                                                // it in our View.
                                                                                "first" : "Milan",
                                                                                "last" : "Adamovsky"
                                                                               }
                                                                 }),
                                 "Templates" : Backbone.Model.extend({
                                                                      "defaults" : {
                                                                                    // [Boilerplate Instructions]
                                                                                    // Put the templates in an object literal so you can select which
                                                                                    // template you want to work with in the current view.  Normally
                                                                                    // you would probably want to retrieve these templates separately
                                                                                    // in the form of a template file from which fragments would be
                                                                                    // cherry-picked.
                                                                                    // The square brackets represent localized content.  The curly
                                                                                    // brackets represent data model content.  These get processed in
                                                                                    // two separate runs.
                                                                                    "page" : "<b>[[data.welcome]]</b> <i>{{data.first}} {{data.last}}</i>"
                                                                                   }
                                                                     }),                                                                     
                                 "View" : root.View.extend({
                                                                     // [Boilerplate Instructions]
                                                                     // We introduce the new concept of a main function within a view.  This is the function
                                                                     // that is called within the intialize() function that is responsible for instantiating
                                                                     // the model or the collection and subsequently render the view.  The reason we want to
                                                                     // abstract it into a main() function is because we want to keep the flexibility of 
                                                                     // being able to pass it in as a referenced argument to the localize() as a callback
                                                                     // and to customize that callback's functionality in the event of collections for 
                                                                     // example - so that we do not have to hardcode the functionality in the localize()
                                                                     // method.  This means we need to prepare the function to take one parameter that passes
                                                                     // in the value for the locale in the localized identifier.  If there is no localization
                                                                     // this parameter will be empty.
                                                            "main" : function main()
                                                                      {
                                                                       var config = this.config,
                                                                           namespace = config.get("namespace"),
                                                                           namespaceObject = namespace.object;
                                                                                       
                                                                       // [Boilerplate Instructions]
                                                                       // Here we can see how we can access a Model from within our View within the
                                                                       // same namespace.  You do not usually need this.model if you won't be using
                                                                       // it, so be mindful of what you need.  Having said that, it might be a good
                                                                       // idea to just prep your namespace's View with a model to avoid any typos
                                                                       // down the road.
                                                                       this.model = new namespaceObject.Model();
                                                                    
                                                                       this.model.bind("change", 
                                                                                       this.render, 
                                                                                       this);
                                                                                       
                                                                       this.render();
                                                                       
                                                                       config =
                                                                       namespace =
                                                                       namespaceObject = null
                                                                      },
                                                            "remove" : function remove()
                                                                        {
                                                                         var cachedViews = this.cache.views,
                                                                             counter = cachedViews.length;
                                                                         
                                                                         if (counter > 0)
                                                                          {
                                                                           while (cachedViews[--counter])
                                                                            {
                                                                             cachedViews[counter].remove();
                                                                             cachedViews[counter] = null;
                                                                            }
                                                                           
                                                                           this.cache.views = [];
                                                                          }
                                                                         
                                                                         this.constructor.__super__.remove.call(this);
                                                                         
                                                                         cachedViews = 
                                                                         counter = null;
                                                                        },
                                                            "render" : function render()      
                                                                        {
                                                                         var cachedViews = this.cache.views,
                                                                             config = this.config,
                                                                             configMap = config.get("map"),
                                                                             model = this.model,
                                                                             pageTemplate,
                                                                             
                                                                             templateRegistry = this.templates,
                                                                             
                                                                             welcomeMessage = "";
                                                                         
                                                                         // [Boilerplate Instructions]
                                                                         // Since we handled the compilation of the template in our localization phase, we
                                                                         // no longer need to compile/process the template on subsequent model updates.
                                                                         // This is the benefit of keeping the compilation of the template in a separate
                                                                         // method than the method that is responsible for rendering the view.
                                                                         pageTemplate = templateRegistry.get("page");
                                                                      
                                                                         // [Boilerplate Instructions]
                                                                         // Here we preprocess our template with our model.  Keep in mind that here we call
                                                                         // our precompiled template (e.g. pageTemplate) since Underscore converts our template
                                                                         // into a JavaScript function. 
                                                                         // Essentially what we have done here is first take care of all the text that has nothing 
                                                                         // to do with the data model, and then plug in the data model whenever we render the view.
                                                                         // This allows us to technically have a localized preprocessed template that stays 
                                                                         // the same regardless of the data model changing.
                                                                         welcomeMessage = pageTemplate({
                                                                                                        "data" : this.model.toJSON()
                                                                                                       });
                                                                      
                                                                         // [Boilerplate Instructions]
                                                                         // Here we reap the benefits of returning the namespace from an AMD module by
                                                                         // allowing us to use an abstracted identifier instead of a hardcoded namespace.
                                                                         // In the example below we could've writted milan.personal.header.View but
                                                                         // then our code becomes locked into our namespace.  It is good to be able to
                                                                         // access the namespace both ways, but if abstraction is key, stay with the
                                                                         // variable as shown below.
                                                                         //
                                                                         // The other thing we do is push our view objects into our this.cache.views
                                                                         // cache.  This will let us do some automation down the road.  In the immediate
                                                                         // need we cache our view objects so that we can run a remove() on all of them
                                                                         // when we want to reset this main view.  The logic is that if the parent view
                                                                         // gets reset, or destroyed, all children views need to get removed too. Make sure
                                                                         // to follow this convention with subViews so you can leverage automation like this.
                                                                         cachedViews.push(new rootPersonalHeader.View({
                                                                                                                       "model" : {
                                                                                                                                  "message" : welcomeMessage
                                                                                                                                 },
                                                                                                                       "parent" : this
                                                                                                                      }));
                                                                                  
                                                                         // [Boilerplate Instructions]
                                                                         // If we don't have a model, we don't need to pass one in.  The only thing we
                                                                         // should always pass is 'this' as the 'parent' key.  This will allow us to
                                                                         // backtrack programmatically up the hierarchy chain if we wanted to.            
                                                                         cachedViews.push(new rootPersonalNavigation.View({
                                                                                                                           "parent" : this
                                                                                                                          }));
                                                                         
                                                                         config = 
                                                                         configMap = 
                                                                         model = 
                                                                         pageTemplate = 
                                                                         templateRegistry = 
                                                                         welcomeMessage = null;
                                                                        }                                                                           
                                                           })
                                });
         });