/**
 * Root namespace
 * 
 * @namespace milan
 * @author Milan Adamovsky
 */

define([
        "backbone"
       ],
       function (Backbone)
        {
         var rootKey = "milan",
                        
             /**
              * Root namespace class
              * 
              * @namespace milan 
              */
             
             // [Boilerplate Instructions]
             // Keep in mind that when you name your base class you should follow the commonly accepted
             // Java naming convention of uppercasing your class to identify it as such.  If you need 
             // a multi-word identifier, make sure for it to begin with a leading uppercase character
             // such as MilanAdamovsky instead of milanAdamovsky. 
             Root = function Milan()
                     {
                      // [Boilerplate Instructions]
                      // Alias this object so you can reuse it in your show() method's require
                      // success callback so that you don't need to worry about your root node's  
                      // identifier and can keep your code abstract.
                      //
                      // Notice the second identifier is global since it doesn't have a var
                      // statement in front of it.  A little unclear to see, but hey, keeps the
                      // code short and your global close to your class name so you can tweak
                      // the two at the same time.
                      var self = 
                          window[rootKey] = this;

                      // [Boilerplate Instructions]
                      // Setup your pub/sub event pool.  This is what we will use for our publish and
                      // subscribe pattern within our code.
                      this.pool = _.extend({}, Backbone.Events);
                      
                      // [Boilerplate Instructions]
                      // Most of our views will most likely not have collections but when it does it
                      // will most likely have similar constructs.  This is good practice since it
                      // makes our code predictable, so we want to try to shy away from over
                      // engineer our collections for the sake of making our life complicated.                     
                      this.Collection = Backbone.Collection.extend({
                                                                    "initialize" : function (models,
                                                                                             options)
                                                                                    {
                                                                                     var config = options.view.config,
                                                                                         namespace = config.get("namespace"),
                                                                                         namespaceObject = namespace.object;
                                                                                                    
                                                                                     this.model = namespaceObject.Model;  
                                                                                            
                                                                                     config =
                                                                                     namespace = 
                                                                                     namespaceObject = null;
                                                                                    }
                                                                   });                  
                      // [Boilerplate Instructions]
                      // Here we hard-wire our Router to our main class.  We could abstract this if we
                      // wanted, but I like my name... soooo deal with it :)  Kidding aside, it's 
                      // easy to have your class be whatever you want it to be.  Simply swap out my
                      // name for whatever you want your base class to be (e.g. ACME).
                      //
                      // The reason I assign my class to an abstract identifier (root) is so I can just
                      // change my base class name up here without having to worry about any other places
                      // to change it throughout my code.  This will give me a higher code integrity
                      // reassurance since I muck with less code.
                      this.Router = Backbone.Router.extend({
                                                            "cache" : {
                                                                       "args" : {},
                                                                       "last" : [],
                                                                       "views" : []
                                                                      },
                                                            "default" : function (query)
                                                                         {
                                                                          // [Boilerplate Instructions]
                                                                          // We could do whatever we wanted for the default page, but in this case we will
                                                                          // simply call the show() method and pass in "home" as the section.  Since the
                                                                          // hash doesn't exist, we hardcode it.  If you prefer something else, simply change
                                                                          // the section that you pass into your "home".  
                                                                          this.show("personal");
                                                                         },
                                                            "initialize" : function ()
                                                                            {
                                                                             _.bindAll(this,
                                                                                       "show");
                                                                             
                                                                             // [Boilerplate Instructions]
                                                                             // You need at least one route defined or your history won't work!
                                                                             Backbone.history.start();
                                                                             
                                                                             // [Boilerplate Instructions]
                                                                             // Here we need a quick shortcut to our router object.  This will be useful
                                                                             // when we will want to call the navigate() method.  In my boilerplate 
                                                                             // the "app" property becomes accessible via your object, which in my example
                                                                             // would translate to milan.app.navigate() 
                                                                             Root.prototype.app = this;
                                                                            },
                                                            "routes" : {
                                                                        // [Boilerplate Instructions]
                                                                        // You need at least one route defined or your history won't work!
                                                                        "" : "default",
                                                                         // [Boilerplate Instructions]
                                                                        // To keep your boilerplate as transportable as possible we don't want
                                                                        // to hardcode any routes here, instead we will take the full path as
                                                                        // a parameter and split it up ourselves.  If, however, you do want to
                                                                        // take advantage of Backbone's routing features, please read the 
                                                                        // official Backbone documentation:
                                                                        // http://backbonejs.org/#Router-routes
                                                                        "*path" : "show"
                                                                      },
                                                            "show" : function (uri)
                                                                        {
                                                                         // [Boilerplate Instructions]
                                                                         // We want to capture this so we can pass it as a parent to an instantiated
                                                                         // view.  Here we use _this instead of self since we already have self in
                                                                         // the parent scope and don't want to lose access to it by overwriting it.
                                                                         var _this = this,
                                                                             counter = 0,
                                                                             lastUri = this.cache.last,
                                                                             lastViews = this.cache.views,
                                                                             newViews = [],
                                                                             part = "",
                                                                              
                                                                         // [Boilerplate Instructions]
                                                                         // You could get fancy with regular expressions here, but I will keep it simple
                                                                         // with a split that I will loop through.
                                                                             parts = uri.split('/') || uri,
                                                                             partsCount = parts.length,
                                                                             required = [],
                                                                             views = [];
                                                                        
                                                                         // [Boilerplate Instructions]
                                                                         // We need to cache this URI for the future.  This will be used mainly to determine
                                                                         // what part of the SPA we can destroy.
                                                                         this.cache.last = parts;
                                                                         
                                                                         
                                                                         // [Boilerplate Instructions]
                                                                         // This is one of the coolest things of this boilerplate below.  We are handling
                                                                         // our routing dynamically since we apply a strict naming convention discipline
                                                                         // that allows us to do so.  Essentially if a route looks like this a/b/c then
                                                                         // we know that the view for a AND b AND c need to be rendered.  This is why we
                                                                         // need to  
                                                                         // Next what we do is loop through our parts so we can build up all our pre-
                                                                         // requirements list for RequireJS.  Here we can see that by keeping our 
                                                                         // architecture consistent we can automate a lot of things since they now
                                                                         // become predictable.  This is why it is important to name all your files
                                                                         // containing JavaScript code as main.js.  You could name it anything else,
                                                                         // but key is in keeping it consistent.  We don't use jQuery's .map() or
                                                                         // other array manipulation functions that will evenetually be part of
                                                                         // native JavaScript to reduce the overhead of our boilerplate where possible. 
                                                                         // If you will only be using newer JavaScript engine, consider investigating
                                                                         // replacing this loop with array functions.
                                                                         for (;counter < partsCount; counter++)
                                                                          {
                                                                           // [Boilerplate Instructions]
                                                                           // We remove any identical view objects from our cache so we know which ones
                                                                           // we need to reset.
                                                                           
                                                                           part += "/" + parts[counter];
                                                                           
                                                                           if (lastUri[counter] === parts[counter])
                                                                            {
                                                                             newViews.push(lastViews[counter]);
                                                                             lastViews[counter] = null;
                                                                            }
                                                                           else
                                                                            required.push("root" 
                                                                                          + part 
                                                                                          + "/main");
                                                                                          
                                                                          }

                                                                         counter = lastViews.length;
                                                                         
                                                                         while (lastViews[--counter])
                                                                          {
                                                                           lastViews[counter].remove();
                                                                           lastViews.pop();
                                                                          }
                                                                          
                                                                         this.cache.views = lastViews = newViews;
                                                                         
                                                                         // [Boilerplate Instructions]
                                                                         // Instead of hardwiring it, what I do is leave it wide open to take any
                                                                         // path and just funnel it through to RequireJS to try and load up the
                                                                         // file.  Since my convention is to always use main.js as the script file
                                                                         // name, I can safely hardcode it into my require() call.  If you don't
                                                                         // follow my convention, feel free to add bloat code in here to handle
                                                                         // your convention appropriately.
                                                                         require(required,
                                                                                 function ()
                                                                                  {
                                                                                   var preRequisite,
                                                                                       preRequisites = arguments,
                                                                                       preRequisitesCount = preRequisites.length, 
                                                                                       count = 0;
                                                                                       
                                                                                  // [Boilerplate Instructions]
                                                                                  // Clear the views cache since we will repopulate it with new view objects.
                                                                                  // We cheat a little and clear it here so we don't have to shallow copy over 
                                                                                  // the object.
                                                                                  //console.log('Reset views cache');
                                                                                  //_this.cache.views = [];
                                                                         
                                                                                   for (;count < preRequisitesCount; count++)
                                                                                    { 
                                                                                     preRequisite = preRequisites[count];
                                                                                     // [Boilerplate Instructions]
                                                                                     // We do not hardcode our parameters since they will dynamically change
                                                                                     // based on the split uri parts.  Instead we will tap into the arguments
                                                                                     // construct and loop through it.
                                                                                     _this.cache.views.push(new preRequisite.View({
                                                                                                                                   // [Boilerplate Instructions]
                                                                                                                                   // Here we try to give a sense of hierarchy
                                                                                                                                   // to the backbone code so we have a way to
                                                                                                                                   // crawl up the chain that got us to any given
                                                                                                                                   // sub view from within that sub view by
                                                                                                                                   // reverse-traversing the parents.
                                                                                                                                   "parent" : _this
                                                                                                                                  }));
                                                                                     
                                                                                     // [Boilerplate Instructions]
                                                                                     // If you want to know which component you have loaded use this:
                                                                                     //  _this.cache.args[_this.cache.views[_this.cache.views.length - 1].config.get("namespace").literal] = arguments; 
                                                                                    }
                                                                                    
                                                                                   preRequisite =
                                                                                   preRequisites = 
                                                                                   preRequisitesCount = 
                                                                                   count = null;
                                                                                  });
                                                                   
                                                                         // [Boilerplate Instructions]
                                                                         // If you wanted to split the uri into its part, don't forget to null the
                                                                         // variables to help Internet Explorer.
                                                                         // parts = null;
                                                                        },
                                                          });
                                                          
                      // [Boilerplate Instructions]
                      // The namespace concept is not meant to indicate an object oriented programming pattern, however
                      // in this case we can borrow from OOP and use our root node as having some key methods that all
                      // our views should have.  Having a base class, we can extend() this base class going forward
                      // instead of Backbone.  Thia means in my example if we were to milan.View.extend() instead of
                      // Backbone.View.extend() in other files, those views would automagically inherit the methods
                      // listed below. The class below is not intended to be instantiated on its own, but rather extended
                      // in other views.                                     
                      this.View = Backbone.View.extend({
                                                        "build" : function build()
                                                                   {
                                                                    
                                                                   },
                                                        // [Boilerplate Instructions]
                                                        // We reserve the "cache" key to serve as our cache for various things.  In this
                                                        // case we have a "views" subkey which will be responsible for keeping track of
                                                        // any subviews that are instantiated.  This will become important when we want
                                                        // to remove() our parent view, and cascade down the remove() operation to the
                                                        // child views.  Notice that this would require for the remove() method to be
                                                        // overridden for it to leverage this.
                                                        "cache" : {
                                                                   "views" : []
                                                                  },
                                                        // [Boiledplate Instructions]
                                                        // Very important to keep this to an element that is dynamically created so that we can
                                                        // remove() it very easily in order to "reset" our web app state.
                                                        "el" : null,
                                                        // [Boiledplate Instructions]
                                                        // Here we define certain default event handlers needed for re-localization.  The thought
                                                        // is that you may want to broadcast a new locale to all your views.  This sets it up where
                                                        // you can do that.  Keep in mind that if you define an events hash, you effectively destroy
                                                        // your automatic localization and need to handle it yourself. 
                                                        "events" : function events()
                                                                    {
                                                                     var config = this.config,
                                                                         eventPool = self.pool,
                                                                         namespace = config.namespace || config.get("namespace"),
                                                                         namespaceLiteral = namespace.literal,
                                                              
                                                                         _this = this;

                                                                     config.on("change",
                                                                               function (attributes, changes)
                                                                                {
                                                                                 var locale;
                                                                                 
                                                                                 if (changes.changes.locale === true)
                                                                                  {
                                                                                   locale = attributes.changed.locale
                                                                                   _this.localize(locale,
                                                                                                  _this.main);
                                                                                  }
                                                                                  
                                                                                 locale = null;
                                                                                });
                                                                     
                                                                     eventPool.on("locale:change",
                                                                                  function ()
                                                                                   {
                                                                                    var locale = arguments[0];
                                                                                    
                                                                                    config.set("locale", locale);
                                                                                   
                                                                                    locale = null;
                                                                                   });
                                                                     
                                                                     eventPool = null;
                                                                     
                                                                     return {};
                                                                    },
                                                                       // [Boilerplate Instructions]
                                                                       // Most of our initialize() methods will be the same from view to
                                                                       // view since we are so fragmented in architecture.  Usually you should
                                                                       // be able to get away with using the same initialize() for all your
                                                                       // needs since it handles localization, stylesheet, scopification,
                                                                       // and some common context bindings out-of-the-box.  Nothing is 
                                                                       // obviously preventing you from overriding it with your own. 
                                                        "initialize" : function initialize(options)
                                                                        {
                                                                         var config = this.config,
                                                                             locale, 
                                                                             namespace = config.namespace || config.get("namespace"),
                                                                             namespaceLiteral = namespace.literal,
                                                                             namespaceObject = namespace.object;
                                                                             
                                                                         if (namespaceObject.Config)
                                                                          {
                                                                           this.config = new namespaceObject.Config(options);
                                                                           this.config.set("namespace", namespace);
                                                                          } 
                                                                         // [Boilerplate Instructions]
                                                                         // This is in case you want to use config as a simple hash instead of a Config
                                                                         // model.
                                                                         else if (options && options.config)
                                                                          this.config = _.extend(this.config, options.config);
                                                                         
                                                                         if (namespaceObject.Templates)
                                                                          this.templates = new namespaceObject.Templates();
                                                                           
                                                                         locale = this.config.get("locale");
                                                                       
                                                                         _.bindAll(this,
                                                                                   "build",
                                                                                   "localize",
                                                                                   "main",
                                                                                   "render",
                                                                                   "scopify",
                                                                                   "stylize");
                                                                                      
                                                                         this.scopify();   
                                                                                                 
                                                                         this.stylize();
                                                                         
                                                                         if (locale)
                                                                          this.localize(locale,
                                                                                        this.main);
                                                                         else
                                                                          this.main();
                                                                          
                                                                         locale = 
                                                                         options = null;
                                                                        },                                                                     
                                                                   // [Boilerplate Instructions]
                                                                   // Our localize() handles the localization of our web app.  It takes
                                                                   // two parameters.  The first parameters tells which locale we want
                                                                   // to resolve and the second one is a callback that gets executed
                                                                   // once the locale's taxonomy file is downloaded.  If the second
                                                                   // argument is not provided, a default behavior is assigned.  This
                                                                   // mainly allows a mechanism to handle collections and can thus also
                                                                   // be used to override this localization callback with custom behavior
                                                                   // that deviates from the standard view render.
                                                        "localize" : function localize(locale,
                                                                                       callback)
                                                                      {
                                                                       var config = this.config,
                                                                           configMap = config.get("map"),
                                                                           json,
                                                                           namespace = config.get("namespace"),
                                                                           namespaceLiteral = namespace.literal,
                                                                           namespaceObject = namespace.object,
                                                                           self = this,
                                                                           templates = this.templates.toJSON();
                                                                           
                                                                       // [Boilerplate Instructions]
                                                                       // Make sure you have the text.js module installed.  In here we
                                                                       // assume that there will be a main.json file at the namespaced
                                                                       // folder within the locale hierarchy on the filesystem.  In my
                                                                       // example locale is in ../locale.  Go back to the RequireJS 
                                                                       // configuration to see where you have your locale variable 
                                                                       // configured to point to.
                                                                       json = ["text!locale", 
                                                                               locale,
                                                                               namespaceLiteral.replace(".", "/", "g"),
                                                                               "main.json"].join("/");
                                                                                           
                                                                       require([
                                                                                json
                                                                               ],
                                                                               function (localized)
                                                                                {
                                                                                 // [Boilerplate Instructions]
                                                                                 // Here I blindly assume we have JSON available.  If you are
                                                                                 // in a browser that doesn't support JSON, you may want to 
                                                                                 // augment this code to require a JSON library that you can
                                                                                 // then define() as a pre-req.
                                                                                 localized = JSON.parse(localized);
                                                                                 
                                                                                 // [Boilerplate Instructions]
                                                                                 // If we have a Dictionary class in our component, we assume that the 
                                                                                 // component follows our localization caching strategy.
                                                                                 if (namespaceObject.Dictionary)
                                                                                  {          
                                                                                   // [Boilerplate Instructions]
                                                                                   // Just like with our normal model, we want our dictionary to be easily accessible
                                                                                   // so we plug it in as a property of our component.  As a matter of convention we
                                                                                   // will have this be the "dictionary" key. 
                                                                                   self.dictionary = new namespaceObject.Dictionary(localized);
                                                                                   
                                                                                   // [Boilerplate Instructions]
                                                                                   // We cache our "raw" templates since we usually don't really want to
                                                                                   // deal with non-processed templates directly anyway.  We need the
                                                                                   // cached copy so that when we change our locale, we know where the
                                                                                   // words go.  There should only ever be one dictionary per component
                                                                                   // so it makes it very easy to get to the "raw" templates whenever
                                                                                   // necessary.
                                                                                   self.dictionary.cache = _.extend({}, templates);
                                                                                           
                                                                                   self.dictionary.bind("change", 
                                                                                                        self.process, 
                                                                                                        self);
                                                                                   
                                                                                   // [Boilerplate Instructions]
                                                                                   // At this point we recognize the component accepts our convention of a 
                                                                                   // dictionary, therefore it is safe to bind the process method.
                                                                                   _.bindAll(self,
                                                                                             "process");
                                                                                             
                                                                                   self.process();
                                                                                  }
                                                                                  
                                                                                 if (typeof callback === "function")
                                                                                  callback.call(this, localized)
                                                                                 else
                                                                                  {                
                                                                                   self.model = new namespaceObject.Model();
                                                                                           
                                                                                   self.model.bind("change", 
                                                                                                   self.render, 
                                                                                                   self);
                                                                                                   
                                                                                   self.render();
                                                                                  }
                                                                                });
                                                                      
                                                                       config = 
                                                                       configMap = 
                                                                       json = 
                                                                       namespace = 
                                                                       namespaceLiteral = null;
                                                                      },
                                                        "main" : function main()
                                                                  {
                                                                   
                                                                  },
                                                        "process" : function process()
                                                                     {
                                                                      var config = this.config,
                                                                          template = "",
                                                                          templateRegistry = this.templates,
                                                                          templates = this.dictionary.cache;
                                                                      
                                                                      for (template in templates) 
                                                                       {
                                                                        // [Boilerplate Instructions]
                                                                        // If we have already compiled the template once, there is no reason for us to re-compile
                                                                        // it.
                                                                        if (typeof templateRegistry.get(template) !== "function")
                                                                         // [Boilerplate Instructions]
                                                                         // Here we need to give a root key to our data so that it can safely ignore undefined
                                                                         // keys. See https://github.com/documentcloud/underscore/issues/237.
                                                                         // The other thing we do here is double template() the template.  The first template()
                                                                         // call will handle the localization, and the second, outer, template() will take care
                                                                         // of the compilation of the localized template.  
                                                                         templateRegistry.set(template, 
                                                                                              _.template(_.template(templates[template],
                                                                                                                    {
                                                                                                                     "data" : this.dictionary.toJSON()
                                                                                                                    },
                                                                                                                    {
                                                                                                                     // [Boilerplate Instructions]
                                                                                                                     // Here we handle the square brackets for
                                                                                                                     // localization.
                                                                                                                     "interpolate" : /\[\[([\s\S]+?)\]\]/g
                                                                                                                    })));
                                                                       } 
                                                                       
                                                                      config = 
                                                                      template = 
                                                                      templateRegistry = 
                                                                      templates = null;
                                                                     },
                                                        "render" : function render()
                                                                    {
                                                                     
                                                                    },
                                                        "scopify" : function scopify()
                                                                     {
                                                                      var config = this.config,
                                                                          configMap = config.get("map"),
                                                                          css,
                                                                          namespace = config.get("namespace"),
                                                                          namespaceLiteral = namespace.literal,
                                                                          self = this;
                                                                          
                                                                      css = namespaceLiteral.replace(".", " ", "g");
                                                                        
                                                                      this.$el.addClass(css);
                                                                      
                                                                      config = 
                                                                      configMap = 
                                                                      css = 
                                                                      namespace = 
                                                                      namespaceLiteral = null;
                                                                     },
                                                        "stylize" : function stylize()
                                                                     {
                                                                      var config = this.config,
                                                                          configMap = config.get("map"),
                                                                          css,
                                                                          namespace = config.get("namespace"),
                                                                          namespaceLiteral = namespace.literal,
                                                                          self = this;
                                                                       
                                                                      css = ["text!css", 
                                                                             namespaceLiteral.replace(".", "/", "g"),
                                                                             "main.css"].join("/");
                                                                        
                                                                      require([
                                                                               css
                                                                              ],
                                                                              function (style)
                                                                               {
                                                                                $("<style>" 
                                                                                  + style
                                                                                  + "</style>").appendTo("head");
                                                                               });
                                                                     
                                                                      config = 
                                                                      configMap = 
                                                                      css = 
                                                                      namespace = 
                                                                      namespaceLiteral = null;
                                                                     } 
                                                       });
                                              
                      return this;
                     };
          
         /**
          * Determine if AMD support exists.  If no AMD support is found, a shim function is created 
          * to allow for all functions to execute properly as they are lazy loaded.
          * 
          * @author Milan Adamovsky
          */
         if (typeof define !== "function" 
             && !define.amd) 
          {
           define = function (namespace, 
                              dependencies,
                              callback)
                     {
                      callback();  
                     };
          }
         
         /**
          * Handles the dynamic assembly of a nested namespace. This means if a parent namespace
          * does not yet exist, it will automatically create such in order for your desired namespace
          * to be created.
          * 
          * @example
          *   root.namespace("new.name.space",
          *                  {
          *                   Model: Backbone.Model.extend({
          *                                                 ...
          *                                                }),
          *                   View: Backbone.View.extend({
          *                                               ...
          *                                              });
          * 
          *                  })
          * 
          * @param {String} namespace String containing the desired namespace to be created
          * @param {Object} literal Backbone object literal containing all models, views, etc. to be bound to the new namespace
          * @author Milan Adamovsky
          */
         // [Boilerplate Instructions]
         // Here we can see how abstracting my Milan class to a Root identifier gives me the flexibility
         // of reusing my boilerplate and adjust my base class name up top without having to touch the code
         // below.
         Root.prototype.namespace = function (namespace, 
                                              literal)
                                     {
                                      var count = 0,
                                          key,
                                          parts = namespace.split("."),
                                          partsCount = parts.length,
                                          verified = this;
                                     
                                      for (; count < partsCount; count++)
                                       {
                                        if (typeof verified[parts[count]] === "undefined")
                                          verified[parts[count]] = count === partsCount - 1
                                                                    ? literal
                                                                    : {};
                                        else if (count == partsCount - 1)
                                         for (key in literal)
                                          verified[parts[count]][key] = literal[key];
                                         
                                        verified = verified[parts[count]];
                                       }
                                      
                                      // [Boilerplate Instructions]
                                      // Here we have a little piece of magic happen.  We want to automatically populate our
                                      // namespace object with the literal and object values for the given namespace.  This 
                                      // will come handy once we want to write some abstracted code.  Having this piece of
                                      // code here.
                                      //
                                      // This holds a reference to the current namespace both in its literal form and object form.  We need
                                      // both for different purposes.  Usuallh the literal form is used to resolve paths to files whereas
                                      // the object form is used to abstractly reference to the current namespace.  Having this construct
                                      // allows us to abstract some code.
                                      if (!verified.View.prototype.config)
                                       verified.View.prototype.config = {};
                                       
                                      verified.View.prototype.config.namespace = {
                                                                                  "literal" : rootKey + "." + namespace,
                                                                                  "object" : verified       
                                                                                 };
                                      
                                      // [Boilerplate Instructions]
                                      // The next line helps out older Internet Explorer garbage collectors.  I have found
                                      // in my work with memory leaks that this not only helps the garbage collector but if
                                      // applied consistently throughout the code, it even improves performance.
                                      count = 
                                      key =
                                      parts =
                                      partsCount = null;
                                      
                                      // [Boilerplate Instructions]
                                      // We need to return verified as this lets us do some abstraction for automation
                                      // purposes (see show method above).
                                      return verified;
                                     };
                                     
         // [Boilerplate Instructions]
         // Here we instantiate our abstracted identifier.  Again, we improve our code integrity by reducing
         // the points of edits when your base class name changes.  Since it's merely an alias to your true
         // base class mentioned above, the type will be your base class name (in my example it will be Milan.)
         return new Root();
        });                                 
