/**
 * Nested namespace
 * @namespace milan.personal.header
 * @author Milan Adamovsky
 */

 define([
         "backbone",
         "root/main",
         "root/personal/header/toolbox/main"
        ],
        function (Backbone, 
                  root,
                  rootPersonalToolbox)
         {
          // [Boilerplate Instructions]
          // Do not forget to return your namespace in the AMD pattern so that you can abstract your
          // calls later on.
          return root.namespace("personal.header",
                                {
                                 "Config" : Backbone.Model.extend({
                                                                   "defaults" : {
                                                                                 // [Boilerplate Instructions]
                                                                                 // One should try not to define the config.namespace key as it is automagically populated by our
                                                                                 // base View - in my example milan.View().
                                                                                 "locale" : "en/us",
                                                                                 "map" : {
                                                                                          "container" : "#main_header_container",
                                                                                          "content" : "welcome_content",
                                                                                          "welcome" : "#welcome_content"
                                                                                         }
                                                                                }
                                                                  }),
                                 "Model" : Backbone.Model.extend({
                                                                  "defaults" : {
                                                                                "message" : ""
                                                                               }
                                                                 }),
                                 "Templates" : Backbone.Model.extend({
                                                                      "defaults" : {
                                                                                    "welcome" : "{{data.message}}"
                                                                                   }
                                                                     }),                                                                    
                                 "View" : root.View.extend({
                                                            "initialize" : function initialize(options)
                                                                            {
                                                                             var config = this.config,
                                                                                 namespace = config.namespace || config.get("namespace"),
                                                                                 namespaceObject = namespace.object;
                                                                                 
                                                                             if (namespaceObject.Config)
                                                                              {
                                                                               this.config = new namespaceObject.Config(options);
                                                                               this.config.set("namespace", namespace);
                                                                              } 
                                                                             else if (options && options.config)
                                                                              this.config = _.extend(this.config, options.config);
                                                                             
                                                                             this.model = new namespaceObject.Model(options.model);
                                                                         
                                                                             this.templates = new namespaceObject.Templates();
                                                                         
                                                                             _.bindAll(this,
                                                                                       "render",
                                                                                       "renderMessage",
                                                                                       "stylize");
                                                                                           
                                                                             this.model.bind("change:message", 
                                                                                             this.renderMessage, 
                                                                                             this);
                                                                             
                                                                             // [Boilerplate Instructions]
                                                                             // The stylize() function is inherited from our base View.  This is the function that
                                                                             // sucks in the stylesheets we need with the component.  You do not need to redefine
                                                                             // a stylize() function in this component - unless you want to override its default
                                                                             // behavior.                      
                                                                             this.stylize();
                                                                             
                                                                             this.render();
                                                                             
                                                                             config = 
                                                                             namespace = 
                                                                             namespaceObject = 
                                                                             options = null;
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
                                                            "render" : function ()
                                                                        {
                                                                         // [Boilerplate Instructions]
                                                                         // If a method does not need to query the config, you do not need to define it as I've done
                                                                         // below.  You could essentially leave it out.  If performance is key to your web app, then
                                                                         // by all means remove such unnecessary calls.  If maintainability, consistency, and risk
                                                                         // management is more important to you then you may want to just start each of your methods
                                                                         // with this as your "base".  There is little to no technical value to this convention.
                                                                         var config = this.config,
                                                                             configMap = config.get("map"),
                                                                             eventPool = root.pool,
                                                                             namespace = config.get("namespace"),
                                                                             namespaceLiteral = namespace.literal,
                                                                             self = this;
                                                                         
                                                                         // [Boilerplate Instructions] 
                                                                         // Here we would just list execute all our render methods for this view here.  This is our
                                                                         // default view being rendered.  The reason we want to break it out into individual render
                                                                         // methods is that we will then be able to individually render parts when a corresponding
                                                                         // model key is updated.  This strategy gives us higher web app consistency.
                                                                 
                                                                         
                                                                         // [Boilerplate Instructions]
                                                                         // Here we leverage Backbone's event pooling feature.  This lets us apply the publish
                                                                         // and subscribe pattern that in turn lets us control the flow of async calls.  In this
                                                                         // example the renderToolbox() has a require() call for the localization.  This means
                                                                         // that the function will complete once the require() callback completed.  Normally this
                                                                         // would not be a problem, but in this case we want things to render sequentially, so 
                                                                         // here we have an example of how we can leverage Backbone's event pool, pubsub pattern,
                                                                         // and custom events to enforce the sequence.
                                                                         //
                                                                         // The flow goes like this:  We bind our custom event.  This can be whatever you want it
                                                                         // to be.  I happen to choose namespace followed by an arbitrary keyword which I kept simply
                                                                         // to ":ready".  Now that we have the event binding, we define the callback that will be
                                                                         // executed once this bound event will get triggered.  The event will get triggered from
                                                                         // within renderToolbox().  
                                                                         eventPool.on(namespaceLiteral + ":ready",
                                                                                      function ()
                                                                                       {
                                                                                        self.renderMessage();
                                                                                       });
                                                                                               
                                                                         this.renderToolbox(); 
                                                                 
                                                                         
                                                                         config = 
                                                                         configMap = 
                                                                         eventPool = 
                                                                         namespace =
                                                                         namespaceLiteral = null;
                                                                        },
                                                            "renderMessage" : function renderMessage(model, message)
                                                                               {
                                                                                var config = this.config,
                                                                                    configMap = config.get("map"),
                                                                                    configTemplates = this.templates,
                                                                                    templateWelcome = configTemplates.get("welcome"),
                                                                                    
                                                                                    model = this.model,
                                                                                    
                                                                                    message = message || model.get("message"),
                                                                                    
                                                                                    selectorContainer = configMap.container,
                                                                                    selectorContent = configMap.content;   
                                                                                   
                                                                                this.$el
                                                                                    .attr("id", selectorContent)
                                                                                    .empty()
                                                                                    .html(_.template(templateWelcome,
                                                                                                     {
                                                                                                      "data" : {
                                                                                                                "message" : message
                                                                                                               }
                                                                                                     }));
                                                                                                     
                                                                                $(selectorContainer).append(this.$el);
                                                                                
                                                                                config = 
                                                                                configMap =
                                                                                configTemplates =
                                                                                message = 
                                                                                selectorContainer = 
                                                                                selectorContent = 
                                                                                templateWelcome = null;
                                                                               },
                                                            "renderToolbox" : function renderToolbox(model, message)
                                                                               {
                                                                                var cachedViews = this.cache.views,
                                                                                    eventPool = root.pool,
                                                                                    namespaceLiteral = this.config.get("namespace").literal,
                                                                                    namespaceLiteralToolbox,
                                                                                    view = new rootPersonalToolbox.View({
                                                                                                                         "parent" : this
                                                                                                                        });
                                                                               
                                                                                namespaceLiteralToolbox = view.config.get("namespace").literal
                                                                                
                                                                                eventPool.on(namespaceLiteralToolbox + ":ready",
                                                                                             function ()
                                                                                              {
                                                                                               // [Boilerplate Instructions]
                                                                                               // Here we trigger the custom event that we bound inside render().  Notice
                                                                                               // how it gets triggered from within the callback of another custom event. The
                                                                                               // reason we do this is so we can maintain the abstraction layer and not have
                                                                                               // to hard-code our namespace.  Since we do not know the namespace of the
                                                                                               // rootPersonalToolbox until its instantiation, we need to rely on yet another
                                                                                               // event triggered from within the component that says "now I'm ready" - thus 
                                                                                               // the arbitrary event suffix of ":ready" above.
                                                                                               eventPool.trigger(namespaceLiteral + ":ready");
                                                                                              });
                                                                                
                                                                                cachedViews.push(view);
                                                                                                                                 
                                                                                cachedViews = 
                                                                                namespaceLiteralToolbox = 
                                                                                view = null;
                                                                               }
                                                           })
                                });
         });