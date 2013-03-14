/**
 * Nested namespace
 * @namespace milan.personal.header.toolbox
 * @author Milan Adamovsky
 */

 define([
         "backbone",
         "root/main"
        ],
        function (Backbone, 
                  root)
         {
          // [Boilerplate Instructions]
          // This closure would usually not exist in a real life scenario.  I just use it for the demo
          var oldLocale,
              selectedJsonIndex = 0;
          
          return root.namespace("personal.header.toolbox",
                                {
                                 "Config" : Backbone.Model.extend({
                                                                   "defaults" : {
                                                                                 "locale" : "en/us",
                                                                                 "map" : {
                                                                                          "container" : "#main_header_container",
                                                                                          "content" : "toolbox_content",
                                                                                          "item" : ".item_link"
                                                                                         }
                                                                                }
                                                                  }),
                                 "Dictionary" : Backbone.Model.extend({
                                                                       "defaults" : {
                                                                                     "language" : ""
                                                                                    }
                                                                      }),                           
                                 "Model" : Backbone.Model.extend({
                                                                  "defaults" : {
                                                                                "content" : "",
                                                                                "id" : ""
                                                                               }
                                                                 }),
                                 "Collection" : root.Collection.extend(), 
                                 "Templates" : Backbone.Model.extend({
                                                                      "defaults" : {
                                                                                    "item" : "<li> \
                                                                                                <a class='item_link' href=''> \
                                                                                                 {{data.content}} \
                                                                                                </a> \
                                                                                              </li>"
                                                                                   }
                                                                     }),                                  
                                 "View" : root.View.extend({
                                                            "build" : function (index)
                                                                       {
                                                                        var config = this.config,
                                                                            configMap = config.get("map"),
                                                                            localized = this.dictionary,
                                                                            namespace = config.get("namespace"),
                                                                            namespaceObject = namespace.object,
                                                                        
                                                                            // [Boilerplate Instructions]
                                                                            // Here I am setting up an array of two JSONs which merely mimick two separate web service
                                                                            // calls.  
                                                                            json = [{
                                                                                     "collection" : [
                                                                                                     {
                                                                                                      "content" : {
                                                                                                                   "key" : "french"
                                                                                                                  },
                                                                                                      "id" : "language_link",
                                                                                                      "locale" : "fr/fr"
                                                                                                     }
                                                                                                    ]
                                                                                    },
                                                                                    {
                                                                                     "collection" : [
                                                                                                     {
                                                                                                      "content" : {
                                                                                                                   "key" : "english"
                                                                                                                  },
                                                                                                      "id" : "language_link",
                                                                                                      "locale" : "en/us"
                                                                                                     }
                                                                                                    ]
                                                                                    }][index] // [Boilerplate Instructions]
                                                                                              // We take the index variable that was passed in to us as a parameter to select
                                                                                              // only the JSON construct we are interested in demoing.  In a real life scenario
                                                                                              // this would not be needed since you would always only deal with one JSON unless
                                                                                              // you are planning to design some sort of a caching mechanism ;)
                                                                                   
                                                                            counter = 0,
                                                                            key = "";
                                                                      
                                                                        oldLocale = config.get("locale");
                                                                      
                                                                        for (key in json)
                                                                         {
                                                                          for (counter = 0; counter < json[key].length; counter++)
                                                                           {
                                                                            this[key].push(new namespaceObject.Model({
                                                                                                                       "content" : typeof json[key][counter].content === "string"
                                                                                                                                    ? json[key][counter].content
                                                                                                                                    : localized.get(json[key][counter].content.key),
                                                                                                                       "id" : json[key][counter].id,
                                                                                                                       "locale" : json[key][counter].locale
                                                                                                                      }));
                                                                           }
                                                                         }
                                                                           
                                                                        config = 
                                                                        configMap = 
                                                                        counter = 
                                                                        json = 
                                                                        key = 
                                                                        namespace = 
                                                                        namespaceObject = null;
                                                                        
                                                                       },
                                                           "clickItem" : function (evt)
                                                                          {
                                                                           var config = this.config,
                                                                               configMap = config.get("map"),
                                                                               currentTarget = evt.currentTarget,
                                                                               eventPool = root.pool,
                                                                               index,
                                                                               language,
                                                                               selectorContainer = configMap.container,
                                                                               selectorContent = configMap.content,
                                                                               
                                                                               selectorItem = configMap.item;
                                                                           
                                                                           evt.preventDefault();
                                                                          
                                                                           index = $(selectorItem, selectorContainer).index(currentTarget);
                                                                         
                                                                           // [Boilerplate Instructions]
                                                                           // This is what sets the whole re-localization into motion.  This is what takes advantage
                                                                           // of the pubsub pattern that we setup in our root's events() base method.  
                                                                           eventPool.trigger("locale:change",
                                                                                             this.collection.models[index].get("locale"));
                                                                                         
                                                                           selectedJsonIndex = selectedJsonIndex === 0
                                                                                                ? 1
                                                                                                : 0;
                                                                             
                                                                           this.localize(oldLocale,
                                                                                         this.main);
                                                                                                                   
                                                                           config =
                                                                           configMap =
                                                                           eventPool =
                                                                           index =
                                                                           selectorContainer =
                                                                           selectorContent =
                                                                           selectorItem = null;
                                                                          },                                                                       
                                                           "events" : function events()
                                                                       {
                                                                        
                                                                        var config = this.config,
                                                                            configMap = config.get("map"),
                                                                            events = {},
                                                                            selectorItem = configMap.item;
                                                                               
                                                                        // [Boilerplate Instructions]
                                                                        // Make sure to bind it to an existing function.  If the function that you are trying to bind does
                                                                        // not exist, you will get the error "TypeError: a is undefined".
                                                                        _.bindAll(this,
                                                                                  "clickItem");
                                                                                  
                                                                        events["click " + selectorItem] = "clickItem";
                                                                              
                                                                        config =
                                                                        configMap = null;
                                                                        
                                                                        return events;
                                                                        
                                                                       },                                                                         
                                                            "main" : function main()
                                                                      {
                                                                       var config = this.config,
                                                                           configMap = config.get("map"),
                                                                           eventPool = root.pool,
                                                                           namespace = config.get("namespace"),
                                                                           namespaceLiteral = namespace.literal,
                                                                           namespaceObject = namespace.object;
                                                          
                                                                       this.collection = new namespaceObject.Collection([],
                                                                                                                        {
                                                                                                                         "view" : this
                                                                                                                        });
                                                                      
                                                                       this.collection.bind("change", 
                                                                                            this.renderItems, 
                                                                                            this);
                                                                                            
                                                                       this.build(selectedJsonIndex);
                                                                     
                                                                       this.render();
                                                                             
                                                                       // [Boilerplate Instructions]
                                                                       // Here we trigger the custom event that we bound inside milan.personal.header.  Read the
                                                                       // comments in there to understand the flow.  If we do not have this whole mechanism in place
                                                                       // we would see the toolbox usually rendered on the left of the welcome message, but our goal
                                                                       // is to get it rendered on the right handside.
                                                                       eventPool.trigger(namespaceLiteral + ":ready");
                                                                       
                                                                       config =
                                                                       configMap = 
                                                                       eventPool = 
                                                                       namespace =
                                                                       namespaceLiteral = 
                                                                       namespaceObject = null
                                                                       
                                                                      },  
                                                            "render" : function ()
                                                                        {
                                                                         this.renderItems();
                                                                        },                                                                      
                                                            "renderItems" : function ()
                                                                              {
                                                                               var config = this.config,
                                                                                   configMap = config.get("map"),
                                                                                   configTemplates = this.templates,
                                                                                   html = "",
                                                                                   itemTemplate = configTemplates.get("item"),
                                                                                   
                                                                                   selectorContainer = configMap.container,
                                                                                   selectorContent = configMap.content,
                                                                                   
                                                                                   self = this;
                                                                             
                                                                              this.collection.each(function(currentModel) 
                                                                                                    {
                                                                                                     var content = currentModel.get("content"),
                                                                                                         id = currentModel.get("id");
                                                                                                                            
                                                                                                     html += itemTemplate({
                                                                                                                           "data" : {
                                                                                                                                     "content" : content,
                                                                                                                                     "id" : id
                                                                                                                                    }
                                                                                                                          });
                                                                                                                       
                                                                                                     content =
                                                                                                     currentModel = 
                                                                                                     css =
                                                                                                     id = null;
                                                                                                    });
                                                                                                        
                                                                               this.$el
                                                                                   .attr("id", selectorContent)
                                                                                   .empty()
                                                                                   .html(html);
                                                                                   
                                                                               this.$el.appendTo(selectorContainer);
                                                                               
                                                                               config =
                                                                               configMap =
                                                                               configTemplates = 
                                                                               selectorContainer = 
                                                                               selectorContent = null;
                                                                              },
                                                            "tagName" : "ul" 
                                                          })
                                });
         });