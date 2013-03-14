/**
 * Nested namespace
 * @namespace milan.personal.contact
 * @author Milan Adamovsky
 */

 define([
         "backbone",
         "root/main"
        ],
        function (Backbone, 
                  root)
         {
          return root.namespace("personal.contact",
                                {
                                 "Config" : Backbone.Model.extend({
                                                                   "defaults" : {
                                                                                 "locale" : "en/us",
                                                                                 "map" : {
                                                                                          // [Boiletplate Instructions]
                                                                                          // Always have a "container" where the $el will be injected.  This convention is 
                                                                                          // necessary in order to be able to automatically reset our view.
                                                                                          "container" : "#choice_container",
                                                                                          // [Boilerplate Instructions]
                                                                                          // This is another important mapped key.  It is responsible for assigning the
                                                                                          // dynamically generated content element an id.  Keep in mind that by default it
                                                                                          // will create a div, so if you want to have it generate any other element, make
                                                                                          // sure to redefine tha tagName key.  Since this is always an id, make sure not
                                                                                          // to include the hash as part of the mapped value.
                                                                                          "content" : "choice_content", // NOT #choice_content <-- notice the hash
                                                                                          "item" : ".item_link"
                                                                                         }
                                                                                }
                                                                  }),
                                 "Dictionary" : Backbone.Model.extend({
                                                                       "defaults" : {
                                                                                     "contract" : "",
                                                                                     "kudos" : "",
                                                                                     "project" : ""
                                                                                    }
                                                                      }),                           
                                 "Model" : Backbone.Model.extend({
                                                                  "defaults" : {
                                                                                // [Boilerplate Instructions]
                                                                                // Try to reuse the same abstract keys for items in your models
                                                                                // and collections so again the code becomes more predictable and
                                                                                // maintainable.  It is a good idea to maintain a simple list of
                                                                                // keys that will be used throughout your app.
                                                                                "content" : "",
                                                                                "css" : "",
                                                                                "image" : "image.png",
                                                                                "url" : ""
                                                                               }
                                                                 }),
                                 "Collection" : root.Collection.extend(),
                                          // [Boilerplate Instructions]
                                          // If you forget to extend your root View, you will get some errors in your console since it 
                                          // won't know what to do with your localization, scopifying, etc.  If you want to take advantage
                                          // of all the sugar we add in our boilerplate, you will always need to extend your root View
                                          // rather than Backbone's base View class.
                                 "Templates" : Backbone.Model.extend({
                                                                      "defaults" : {
                                                                                    // [Boilerplate Instructions]
                                                                                    // Remember that it is very important to have the "data." prefix in all your
                                                                                    // placeholders.  This will ensure all your fields are getting replaced and
                                                                                    // this is what also allows us to skip over unmmatched fields.
                                                                                    "item" : "<a class=\"item_link\" href=\"{{data.url}}\"> \
                                                                                                <div class=\"item_container\"> \
                                                                                                  <div class=\"highlight_underlay\"> \
                                                                                                  </div> \
                                                                                                  <div class=\"highlight_overlay\"> \
                                                                                                    <img class=\"item_image\" src=\"{{data.image}}\" /> \
                                                                                                    <span> \
                                                                                                      {{data.content}} \
                                                                                                    </span> \
                                                                                                  </div> \
                                                                                                </div> \
                                                                                              </a>"
                                                                                   }
                                                                     }),                                          
                                 "View" : root.View.extend({
                                                            "build" : function ()
                                                                       {
                                                                        var config = this.config,
                                                                            localized = this.dictionary,
                                                                            namespace = config.get("namespace"),
                                                                            namespaceLiteral = namespace.literal,
                                                                            namespaceObject = namespace.object,
                                                                        
                                                                            json = [
                                                                                    {
                                                                                     "content" : {
                                                                                                  "key" : "project"
                                                                                                 },
                                                                                               // [Boilerplate Instructions]
                                                                                               // Here we can see how useful namespaceLiteral can lend
                                                                                               // itself.  We can see that if we ever choose to move our
                                                                                               // component to another namespace, it will automagically
                                                                                               // absorb the new namespace into all paths and source the
                                                                                               // files from there.  Of course, here we use a hardcoded
                                                                                               // json file that would normally come from a web service
                                                                                               // but it gives you an idea of what you can do.
                                                                                     "image" : "images/" 
                                                                                               + namespaceLiteral.replace(".", "/", "g") 
                                                                                               + "/project.jpg",
                                                                                     "url" : "personal/contact/project"
                                                                                    },
                                                                                    {
                                                                                     "content" : {
                                                                                                  "key" : "kudos"
                                                                                                 },
                                                                                     "image" : "images/" 
                                                                                               + namespaceLiteral.replace(".", "/", "g") 
                                                                                               + "/thumbs-up.png",
                                                                                     "url" : "personal/contact/kudos"
                                                                                    },
                                                                                    {
                                                                                     "content" : {
                                                                                                  "key" : "contract"
                                                                                                 },
                                                                                     "image" : "images/" 
                                                                                               + namespaceLiteral.replace(".", "/", "g") 
                                                                                               + "/contract.jpg",
                                                                                     "url" : "personal/contact/contract"
                                                                                    }
                                                                                   ],
                                                                            collection = this.collection,
                                                                            counter = 0;
                                                                       
                                                                        for (; counter < json.length; counter++)
                                                                         {
                                                                          collection.push(new namespaceObject.Model({
                                                                                                                     "content" : typeof json[counter].content === "string"
                                                                                                                                  ? json[counter].content
                                                                                                                                  : localized.get(json[counter].content.key),
                                                                                                                     "image" : json[counter].image,
                                                                                                                     "url" : json[counter].url
                                                                                                                    }));
                                                                         }
                                                                         
                                                                        collection = 
                                                                        config = 
                                                                        counter = 
                                                                        json = 
                                                                        namespaceObject = null;
                                                                       },
                                                           "clickItem" : function (evt)
                                                                          {
                                                                           var config = this.config,
                                                                               configMap = config.get("map"),
                                                                               currentTarget = evt.currentTarget,
                                                                               index,
                                                                               
                                                                               selectorContainer = configMap.container,
                                                                               selectorContent = configMap.content,
                                                                               
                                                                               selectorItem = configMap.item;
                                                                           
                                                                           evt.preventDefault();
                                                                          
                                                                           index = $(selectorItem, selectorContainer).index(currentTarget);
                                                                          
                                                                           root.app.navigate(this.collection.models[index].get("url"),
                                                                                             true);
                                                                          
                                                                           config =
                                                                           configMap =
                                                                           index =  
                                                                           selectorContainer = 
                                                                           selectorContent = 
                                                                           selectorItem = null;
                                                                          },
                                                                  // [Boilerplate Instructions]
                                                                  // Very important to keep this to an element that is dynamically created so that we can
                                                                  // remove() it very easily in order to "reset" our web app state.
                                                           "el" : null,
                                                           "events" : function events()
                                                                       {
                                                                        var config = this.config,
                                                                            configMap = config.get("map"),
                                                                                     // [Boilerplate Instructions]
                                                                                     // Since our super class has a defined events() method we need to chain
                                                                                     // the methods and combine its output.  We need to call() this to set
                                                                                     // the context of the events() of our super class to that of our current
                                                                                     // object.  This is core JavaScript magic rather than BackboneJS.
                                                                            events = this.constructor.__super__.events.call(this),
                                                                            selectorItem = configMap.item;
                                                                                
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
                                                                          namespace = config.get("namespace"),
                                                                          namespaceObject = namespace.object;
                                                         
                                                                      this.collection = new namespaceObject.Collection([],
                                                                                                                       {
                                                                                                                        "view" : this
                                                                                                                       });
                                                                     
                                                                      this.collection.bind("change", 
                                                                                           this.renderItems, 
                                                                                           this);
                                                                                           
                                                                      this.build();
                                                                    
                                                                      this.render();
                                                                      
                                                                      config =
                                                                      configMap = 
                                                                      namespace =
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
                                                                                  templateRegistry = this.templates,
                                                                                  html = "",
                                                                                  itemTemplate = templateRegistry.get("item"),
                                                                                  
                                                                                  selectorContainer = configMap.container,
                                                                                  selectorContent = configMap.content,
                                                                                  
                                                                                  self = this;
                                                                                  
                                                                             this.collection.each(function(currentModel) 
                                                                                                   {
                                                                                                    var content = currentModel.get("content"),
                                                                                                        css = currentModel.get("css"),
                                                                                                        image = currentModel.get("image"),
                                                                                                        url = currentModel.get("url");
                                                                                                                          
                                                                                                    html += itemTemplate({
                                                                                                                          // [Boilerplate Instructions]
                                                                                                                          // Don't forget the first tier "data" key whenever you pass
                                                                                                                          // data to your template.
                                                                                                                          "data" : {
                                                                                                                                    "content" : content,
                                                                                                                                    "css" : css,
                                                                                                                                    "image" : image,
                                                                                                                                    "url" : url
                                                                                                                                   }
                                                                                                                         });
                                                                                                                      
                                                                                                    content =
                                                                                                    currentModel = 
                                                                                                    css =
                                                                                                    image = 
                                                                                                    url = null;
                                                                                                   });
                                                                                                       
                                                                              // Eventually we would want to have logic that only renders the differential
                                                                              // and not the whole collection.
                                                                              this.$el
                                                                                  .attr("id", selectorContent)
                                                                                  .empty()
                                                                                  .html(html);
                                                                           
                                                                              $(selectorContainer).append(this.$el);
                                                                              
                                                                              config =
                                                                              configMap =
                                                                              configTemplates = 
                                                                              selectorContainer = 
                                                                              selectorContent = 
                                                                              templateRegistry = null;
                                                                             },
                                                           "tagName" : "div" // [Boilerplate Instructions]
                                                                             // If you want Backbone to generate any other element other than div, then this is the
                                                                             // place you would want to set it.  So if you want to have a list item generated as the content
                                                                             // element, then all you do is redefined this to "li"
                                                          })
                                });
         });