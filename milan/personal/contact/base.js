/**
 * Nested namespace
 * @namespace milan.personal.contact.base
 * @author Milan Adamovsky
 */

// [Boilerplate Instructions]
// This is a base component to be used mainly to extend sub-components that share similar functionality.
// This component should usually not be called directly.
 define([
         "backbone",
         "root/main"
        ],
        function (Backbone, 
                  root)
         {
          return root.namespace("personal.contact.base",
                                {                            
                                 "View" : root.View.extend({                        
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