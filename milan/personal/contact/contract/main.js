/**
 * Nested namespace
 * @namespace milan.personal.contact.contract
 * @author Milan Adamovsky
 */

// [Boilerplate Instructions]
// This is virtually identical to contact.kudos so we could create a contact.base component that all of
// these would share.  Depending on time I may add it to this version of the boilerplate.
 define([
         "backbone",
         "root/main",
         "root/personal/contact/base"
        ],
        function (Backbone, 
                  root,
                  base)
         {
          return root.namespace("personal.contact.contract",
                                {
                                 "Config" : Backbone.Model.extend({
                                                                   "defaults" : {
                                                                                 "locale" : "en/us",
                                                                                 "map" : {
                                                                                          "budget" : "budget_input",
                                                                                          "buttons" : ".button_container",
                                                                                          "comments" : "comments_input",
                                                                                          "company" : "company_input",
                                                                                          "container" : "#main_container",
                                                                                          "content" : "contract_form",
                                                                                          "duration" : "duration_input",
                                                                                          "email" : "email_input",
                                                                                          "first" : "first_input",
                                                                                          "last" : "last_input",
                                                                                          "submit" : "submit_button"
                                                                                         }
                                                                                }
                                                                  }),                                 
                                 "Dictionary" : Backbone.Model.extend({
                                                                       "defaults" : {
                                                                                     "budget" : "",
                                                                                     "comments" : "",
                                                                                     "company" : "",
                                                                                     "duration" : "",
                                                                                     "email" : "",
                                                                                     "first" : "",
                                                                                     "last" : "",
                                                                                     "submit" : ""
                                                                                    }
                                                                      }),                           
                                 "Model" : Backbone.Model.extend({
                                                                  "defaults" : {
                                                                                "content" : "",
                                                                                "css" : "", 
                                                                                "id" : "",
                                                                                "name" : "",
                                                                                "type" : "input",
                                                                                "value" : ""
                                                                               },
                                                                  "validate" : function validate(data,
                                                                                                 options)
                                                                                {
                                                                                 debugger;
                                                                                }
                                                                 }),
                                 "Collection" : root.Collection.extend(), 
                                 "Templates" : Backbone.Model.extend({
                                                                      "defaults" : {
                                                                                    "button" : "<button id='{{data.id}}'> \
                                                                                                  {{data.content}} \
                                                                                                </button>",
                                                                                    "input" : "<input id='{{data.id}}' type='text' name='{{data.name}}' value='{{data.value}}' />",
                                                                                    "item" : "<label> \
                                                                                                <span> \
                                                                                                  {{data.content}} \
                                                                                                </span> \
                                                                                                {{data.element}} \
                                                                                              </label>"
                                                                                   }
                                                                     }),  
                                 "View" : root.View.extend({
                                                            "build" : function ()
                                                                       {
                                                                        var config = this.config,
                                                                            configMap = config.get("map"),
                                                                            localized = this.dictionary,
                                                                            namespace = config.get("namespace"),
                                                                            namespaceObject = namespace.object,
                                                                        
                                                                            json = {
                                                                                    "buttons" : [
                                                                                                 {
                                                                                                  "content" : {
                                                                                                               "key" : "submit"
                                                                                                              },
                                                                                                  "id" : configMap.submit,
                                                                                                  "type" : "button",
                                                                                                  "value" : ""
                                                                                                 }
                                                                                                ],
                                                                                    "collection" : [
                                                                                                    {
                                                                                                     "content" : {
                                                                                                                  "key" : "first"
                                                                                                                 },
                                                                                                     "id" : configMap.first,
                                                                                                     "type" : "input",
                                                                                                     "value" : ""
                                                                                                    },
                                                                                                    {
                                                                                                     "content" : {
                                                                                                                  "key" : "last"
                                                                                                                 },
                                                                                                     "id" : configMap.last,
                                                                                                     "type" : "input",
                                                                                                     "value" : ""
                                                                                                    },
                                                                                                    {
                                                                                                     "content" : {
                                                                                                                  "key" : "company"
                                                                                                                 },
                                                                                                     "id" : configMap.company,
                                                                                                     "type" : "input",
                                                                                                     "value" : ""
                                                                                                    },
                                                                                                    {
                                                                                                     "content" : {
                                                                                                                  "key" : "email"
                                                                                                                 },
                                                                                                     "id" : configMap.email,
                                                                                                     "type" : "input",
                                                                                                     "value" : ""
                                                                                                    },
                                                                                                    {
                                                                                                     "content" : {
                                                                                                                  "key" : "duration"
                                                                                                                 },
                                                                                                     "id" : configMap.duration,
                                                                                                     "type" : "input",
                                                                                                     "value" : ""
                                                                                                    },
                                                                                                    {
                                                                                                     "content" : {
                                                                                                                  "key" : "budget"
                                                                                                                 },
                                                                                                     "id" : configMap.budget,
                                                                                                     "type" : "input",
                                                                                                     "value" : ""
                                                                                                    },
                                                                                                    {
                                                                                                     "content" : {
                                                                                                                  "key" : "comments"
                                                                                                                 },
                                                                                                     "id" : configMap.comments,
                                                                                                     "type" : "input",
                                                                                                     "value" : ""
                                                                                                    }
                                                                                                   ]
                                                                                   }
                                                                                   
                                                                            counter = 0,
                                                                            key = "";
                                                                      
                                                                        for (key in json)
                                                                         {
                                                                          for (counter = 0; counter < json[key].length; counter++)
                                                                           {
                                                                            this[key].push(new namespaceObject.Model({
                                                                                                                       "content" : typeof json[key][counter].content === "string"
                                                                                                                                    ? json[key][counter].content
                                                                                                                                    : localized.get(json[key][counter].content.key),
                                                                                                                       "id" : json[key][counter].id,
                                                                                                                       "name" : json[key][counter].id,
                                                                                                                       "type" : json[key][counter].type,
                                                                                                                       "value" : json[key][counter].value
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

                                                            // [Boilerplate Instructions]
                                                            // !!!!!!!!!!!!!!!!!!!!!!!!!!
                                                            // Anything that follows should be in base.js, but due to some issues with the extend()
                                                            // I have temporarily placed it here.
                                                            "main" : function main()
                                                                      {
                                                                       var config = this.config,
                                                                           configMap = config.get("map"),
                                                                           namespace = config.get("namespace"),
                                                                           namespaceObject = namespace.object,
                                                                           selectorItem = configMap.item;
                                                          
                                                                       this.buttons = new namespaceObject.Collection([],
                                                                                                                     {
                                                                                                                      "view" : this
                                                                                                                     });
                                                                                                                     
                                                                       this.collection = new namespaceObject.Collection([],
                                                                                                                        {
                                                                                                                         "view" : this
                                                                                                                        });
                                                                      
                                                                       this.buttons.bind("change", 
                                                                                         this.renderButtons, 
                                                                                         this);
                                                                                            
                                                                       this.collection.bind("change", 
                                                                                            this.renderItems, 
                                                                                            this);
                                                                                            
                                                                       this.build();
                                                                     
                                                                       this.render();
                                                                             
                                                                       config =
                                                                       configMap = 
                                                                       namespace =
                                                                       namespaceObject = 
                                                                       selectorItem = null
                                                                      },  
                                                            "render" : function ()
                                                                        {    
                                                                         this.renderItems();
                                                                         this.renderButtons();
                                                                        },
                                                            "renderButtons" : function ()
                                                                               {
                                                                                var config = this.config,
                                                                                    configMap = config.get("map"),
                                                                                    configTemplates = this.templates,
                                                                                    html = "",
                                                                                    
                                                                                    selectorButtons = configMap.buttons,
                                                                                    
                                                                                    self = this;
                                                                                    
                                                                               this.buttons.each(function(currentModel) 
                                                                                                  {
                                                                                                   var content = currentModel.get("content"),
                                                                                                       css = currentModel.get("css"),
                                                                                                       id = currentModel.get("id"),
                                                                                                       name = currentModel.get("name"),
                                                                                                       type = currentModel.get("type"),
                                                                                                       value = currentModel.get("value");
                                                                                                                        
                                                                                                   html += configTemplates.get(type)({
                                                                                                                                      "data" : {
                                                                                                                                                "content" : content,
                                                                                                                                                "id" : id,
                                                                                                                                                "name" : name,
                                                                                                                                                "value" : value
                                                                                                                                               }
                                                                                                                                     })
                                                                                                                                  
                                                                                                                     
                                                                                                   content =
                                                                                                   currentModel = 
                                                                                                   css =
                                                                                                   id =
                                                                                                   name =
                                                                                                   type = 
                                                                                                   value = null;
                                                                                                  });
                                                                                                         
                                                                                $(selectorButtons).empty()
                                                                                                  .append(html);
                                                                                
                                                                                config =
                                                                                configMap =
                                                                                configTemplates =
                                                                                html =  
                                                                                selectorButtons = null;
                                                                               },                                                                        
                                                            "renderItems" : function ()
                                                                              {
                                                                               var config = this.config,
                                                                                   configMap = config.get("map"),
                                                                                   configTemplates = this.templates,
                                                                                   html = "",
                                                                                   itemTemplate = configTemplates.get("item"),
                                                                                   
                                                                                   selectorButtons = configMap.buttons.replace(/[\.\#]/, "", "g"),
                                                                                   selectorContainer = configMap.container,
                                                                                   selectorContent = configMap.content,
                                                                                   
                                                                                   self = this;
                                                                              
                                                                              this.collection.each(function(currentModel) 
                                                                                                    {
                                                                                                     var content = currentModel.get("content"),
                                                                                                         css = currentModel.get("css"),
                                                                                                         id = currentModel.get("id"),
                                                                                                         name = currentModel.get("name"),
                                                                                                         type = currentModel.get("type"),
                                                                                                         value = currentModel.get("value");
                                                                                                                            
                                                                                                     html += itemTemplate({
                                                                                                                           // [Boilerplate Instructions]
                                                                                                                           // Don't forget the first tier "data" key whenever you pass
                                                                                                                           // data to your template.
                                                                                                                           "data" : {
                                                                                                                                     "content" : content,
                                                                                                                                     "css" : css,
                                                                                                                                     "element" : configTemplates.get(type)({
                                                                                                                                                                            "data" : {
                                                                                                                                                                                      "id" : id,
                                                                                                                                                                                      "name" : name,
                                                                                                                                                                                      "value" : value
                                                                                                                                                                                     }
                                                                                                                                                                           })
                                                                                                                                    }
                                                                                                                          });
                                                                                                                       
                                                                                                     content =
                                                                                                     currentModel = 
                                                                                                     css =
                                                                                                     id =
                                                                                                     name =
                                                                                                     type = 
                                                                                                     value = null;
                                                                                                    });
                                                                                                        
                                                                               // Eventually we would want to have logic that only renders the differential
                                                                               // and not the whole collection.
                                                                               this.$el
                                                                                   .attr("id", selectorContent)
                                                                                   .empty()
                                                                                   .html("<div class='" + selectorButtons +"' />"
                                                                                         + html);
                                                                            
                                                                               this.$el.appendTo(selectorContainer);
                                                                               
                                                                               this.$el.fadeIn('slow');
                                                                               
                                                                               config =
                                                                               configMap =
                                                                               configTemplates = 
                                                                               selectorContainer = 
                                                                               selectorContent = null;
                                                                              },
                                                            "tagName" : "form"                                                                        
                                                          })
                                });
         });