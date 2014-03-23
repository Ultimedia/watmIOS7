appData.views.CreateActivityView = Backbone.View.extend({

    initialize: function () {
        appData.views.ActivityDetailView.model = new Activity();
        appData.events.createActivityTabsEvent.bind("formStageCompleteEvent", this.formStageCompleteEvent);
        
          Backbone.on('networkFoundEvent', this.networkFoundHandler);
          Backbone.on('networkLostEvent', this.networkLostHandler);
    }, 

    // phonegap device offline
    networkFoundHandler: function(){


    },

    // phonegap device back online
    networkLostHandler: function(){

    },
    
    render: function() { 
    	this.$el.html(this.template());
        this.currentActivityPage = '#watContent';

        appData.settings.currentPageHTML = this.$el;
        
        var view = new appData.views.CreateActivityInfoView({ model:  appData.views.ActivityDetailView.model});
        $('#createActivityContent', appData.settings.currentPageHTML).empty().append(view.render().$el);

        return this; 
    }, 

    events: {
      "click #submitButton": "subHandler"
    },

    subHandler: function(){
        if($('form').is('#wieForm')){
              Backbone.on('activityCreated', appData.views.CreateActivityWieView.activityCreatedHandler);
              appData.services.phpService.createActivity(appData.views.ActivityDetailView.model);
 
        }else{
            $('form',appData.settings.currentPageHTML).submit();
        }
    },


    formStageCompleteEvent: function(data){

        var location = data.location;
        var tab = data.tab;

        $('#createActivityTabs .cl-btn').removeClass('active');
        $(tab, appData.settings.currentPageHTML).addClass('active');

        // tab on activity detail
        $(this.currentActivityPage, appData.settings.currentPageHTML).removeClass('show').addClass('hide');
        $(location, appData.settings.currentPageHTML).removeClass('hide').addClass('show');

        this.currentActivityPage = location;

        var view;
        switch(location){
            case "#watContent":
                view = new appData.views.CreateActivityInfoView({ model:  appData.views.ActivityDetailView.model});
            break;

            case "#waarContent":
                view = new appData.views.CreateActivityLocationView({ model:  appData.views.ActivityDetailView.model});
            break;

            case "#wieContent": 
                view = new appData.views.CreateActivityWieView({ model:  appData.views.ActivityDetailView.model});
            break;
        }

        $('#createActivityContent', appData.settings.currentPageHTML).empty().append(view.render().$el);
        
    }
});

