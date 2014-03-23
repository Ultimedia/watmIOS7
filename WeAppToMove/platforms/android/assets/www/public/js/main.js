(function(){

// data containers
var appData = {
  views: {},
  models: {},
  routers: {},
  utils: {},
  collections: {},
  adapters: {},
  settings: {},
  data: {},
  helpers: {},
  messages: {},
  services: {},
  events: {},
  forms: {},
  garbage: {},
  storage: {}
};

// settings
appData.settings.rootPath = "http://localhost/";
appData.settings.servicePath =  appData.settings.rootPath + "services/";
appData.settings.imagePath = appData.settings.rootPath + "common/uploads/";
appData.settings.badgesPath = appData.settings.rootPath + "common/badges/";
appData.settings.iconPath = appData.settings.rootPath + "public/css/assets/";
appData.settings.sportsPath = appData.settings.rootPath + "common/sports/";


appData.settings.getUserService = "getUser.php";
appData.settings.getUsersService = "getUsers.php";
appData.settings.addUserService = "addUser.php";
appData.settings.getSportsService = "getSports.php";
appData.settings.getActivitiesService = "getActivities.php";
appData.settings.getMessagesService = "getMessages.php";
appData.settings.getChallengesService = "getChallenges.php";
appData.settings.createActivityService = "createActivityService.php";
appData.settings.getUserFromFacebookID = "getUserFromFacebookID.php";
appData.settings.facebookUserToSQL = "facebookUserToSQL.php";
appData.settings.addMessageService = "addMessage.php";
appData.settings.getMediaService = "getMedia.php";
appData.settings.createActivityService = "createActivity.php";
appData.settings.getActivityUserService = "getActivityUser.php";
appData.settings.setGoingToActivityService = "setGoingToActivity.php";
appData.settings.getBuurtenService = "getBuurten.php";
appData.settings.getLocationsService = "getLocations.php";
appData.settings.addLocationService = "addLocation.php";
appData.settings.getMyPlannedActivities = "getMyPlannedActivities.php";
appData.settings.getMyActivities = "getMyActivities.php";
appData.settings.getFavouriteSportsService = "getFavouriteSports.php";
appData.settings.addFavouriteSportsService = "addFavouriteSports.php";
appData.settings.getUserFavouriteSportsService = "getUserFavouriteSports.php";
appData.settings.imageUploadService = "uploadService.php";
appData.settings.addPhotoToDatabase = "addPhotoToDatabase.php";
appData.settings.getMyAvatarService = "getMyAvatar.php";
appData.settings.getUserChallengesService = "getUserChallengesService.php";
appData.settings.updateAvatarService = "updateAvatar.php";
appData.settings.getMyChallengesService = "getMyChallenges.php";
appData.settings.joinChallengeService = "joinChallenge.php";
appData.settings.getBadgesService = "getBadges.php";
appData.settings.updateChallengeService = "updateChallengeScore.php";
appData.settings.addSportService = "addSport.php";
appData.settings.getFriendsService = "getMyFriends.php";
appData.settings.addFriendService = "addFriend.php";
appData.settings.getMyInvitationsService = "getMyInvitations.php";
appData.settings.inviteFriendsService = "inviteFriends.php";
appData.settings.handleInvitationsService = "handleInvitation.php";
appData.settings.removeFriendService = "removeFriend.php";
appData.settings.updateUserAvatarService = "updateUserAvatar.php";
appData.settings.uploadMediaNonNativeService = "uploadMediaNonNative.php";

appData.settings.defaultLocation = [51.20935, 3.22470];
appData.settings.dataLoaded = false;
appData.settings.userLoggedIn = false;

// messages
appData.messages.passwordIncorrect = "Je paswoord is niet correct";
appData.messages.noUser = "Er werd geen gebruiker met dit email adres gevonden, je kan <a href='#createUser'>hier</a> een nieuwe gebruiker aanmaken.";

/* Jquery Document Read */
$(document).on("ready", function () {
  document.addEventListener("deviceready", onDeviceReadyHandler, false);
  document.addEventListener("resume", onResumeHandler, false);
  document.addEventListener("offline", deviceOfflineHandler, false);
  document.addEventListener("online", deviceOnlineHandler, false);

  // phonegap device ready
  function onDeviceReadyHandler() {
      // Now safe to use the PhoneGap API
      appData.settings.phonegapLoaded = true;
  }

  // phonegap when the user returns to the app after minimizing it
  function onResumeHandler(){
    window.location.hash = "#";
  }

  // phonegap device offline
  function deviceOfflineHandler(){
    appData.settings.network = true;
  }

  // phonegap device back online
  function deviceOnlineHandler(){
    appData.settings.network = false;
  }


  appData.router = new appData.routers.AppRouter();
  appData.utils.templates.load(["HomeView", "DashboardView", "PlannerView", "ProfileView", "ActivityDetailView", "CreateActivityView", "CreateUserView", "NavigationView", "SettingsView", "SportSelectorView", "DashboardActivityView", "LoadingView", "HelperView", "ChallengeListView", "ActivityMessageView", "ActivityMessageView", "ActivityInfoView", "ActivityMediaView", "ActivityMessagesView", "ActivityMediaViewer", "ActivityInfoView", "CreateActivityLocationView", "CreateActivityInfoView", "CreateActivityWieView", "ProfileAvatarView", "ProfileChallengeView", "ProfileFriendsView", "FriendsListView", "FriendView", "ActivityUserView", "PlannerMyActivitiesView", "GoogleMapView", "FavouriteSportListView", "ActiveChallengeListView", "BadgeListView", "FriendInvitieView", "PlannerInvitedActivitiesView", "NoConnectionView"],

  // backbone loaded
  function () {

      appData.models.userModel = new User();

      appData.forms.sortOptions = [{"title": "Datum"},{"title": "Afstand"}, {"title": "Mijn Favoriete Sporten"}];
      appData.collections.sortOptions = new SortOptionsCollection(appData.forms.sortOptions);

      // New services class
      appData.services.phpService = new appData.services.PhpServices();
      appData.events.getMessagesSuccesEvent = _.extend({}, Backbone.Events);
      appData.events.getSportsSuccesEvent = _.extend({}, Backbone.Events);
      appData.events.getChallengesSuccesEvent = _.extend({}, Backbone.Events);
      appData.events.getActivitiesSuccesEvent = _.extend({}, Backbone.Events);
      appData.events.getMyActivitiesSuccesEvent = _.extend({}, Backbone.Events);
      appData.events.userLoggedInEvent = _.extend({}, Backbone.Events);
      appData.events.userLoggedInErrorEvent = _.extend({}, Backbone.Events);
      appData.events.userLoggedInPasswordErrorEvent = _.extend({}, Backbone.Events);
      appData.events.createUserEvent = _.extend({}, Backbone.Events);
      appData.events.createUserErrorEvent = _.extend({}, Backbone.Events);
      appData.events.getUserFromFacebookIDEvent = _.extend({}, Backbone.Events);
      appData.events.getUsersSuccesEvent = _.extend({}, Backbone.Events);
      appData.events.facebookUserToSQLEvent = _.extend({}, Backbone.Events);
      appData.events.postMessageSuccesEvent = _.extend({}, Backbone.Events);
      appData.events.getMediaSuccesEvent = _.extend({}, Backbone.Events);
      appData.events.createActivityTabsEvent = _.extend({}, Backbone.Events);
      appData.events.activityUsersSuccesEvent = _.extend({}, Backbone.Events);
      appData.events.goinToActivitySuccesEvent = _.extend({}, Backbone.Events);
      appData.events.getBuurtenEvent = _.extend({}, Backbone.Events);
      appData.events.updateActivitiesEvent = _.extend({}, Backbone.Events);
      appData.events.getLocationsSuccesEvent = _.extend({}, Backbone.Events);
      appData.events.getLatLonEvent = _.extend({}, Backbone.Events);

      appData.services.facebookService = new appData.services.FacebookServices();
      appData.events.facebookLoginEvent = _.extend({}, Backbone.Events);
      appData.events.facebookLoginErrorEvent = _.extend({}, Backbone.Events);
      appData.events.facebookGetFriendsEvent = _.extend({}, Backbone.Events);
      appData.events.facebookGetFriendsErrorEvent = _.extend({}, Backbone.Events);
      appData.events.facebookGetProfileDataEvent = _.extend({}, Backbone.Events);
      appData.events.facebookGetProfileDataErrorEvent = _.extend({}, Backbone.Events);


      appData.services.utilService = new appData.services.UtilServices();
      appData.events.locationHomeEvent = _.extend({}, Backbone.Events);
      appData.events.locationCreateActivityEvent = _.extend({}, Backbone.Events);

      // Create a new instance of the helperclass
      appData.helpers.phonegapHelper = new appData.views.HelperView();


      if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {

        appData.settings.rootPath = "http://192.168.0.205/";
        appData.settings.servicePath =  appData.settings.rootPath + "services/";
        appData.settings.imagePath = appData.settings.rootPath + "common/uploads/";
        appData.settings.badgesPath = appData.settings.rootPath + "common/badges/";
        appData.settings.iconPath = appData.settings.rootPath + "public/css/assets/";
        appData.settings.sportsPath = appData.settings.rootPath + "common/sports/";
  

        appData.settings.native = true;
        appData.settings.pictureSource = navigator.camera.PictureSourceType;
        appData.settings.destinationType = navigator.camera.DestinationType;

        // check to see if there is a working connection
        appData.services.utilService.checkConnection();

      } else {
        appData.settings.native = false;
      }

      appData.services.facebookService.facebookConnect();


      // see if we have a user in our localstorage
      if(window.localStorage.getItem("userModel")){

        var localUser = JSON.parse(window.localStorage.getItem("userModel"));

        appData.models.userModel = new User(localUser);
        appData.settings.userLoggedIn = true;

        // save the old data (so wen can retrieve if in case we don't have a working connection)
        appData.settings.storageFound = true;
        appData.storage = JSON.parse(window.localStorage.getItem("collections"));

      }

      // init backbone
      Backbone.history.start();
  });

});


Activity = Backbone.Model.extend({
	
	defaults: {
		messages: [],
		activity_id: "",
		date: "",
		description: "",
		location_id: "",
		location: "",
		media: [],
		sport_id: "",
		time: "",
		stopTime: "",
		title: "",
		user_id: "",
		buurt_id: "4",
		participants: "0",
		going: "",
		users: [],
		full: false
    },

	initialize: function(){
		this.setGoing();
	}, 

	setGoing: function(){
		this.attributes.going = this.attributes.users.length;
		this.isFull();
	},

	isFull: function(){

		if(this.attributes.going >= this.attributes.participants){
			this.attributes.full = true;
		}else{
			this.attributes.full = false;
		}
	}
});



Buurten = Backbone.Model.extend({
	initialize: function(){
		
	}
});



Challenge = Backbone.Model.extend({
	initialize: function(){
		
	}
});



Location = Backbone.Model.extend({
	initialize: function(){
		
	},

	label: function () {
        return this.get("location");
    }
});



Media = Backbone.Model.extend({
	initialize: function(){
		
	}
});



Message = Backbone.Model.extend({
	initialize: function(){
		
	}
});



SortOption = Backbone.Model.extend({
	initialize: function(){
		
	}
});



Sport = Backbone.Model.extend({
	defaults: {
		"object_class": ""
	},

	initialize: function(){

	},

	label: function () {
		return this.get("sport_title");
	}
});


User = Backbone.Model.extend({
	defaults: {
	    user_id: '',
	    name: '',
	    email: '',
	    gender: '',
	    facebook_data: {},
	    facebookUser: false,
	    current_location: "50.827404, 3.254647",
		strength_score: 0,
		stamina_score: 0,
		equipment_score: 0,
    	avatar: "default.png",
    	myChallenges: [],
    	myBadges: [],
    	age: []
    },
	initialize: function(){
		
	}
});



ActivitiesCollection = Backbone.Collection.extend({
	model: Activity,
	sort_key: 'distance', // default sort key
	
	initialize: function (models,options) { 
     this.sort_key = 'distance';
	},

    comparator: function(a, b) {
        // Assuming that the sort_key values can be compared with '>' and '<',
        // modifying this to account for extra processing on the sort_key model
        // attributes is fairly straight forward.
        a = a.get(this.sort_key);
        b = b.get(this.sort_key);
        return a > b ?  1
             : a < b ? -1
             :          0;
    },

    sort_by_attribute: function(sort_key) {
        this.sort_key = sort_key;

        this.sort();
        console.log(this);
    }
});

BuurtenCollection = Backbone.Collection.extend({
	
	model: Buurten,
	initialize: function (models,options) { 

	}
});

ChallengesCollection = Backbone.Collection.extend({
	
	model: Challenge,
	initialize: function (models,options) { 

	}
});

LocationsCollection = Backbone.Collection.extend({
	
	model: Location,
	initialize: function (models,options) { 

	}
});

MediaCollection = Backbone.Collection.extend({

	model: Media,
	initialize: function (models,options) { 

	}
});

MessagesCollection = Backbone.Collection.extend({

	model: Message,
	initialize: function (models,options) { 

	}



});

SortOptionsCollection = Backbone.Collection.extend({
	
	model: SortOption,
	initialize: function (models,options) { 

	}
});

SportsCollection = Backbone.Collection.extend({
	
	model: Sport,
	initialize: function (models,options) { 

	}

});








UsersCollection = Backbone.Collection.extend({
	
	model: User,
	initialize: function (models,options) { 

	}
});

appData.views.ActiveChallengeListView = Backbone.View.extend({

    initialize: function () {
    	this.model.attributes.badges_path = appData.settings.badgesPath;

    }, 

    render: function() { 
    	// model to template
    	this.$el.html(this.template(this.model.attributes));
        return this; 
    }

});




appData.views.ActivityDetailView = Backbone.View.extend({

    initialize: function () {
      console.log('----- In the initialize of ActivityDetailView -----');
      appData.views.ActivityDetailView.model = this.model;
    }, 


    render: function() { 
      this.$el.html(this.template(this.model.attributes));
      appData.settings.currentPageHTML = this.$el;

      this.currentActivityPage = '#praktischContent';
      
      // add the default page
      var defaultView = new appData.views.ActivityInfoView({model : appData.views.ActivityDetailView.model});
      $('#activityContent', appData.settings.currentPageHTML).empty().append(defaultView.render().$el);

      // user is admin? (show edit options)
      if(appData.models.userModel.get("user_id") == this.model.get("user_id")){
        $('#editPanel', appData.settings.currentPageHTML).removeClass('hide');
      }

      this.addMap();

      return this; 
    }, 

    shareButtonHandler: function(){
        //appData.services.phpService.updateChallenge(3, 40);
    },

    addMap: function(){
        appData.settings.mapAdded = true;
        
        var mapOptions = {
            zoom: 15,
            center: new google.maps.LatLng(14, 10),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true
        }
        var map = new google.maps.Map($('#activityMap',appData.settings.currentPageHTML)[0], mapOptions);
        
        var coordinates;
        if(this.model.attributes.coordinates){
            coordinates =  this.model.attributes.coordinates.split(',');

          var marker = new google.maps.Marker({
            position: new google.maps.LatLng(coordinates[0], coordinates[1]),
            map:  map,
            title: 'Huidige locatie',
            icon: appData.settings.iconPath + "map-icon@x2.png"
          });

          // resize and relocate map
          google.maps.event.addListenerOnce(map, 'idle', function() {
            google.maps.event.trigger(map, 'resize');
            map.setCenter(new google.maps.LatLng(coordinates[0], coordinates[1]), 13);
          });
        }
    },

    events: {
      "click #activityDetailTabs .cl-btn": "activeDetailTabsHandler",
      "click #navigateButton": "navigateClickHandler",
      "click #backButton": "backHandler",
      "click #shareButton": "sharePopopverClickHandler",
      "click #popover-close": "sharePopopverClickHandler"
    },

    sharePopopverClickHandler: function(e){
        $('#popover', appData.settings.currentPageHTML).toggleClass('hide');
    },

    backHandler: function(){
      window.history.back();
    },

    navigateClickHandler: function(){
      appData.router.navigate('navigater', true);
    },

    activeDetailTabsHandler: function(evt) { 
        // tab on activity detail
        $('#activityDetailTabs .cl-btn').removeClass('active');
        $(evt.target, appData.settings.currentPageHTML).addClass('active');

        var selectedPage = $(evt.target, appData.settings.currentPageHTML).attr('data');
        var view;

        switch(selectedPage){
          case "#praktischContent":
            view = new appData.views.ActivityInfoView({model : appData.views.ActivityDetailView.model});
          break;

          case "#mediaContent":
            view = new appData.views.ActivityMediaView({model : appData.views.ActivityDetailView.model});
          break;

          case "#messagesContent":
            view = new appData.views.ActivityMessagesView({model : appData.views.ActivityDetailView.model});
          break;
        }

        
        $('#activityContent', appData.settings.currentPageHTML).empty().append(view.render().$el);
        this.currentActivityPage = selectedPage;
    }

});



appData.views.ActivityInfoView = Backbone.View.extend({

    initialize: function () {
        appData.events.goinToActivitySuccesEvent.bind("goingToActivitySuccesHandler", this.goingToActivitySuccesHandler)
        appData.models.activityModel = this.model;
        
        Backbone.on('activityUsersSuccesEvent', this.getActivityUsersSuccesHandler);
        Backbone.on('goinToActivitySuccesEvent', this.setGoingToActivityCompleteHandler);
        appData.services.phpService.getActivityUsers(this.model); 

        appData.views.ActivityInfoView.model = this.model;
    },

    render: function() { 
    	this.$el.html(this.template(this.model.attributes));
    	appData.settings.currentModuleHTML = this.$el;

        $('#praktischContent .radio-list input[type="radio"]', this.$el).change(function() {
                    // Remove all checked
            $(this).parents('.radio-list').find('label').removeClass('checked');
            $(this).parent().addClass('checked');

            var selectedData = $(this).attr('id');
                selectedData = selectedData.split('-');
                selectedData = selectedData[1];
                appData.services.phpService.setGoingToActivity(appData.models.activityModel.attributes.activity_id, selectedData);
        });

      $('#messageBox', appData.settings.currentPageHTML).addClass('hide');

        return this; 
    },

    setGoingToActivityCompleteHandler: function(){
        appData.services.phpService.getActivityUsers(appData.views.ActivityInfoView.model); 
    },

    getActivityUsersSuccesHandler: function(data){

        appData.models.activityModel.userData = new UsersCollection(data);

        // 1 set toggle switch for going
        var goingTo = appData.models.activityModel.userData.where({user_id:appData.models.userModel.attributes.user_id.toString()});
            goingTo = goingTo[0];

        if(goingTo){
            $('#praktischContent .radio-list label').removeClass('checked');
            $("#going-" + goingTo.attributes.going, appData.settings.currentModuleHTML).parent().addClass('checked');
            $("#going-" + goingTo.attributes.going, appData.settings.currentModuleHTML).prop('checked', true);
        }else{
            $('#praktischContent .radio-list label').removeClass('checked');
            $("#going-0", appData.settings.currentModuleHTML).parent().addClass('checked');
            $("#going-0", appData.settings.currentModuleHTML).prop('checked', true);
        }

        // 2 show friends that are going
        $('#aanwezigContent').empty();
        appData.views.ActivityInfoView.userListView = [];
        appData.views.ActivityDetailView.model.attributes.users = data;


        var filteredUsers = _(appData.views.ActivityDetailView.model.attributes.users).where({"going": "1"});
        $(filteredUsers).each(function(index,userModel) {
          appData.views.ActivityInfoView.userListView.push(new appData.views.ActivityUserView({
            model : userModel
        }));

        appData.views.ActivityDetailView.model.attributes.going = filteredUsers.length;
        appData.views.ActivityDetailView.model.isFull();

        $('#aanwezigContent', appData.settings.currentModuleHTML).empty();
        _(appData.views.ActivityInfoView.userListView).each(function(dv) {
          $('#aanwezigContent', appData.settings.currentModuleHTML).append(dv.render().$el);
        });
        $('#participantStat').text(appData.views.ActivityInfoView.userListView.length + " / " + appData.views.ActivityDetailView.model.attributes.participants);    
      });

    }
});



appData.views.ActivityMediaViewer = Backbone.View.extend({

    initialize: function () {

    },

    render: function() { 

    	this.$el.html(this.template(this.model.toJSON()));
      return this; 
    }
});



appData.views.ActivityMessageView = Backbone.View.extend({

    initialize: function () {
    	appData.events.getMessagesSuccesEvent.bind("chatMessagesLoadSuccesHandler", this.chatMessagesLoadSuccesHandler);
    	appData.events.postMessageSuccesEvent.bind("postMessageSuccesHandler", this.postMessageSuccesHandler);
    }, 

    render: function() { 
    	// model to template
    	this.$el.html(this.template({user: this.model.attributes, imagePath: appData.settings.imagePath}));
        return this; 
    }

});


appData.views.ActivityMessagesView = Backbone.View.extend({

    initialize: function () {
    	appData.events.getMessagesSuccesEvent.bind("chatMessagesLoadSuccesHandler", this.chatMessagesLoadSuccesHandler);
    	appData.events.postMessageSuccesEvent.bind("postMessageSuccesHandler", this.postMessageSuccesHandler);
    	appData.services.phpService.getMessages(this.model); 
    }, 

    render: function() { 
    	// model to template
      this.$el.html(this.template(this.model.attributes));
      appData.settings.currentModuleHTML = this.$el;
      this.setValidators();

      $('#messageBox', appData.settings.currentPageHTML).removeClass('hide');

      return this; 
    },

    events: {
      "click #messageSubmit": "messageSubmitHandler"
    },

    postMessageSuccesHandler: function(){

      // update messages
      appData.services.phpService.getMessages(appData.views.ActivityDetailView.model);  
    },

    chatMessagesLoadSuccesHandler: function(messages){

      appData.views.ActivityDetailView.model.attributes.messages = messages;

      if(appData.views.ActivityDetailView.model.attributes.messages.length > 0){

          appData.views.ActivityDetailView.messagesListView = [];
          appData.views.ActivityDetailView.model.attributes.messages.each(function(message) {
            appData.views.ActivityDetailView.messagesListView.push(new appData.views.ActivityMessageView({
              model : message
            }));
        });

        $('#messagesContent ul', appData.settings.currentModuleHTML).empty();
        _(appData.views.ActivityDetailView.messagesListView).each(function(dv) {
            $('#messagesContent ul', appData.settings.currentModuleHTML).append(dv.render().$el);
        });
      }else{

      }
    },

    setValidators: function(){
      $("#messageForm",appData.settings.currentModuleHTML).validate({
          submitHandler: function(form) {
            var message = $('#messageInput', appData.settings.currentModuleHTML).val();
            $('#messageInput', appData.settings.currentModuleHTML).empty();
            
            appData.services.phpService.addMessage(message, appData.views.ActivityDetailView.model.attributes.activity_id);   
          }
      });
    },

    messageSubmitHandler: function(){
      $("#messageForm",appData.settings.currentModuleHTML).submit();
    }


});


appData.views.ActivityUserView = Backbone.View.extend({

    initialize: function () {
    
    }, 

    render: function() { 
    	this.model.imagePath = appData.settings.imagePath;

    	// model to template
    	this.$el.html(this.template(this.model));
        return this; 
    }

});


appData.views.ActivityMediaView = Backbone.View.extend({

    initialize: function () {
      appData.events.getMediaSuccesEvent.bind("mediaLoadSuccesHandler", this.getMediaLoadSuccesHandler);
      appData.services.phpService.getMedia(this.model); 
      appData.views.ActivityMediaView.model = this.model;
      appData.views.ActivityMediaView.fileUploadedHandler = this.fileUploadedHandler;
      appData.views.ActivityMediaView.addPhotoToDatabaseHandler = this.addPhotoToDatabaseHandler;

      appData.views.ActivityMediaView.win = this.win;
    },

    events: {
      "click #addMediaButton": "capturePhotoEditHandler",
      "change #nonNativeFileField":"nonNativeFileSelectedHandler",
      "submit #mediaForm": "mediaFormSubmitHandler"
    },

    getMediaLoadSuccesHandler: function(media){

      appData.views.ActivityDetailView.mediaListView = [];
      appData.views.ActivityDetailView.model.attributes.media = media;
      appData.views.ActivityDetailView.model.attributes.media.each(function(mediaModel) {

          var mediaUser = appData.collections.users.where({user_id:mediaModel.attributes.user_id});
              mediaUser = mediaUser[0];
              mediaModel.attributes.userModel = mediaUser.attributes;
              mediaModel.attributes.url = mediaModel.attributes.url;
              mediaModel.attributes.imagePath = appData.settings.imagePath;

          appData.views.ActivityDetailView.mediaListView.push(new appData.views.ActivityMediaViewer({
            model : mediaModel
          }));
      });

      $('#mediaContenList', appData.settings.currentModuleHTML).empty();
      _(appData.views.ActivityDetailView.mediaListView).each(function(dv) {
          $('#mediaContenList', appData.settings.currentModuleHTML).append(dv.render().$el);
      });
    },

    render: function() { 
      this.$el.html(this.template(this.model.attributes));
      appData.settings.currentModuleHTML = this.$el;

      // Hide the upload button if we're not on a native device
      if(appData.settings.native){

      }else{
        $("#addMediaButton", appData.settings.currentModuleHTML).click(function(){
           $("#nonNativeFileField", appData.settings.currentModuleHTML).trigger('click');
           return false;
        });
      }

      $('#messageBox', appData.settings.currentPageHTML).removeClass('hide').css('opacity', 0);

        return this; 
    },

    mediaFormSubmitHandler: function(event){

      console.log('submit');
      event.stopPropagation(); // Stop stuff happening
      event.preventDefault(); // Totally stop stuff happening

      // Create a formdata object and add the files
      var data = new FormData();
      $.each(appData.views.ActivityMediaView.files, function(key, value)
      {
        data.append(key, value);
      });

      Backbone.on('fileUploadedEvent', appData.views.ActivityMediaView.fileUploadedHandler);
      appData.services.phpService.uploadMediaNonNative(data);
    },

    nonNativeFileSelectedHandler: function(evt){
        // upload script
        // do some checks
        var files = evt.target.files;
        appData.views.ActivityMediaView.files = files;

        $('#mediaForm', appData.settings.currentModuleHTML).submit();
    },

    fileUploadedHandler: function(data){
      Backbone.off('fileUploadedEvent');
      
      var filename = data.files[0].replace(/^.*[\\\/]/, '');
      console.log(filename);

      Backbone.on('addPhotoToDatabaseHandler', appData.views.ActivityMediaView.addPhotoToDatabaseHandler);
      appData.services.phpService.addPhotoToDatabase(filename, appData.views.ActivityMediaView.model.attributes.activity_id);
    },

    capturePhotoEditHandler: function() {

      var page = this.$el;

      // Retrieve image file location from specified source
      navigator.camera.getPicture(this.uploadPhoto,
        function(message) { 
        },{ quality: 50, targetWidth: 640, targetHeight: 480, destinationType: navigator.camera.DestinationType.FILE_URI, sourceType: navigator.camera.PictureSourceType.CAMERA }
      );

        //appData.services.phpService.upploadMediaNonNative(); 
    },

    uploadPhoto: function(imageURI) {
      var options = new FileUploadOptions();
      options.fileKey="file";
      options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
      options.mimeType="image/jpeg";

      var params = new Object();
      params.value1 =  options.fileName;
      appData.views.ActivityMediaView.uploadedPhotoUrl = options.fileName;

      options.params = params;
      options.chunkedMode = false;

      var ft = new FileTransfer();  
      ft.upload(imageURI, appData.settings.servicePath + appData.settings.imageUploadService, appData.views.ActivityMediaView.win(), null, options);    
    },

    win: function(r) {
      Backbone.on('addPhotoToDatabaseHandler', appData.views.ActivityMediaView.addPhotoToDatabaseHandler);
      appData.services.phpService.addPhotoToDatabase(appData.views.ActivityMediaView.uploadedPhotoUrl, appData.views.ActivityMediaView.model.attributes.activity_id);
    },

    addPhotoToDatabaseHandler: function(){
      // get images from database
      Backbone.off('addPhotoToDatabaseHandler');
      appData.services.phpService.getMedia(appData.views.ActivityMediaView.model); 
    }
});



appData.views.BadgeListView = Backbone.View.extend({

    initialize: function () {
    	this.model.attributes.badges_path = appData.settings.badgesPath;

    }, 

    render: function() { 
    	// model to template
    	this.$el.html(this.template(this.model.attributes));
        return this; 
    }

});




appData.views.ChallengeListView = Backbone.View.extend({

    initialize: function () {
    	this.model.attributes.badges_path = appData.settings.badgesPath;

    }, 

    render: function() { 
    	// model to template
    	this.$el.html(this.template(this.model.attributes));
        return this; 
    },

    events: {
    	"click .joinChallenge": "joinChallengeClickHandler"
    },

    joinChallengeClickHandler: function(evt){
    	appData.services.phpService.joinChallenge($(evt.target).attr('challenge-id'));
    }

});




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

appData.views.CreateActivityLocationView = Backbone.View.extend({

    initialize: function () {
        appData.events.locationCreateActivityEvent.bind('locationSuccesHandler', this.locationSuccesHandler);
        appData.events.locationCreateActivityEvent.bind('locationErrorHandler', this.locationErrorHandler);
    
        appData.events.getLatLonEvent.bind('getLatLonSuccesHandler', this.getLatLonSuccesHandler);
        Backbone.on('addedLocationSuccesEvent', this.addedLocationSuccesEvent);

        this.currentMapLocation ="";
        this.wait = false;

        appData.views.CreateActivityLocationView.setMarkers = this.setMarkers; 
        appData.views.CreateActivityLocationView.tabTarget = {};
        appData.views.CreateActivityLocationView.tabTarget.location = "#wieContent";
        appData.views.CreateActivityLocationView.tabTarget.tab = "#wieTab";
        appData.views.CreateActivityLocationView.markers = [];
        appData.views.CreateActivityLocationView.clearMarkers = this.clearMarkers;
    },

    events: {
        "keyup #locationInput": "locationChangeHandler"
    },


    getLatLonSuccesHandler: function(data){

        if(data){
            if(data.geometry){
                appData.views.CreateActivityLocationView.currentMapLocation = data.geometry.location.lat + "," + data.geometry.location.lng;
                appData.views.CreateActivityLocationView.setMarkers(data.geometry.location.lat, data.geometry.location.lng, data.formatted_address);
            }
        }
    },

    locationChangeHandler: function(){

        // location from autocomplete
        if($('#locationInput',  appData.settings.currentModuleHTML).val().length > 3){

            if(appData.views.ActivityDetailView.model.attributes.location_id){

                var selectedLocationModel = appData.collections.locations.where({ "location_id": appData.views.ActivityDetailView.model.attributes.location_id });
                    if(selectedLocationModel){
                        selectedLocationModel = selectedLocationModel[0];

                        var coordinates = selectedLocationModel.attributes.coordinates.split(',');
                            appData.views.CreateActivityLocationView.currentLocation = coordinates;
                            appData.views.CreateActivityLocationView.map.setCenter(new google.maps.LatLng(coordinates[0], coordinates[1]), 13);
                    
                        if(selectedLocationModel.location == $('#locationInput',  appData.settings.currentModuleHTML).val()){
                        
                        }else{
                            appData.views.ActivityDetailView.model.attributes.location_id = null;
                            appData.services.utilService.getLatLon($('#locationInput').val());
                        }
                    }
            }else{
                appData.services.utilService.getLatLon($('#locationInput').val());
            }
        }

    },

    setMarkers: function(lat, long, content){
        appData.views.CreateActivityLocationView.clearMarkers();
        appData.views.CreateActivityLocationView.map.setCenter(new google.maps.LatLng(lat, long), 13);
        
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(lat, long),
          map:  appData.views.CreateActivityLocationView.map,
          title: content
        });

        if(content){
            appData.views.CreateActivityLocationView.infowindow.setContent('ddddddddd');
        }

        appData.views.CreateActivityLocationView.map.setCenter(new google.maps.LatLng(lat, long), 13);

        google.maps.event.addListener(marker, 'click', function() {
            appData.views.CreateActivityLocationView.infowindow.open(appData.views.CreateActivityLocationView.map,marker);
        });

        appData.views.CreateActivityLocationView.markers.push(marker);
        appData.views.CreateActivityLocationView.infowindow.setContent(content);
    },

    clearMarkers: function(){
        for (var i=0; i<appData.views.CreateActivityLocationView.markers.length; i++) {
          appData.views.CreateActivityLocationView.markers[i].setVisible(false);
        }

        appData.views.CreateActivityLocationView.markers = [];
    },

    addedLocationSuccesEvent: function(location_id){
        appData.views.ActivityDetailView.model.attributes.location_id = location_id;
        appData.events.createActivityTabsEvent.trigger('formStageCompleteEvent', appData.views.CreateActivityLocationView.tabTarget);
    },

    render: function() { 
      this.$el.html(this.template());
      appData.settings.currentModuleHTML = this.$el;
      

      // autocomplete selector
      appData.views.CreateActivityLocationView.locationAutComplete = new AutoCompleteView({input: $("#locationInput", appData.settings.currentModuleHTML), model: appData.collections.locations, wait: 100, updateModel: appData.views.ActivityDetailView.model, updateID: "location_id", onSelect: function(){

        var locationModel = appData.collections.locations.where({ "location_id": appData.views.ActivityDetailView.model.attributes.location_id})[0];
            var coordinates = locationModel.attributes.coordinates.split(',');
            var location = locationModel.attributes.location;

            appData.views.CreateActivityLocationView.currentLocation = coordinates;
            appData.views.CreateActivityLocationView.setMarkers(coordinates[0], coordinates[1], location);

      }}).render();

      this.setValidators();
      this.initMap();

      return this; 
    },

    initMap: function() { 
        appData.settings.mapAdded = true;

        var mapOptions = {
            zoom: 15,
            center: new google.maps.LatLng(appData.settings.defaultLocation[0], appData.settings.defaultLocation[1]),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true
        }
        var page = this.$el;
        appData.views.CreateActivityLocationView.map = new google.maps.Map($('#map_canvas',page)[0], mapOptions);
        appData.views.CreateActivityLocationView.infowindow = new google.maps.InfoWindow();

        appData.views.CreateActivityLocationView.currentLocation = [];
        appData.views.CreateActivityLocationView.currentLocation.push(51.20935);
        appData.views.CreateActivityLocationView.currentLocation.push(3.22470);

        // resize and relocate map
        google.maps.event.addListenerOnce(appData.views.CreateActivityLocationView.map, 'idle', function() {
            google.maps.event.trigger(appData.views.CreateActivityLocationView.map, 'resize');
            appData.views.CreateActivityLocationView.map.setCenter(new google.maps.LatLng(appData.views.CreateActivityLocationView.currentLocation[0], appData.views.CreateActivityLocationView.currentLocation[1]), 13);
        });

        if(appData.settings.native){
            appData.services.utilService.getLocationService("createActivity");
        }

    },

    locationSuccesHandler: function(position){
        appData.views.CreateActivityLocationView.setMarkers(position.coords.latitude, position.coords.longitude);
    },

    locationErrorHandler: function(location_id){

    },

    setValidators: function(){
    	var that = this;
    	$("#waarForm",appData.settings.currentModuleHTML).validate({
            submitHandler: function(form){                
                appData.views.ActivityDetailView.model.attributes.location = $('#locationInput', appData.settings.currentModuleHTML).val();

                // Is this a custom locaiton or not?
                var found = appData.collections.locations.findWhere({'location': $('#locationInput', appData.settings.currentModuleHTML).val()})
                if(!found){
                    // Add location to database
                    appData.services.phpService.addLocation($('#locationInput',appData.settings.currentModuleHTML).val(), appData.views.CreateActivityLocationView.currentMapLocation,"");
                }else{
                    appData.events.createActivityTabsEvent.trigger('formStageCompleteEvent', appData.views.CreateActivityLocationView.tabTarget);
                }
            }
        });
    }
});

appData.views.CreateActivityView = Backbone.View.extend({

    initialize: function () {
        appData.views.ActivityDetailView.model = new Activity();
        appData.events.createActivityTabsEvent.bind("formStageCompleteEvent", this.formStageCompleteEvent);
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



appData.views.CreateActivityWieView = Backbone.View.extend({
    initialize: function () {
        appData.views.friendsListView = [];
        appData.collections.selectedFriends = new UsersCollection();
        appData.views.CreateActivityWieView.activityCreatedHandler = this.activityCreatedHandler;
        appData.views.CreateActivityWieView.friendsInvitedHandler = this.friendsInvitedHandler;

        $(appData.models.userModel.attributes.myFriends.models).each(function(index, userModel) {
            appData.views.friendsListView.push(new appData.views.FriendInvitieView({
              model:userModel,
            }));
        });
    },

    render: function() { 
      this.$el.html(this.template(this.model.attributes));
      appData.settings.currentModuleHTML = this.$el;
      
      _(appData.views.friendsListView).each(function(listView) {
          $('#friendsList', appData.settings.currentModuleHTML).append(listView.render().$el);
      });

      this.setValidator();
      return this; 
    },

    setValidator: function(){

    },

    activityCreatedHandler: function(activity_id){

      // now add friends
      Backbone.off('activityCreated');
      appData.views.CreateActivityWieView.activity_id = activity_id;

      if(appData.collections.selectedFriends.length > 0){
        Backbone.on('friendsInvitedHandler', appData.views.CreateActivityWieView.friendsInvitedHandler);
        appData.services.phpService.inviteFriends(appData.collections.selectedFriends, activity_id);
      }else{
        appData.services.phpService.getActivities(false, appData.views.CreateActivityWieView.activity_id);
      }

      // set this boolean so we return to disable back functionality
      appData.settings.created = true;

    },

    friendsInvitedHandler: function(){
      Backbone.off('friendsInvitedHandler');      
      appData.services.phpService.getActivities(false, appData.views.CreateActivityWieView.activity_id);
    }

});

appData.views.CreateUserView = Backbone.View.extend({

	initialize: function () {
        appData.events.createUserEvent.bind("createUserHandler", this.createUserHandler);
        appData.events.createUserErrorEvent.bind("createUserErrorHandler", this.createUserErrorHandler);
        appData.events.locationHomeEvent.bind('locationSuccesHandler', this.locationSuccesHandler);
        appData.events.locationHomeEvent.bind('locationErrorHandler', this.locationErrorHandler);
        appData.views.CreateUserView.selectedGender = 0;
        appData.views.LocationError = this.locationErrorHandler;
    }, 

    render: function() { 
        this.$el.html(this.template());
    	appData.settings.currentPageHTML = this.$el;
    	this.setValidator();

    	if(this.model){
    		$('#passwordInput', appData.settings.currentPageHTML).val(this.model.attributes.password);
    		$('#emailInput', appData.settings.currentPageHTML).val(this.model.attributes.email);
    	}

        $('.radio-list input[type="radio"]', appData.settings.currentPageHTML).change(function() {

            // Remove all checked
            $(this).parents('.radio-list').find('label').removeClass('checked');
            $(this).parent().addClass('checked');

            var selectedData = $(this).attr('id');
                selectedData = selectedData.split('-');
                selectedData = selectedData[1];

                appData.views.CreateUserView.selectedGender = selectedData;
        });
        
        return this; 
    }, 

    events: {
        "click #createUserButton": "createUserButtonHandler",
        "change #ageSlider": "ageSliderHandler"
    },

    ageSliderHandler: function(){
        $('#range', appData.settings.currentPageHTML).removeClass('hide').text($('#ageSlider', appData.settings.currentPageHTML).val() + " jaar");
    },

    createUserButtonHandler: function(){
        $("#createUserForm",appData.settings.currentPageHTML).submit();
    },

    createUserHandler: function(){
        appData.router.navigate('dashboard', true);
    },

    createUserErrorHandler: function(){
        alert('cannot create user');
    },

	setValidator: function(){
        $("#createUserForm",appData.settings.currentPageHTML).validate({

            rules: {
                password: {
                    minlength:4
                },
                age: {
                  required: true,
                  range: [12, 60]
                }
            },

            messages: {
                genderradios: "Kies een optie"
            },

            errorPlacement: function(error, element) {

                if(element.attr("name") == "genderradios" ){
                    error.insertAfter("#genderSelect");
                }else{
                    error.insertAfter(element);
                }
            },

    		submitHandler: function(form) {
    			// CreateUser form logic
				var name = $('#nameInput', appData.settings.currentPageHTML).val();
				var password = $('#passwordInput', appData.settings.currentPageHTML).val();
				var email = $('#emailInput', appData.settings.currentPageHTML).val();
                var gender =  appData.views.CreateUserView.selectedGender;
                var age = $('#ageSlider', appData.settings.currentPageHTML).val();

				appData.models.userModel = new User();
                appData.models.userModel.set('name', name);
				appData.models.userModel.set('email', email);
				appData.models.userModel.set('password', password);
                appData.models.userModel.set('age', age);

                if(appData.settings.native){

                    // First lets get the location
                    Backbone.on('locationError', appData.views.LocationError)
                    appData.services.utilService.getLocationService("login");

                    // disable geo FOR NOW UNTIL PHONEGAP IS FIXED
                    appData.services.phpService.createUser();

                }else{
                    appData.services.phpService.createUser();
                }
		  	}
    	});
    },

    locationSuccesHandler: function(location){
        console.log('got location');

        appData.models.userModel.set('current_location', location);
        appData.services.phpService.createUser();
    },

    locationErrorHandler: function(){
        console.log('location error');

         Backbone.off('locationError', locationErrorHandler)
         appData.services.phpService.createUser();
    }
});

appData.views.DashboardActivityView = Backbone.View.extend({

    initialize: function () {

    }, 

    render: function() { 
        this.model.setGoing();

    	// model to template
    	this.$el.html(this.template({activity: this.model.toJSON(), imagePath: appData.settings.imagePath, friends: this.model.attributes.users}));
        return this; 
    }

});







appData.views.DashboardView = Backbone.View.extend({

    initialize: function () {
        console.log(appData.collections);
        console.log(appData.models.userModel);

 
        var that = this;
        this.searching = false;
        this.favouriteSportsFilter = false;
     
        appData.events.updateActivitiesEvent.bind("activitiesUpdateHandler", this.activitiesUpdateHandler);        
        appData.collections.activities.sort_by_attribute('sql_index');
        Backbone.on('dashboardUpdatedHandler', this.generateAcitvitiesCollection);

        // update activities collection
        appData.views.DashboardView.markers = [];
        appData.views.DashboardView.clearMarkers = this.clearMarkers;

        // update the activities if we have a network connection
        if(appData.settings.network){
            appData.services.phpService.getActivities(false, null);
        }else{
            $('#createActivityButton').hide();
        }
    },

    events: {
        "change #sortActivities": "sortActivitiesChangeHandler",
        "click #searchButton": "toggleSearchHandler",
        "keyup #searchInput": "searchHandler",
        "click #fullScreenButton": "fullscreenToggleHandler"
    },

    fullscreenToggleHandler: function(){
        $('#dashboard',appData.settings.currentPageHTML).toggleClass('mapOpen');
        google.maps.event.trigger(appData.views.DashboardView.map, 'resize');
    },

    activitiesUpdateHandler: function(){
        this.generateAcitvitiesCollection();
    },

    generateAcitvitiesCollection: function(){
      
        Backbone.off('dashboardUpdatedHandler', this.generateAcitvitiesCollection);

        if(appData.collections.activities.length === 0){


        }else{
            appData.views.activityListView = [];
            appData.views.locationList = [];

            var selectedCollection;
            if(this.searching){
                $(appData.collections.activitiesSearch).each(function(index, activity) {
                  appData.views.locationList.push(activity);
                  appData.views.activityListView.push(new appData.views.DashboardActivityView({
                    model : activity
                  }));
                });

            }else if(this.favouriteSportsFilter){

                $(appData.collections.filteredActivitiesCollection).each(function(index, activity) {
                  appData.views.locationList.push(activity);
                  appData.views.activityListView.push(new appData.views.DashboardActivityView({
                    model : activity
                  }));
                });

            }else{
                appData.collections.activities.each(function(activity) {
                  appData.views.locationList.push(activity);
                  appData.views.activityListView.push(new appData.views.DashboardActivityView({
                    model : activity
                  }));
                });
            }

            $('#activityTable', appData.settings.currentPageHTML).empty();
            _(appData.views.activityListView).each(function(dv) {
                $('#activityTable', appData.settings.currentPageHTML).append(dv.render().$el);
            });

            this.setMarkers(appData.views.locationList);
        }
    },

    searchHandler: function(evt){

     var search = $(evt.target).val().toLowerCase();
      if(search.length > 0){
      appData.collections.activitiesSearch = appData.collections.activities.filter(function(model) {
          return _.some(
            [ model.get('title') ], 
            function(value) {
              return value.toLowerCase().indexOf(search) != -1;
            });
         }); 
            this.searching = true;

      }else{
        this.searching = false;
      }

      this.generateAcitvitiesCollection();
    },

    // toggle search
    toggleSearchHandler: function(){
        $('#searchBar').toggleClass('hide');
        if($('#searchBar', appData.settings.currentPageHTML).hasClass('hide')){
            this.searching = false;
        }else{
            this.searching = true;
        }
    },

    // sort the activities table
    sortActivitiesChangeHandler: function(){
        
        this.favouriteSportsFilter = false;

        switch($("#sortActivities")[0].selectedIndex){
            case 0:
                appData.collections.activities.sort_by_attribute('sql_index');
            break;

            case 1:
                appData.collections.activities.each(function(activity) {
                    
                    // calculate the distance between my current location and the location of the event
                    // using the Haversine formula:
                    var current_location = appData.models.userModel.get('current_location').split(',');
                    var point1 = {};
                        point1.lat = current_location[0];
                        point1.lng = current_location[1];

                    var activity_location = activity.attributes.coordinates.split(',');
                    var point2 = {};
                        point2.lat = activity_location[0];
                        point2.lng = activity_location[1];

                    var rad = function(x) {
                        return x*Math.PI/180;
                    }

                    var R = 6371; // earth's mean radius in km
                    var dLat  = rad(point2.lat - point1.lat);
                    var dLong = rad(point2.lng - point1.lng);

                    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                          Math.cos(rad(point1.lat)) * Math.cos(rad(point2.lat)) * Math.sin(dLong/2) * Math.sin(dLong/2);
                    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
                    var d = R * c;
                    var resultaat = d.toFixed(2);

                        activity.attributes.distance = parseInt(resultaat);
                });

                // now order the collection by the distance
                appData.collections.activities.sort_by_attribute('distance');
            break;

            case 2:
                
                var filterCollection = new ActivitiesCollection();


                appData.models.userModel.attributes.myFavouriteSports.each(function(model){
                    filterCollection = appData.collections.activities.where({"sport_id": model.attributes.sport_id})
                });

                appData.collections.filteredActivitiesCollection = filterCollection;
                this.favouriteSportsFilter = true;

            break;
        }

        this.generateAcitvitiesCollection();
    },

    render: function () {

        var view = this;

        this.$el.html(this.template({sortForm: appData.collections.sortOptions.toJSON()}));
        appData.settings.currentPageHTML = this.$el;

        this.initMap();
        this.generateAcitvitiesCollection();

        if(!appData.settings.network){
            $('#createActivityButton', appData.settings.currentPageHTML).hide();
        }

        return this;
    },

    initMap: function() { 
        appData.settings.mapAdded = true;

        var mapOptions = {
            zoom: 15,
            center: new google.maps.LatLng(appData.settings.defaultLocation[0], appData.settings.defaultLocation[1]),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true
        }
        appData.views.DashboardView.map = new google.maps.Map($('#map_canvas',appData.settings.currentPageHTML)[0], mapOptions);

        // resize and relocate map
        google.maps.event.addListenerOnce(appData.views.DashboardView.map, 'idle', function() {
            google.maps.event.trigger(appData.views.DashboardView.map, 'resize');
            appData.views.DashboardView.map.setCenter(new google.maps.LatLng(appData.settings.defaultLocation[0], appData.settings.defaultLocation[1]), 13);
        });

        if(appData.settings.native){
            Backbone.on('getMyLocationHandler', this.getMyLocationHandler);
            appData.services.utilService.getLocationService("dashboard");
        }
    },

    getMyLocationHandler: function(position){
        Backbone.off('getMyLocationHandler');
        appData.views.DashboardView.map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude), 13);
    },

    setMarkers: function(models){
        appData.views.DashboardView.clearMarkers();

        $(models).each(function(index, model){
            var coordinates = model.attributes.coordinates.split(",");
            var marker = new google.maps.Marker({
              position: new google.maps.LatLng(coordinates[0], coordinates[1]),
              map:  appData.views.DashboardView.map,
              title: "",
              icon: appData.settings.iconPath + "map-icon@x2.png"
            });

            marker.activityModel = model;

            google.maps.event.addListener(marker, "click", function(evt) {
                window.location = "#activity/" + this.activityModel.attributes.activity_id;
            });

            appData.views.DashboardView.markers.push(marker);
        });
    },

    clearMarkers: function(){
        for (var i=0; i<appData.views.DashboardView.markers.length; i++) {
          appData.views.DashboardView.markers[i].setVisible(false);
        }
        appData.views.DashboardView.markers = [];
    },
});



appData.views.FavouriteSportListView = Backbone.View.extend({

    initialize: function () {

    }, 

    render: function() { 

    	this.model.attributes.path = appData.settings.sportsPath;



    	// model to template
    	this.$el.html(this.template(this.model.toJSON()));

    	$('a',this.$el).css({
    		'background-image': 'url(' + appData.settings.sportsPath + this.model.attributes.icon + ')',
    		"background-repeat": 'no-repeat'
    	});
        return this; 
    }

});




appData.views.FriendInvitieView = Backbone.View.extend({

    initialize: function () {
      appData.views.FriendView.model = this.model;

      console.log(this.model.attributes.user_id);
    },

    render: function() { 
      this.$el.html(this.template({friend: this.model.toJSON(), imagePath: appData.settings.imagePath}));
      appData.settings.currentPageHTML = this.$el;
      return this; 
    }, 

    events: {
      "click .inviteButton": "friendInviteHandler"
    },

    friendInviteHandler: function(evt){
      $(evt.target).toggleClass('selected');
      if($(evt.target).hasClass('selected')){
        $(evt.target).text('Uitgenodigd');

        var selected = appData.models.userModel.attributes.myFriends.where({ "user_id": $(evt.target, appData.settings.currentPageHTML).attr('data-id')})[0];
        appData.collections.selectedFriends.push(selected)

      }else{
        $(evt.target).text('Niet uitgenodigd');
        var m = appData.collections.selectedFriends.where({ "user_id": $(evt.target, appData.settings.currentPageHTML).attr('data-id')})[0];
        appData.collections.selectedFriends.remove(m);
      }

      console.log(appData.collections.selectedFriends);
    }
});

appData.views.FriendView = Backbone.View.extend({

    initialize: function () {
      appData.views.FriendView.model = this.model;

      // is this a friend?
      if(appData.models.userModel.attributes.myFriends.where({"user_id": this.model.attributes.user_id}).length > 0){
        this.model.attributes.myFriend = true;
      }else if(appData.views.FriendView.model.attributes.user_id == appData.models.userModel.attributes.user_id){
        this.model.attributes.myFriend = true;
      }else{
        this.model.attributes.myFriend = false;
      }
    },

    render: function() { 
      this.$el.html(this.template({imagePath: appData.settings.imagePath, user: this.model.toJSON()}));
      appData.settings.currentPageHTML = this.$el;
      return this; 
    }, 

    events: {
      "click #backButton": "backHandler",
      "click #addFriendButton": "addFriendHandler"
    },

    addFriendHandler: function(){
      Backbone.on('addedFriendHandler', this.addedAsFriendHandler);
      appData.services.phpService.addFriend(appData.views.FriendView.model.attributes.user_id, appData.models.userModel.attributes.user_id);
    },

    backHandler: function(){
      window.history.back();
    },

    addedAsFriendHandler: function(){
      Backbone.off('addedFriendHandler');
      $('#addFriendButton', appData.settings.currentPageHTML).remove();
    }
});



appData.views.FriendsListView = Backbone.View.extend({

    initialize: function () {
 	
    },

    render: function () {
    	// model to template
    	console.log(this.model.attributes);
    	this.$el.html(this.template({user: this.model.toJSON(), imagePath: appData.settings.imagePath}));
        return this; 
    }
});

appData.views.GoogleMapView = Backbone.View.extend({

    initialize: function () {



    }, 

    render: function() { 
      this.$el.html(this.template());
      appData.settings.currentPageHTML = this.$el;

       var mapOptions = {
          zoom: 15,
          center: new google.maps.LatLng(14, 10),
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          disableDefaultUI: true
      }

        appData.settings.mapAdded = true;
        var map = new google.maps.Map($('#map',appData.settings.currentPageHTML)[0], mapOptions);      

      return this; 
    }
});



appData.views.HelperView = Backbone.View.extend({

    initialize: function () {
    }, 

    getLocation: function(){

    }
});


appData.views.HomeView = Backbone.View.extend({

    initialize: function () {
        appData.events.userLoggedInEvent.bind("userLoggedInHandler", this.userLoggedInHandler);
        appData.events.userLoggedInErrorEvent.bind("userLoggedInErrorHandler", this.userLoggedInErrorHandler);
        appData.events.userLoggedInPasswordErrorEvent.bind("userLoggedInPasswordErrorHandler", this.userLoggedInPasswordErrorHandler);
        appData.events.facebookLoginEvent.bind("facebookLoginHandler", this.facebookLoginHandler);
        appData.events.facebookLoginErrorEvent.bind("facebookLoginErrorHandler", this.facebookLoginErrorHandler);
        appData.events.facebookGetFriendsEvent.bind("facebookGetFriendsHandler", this.facebookGetFriendsHandler);
        appData.events.facebookGetFriendsErrorEvent.bind("userLoggedInPasswordErrorHandler", this.facebookGetFriendErrorHandler);
        appData.events.facebookGetProfileDataEvent.bind("facebookProfileDataHandler", this.facebookProfileDataHandler);
        appData.events.getUserFromFacebookIDEvent.bind("facebookGetIDHandler", this.facebookGetIDHandler)
        appData.events.facebookUserToSQLEvent.bind('facebookUserToSQLSuccesHandler', this.facebookUserToSQLSuccesHandler);
        appData.events.locationHomeEvent.bind('locationSuccesHandler', this.locationSuccesHandler);
        appData.events.locationHomeEvent.bind('locationErrorHandler', this.locationErrorHandler);
    },

    render: function() { 
    	this.$el.html(this.template());
    	appData.settings.currentPageHTML = this.$el;
    	this.setValidator();
        return this; 
    },

    events: {
        "click #FBloginButton": "facebookClickHandler",
        "submit #loginForm": "loginFormSubmitHandler"
    },

	setValidator: function(){
    	$("#loginForm",appData.settings.currentPageHTML).validate({
    		submitHandler: function(form) {
			 	// Store page
				var email = $('#emailInput', appData.settings.currentPageHTML).val();
				var password = $('#passwordInput', appData.settings.currentPageHTML).val();

				appData.models.userModel.set('email', email);
				appData.models.userModel.set('password', password);

                appData.services.phpService.userLogin();
		  	},invalidHandler: function(form, validator) {
            // not sure if this is the correct selector but I found it here: http://docs.jquery.com/Plugins/Validation/validate#toptions
        }
    	});
    },

    /**
    * Facebook login flow 
    */
    facebookUserToSQLSuccesHandler: function(){
        appData.router.navigate('loading', true);
    },

    facebookGetIDHandler: function(newUser){
        if(!newUser.facebook_user){
            console.log("nieuwe gebruiker");

            if(appData.settings.native){
                // First lets get the location
                appData.services.utilService.getLocationService("login");
            }else{
                appData.services.facebookService.facebookUserToSQL();
            }

        }else{
            appData.models.userModel.set('user_id', newUser.user_id);

            if(appData.settings.native){
                appData.services.utilService.getLocationService("login");
            }else{
                appData.router.navigate('loading', true);
            }

            // Excisting user, do nothing for now
            appData.router.navigate('loading', true);          
        }
    },

    locationSuccesHandler: function(location){
        var myLocation = location.coords.coordinates.latitude + "," + location.coords.coordinates.longitude;

        appData.models.userModel.set('current_location', myLocation);
        appData.services.facebookService.facebookUserToSQL();
    },

    locationErrorHandler: function(){
        appData.services.facebookService.facebookUserToSQL();
    },

    facebookProfileDataHandler: function(){
        // get friends
        appData.services.facebookService.getFacebookFriends();
    },

    facebookLoginHandler: function(){
        // fetch profile data
        appData.services.facebookService.getProfileData();
    },

    facebookGetFriendsHandler: function(){
        // finished loading facebook data, forward to login screen
        appData.services.facebookService.getUserFromFacebookID();
    },

    facebookClickHandler: function(){
        appData.services.facebookService.facebookLogin();
    },

    facebookLoginErrorHandler: function(){
        alert('error loggin on to facebook')
    },

    facebookGetFriendErrorHandler: function(){
        alert('error getting friends from facebook');
    },

    /**
    * Normal Login flow
    */
    userLoggedInHandler: function(){
        $('#loginForm .error-box', appData.currentPageHTML).removeClass('show').addClass('hide');
        appData.router.navigate('loading', true);
    },

    userLoggedInPasswordErrorHandler: function(){
        $('#loginForm .error-box', appData.currentPageHTML).html(appData.messages.passwordIncorrect).removeClass('hide').addClass('show');
    },

    userLoggedInErrorHandler: function(){
        appData.router.navigate('createUser', true);
    }

});

appData.views.LoadingView = Backbone.View.extend({

    initialize: function () {
        appData.views.LoadingView = this;

        appData.events.getActivitiesSuccesEvent.bind("activitiesLoadedHandler", this.activitiesLoadedHandler);
        appData.events.getSportsSuccesEvent.bind("sportsLoadedHandler", this.sportsLoadedHandlers);
        appData.events.getUsersSuccesEvent.bind("usersLoadedHandler", this.usersLoadedHandler)
        appData.events.getBuurtenEvent.bind("buurtenLoadedHandler", this.buurtenLoadedHandler);
        appData.events.getLocationsSuccesEvent.bind("getLocationsSuccesHandler", this.getLocationsSuccesHandler);
        Backbone.on('getChallengesHandler', this.getChallengesHandler)
        Backbone.on('myPlannedActivitiesLoadedHandler', this.getMyPlannedActivitiesLoadedHandler);
        Backbone.on('myActivitiesLoadedHandler', this.getMyActivitiesLoadedHandler);
        Backbone.on('getFavouriteSportsHandler', this.getFavouriteSportsHandler)
        Backbone.on('getMyFavouriteSportsHandler', this.getMyFavouriteSportsHandler)
        Backbone.on('getMyChallengesHandler', this.getMyChallengesHandler);
        Backbone.on('getMyBadgesHandler', this.getMyBadgesHandler);
        Backbone.on('getFriendsHandler', this.loadingCompleteHandler)
    },

    render: function() {
        this.$el.html(this.template(this.model.attributes));
    	appData.settings.currentPageHTML = this.$el;

        // load the data
        appData.services.phpService.getActivities(true);
        return this;
    },
    activitiesLoadedHandler: function(){
        appData.services.phpService.getSports();
    },

    sportsLoadedHandlers: function(){
        
        appData.services.phpService.getChallenges();
    },

    getChallengesHandler: function(){
        Backbone.off('getChallengesHandler');
        appData.services.phpService.getUsers();
    },

    usersLoadedHandler: function(){
        appData.services.phpService.getBuurten();
    },

    buurtenLoadedHandler: function(){
        appData.services.phpService.getLocations();
    },

    getLocationsSuccesHandler: function(){
        appData.services.phpService.getMyPlannedActivities();
    },

    getMyPlannedActivitiesLoadedHandler: function(){
      Backbone.off('myPlannedActivitiesLoadedHandler');
      appData.services.phpService.getMyActivities();
    },

    getMyActivitiesLoadedHandler: function(){
      Backbone.off('myActivitiesLoadedHandler');
      appData.services.phpService.getFavouriteSports();
    },

    getFavouriteSportsHandler: function(){
        appData.services.phpService.getUserFavouriteSports();
        Backbone.off('getFavouriteSportsHandler');
    },

    getMyFavouriteSportsHandler: function(){
        appData.services.phpService.getMyChallengesHandler();
        Backbone.off('getMyFavouriteSportsHandler');
    },

    getMyChallengesHandler: function(){
        Backbone.off('getMyChallengesHandler');
        appData.services.phpService.getMyBadges();
    },

    getMyBadgesHandler: function(){
        Backbone.off('getMyBadgesHandler');
        appData.services.phpService.getFriends();
    },

    loadingCompleteHandler: function(){
        Backbone.off('getFriendsHandler');

        // set localstorage, so the user has data stored in case the connection drops
        // set collections
        window.localStorage.setItem("collections", JSON.stringify(appData.collections));
        window.localStorage.setItem("userModel", JSON.stringify(appData.models.userModel));

        appData.settings.dataLoaded = true;
        appData.views.LoadingView.destroy_view();

        if(appData.models.userModel.attributes.myFavouriteSports.length > 0){
            appData.router.navigate('dashboard', true);
        }else{
            appData.router.navigate('sportselector', true);
        }
    },


    destroy_view: function() {

    //COMPLETELY UNBIND THE VIEW
    this.undelegateEvents();

    this.$el.removeData().unbind(); 

    //Remove view from DOM
    this.remove();  
    Backbone.View.prototype.remove.call(this);

    }

});


appData.views.NavigationBusView = Backbone.View.extend({

    initialize: function () {

    }, 

    render: function() { 
      this.$el.html(this.template(this.model.attributes));
      appData.settings.currentModuleHTML = this.$el;

      return this;
    }

});




appData.views.NavigationMapView = Backbone.View.extend({

    initialize: function () {

    }, 

    render: function() { 
      this.$el.html(this.template(this.model.attributes));
      appData.settings.currentModuleHTML = this.$el;

      this.setMap();

      return this;
    }, 

    setMap: function() { 
        appData.settings.mapAdded = true;

        var mapOptions = {
            zoom: 15,
            center: new google.maps.LatLng(14, 10),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true
        }
        var page = this.$el;
        var map = new google.maps.Map($('#map_canvas',page)[0], mapOptions);
        var coordinates = appData.views.ActivityDetailView.model.attributes.coordinates.split(',');

        google.maps.event.addListenerOnce(map, 'idle', function() {
          google.maps.event.trigger(map, 'resize');
          map.setCenter(new google.maps.LatLng(coordinates[0], coordinates[1]), 13);
        });

        var directionsDisplay = new google.maps.DirectionsRenderer();
            directionsDisplay.setMap(map);
            directionsDisplay.setPanel($('#directions', page)[0]);

        var directionsService = new google.maps.DirectionsService();
        var directionsRequest = {
            origin: appData.views.ActivityDetailView.model.attributes.coordinates,
            destination: appData.models.userModel.attributes.current_location,
            travelMode: google.maps.DirectionsTravelMode.WALKING,
            unitSystem: google.maps.UnitSystem.METRIC
        };

        directionsService.route(
          directionsRequest,
          function(response, status)
          {
            if (status == google.maps.DirectionsStatus.OK)
            {
              new google.maps.DirectionsRenderer({
                map: map,
                directions: response
              });
                directionsDisplay.setDirections(response);
            }
            else
              $("#error").append("Unable to retrieve your route<br />");
          }
        );
    }

});




appData.views.NavigationView = Backbone.View.extend({

    initialize: function () {
        _.bindAll(this, 'beforeRender', 'render', 'afterRender'); 
        var _this = this; 
        this.render = _.wrap(this.render, function(render) { 
            _this.beforeRender(); 
            render(); 
            _this.afterRender(); 
            return _this; 
        }); 
    }, 

    beforeRender: function() { 
    }, 

    render: function() { 
        this.$el.html(this.template());
        appData.settings.currentPageHTML = this.$el;
        this.currentActivityPage = '#googleMap';
        return this; 
    }, 

    events: {
        "click #navigationTabs .cl-btn": "navigationTabsHandler",
        "click .back-button": "back"
    },

    navigationTabsHandler: function(evt){
        // tab on activity detail
        $('#navigationTabs .cl-btn').removeClass('active');
        $(evt.target, appData.settings.currentPageHTML).addClass('active');

        var selectedPage = $(evt.target, appData.settings.currentPageHTML).attr('data');

        $(this.currentActivityPage, appData.settings.currentPageHTML).removeClass('show').addClass('hide');
        $(selectedPage, appData.settings.currentPageHTML).removeClass('hide').addClass('show');

        this.currentActivityPage = selectedPage;
    },

    afterRender: function() { 
        appData.settings.mapAdded = true;

        var mapOptions = {
            zoom: 15,
            center: new google.maps.LatLng(14, 10),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true
        }
        var page = this.$el;
        var map = new google.maps.Map($('#map_canvas',page)[0], mapOptions);
        var coordinates = appData.views.ActivityDetailView.model.attributes.coordinates.split(',');

        google.maps.event.addListenerOnce(map, 'idle', function() {
          google.maps.event.trigger(map, 'resize');
          map.setCenter(new google.maps.LatLng(coordinates[0], coordinates[1]), 13);
        });

        var directionsDisplay = new google.maps.DirectionsRenderer();
            directionsDisplay.setMap(map);
            directionsDisplay.setPanel($('#directions', page)[0]);

        var directionsService = new google.maps.DirectionsService();
        var directionsRequest = {
            origin: appData.views.ActivityDetailView.model.attributes.coordinates,
            destination: appData.models.userModel.attributes.current_location,
            travelMode: google.maps.DirectionsTravelMode.WALKING,
            unitSystem: google.maps.UnitSystem.METRIC
        };

        directionsService.route(
          directionsRequest,
          function(response, status)
          {
            if (status == google.maps.DirectionsStatus.OK)
            {
              new google.maps.DirectionsRenderer({
                map: map,
                directions: response
              });
                directionsDisplay.setDirections(response);
            }
            else
              $("#error").append("Unable to retrieve your route<br />");
          }
        );
    },

    back: function(event) {
        window.history.back();
        return false;
    }


});




appData.views.NoConnectionView = Backbone.View.extend({

    initialize: function () {

    },

    render: function() { 
      this.$el.html(this.template());
      appData.settings.currentModuleHTML = this.$el;
    
      return this; 
    },
    events: {
        "click #refreshButton": "checkConnectionHandler"
    },

    checkConnectionHandler: function(){
        var result = appData.services.utilService.checkConnection();
        alert(appData.settings.network);

        if(appData.settings.network){
            window.location = "#";
        }
    }
});

appData.views.PlannerInvitedActivitiesView = Backbone.View.extend({

    initialize: function () {
    	appData.views.PlannerInvitedActivitiesView.model = this.model;
    },

    render: function () {
        this.$el.html(this.template(this.model.attributes));
        return this; 
    }
});

appData.views.PlannerMyActivitiesView = Backbone.View.extend({

    initialize: function () {

    },

    render: function () {
        this.$el.html(this.template(this.model.attributes));

        return this; 
    }
});

appData.views.PlannerView = Backbone.View.extend({

  initialize: function () {

    appData.views.PlannerView.updatePlanner = this.updatePlanner;
    appData.views.PlannerView.updatePlannerComplete = this.updatePlannerComplete;
    appData.views.PlannerView.getInvitationsHandler = this.getInvitationsHandler;
    appData.views.PlannerView.acceptedInvite = this.acceptInviteHandler;

    Backbone.on('myPlannedActivitiesLoadedHandler', this.updatePlanner);
    Backbone.on('myActivitiesLoadedHandler', this.updatePlannerComplete);
    Backbone.on('getInvitationsHandler', this.getInvitationsHandler)
    Backbone.on('acceptInviteHandler', this.acceptInviteHandler)

    // Update when a user accepts / declines an invitation
    appData.views.PlannerView.acceptedInvite = this.acceptedInvite;
    appData.services.phpService.getMyPlannedActivities();
  },

  events:{
      "click .inviteButtons a":"handleInviteHandler"
  },

  handleInviteHandler: function(evt){
    var selectedStatus = $(evt.target).attr('data');
    var invitationID =  $(evt.target).parent().attr('data-invitation');
    var activityID = $(evt.target).parent().attr('data-activity-id');

    // Decline animation
    if(selectedStatus == 0){

    // Approve animation
    }else{

    }

    $(evt.target).parent().parent().hide(200);
    Backbone.on('acceptInviteHandler');
    appData.services.phpService.handleInvitations(invitationID, selectedStatus, activityID);
  },

  acceptInviteHandler: function(){
    console.log("invite updated");

    Backbone.on('myPlannedActivitiesLoadedHandler', appData.views.PlannerView.updatePlanner);
    appData.services.phpService.getMyPlannedActivities();
  },

  updatePlanner: function(){
    console.log('myPlannedActivitiesLoadedHandler');

    Backbone.on('myActivitiesLoadedHandler', appData.views.PlannerView.updatePlannerComplete);
    appData.services.phpService.getMyActivities();
  },

  updatePlannerComplete: function(){
    console.log('myActivitiesLoadedHandler');

    Backbone.on('getInvitationsHandler', appData.views.PlannerView.getInvitationsHandler)
    appData.services.phpService.getMyInvitations();
  },

  getInvitationsHandler: function(){

    Backbone.off('myPlannedActivitiesLoadedHandler');
    Backbone.off('myActivitiesLoadedHandler');
    Backbone.off('getInvitationsHandler');
    Backbone.off('acceptInviteHandler');

    appData.views.PlannerView.myActivitiesView = [];
    appData.views.PlannerView.myJoinedActivitiesView = [];
    appData.views.PlannerView.myInvitedActivitiesView = [];

    $("#myInvitationsPlanner", appData.settings.currentPageHTML).addClass('hide');
    $("#myActivitiesPlanner", appData.settings.currentPageHTML).addClass('hide');
    $('#myPlanner', appData.settings.currentPageHTML).addClass('hide');

    // get my activities
    appData.collections.myActivities.each(function(activity) {
      appData.views.PlannerView.myActivitiesView.push(new appData.views.PlannerMyActivitiesView({model : activity}));
    });

    // get the activities I'm going to
    appData.collections.myPlannedActivities.each(function(myActivity) {
      appData.views.PlannerView.myJoinedActivitiesView.push(new appData.views.PlannerMyActivitiesView({model : myActivity}));
    });

    // get the activtities I'm inviited to
    appData.collections.myInvitations.each(function(invitedActivity) {
      appData.views.PlannerView.myInvitedActivitiesView.push(new appData.views.PlannerInvitedActivitiesView({model : invitedActivity}));
    });
 
    if(appData.views.PlannerView.myActivitiesView.length > 0){
      $('#myActivitiesPlanner', appData.settings.currentPageHTML).removeClass('hide');
      $('#myActivitiesTable', appData.settings.currentPageHTML).empty();

      _(appData.views.PlannerView.myActivitiesView).each(function(dv) {
        $('#myActivitiesTable', appData.settings.currentPageHTML).append(dv.render().$el);
      });
    }

    if(appData.views.PlannerView.myJoinedActivitiesView.length > 0){
      $('#myPlanner', appData.settings.currentPageHTML).removeClass('hide');
      $('#myPlanningTable', appData.settings.currentPageHTML).empty();

      _(appData.views.PlannerView.myJoinedActivitiesView).each(function(dv) {
        $('#myPlanningTable', appData.settings.currentPageHTML).append(dv.render().$el);
      });
    }

    if(appData.views.PlannerView.myInvitedActivitiesView.length > 0){
      $('#myInvitationsPlanner', appData.settings.currentPageHTML).removeClass('hide');
      $('#myInvitationsTable', appData.settings.currentPageHTML).empty();

      _(appData.views.PlannerView.myInvitedActivitiesView).each(function(dv) {
        $('#myInvitationsTable', appData.settings.currentPageHTML).append(dv.render().$el);
      });
    }
  },

  render: function () {
    this.$el.html(this.template());
    appData.settings.currentPageHTML = this.$el;

    return this;
  }
});


appData.views.ProfileAvatarView = Backbone.View.extend({

    initialize: function () {
    	Backbone.on('updateAvatarCompleteHandler', this.updateAvatarCompleteHandler)
    },
    
    render: function() { 

    	this.$el.html(this.template(appData.models.userModel.toJSON()));
        appData.settings.currentModuleHTML = this.$el;
        return this; 
    },

    events:{
    	"click #updateAvatar": "updateAvatarHandler"
    },

    updateAvatarHandler: function(){
    	appData.services.phpService.updateAvatar();
    },

    updateAvatarCompleteHandler: function(){

    }
});

appData.views.ProfileChallengeView = Backbone.View.extend({

    initialize: function () {
        appData.views.ProfileChallengeView.updateChallenges = this.updateChallenges;
        appData.views.ProfileChallengeView.getChallengesCompleteHandler = this.getChallengesCompleteHandler;
        appData.views.ProfileChallengeView.getMyChallengesCompleteHandler = this.getMyChallengesCompleteHandler;
        appData.views.ProfileChallengeView.getMyBadgesCompleteHandler = this.getMyBadgesCompleteHandler;
        
        Backbone.on('joinedChallengeHandler', this.joinedChallengeSuccesHandler);
        Backbone.on('getChallengesHandler', appData.views.ProfileChallengeView.getChallengesCompleteHandler);
        appData.services.phpService.getChallenges();
    },

    render: function() { 
    	this.$el.html(this.template());
        appData.settings.currentModuleHTML = this.$el;
        this.updateChallenges();

        return this; 
    },

    joinedChallengeSuccesHandler: function(){
        Backbone.on('getChallengesHandler', appData.views.ProfileChallengeView.getChallengesCompleteHandler);
        appData.services.phpService.getChallenges();
    },

    getChallengesCompleteHandler: function(){
        Backbone.off('getChallengesHandler');
        Backbone.on('getMyChallengesHandler', appData.views.ProfileChallengeView.getMyChallengesCompleteHandler);
        appData.services.phpService.getMyChallengesHandler();
    },

    getMyChallengesCompleteHandler: function(){
        Backbone.off('getMyChallengesHandler');
        Backbone.on('getMyBadgesHandler', appData.views.ProfileChallengeView.getMyBadgesCompleteHandler);
        appData.services.phpService.getMyBadges();
    },

    getMyBadgesCompleteHandler: function(){
        Backbone.off('getMyBadgesHandler');
        appData.views.ProfileChallengeView.updateChallenges();
    },

    updateChallenges: function(){
        appData.views.challengeListView = [];
        appData.collections.challenges.each(function(challenge) {
        appData.views.challengeListView.push(new appData.views.ChallengeListView({
            model : challenge
          }));
        });

        appData.views.myChallengesListView = [];
        appData.models.userModel.attributes.myChallenges.each(function(myChallenge){
        appData.views.myChallengesListView.push(new appData.views.ActiveChallengeListView({
            model: myChallenge
            }));
        });

        appData.views.myBadgesListView = [];
        appData.models.userModel.attributes.myBadges.each(function(myBadge){
        appData.views.myBadgesListView.push(new appData.views.BadgeListView({
            model: myBadge
            }));
        });

        $('#challengesOverview', appData.settings.currentModuleHTML).addClass('hide');
        $('#challengesOverviewTable', appData.settings.currentModuleHTML).empty();
        if(appData.views.challengeListView.length > 0){
            $('#challengesOverview', appData.settings.currentModuleHTML).removeClass('hide');
            _(appData.views.challengeListView).each(function(listView) {
                $('#challengesOverviewTable', appData.settings.currentModuleHTML).append(listView.render().$el);
            });
        }

        $('#myChallengesOverview', appData.settings.currentModuleHTML).addClass('hide');
        $('#myChallengesOverviewTable', appData.settings.currentModuleHTML).empty();
        if(appData.views.myChallengesListView.length > 0){
            $('#myChallengesOverview', appData.settings.currentModuleHTML).removeClass('hide');
            _(appData.views.myChallengesListView).each(function(listView) {
                $('#myChallengesOverviewTable', appData.settings.currentModuleHTML).append(listView.render().$el);
            });
        }

        $('#badgesOverview', appData.settings.currentModuleHTML).addClass('hide').empty();
        if(appData.views.myBadgesListView.length > 0){
            $('#badgesOverview', appData.settings.currentModuleHTML).removeClass('hide');
            _(appData.views.myBadgesListView).each(function(listView) {
                $('#badgesOverview', appData.settings.currentModuleHTML).append(listView.render().$el);
            });
        }
    }
});

appData.views.ProfileFriendsView = Backbone.View.extend({
    initialize: function () {
    	appData.views.friendsListView = [];
        appData.views.ProfileFriendsView.friendRemovedHandler = this.friendRemovedHandler;
        appData.views.ProfileFriendsView.generateFriendsList = this.generateFriendsList;

        // get friends
        appData.services.phpService.getFriends();
        Backbone.on('getFriendsHandler', this.getMyFriendsHandler);
    },

    getMyFriendsHandler: function(){
        console.log('updated friends');

        Backbone.off('getFriendsHandler');
        appData.views.ProfileFriendsView.generateFriendsList();
    },
    
    events:{
        "click .removeFriend": "removeFriendHandler"
    },

    friendRemovedHandler: function(){
        console.log('friend remove');
    },

    removeFriendHandler: function(evt){
        var friend_id = $(evt.target).parent().attr('friend-id');

        Backbone.on('friendRemovedHandler', appData.views.ProfileFriendsView.friendRemovedHandler);
        appData.services.phpService.removeFriend(friend_id);

        $(evt.target).parent().hide(200);

    },

    generateFriendsList: function(){

        appData.views.friendsListView = [];
        $(appData.models.userModel.attributes.myFriends.models).each(function(index, userModel) {
        appData.views.friendsListView.push(new appData.views.FriendsListView({
            model:userModel
          }));
        });


        $('#profileFriendsListView', appData.settings.currentModuleHTML).empty();
        _(appData.views.friendsListView).each(function(listView) {
            $('#profileFriendsListView', appData.settings.currentModuleHTML).append(listView.render().$el);
        });

    },

    render: function() { 
    	this.$el.html(this.template());
        appData.settings.currentModuleHTML = this.$el;

        this.generateFriendsList();

        return this; 
    },
});

appData.views.ProfileView = Backbone.View.extend({

    initialize: function () {
    },
    
    render: function() { 
    	this.$el.html(this.template());
        appData.settings.currentPageHTML = this.$el;

        var view = new appData.views.ProfileAvatarView();
        $('#profileContent', appData.settings.currentPageHTML).empty().append(view.render().$el);
     

        return this; 
    },

    events: {
        "click #profileTabs .cl-btn": "profileTabHandler"
    },

    profileTabHandler: function(evt){ 
    	var page = this.$el;
        var currentActivityPage = '#atleetContent';

        $('#profileTabs .cl-btn', appData.settings.currentPageHTML).removeClass('active');
        $(evt.target, appData.settings.currentPageHTML).addClass('active');

        currentActivityPage = selectedPage;

        var selectedPage = $(evt.target, appData.settings.currentPageHTML).attr('data');
        var view;

        switch(selectedPage){
          case "#atleetContent":
            view = new appData.views.ProfileAvatarView();
          break;

          case "#uitdagingenContent":
            view = new appData.views.ProfileChallengeView();
          break;

          case "#vriendenContent":
            view = new appData.views.ProfileFriendsView();
          break;
        }

        $('#profileContent', appData.settings.currentPageHTML).empty().append(view.render().$el);
        this.currentActivityPage = selectedPage;
    } 
});

appData.views.SettingsView = Backbone.View.extend({

    initialize: function () {
    	appData.views.SettingsView.avatarUploadHandler = this.avatarUploadHandler;
    	appData.views.SettingsView.avatarUpdatedHandler = this.avatarUpdatedHandler;
      appData.views.SettingsView.fileUploadedHandler = this.fileUploadedHandler;

    },

    render: function () {
    	console.log(appData.models.userModel.attributes);


      this.$el.html(this.template({imagePath: appData.settings.imagePath, user: appData.models.userModel.attributes}));
      appData.settings.currentPageHTML = this.$el;

      if(appData.settings.native){

      }else{
        $("#changeAvatar", appData.settings.currentPageHTML).click(function(){
           $("#nonNativeFileField", appData.settings.currentPageHTML).trigger('click');
           return false;
        });
      }

      return this;
    },

    mediaFormSubmitHandler: function(event){
      event.stopPropagation(); // Stop stuff happening
      event.preventDefault(); // Totally stop stuff happening

      // Create a formdata object and add the files
      var data = new FormData();
      $.each(appData.views.SettingsView.files, function(key, value)
      {
        data.append(key, value);
      });

      Backbone.on('fileUploadedEvent', appData.views.SettingsView.fileUploadedHandler);
      appData.services.phpService.uploadMediaNonNative(data);
    },

    fileUploadedHandler: function(data){
      Backbone.off('fileUploadedEvent');
      
      var filename = data.files[0].replace(/^.*[\\\/]/, '');
      appData.views.SettingsView.uploadedPhotoUrl = filename;

      Backbone.on('updateUserAvatar', appData.views.SettingsView.avatarUpdatedHandler);
      appData.services.phpService.updateUserAvatar(filename);
    },

    nonNativeFileSelectedHandler: function(evt){

        // upload script
        // do some checks
        var files = evt.target.files;
        appData.views.SettingsView.files = files;

        $('#mediaForm', appData.settings.currentPageHTML).submit();
    },

    events: {
    	"click #changeAvatar": "changeAvatarHandler",
      "click #signOutButton": "signOutHandler",
      "change #nonNativeFileField":"nonNativeFileSelectedHandler",
      "submit #mediaForm": "mediaFormSubmitHandler"
    },

    signOutHandler: function(){
      // clear local storage
      window.localStorage.clear()

      // not signed in
      appData.settings.userLoggedIn = false;
      appData.settings.storageFound = false;

      // back to the landing page
      window.location.hash = "#";
    },   

    avatarUpdatedHandler: function(){
    	Backbone.off('updateUserAvatar');
      $('#userAvatar', appData.settings.currentPageHTML).delay(400).attr("style", "background: url('" + appData.settings.imagePath + appData.views.SettingsView.uploadedPhotoUrl + "') no-repeat; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover;");
    },

    changeAvatarHandler: function(){

  		navigator.camera.getPicture(this.uploadAvatar,
  			function(message) { 
  			},{ quality: 50, targetWidth: 640, targetHeight: 480, destinationType: navigator.camera.DestinationType.FILE_URI, sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY }
  		);
    	// change avatar
    },

    avatarUploadHandler: function(r){
    	Backbone.on('updateUserAvatar', appData.views.SettingsView.avatarUpdatedHandler);
    	appData.services.phpService.updateUserAvatar(appData.views.SettingsView.uploadedPhotoUrl);
    },

    uploadAvatar: function(imageURI) {
      function makeid()
      {
          var text = "";
          var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

          for( var i=0; i < 5; i++ )
              text += possible.charAt(Math.floor(Math.random() * possible.length));

          return text;
      }

      var options = new FileUploadOptions();
      options.fileKey="file";
      options.fileName= makeid() + ".jpg";
      options.mimeType="image/jpeg";

      var params = new Object();
      params.value1 =  options.fileName;
      appData.views.SettingsView.uploadedPhotoUrl = options.fileName;

      options.params = params;
      options.chunkedMode = false;

      var ft = new FileTransfer();  
      ft.upload(imageURI, appData.settings.servicePath + appData.settings.imageUploadService, appData.views.SettingsView.avatarUploadHandler, null, options);    
    },
});

appData.views.SportSelectorView = Backbone.View.extend({

    initialize: function () {
        appData.views.SportSelectorView.selectedSports = [];
        Backbone.on('addFavouriteSportsHandler', this.addFavouriteSportsHandler)
    
        appData.views.SportSelectorView.model = this.model;
    },

    render: function() {
    	this.$el.html(this.template());
        appData.settings.currentPageHTML = this.$el;


        appData.views.SportSelectorView.favouriteSportsViewList = [];

        appData.collections.sports.each(function(sport){
            appData.views.SportSelectorView.favouriteSportsViewList.push(new appData.views.FavouriteSportListView({
                model : sport
            }));
        });

        var generateGri = this.generateGrid();

        appData.views.CreateActivityLocationView.locationAutComplete = new AutoCompleteView({input: $("#sportInput", appData.settings.currentPageHTML), model: appData.collections.sports, wait: 100, updateModel: this.model, updateID: "sport_id", onSelect: function(sport){
            sport.attributes.object_class = "selected";
            appData.views.SportSelectorView.favouriteSportsViewList.push(new appData.views.FavouriteSportListView({
                model : sport
            }));

            $('#favouriteSportList', appData.settings.currentPageHTML).empty();
            _(appData.views.SportSelectorView.favouriteSportsViewList).each(function(listView) {
                $('#favouriteSportList', appData.settings.currentPageHTML).append(listView.render().$el);
            });

        }}).render();

        return this;

    },

    generateGrid: function(){
        $('#favouriteSportList', appData.settings.currentPageHTML).empty();
        _(appData.views.SportSelectorView.favouriteSportsViewList).each(function(listView) {
            $('#favouriteSportList', appData.settings.currentPageHTML).append(listView.render().$el);
        });
    },

    events: {
      "click #confirm": "confirmSportsHandler",
      "click #favouriteSportList a": "favouriteSportClickHandler"
    },

    favouriteSportClickHandler: function(evt){
        $(evt.target).toggleClass('selected');
    },

    confirmSportsHandler: function(){
        var selectedSports = [];

        $('#favouriteSportList .selected', appData.settings.currentPageHTML).each(function(index, element){
            var sportID = $(element).attr('data-id');
            var model = appData.collections.sports.where({'sport_id': sportID.toString()})
        
            selectedSports.push(model[0]);
        });

        appData.services.phpService.addFavouriteSportsService(selectedSports);
    },

    addFavouriteSportsHandler: function(){
        appData.router.navigate('dashboard', true);
    }
});


appData.routers.AppRouter = Backbone.Router.extend({

    routes: {
        "":                 "home",
        "dashboard":        "dashboard",
        "planner":          "planner",
        "profile": 			"profile",
        "activity/:id":     "activity",
        "navigater":        "navigater", 
        "createActivity":   "createActivity",
        "createUser":       "createUser",
        "settings":         "settings",
        "sportselector":    "sportselector",
        "noconnection":    "noconnection",
        "loading":          "loading",
        "friend/:id":        "friend"
    },



    initialize: function () {
        appData.slider = new PageSlider($('#container'));

        this.routesHit = 0;
        
        //keep count of number of routes handled by your application
        Backbone.history.on('route', function() { this.routesHit++; }, this);
    },

    back: function() {
        if(this.routesHit > 1) {
          //more than one route hit -> user did not land to current page directly
          window.history.back();
        } else {
          //otherwise go to the home page. Use replaceState if available so
          //the navigation doesn't create an extra history entry
          this.navigate('/', {trigger:true, replace:true});
        }
    },

    noconnection: function(){
        appData.slider.slidePage(new appData.views.NoConnectionView().render().$el);
    },

    home: function () {

        // are we on a device or a mobile webbrowser?
        if(appData.settings.native){

            if(appData.settings.network){
                // is this user already logged in? if so skip the login page and go straight to loading or the offline mode
                if(appData.settings.userLoggedIn){
                    window.location.hash = "loading";
                }else{
                    appData.slider.slidePage(new appData.views.HomeView().render().$el);
                }
            }else{

                 // check if we have local storage from an earlier login
                if(appData.settings.storageFound){

                    appData.services.utilService.localDataToCollection(appData.storage);
                    window.location.hash = "dashboard";
                }else{
                    window.location.hash = "noconnection";
                }
            }

        }else{
            appData.slider.slidePage(new appData.views.HomeView().render().$el);

        }
    },

    loading: function () {
        if(!appData.settings.dataLoaded){
            appData.slider.slidePage(new appData.views.LoadingView({model: appData.models.userModel}).render().$el);
        }else{
            window.location.hash = "dashboard";
        }
    },
    
    dashboard: function () {

        if(appData.settings.userLoggedIn){

            if(appData.settings.dataLoaded){                
                appData.slider.slidePage(new appData.views.DashboardView().render().$el);
            }else{
                window.location.hash = "loading";
            }
        }else{
            window.location.hash = "";
        }
    },

    planner: function () {
        if(appData.settings.userLoggedIn){

            appData.slider.slidePage(new appData.views.PlannerView().render().$el);
        }else{
            window.location.hash = "";
        }
    },

    profile: function () {
        if(appData.settings.userLoggedIn){
            appData.slider.slidePage(new appData.views.ProfileView().render().$el);
        }else{
            window.location.hash = "";
        }
    },

    friend: function(id){
        var userModel = appData.collections.users.where({ "user_id": id });
            userModel = userModel[0];

            console.log(userModel);
        
        appData.slider.slidePage(new appData.views.FriendView({model: userModel}).render().$el); 
    },

    activity: function (id) {
        appData.slider.slidePage(new appData.views.ActivityDetailView().render().$el); 
    },

    createActivity: function () {
        if(appData.settings.userLoggedIn){

            if(appData.settings.created){
                window.location.hash = "#dashboard";
            }else{

                if(appData.settings.dataLoaded){
                    appData.slider.slidePage(new appData.views.CreateActivityView({model: appData.models.userTemplate}).render().$el);
                }else{
                    window.location.hash = "loading";
                }

            }
        }else{
            window.location.hash = "";
        }
    },

    createUser: function () {
        appData.slider.slidePage(new appData.views.CreateUserView({model: appData.models.userModel}).render().$el);
    },
    
    navigater: function (id) {
        appData.slider.slidePage(new appData.views.NavigationView().render().$el);
    },

    activity: function (id) {
        if(appData.settings.userLoggedIn){

            if(appData.settings.dataLoaded){
                var activitiesCollection = appData.collections.activities;
                var selectedActivityModel = activitiesCollection.where({activity_id: id}); 
                    selectedActivityModel = selectedActivityModel[0];

                var view = new appData.views.ActivityDetailView({model: selectedActivityModel});
                    appData.slider.slidePage(view.render().$el);

            }else{
                window.location.hash = "loading";
            }
        }else{
            window.location.hash = "";
        }
    },

    settings: function (id) {
        appData.slider.slidePage(new appData.views.SettingsView().render().$el);
    },

    sportselector: function (id) {
        //       $('body').empty().append(new appData.views.SportSelectorView({ model: new Backbone.Model({"sport_id": ""})}).render().$el);
        appData.slider.slidePage(new appData.views.SportSelectorView({ model: new Backbone.Model({"sport_id": ""})}).render().$el);

    },

    checkLoggedIn: function(){

    }
});

/**
* Facebook Services
*/
appData.services.FacebookServices = Backbone.Model.extend({

	initialize: function() {

	},

	facebookConnect: function(){
		if(appData.settings.native){
			// connect facebook API for mobile apps
	        try {
	        	FB.init({ 
	        		appId: "595730207182331", 
	        		nativeInterface: CDV.FB 
	        	});
	        } catch (e) {
	        	alert(e);
	        }
    	}else{
    		try {

	            FB.init({
	                appId: '293375630813769', // App ID
	                status: false // check login status
	            });

			} catch (e) {
				alert(e);
			}
    	}

	},

	facebookUserToSQL: function(){
		$.ajax({
			url:appData.settings.servicePath + appData.settings.facebookUserToSQL,
			type:'POST',
			dataType:'json',
			data: "email="+appData.models.userModel.attributes.email+"&age="+appData.models.userModel.attributes.age+"&gender="+appData.models.userModel.attributes.gender+"&name="+appData.models.userModel.attributes.name+"&facebook_data="+JSON.stringify(appData.models.userModel.attributes.facebook_data)+"&facebook_id="+appData.models.userModel.attributes.facebook_id+"&avatar="+appData.models.userModel.attributes.avatar+"&current_location="+JSON.stringify(appData.models.userModel.attributes.current_location),
			timeout:60000,
			success:function(data){
				if(data.value === true){
					// store the userID
					appData.settings.userLoggedIn = true;
					appData.models.userModel.set('user_id', data.user_id);
					appData.events.facebookUserToSQLEvent.trigger("facebookUserToSQLSuccesHandler");

				}else{
					appData.events.createUserErrorEvent.trigger("createUserErrorHandler");
				}
			}
		});
	},

	getUserFromFacebookID: function(){
	  	$.ajax({
			url:appData.settings.servicePath + appData.settings.getUserFromFacebookID,
			type:'GET',
			dataType:'json',
			data: "facebook_id="+appData.models.userModel.attributes.facebook_id,
			timeout:60000,
			success:function(data){		
				appData.models.userModel.attributes.strength_score = data.strength_score;
				appData.models.userModel.attributes.stamina_score = data.stamina_score;
				appData.models.userModel.attributes.equipment_score = data.equipment_score;
				appData.models.userModel.attributes.gender = data.gender;
				appData.models.userModel.attributes.age = data.age;

				if(data.avatar !== ""){
					appData.models.userModel.attributes.avatar = data.avatar;
					console.log('replaced avatar');
				}
				appData.events.getUserFromFacebookIDEvent.trigger("facebookGetIDHandler", data);
			}
		});
	},

	facebookLogin: function(){
		FB.login(function(response) {
			appData.settings.userLoggedIn = true;
			appData.events.facebookLoginEvent.trigger("facebookLoginHandler");
	    },{ scope: "email" });
	},

	getProfileData:function(){
		
		FB.api('/me', {fields:['name','email','username','age_range','gender','hometown','link','favorite_athletes','favorite_teams']}, function(response) {

			// store the date in the user profile
			appData.models.userModel.attributes.facebookUser = true;
			appData.models.userModel.attributes.name = response.name;
			appData.models.userModel.attributes.email = response.email;
			appData.models.userModel.attributes.age = response.age_range;
			appData.models.userModel.attributes.facebook_data.age_range = response.age_range.min;
			appData.models.userModel.attributes.facebook_data.favorite_athletes = response.favorite_athletes;
			appData.models.userModel.attributes.facebook_data.favorite_teams = response.favorite_teams;
			
	
			var gender;
			if(response.gender == "male"){
				gender = 1;
			}else{
				gender = 0;
			}

			appData.models.userModel.attributes.gender = gender;
			appData.models.userModel.attributes.facebook_data.hometown = response.hometown.name;
			appData.models.userModel.attributes.facebook_data.username = response.name;
			appData.models.userModel.attributes.facebook_id = response.id;

			FB.api("/me/picture", function(response) {
				appData.models.userModel.attributes.facebook_avatar = response.data.url;
				appData.events.facebookGetProfileDataEvent.trigger("facebookProfileDataHandler");
			});

		});
	},

	getFacebookFriends: function(){
		FB.api('/me/friends', { fields: 'id, name, picture' },  function(response) {
	    	if (response.error) {
	        	appData.events.facebookGetFriendsErrorEvent.trigger("facebookGetFriendErrorHandler");

	    	} else {

				appData.models.userModel.attributes.friends = new UsersCollection(response.data);

				// succesfully signed in via Facebook
	        	appData.events.facebookGetFriendsEvent.trigger("facebookGetFriendsHandler");
	    	}
		});
	}

});

/**
* PHP Services
*/
appData.services.PhpServices = Backbone.Model.extend({

	initialize: function() {

	},

	createActivity: function(activityModel){
		var that = this;

		console.log(activityModel);

		$.ajax({
        url:appData.settings.servicePath + appData.settings.createActivityService,
        type:'POST',
        dataType:'json',
        data: "location_id="+activityModel.attributes.location_id+"&title="+activityModel.attributes.title+"&sport_id="+activityModel.attributes.sport_id+"&description="+activityModel.attributes.description+"&date="+activityModel.attributes.date+"&time="+activityModel.attributes.time+"&user_id="+appData.models.userModel.attributes.user_id+"&participants="+appData.models.userModel.attributes.participants,
        timeout:60000,
	        success:function(data){
	        	console.log(data);
	        	if(data.value === true){
	        		Backbone.trigger('activityCreated', data.activity_id);
	        	}else{

	        	}
	        },
	        error: function(){
	        	alert('errr');
	        }
    	});
	},



	addMessage: function(message, activity_id){
		$.ajax({
			url:appData.settings.servicePath + appData.settings.addMessageService,
			type:'POST',
			dataType:'json',
			data: "message="+message+"&activity_id="+activity_id+"&user_id="+appData.models.userModel.attributes.user_id,
			timeout:60000,
			success:function(data){
				if(data.value === true){
					appData.events.postMessageSuccesEvent.trigger("postMessageSuccesHandler");
				}else{

				}
			}
		});
	},

	createUser: function(){
		console.log('hier');

		$.ajax({
			url:appData.settings.servicePath + appData.settings.addUserService,
			type:'POST',
			dataType:'json',
			data: "email="+appData.models.userModel.attributes.email+"&age="+appData.models.userModel.attributes.age+"&gender="+appData.models.userModel.attributes.gender+"&name="+appData.models.userModel.attributes.name+"&password="+appData.models.userModel.attributes.password+"&current_location="+JSON.stringify(appData.models.userModel.attributes.current_location),
			timeout:60000,
			success:function(data){
				if(data.value === true){
					// store the userID
					appData.settings.userLoggedIn = true;
					appData.models.userModel.attributes.user_id = data.id;

					appData.events.createUserEvent.trigger("createUserHandler");
				}else{
					appData.events.createUserErrorEvent.trigger("createUserErrorHandler");
				}
			}
		});
	},

  userLogin: function(){
		$.ajax({
			url:appData.settings.servicePath + appData.settings.getUserService,
			type:'POST',
			dataType:'json',
			data: "name="+appData.models.userModel.attributes.email+"&password="+appData.models.userModel.attributes.password,
			timeout:60000,
			success:function(data){
				if(data.status === true){
					if(data.password){

						// store the userID
						appData.models.userModel.set('name', data.name);
						appData.models.userModel.set('avatar', data.avatar);
						appData.models.userModel.set('user_id', data.value);
						appData.models.userModel.attributes.strength_score = data.strength_score;
						appData.models.userModel.attributes.stamina_score = data.stamina_score;
						appData.models.userModel.attributes.equipment_score = data.equipment_score;
						appData.models.userModel.attributes.avatar = data.avatar;
						appData.models.userModel.attributes.avatar = data.age;

						console.log(data);

						appData.settings.userLoggedIn = true;
						appData.events.userLoggedInEvent.trigger("userLoggedInHandler");
					}else{
						appData.events.userLoggedInPasswordErrorEvent.trigger("userLoggedInPasswordErrorHandler");
					}
				}else{
					appData.events.userLoggedInErrorEvent.trigger("userLoggedInErrorHandler");
				}
			}
		});
  	},

	getMessages: function(activityModel){
		$.ajax({
			url:appData.settings.servicePath + appData.settings.getMessagesService,
			type:'POST',
			dataType:'json',
			data: "activity_id="+activityModel.attributes.activity_id,
			success:function(data){
				var messages = new MessagesCollection(data);
				appData.events.getMessagesSuccesEvent.trigger("chatMessagesLoadSuccesHandler", messages);
			}
		});
  	},

  	getMyPlannedActivities: function(){
  		console.log(appData.models.userModel.attributes.user_id);

  		$.ajax({
			url:appData.settings.servicePath + appData.settings.getMyPlannedActivities,
			type:'POST',
			dataType:'json',
			data: "user_id="+appData.models.userModel.attributes.user_id,
			success:function(data){
    		appData.collections.myPlannedActivities = new ActivitiesCollection(data);
				Backbone.trigger('myPlannedActivitiesLoadedHandler');
			}
		});
  	},

	getMyActivities: function(){
		$.ajax({
		url:appData.settings.servicePath + appData.settings.getMyActivities,
		type:'POST',
		dataType:'json',
		data: "user_id="+appData.models.userModel.attributes.user_id,
		success:function(data){
			appData.collections.myActivities = new ActivitiesCollection(data);
			Backbone.trigger('myActivitiesLoadedHandler');
		}
	});
	},

	getMyCreatedActivities: function(){
		$.ajax({
		url:appData.settings.servicePath + appData.settings.getMyActivitiesService,
		type:'POST',
		dataType:'json',
		data: "user_id="+appData.models.userModel.attributes.user_id,
		success:function(data){
			appData.collections.myActivities = new ActivitiesCollection(data);
			Backbone.trigger('myActivitiesLoadedHandler');
		}
	});
	},

  	getMedia: function(activityModel){
  		$.ajax({
			url:appData.settings.servicePath + appData.settings.getMediaService,
			type:'POST',
			dataType:'json',
			data: "activity_id="+activityModel.attributes.activity_id,
			success:function(data){

				var media = new MediaCollection(data);
				appData.events.getMediaSuccesEvent.trigger("mediaLoadSuccesHandler", media);
			}
		});
  	},

	getActivities: function(initialLoad, forwardID){
  		$.ajax({
     		url:appData.settings.servicePath + appData.settings.getActivitiesService,
     		type:'GET',
     		dataType:'json',
     		success:function(data){
    			appData.collections.activities = new ActivitiesCollection(data);

    			// initialLoad is when the app starts up
    			if(initialLoad){
    				appData.events.getActivitiesSuccesEvent.trigger("activitiesLoadedHandler");
        		}else if(forwardID){
        			// go to an activity after creating it
        			appData.router.navigate('activity/' + forwardID, true);
        		}else{
        			Backbone.trigger('dashboardUpdatedHandler');
        		}
        	}
    	});
  	},

  	getSports: function(){
        $.ajax({
        	url:appData.settings.servicePath + appData.settings.getSportsService,
            type:'GET',
            dataType:'json',
            success:function(data){
                appData.collections.sports = new SportsCollection(data);
         		appData.events.getSportsSuccesEvent.trigger("sportsLoadedHandler");
         	}
    	});
  	},

  	getBuurten: function(){
        $.ajax({
        	url:appData.settings.servicePath + appData.settings.getBuurtenService,
            type:'GET',
            dataType:'json',
            success:function(data){
                appData.collections.buurten = new BuurtenCollection(data);
         		appData.events.getBuurtenEvent.trigger("buurtenLoadedHandler");
         	}
    	});
  	},

  	getChallenges: function(){
  		$.ajax({
			url:appData.settings.servicePath + appData.settings.getChallengesService,
			type:'POST',
			dataType:'json',
			data: "user_id="+appData.models.userModel.attributes.user_id,
			success:function(data){
				appData.collections.challenges = new ChallengesCollection(data);
         		Backbone.trigger('getChallengesHandler');
			}
		});
  	},

  	getUsers: function(){
  		$.ajax({
			url:appData.settings.servicePath + appData.settings.getUsersService,
			type:'GET',
			dataType:'json',
			success:function(data){
				appData.collections.users = new UsersCollection(data);
         		appData.events.getUsersSuccesEvent.trigger("usersLoadedHandler");
			}
		});
  	},

  	getActivityUsers: function(activityModel){
  		$.ajax({
			url:appData.settings.servicePath + appData.settings.getActivityUserService,
			type:'POST',
			dataType:'json',
			data: "activity_id="+activityModel.attributes.activity_id,
			success:function(data){
				Backbone.trigger('activityUsersSuccesEvent', data);
			},error: function(){
			}
		});
  	},

  	setGoingToActivity: function(activity_id, going){
  		$.ajax({
			url:appData.settings.servicePath + appData.settings.setGoingToActivityService,
			type:'POST',
			dataType:'json',
			data: "user_id="+appData.models.userModel.attributes.user_id+"&going="+going+"&activity_id="+activity_id,
			success:function(data){
				Backbone.trigger('goinToActivitySuccesEvent');
			},error: function(){

			}
		});
  	},

  	getLocations: function(){
  		$.ajax({
			url:appData.settings.servicePath + appData.settings.getLocationsService,
			type:'GET',
			dataType:'json',
			success:function(data){
				appData.collections.locations = new LocationsCollection(data);
				appData.events.getLocationsSuccesEvent.trigger("getLocationsSuccesHandler");

			}
		});
  	},

  	getFavouriteSports: function(){
  		$.ajax({
			url:appData.settings.servicePath + appData.settings.getFavouriteSportsService,
			type:'GET',
			dataType:'json',
			success:function(data){
				appData.collections.favouriteSports = new SportsCollection(data);
      			Backbone.trigger('getFavouriteSportsHandler');
			}
		});  		
  	},

  	addFavouriteSportsService: function(selectedSports){
  		  $.ajax({
			url:appData.settings.servicePath + appData.settings.addFavouriteSportsService,
			type:'POST',
			dataType:'json',
			data: "favourite_sports="+JSON.stringify(selectedSports)+"&user_id="+appData.models.userModel.attributes.user_id,
			success:function(data){
      			Backbone.trigger('addFavouriteSportsHandler');

			}, error: function(error){
				console.log(error);
			}
		});  
  	},

  	getUserFavouriteSports: function(){
  		  $.ajax({
			url:appData.settings.servicePath + appData.settings.getUserFavouriteSportsService,
			type:'POST',
			dataType:'json',
			data: "user_id="+appData.models.userModel.attributes.user_id,
			success:function(data){
				appData.models.userModel.attributes.myFavouriteSports = new SportsCollection(data);
        		Backbone.trigger('getMyFavouriteSportsHandler');
			}
		}); 
  	},

  	addLocation: function(location, coordinates, description){
		$.ajax({
			url:appData.settings.servicePath + appData.settings.addLocationService,
			type:'POST',
			dataType:'json',
			data: "location="+location+"&coordinates="+coordinates+"&description="+description,
			timeout:60000,
			success:function(data){
				if(data.value === true){
					Backbone.trigger('addedLocationSuccesEvent', data.location_id);
				}else{

				}
			}
		});
  	},

  	addPhotoToDatabase: function(imageName, activity_id){
  		 $.ajax({
			url:appData.settings.servicePath + appData.settings.addPhotoToDatabase,
			type:'POST',
			dataType:'json',
			data: "url="+imageName+"&user_id="+appData.models.userModel.attributes.user_id+"&type="+1+"&activity_id="+activity_id,
			success:function(data){
        		Backbone.trigger('addPhotoToDatabaseHandler');
			}
		}); 
  	},

  	getMyAvatar: function(){
  		 $.ajax({
			url:appData.settings.servicePath + appData.settings.getMyAvatarService,
			type:'POST',
			dataType:'json',
			data: "user_id="+appData.models.userModel.attributes.user_id,
			success:function(data){
				appData.models.attributes.avatar_data = data;
        		Backbone.trigger('getAvatarCompleteHandler');
			}
		}); 
  	},

  	getUserAvatar: function(user_id){
  		 $.ajax({
			url:appData.settings.servicePath + appData.settings.getMyAvatarService,
			type:'POST',
			dataType:'json',
			data: "user_id="+user_id,
			success:function(data){
        		Backbone.trigger('getUserAvatarCompleteHandler');
			}
		}); 
  	},

  	getUserChallenges: function(user_id){
  		 $.ajax({
			url:appData.settings.servicePath + appData.settings.getUserChallengesService,
			type:'POST',
			dataType:'json',
			data: "user_id="+user_id,
			success:function(data){
        		Backbone.trigger('getUserChallengesCompleteHandler');
			}
		}); 
  	},

  	updateAvatar: function(){
  	  	$.ajax({
			url:appData.settings.servicePath + appData.settings.updateAvatarService,
			type:'POST',
			dataType:'json',
			data: "user_id="+appData.models.userModel.attributes.user_id+"&strength_score="+appData.models.userModel.attributes.avatar_strength+"&stamina_score="+appData.models.userModel.attributes.avatar_stamina+"&equipment_score="+appData.models.userModel.attributes.avatar_equipment,
			success:function(data){
				Backbone.trigger('updateAvatarCompleteHandler');
			}
		}); 	
  	},

  	getMyChallengesHandler: function(){
  	  	$.ajax({
			url:appData.settings.servicePath + appData.settings.getMyChallengesService,
			type:'POST',
			dataType:'json',
			data: "user_id="+appData.models.userModel.attributes.user_id,
			success:function(data){
				appData.models.userModel.attributes.myChallenges = new ChallengesCollection(data);
				Backbone.trigger('getMyChallengesHandler');
			}
		}); 	
  	},

  	joinChallenge: function(challenge_id){
  		$.ajax({
			url:appData.settings.servicePath + appData.settings.joinChallengeService,
			type:'POST',
			dataType:'json',
			data: "user_id="+appData.models.userModel.attributes.user_id+"&challenge_id="+challenge_id,
			success:function(data){
				Backbone.trigger('joinedChallengeHandler');
			}, error: function(){
				alert('errro');
			}
		}); 
  	},

  	getMyBadges: function(){
  		$.ajax({
			url:appData.settings.servicePath + appData.settings.getBadgesService,
			type:'POST',
			dataType:'json',
			data: "user_id="+appData.models.userModel.attributes.user_id,
			success:function(data){
				appData.models.userModel.attributes.myBadges = new ChallengesCollection(data);
				Backbone.trigger('getMyBadgesHandler');
			}
  		});
  	},

  	updateChallenge: function(challenge_id, status){
  		$.ajax({
			url:appData.settings.servicePath + appData.settings.updateChallengeService,
			type:'POST',
			dataType:'json',
			data: "user_id="+appData.models.userModel.attributes.user_id+"&challenge_id="+challenge_id+"&status="+status,
			success:function(data){
				Backbone.trigger('updateChallengeScore');
			}
  		});
  	},

  	addSport: function(sport_title, description, icon){

  		$.ajax({
			url:appData.settings.servicePath + appData.settings.addSportService,
			type:'POST',
			dataType:'json',
			data: "sport_title="+sport_title+"&description="+description+"&icon="+icon,
			success:function(data){
				Backbone.trigger('addedSportHandler', data);
			}
  		});
  	},

  	getFriends: function(sport_title, description, icon){

  		$.ajax({
			url:appData.settings.servicePath + appData.settings.getFriendsService,
			type:'POST',
			dataType:'json',
			data: "user_id="+appData.models.userModel.attributes.user_id,
			success:function(data){
				appData.models.userModel.attributes.myFriends = new UsersCollection(data);
				Backbone.trigger('getFriendsHandler');
			}, error:function(){
				alert('errr');
			}
  		});
  	},

	addFriend: function(friend_id, friend_from_id){

		$.ajax({
			url:appData.settings.servicePath + appData.settings.addFriendService,
			type:'POST',
			dataType:'json',
			data: "friend_id="+friend_id+"&friend_from_id="+friend_from_id,
			success:function(data){
				Backbone.trigger('addedFriendHandler');
			}
  		});
    },

    getMyInvitations: function(){

		$.ajax({
			url:appData.settings.servicePath + appData.settings.getMyInvitationsService,
			type:'POST',
			dataType:'json',
			data: "user_id="+appData.models.userModel.attributes.user_id,
			success:function(data){
				appData.collections.myInvitations = new ActivitiesCollection(data);
				Backbone.trigger('getInvitationsHandler');
			}
  		});
    },

    inviteFriends: function(friends, activity_id){

    	var counter = 0;
    	friends.each(function(friendModel){
    		$.ajax({
				url:appData.settings.servicePath + appData.settings.inviteFriendsService,
				type:'POST',
				dataType:'json',
				data: "user_id="+friendModel.attributes.user_id+"&activty_id="+activity_id,
				success:function(data){
					counter++;
					if(counter == friends.length){
						Backbone.trigger('friendsInvitedHandler');
					}
				}
  			});	
    	});
    },

	handleInvitations: function(invitation_id, accepted, activity_id){

		$.ajax({
			url:appData.settings.servicePath + appData.settings.handleInvitationsService,
			type:'POST',
			dataType:'json',
			data: "invitation_id="+invitation_id+"&accepted="+accepted+"&activity_id="+activity_id+"&user_id="+appData.models.userModel.attributes.user_id,
			success:function(data){
				console.log("dataaaaaa");
				Backbone.trigger('acceptInviteHandler');
			}, error: function(){
				console.log("error");
			}
		});	
    },

    removeFriend: function(friend_id){
		$.ajax({
			url:appData.settings.servicePath + appData.settings.removeFriendService,
			type:'POST',
			dataType:'json',
			data: "friend_id="+friend_id,
			success:function(data){
				Backbone.trigger('friendRemovedHandler');
			}, error: function(){
				console.log("error");
			}
		});	
    },

    updateUserAvatar: function(avatar){
		$.ajax({
			url:appData.settings.servicePath + appData.settings.updateUserAvatarService,
			type:'POST',
			dataType:'json',
			data: "user_id="+appData.models.userModel.attributes.user_id+"&avatar="+avatar,
			success:function(data){
				Backbone.trigger('updateUserAvatar');
			}, error: function(){
				console.log("error");
			}
		});	
    },

    uploadMediaNonNative: function(files){
		$.ajax({
			url:appData.settings.servicePath + appData.settings.uploadMediaNonNativeService + "?files",
			type:'POST',
			cache: false,
			dataType:'json',
			data: files,
			processData: false, // Don't process the files
			contentType: false, // Set content type to false as jQuery will tell the server its a query string request
		    success: function(data, textStatus, jqXHR)
		    {
		    	if(typeof data.error === 'undefined')
		    	{
		    		// Success so call function to process the form
		    		console.log(data);
		    		Backbone.trigger('fileUploadedEvent', data);
		    	}
		    	else
		    	{
		    		// Handle errors here
		    		console.log('ERRORS: ' + data.error);
		    	}
		    },
		    error: function(jqXHR, textStatus, errorThrown)
		    {
		    	// Handle errors here
		    	console.log('ERRORS: ' + textStatus);
		    	// STOP LOADING SPINNER
		    }
		});	
    }
});


/**
* Facebook Services
*/
appData.services.UtilServices = Backbone.Model.extend({

	initialize: function() {

	},

	getNetworkConnection: function(){
		// check if there is a working internet / 3G / 4G / WIFI connection to enable the dynamic mode
		var networkState = navigator.connection.type;

		var states = {};
		states[Connection.UNKNOWN]  = false;
		states[Connection.ETHERNET] = true;
		states[Connection.WIFI]     = true;
		states[Connection.CELL_2G]  = true;
		states[Connection.CELL_3G]  = true;
		states[Connection.CELL_4G]  = true;
		states[Connection.CELL]     = false;
		states[Connection.NONE]     = false;

		appData.settings.network = states[networkState];
		return appData.settings.network;
	},

	getLatLon: function(keywords){
		$.ajax({
			url:"http://maps.google.com/maps/api/geocode/json?address="+ keywords +"&sensor=false&region=be",
			type:'GET',
			dataType:'json',
			success:function(data){
				console.log(data);

				var location = data.results[0];
				appData.events.getLatLonEvent.trigger('getLatLonSuccesHandler', location);

			},error: function(){

			}
		});
	},

	getLocationService: function(target){
		// geolocate
		if(appData.settings.native){

				navigator.geolocation.getCurrentPosition(onSuccess, onError);
				var location = [];


				function onSuccess(position) {
					console.log(position);

					switch(target){
					case "login":
						appData.events.locationHomeEvent.trigger('locationSuccesHandler', position);
						break;
					case "createActivity":
						appData.events.locationCreateActivityEvent.trigger('locationSuccesHandler', position);
						break;
					case "dashboard":
						Backbone.trigger('getMyLocationHandler');
						break;
					}
				}

				// onError Callback receives a PositionError object
				function onError(error) {

					switch(target){
					case "login":
						Backbone.trigger('locationError');
						break;
					case "createActivity":
						appData.events.locationCreateActivityEvent.trigger('locationSuccesHandler', location);
						break;
					}
				}
		}else{
			appData.events.locationEvent.trigger('locationErrorHandler', location);
		}
	},

	localDataToCollection: function(dataObject){

		// this function converts localstorage object to backbone collections
		appData.collections.activities = new ActivitiesCollection(dataObject.activities);
		appData.collections.buurten = new BuurtenCollection(dataObject.buurten);
		appData.collections.challenges = new ChallengesCollection(dataObject.challenges);
		appData.collections.favouriteSports = new SportsCollection(dataObject.favouriteSports);
		appData.collections.locations = new LocationsCollection(dataObject.locations);
		appData.collections.myActivities = new ActivitiesCollection(dataObject.myActivities);
		appData.collections.myPlannedActivities = new ActivitiesCollection(dataObject.myPlannedActivities);
		appData.collections.sortOptions = new SortOptionsCollection(dataObject.sortOptions);
		appData.collections.sports = new SportsCollection(dataObject.sports);
		appData.collections.users = new UsersCollection(dataObject.users);

		appData.settings.dataLoaded = true;

	},

	  // check if there is a working internet / 3G / 4G / WIFI connection to enable the dynamic mode
  checkConnection: function() {
    var networkState = navigator.connection.type;

    var states = {};
        states[Connection.UNKNOWN]  = false;
        states[Connection.ETHERNET] = true;
        states[Connection.WIFI]     = true;
        states[Connection.CELL_2G]  = true;
        states[Connection.CELL_3G]  = true;
        states[Connection.CELL_4G]  = true;
        states[Connection.CELL]     = false;
        states[Connection.NONE]     = false;

        appData.settings.network = states[networkState];
  }

});


appData.utils.templates = (function() {

    var load = function(views, callback) {

        var deferreds = [];

        $.each(views, function(index, view) {
            if (appData.views[view]) {
                deferreds.push($.get('public/templates/' + view + '.html', function(data) {
                    appData.views[view].prototype.template = _.template(data);
                }, 'html'));
            } else {
                alert(view + " not found");
            }
        });


        $.when.apply(null, deferreds).done(callback);
    }



    // The public API
    return {
        load: load
    };


}());

})();