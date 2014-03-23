appData.views.CreateActivityInfoView = Backbone.View.extend({

    initialize: function () {
      appData.views.CreateActivityInfoView.addedSportHandler = this.addedSportHandler;
    },

    render: function() { 
      this.$el.html(this.template());
      appData.settings.currentModuleHTML = this.$el;
      
      // Sports autocomplete
      appData.views.CreateActivityInfoView.sportAutComplete = new AutoCompleteView({input: $("#sportInput", appData.settings.currentModuleHTML), model: appData.collections.sports, wait: 100, updateModel: appData.views.ActivityDetailView.model, updateID: "sport_id"}).render();
      this.setValidator();

      return this; 
    },

    events:{
      "change #participantsSlider": "participantsSliderHandler"
    },

    participantsSliderHandler: function(){
        $('#participants', appData.settings.currentModuleHTML).removeClass('hide').text($('#participantsSlider', appData.settings.currentModuleHTML).val() + " deelnemers");
    },

    subHandler: function(){
      $("#watForm",appData.settings.currentModuleHTML).submit();
    },

    addedSportHandler: function(data){
      Backbone.off("addedSportHandler");
      appData.views.ActivityDetailView.model.attributes.sport_id = data.sport_id;
      // all saved
      appData.events.createActivityTabsEvent.trigger('formStageCompleteEvent', appData.views.CreateActivityInfoView.tabTarget);
    },

    setValidator: function(){

        $('#wanneerInput', appData.settings.currentModuleHTML).val(new Date().toDateInputValue());

        $("#watForm",appData.settings.currentModuleHTML).validate({
          rules: {
            wanneerInput: {
              date: true
            },
            participants: {
              required: true,
              range: [2, 60]
            }
          },
          submitHandler: function(form) {
            appData.views.ActivityDetailView.model.attributes.participants = $('#participantsSlider', appData.settings.currentModuleHTML).val();
            appData.views.ActivityDetailView.model.attributes.title = $('#titelInput', appData.settings.currentModuleHTML).val();
            appData.views.ActivityDetailView.model.attributes.date = $('#wanneerInput', appData.settings.currentModuleHTML).val() + " " + $('#vanInput', appData.settings.currentModuleHTML).val();
            appData.views.ActivityDetailView.model.attributes.stopTime  = $('#totInput', appData.settings.currentModuleHTML).val();
            appData.views.ActivityDetailView.model.attributes.description = $('#omschrijvingInput', appData.settings.currentModuleHTML).val();

            appData.views.CreateActivityInfoView.tabTarget = {};
            appData.views.CreateActivityInfoView.tabTarget.location = "#waarContent";
            appData.views.CreateActivityInfoView.tabTarget.tab = "#waarTab";
      
            var selectedSport = appData.collections.sports.where({"sport_id": appData.views.ActivityDetailView.model.attributes.sport_id});
            if(selectedSport.length > 0){
                selectedSport = selectedSport[0];

                if(selectedSport.attributes.sport_title == $('#sportInput', appData.settings.currentModuleHTML).val()){
                  appData.events.createActivityTabsEvent.trigger('formStageCompleteEvent', appData.views.CreateActivityInfoView.tabTarget);
          
                }else{
                  Backbone.on("addedSportHandler",  appData.views.CreateActivityInfoView.addedSportHandler); 
                  appData.services.phpService.addSport($('#sportInput', appData.settings.currentModuleHTML).val(), "",""); 
                }
            }else{
                  Backbone.on("addedSportHandler",  appData.views.CreateActivityInfoView.addedSportHandler);
                  appData.services.phpService.addSport($('#sportInput', appData.settings.currentModuleHTML).val(), "",""); 
            }
          }
      });
    }
});