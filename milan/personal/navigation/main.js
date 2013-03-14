/**
 * Nested namespace
 * @namespace milan.personal.navigation
 * @author Milan Adamovsky
 */

 define([
         "backbone",
         "root/main"
         // [Boilerplate Instructions]
         // Notice we do not need to have "root/personal/main" as a prerequisite.  The reason for this is
         // because the dot notation represents only a logical namespace - not a functional hierarchy as 
         // in Object Oriented Programming.  If we were to force a prerequisite here, we would unnecessarily
         // load resources that we do not need in this file.  A component would ideally not be tied to its
         // calling component upwards (unless it is part of a larger component), only tied to its child 
         // components downwards.  This makes it modular and interchangeable.
        ],
        function (Backbone, 
                  root)
         {
          // [Boilerplate Instructions]
          // I like to align all my dot notation objects underneath eachother to that when the namespace changes
          // we don't have to realign the namespace object literal since the indentation of root.namespace will
          // remain constant.
          return root.namespace("personal.navigation",
                                {
                                 "Config" : Backbone.Model.extend({
                                                                   "defaults" : {
                                                                                 "locale" : "en/us",
                                                                                 "map" : {
                                                                                          // [Boilerplate Instructions]
                                                                                          // Always have a "container" where the $el will be injected.  This convention is 
                                                                                          // necessary in order to be able to automatically reset our view.
                                                                                          "container" : "nav",
                                                                                          // [Boilerplate Instructions]
                                                                                          // This is another important mapped key.  It is responsible for assigning the
                                                                                          // dynamically generated content element an id.  Keep in mind that by default it
                                                                                          // will create a div, so if you want to have it generate any other element, make
                                                                                          // sure to redefine tha tagName key.  Since this is always an id, make sure not
                                                                                          // to include the hash as part of the mapped value.
                                                                                          "content" : "navigation_container" // <-- Notice no sigils
                                                                                         }
                                                                                }
                                                                  }),
                                 "Model" : Backbone.Model.extend({
                                                                  "defaults" : {
                                                                                "css" : "navigation_item",
                                                                                "content" : "",
                                                                                "url" : ""
                                                                               }
                                                                 }),
                                 "Collection" : root.Collection.extend(),
                                 "Templates" : Backbone.Model.extend({
                                                                      "defaults" : {
                                                                                    // [Boilerplate Instructions]
                                                                                    // If I expect my view to be generated as part of a collection, I like to use a generic
                                                                                    // term such as "item" instead of something descriptive just to keep it moving, and so that
                                                                                    // we can anticipate a client/server contract that can be normalized.  It is easier to 
                                                                                    // anticiapte and optimize for an "item" key from a web service rather than have to code
                                                                                    // for a specific "book", "student", "fruit" key.
                                                                                    "item" : "<li class=\"{{css}}\"> \
                                                                                                <a href=\"{{url}}\"> \
                                                                                                  <div> \
                                                                                                    {{content}} \
                                                                                                  </div> \
                                                                                                </a> \
                                                                                              </li>"
                                                                                   }
                                                                     }),                                    
                                 "View" : root.View.extend({
                                                            "build" : function (localized)
                                                                       {
                                                                        var config = this.config,
                                                                            namespace = config.get("namespace"),
                                                                            namespaceObject = namespace.object,
                                                                        
                                                                            json = [
                                                                                    {
                                                                                     "content" : {
                                                                                                  "key" : "home"
                                                                                                 },
                                                                                     "url" : "#personal"
                                                                                    },
                                                                                    {
                                                                                     "content" : "blog",
                                                                                     "url" : "http://milan.adamovsky.com"
                                                                                    },
                                                                                    {
                                                                                     "content" : {
                                                                                                  "key" : "advice"
                                                                                                 },
                                                                                     "url" : "#advice"
                                                                                    },
                                                                                    {
                                                                                     "content" : {
                                                                                                  "key" : "contact"
                                                                                                 },
                                                                                     "url" : "#personal/contact"
                                                                                    }
                                                                                   ],
                                                                            collection = this.collection,
                                                                            counter = 0;
                                                                       
                                                                        for (; counter < json.length; counter++)
                                                                         {
                                                                          collection.push(new namespaceObject.Model({
                                                                                                                     "content" : typeof json[counter].content === "string"
                                                                                                                                  ? json[counter].content
                                                                                                                                  : localized[json[counter].content.key],
                                                                                                                     "url" : json[counter].url
                                                                                                                    }));
                                                                         }
                                                                          
                                                                        collection = 
                                                                        config = 
                                                                        counter = 
                                                                        json = 
                                                                        namespace = 
                                                                        namespaceObject = null;
                                                                       },
                                                            "main" : function main(localized)
                                                                      {
                                                                       var config = this.config,
                                                                           namespace = config.get("namespace"),
                                                                           namespaceObject = namespace.object;
                                                          console.log("main");
                                                                       // [Boilerplate Instructions]
                                                                       // Since we are dealing with a collection, we will never need to define this.model
                                                                       // and instead we define this.collection
                                                                       this.collection = new namespaceObject.Collection([],
                                                                                                                        {
                                                                                                                         "view" : this
                                                                                                                        });
                                                                      
                                                                       this.collection.bind("change", 
                                                                                            this.renderItems, 
                                                                                            this);
                                                                                            
                                                                       this.build(localized);
                                                                     
                                                                       this.render();
                                                                       
                                                                       config =
                                                                       namespace =
                                                                       namespaceObject = null
                                                                      },
                                                            "render" : function (localized)
                                                                        {
                                                                         var config = this.config,
                                                                             configMap = config.get("map");
                                                                         
                                                                         // [Boilerplate Instructions] 
                                                                         // Here we would just list execute all our render methods for this view here.  This is our
                                                                         // default view being rendered.  The reason we want to break it out into individual render
                                                                         // methods is that we will then be able to individually render parts when a corresponding
                                                                         // model key is updated.  This strategy gives us higher web app consistency.
                                                                         this.renderItems();
                                                                         
                                                                         config = 
                                                                         configMap = null;
                                                                        },
                                                            "renderItems" : function ()
                                                                             {
                                                                              var config = this.config,
                                                                                  configMap = config.get("map"),
                                                                                  templateRegistry = this.templates,
                                                                                  html = "",
                                                                                  
                                                                                  selectorContainer = configMap.container,
                                                                                  selectorContent = configMap.content,
                                                                                  
                                                                                  self = this
                                                                                  
                                                                                  templateItem = templateRegistry.get("item");
                                                                              console.log('renderItems');
                                                                              this.collection.each(function(currentModel) 
                                                                                                    {
                                                                                                     var cssClass = currentModel.get("css"),
                                                                                                         content = currentModel.get("content"),
                                                                                                         url = currentModel.get("url");
                                                                                                                           
                                                                                                     html += _.template(templateItem,
                                                                                                                        {
                                                                                                                         "css" : cssClass,
                                                                                                                         "content" : content,
                                                                                                                         "url" : url
                                                                                                                        });
                                                                                                                        
                                                                                                     cssClass = 
                                                                                                     content =
                                                                                                     url = null;
                                                                                                    });
                                                                              console.log(html);
                                                                              this.remove()
                                                                                  .$el
                                                                                  .addClass(selectorContent)
                                                                                  .html(html);
                                                                           
                                                                              $(selectorContainer).append(this.$el);
                                                                              
                                                                              config = 
                                                                              configMap =
                                                                              configTemplates =
                                                                              html = 
                                                                              selectorContainer = 
                                                                              selectorContent = 
                                                                              templateItem = 
                                                                              templateRegistry = null;
                                                                             },
                                                            "tagName" : "ul"
                                                           })
                                });
         });
         