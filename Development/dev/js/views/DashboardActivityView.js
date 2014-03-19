appData.views.DashboardActivityView = Backbone.View.extend({

    initialize: function () {

    }, 

    render: function() { 
    	// model to template
    	console.log(this.model.attributes);

    	this.$el.html(this.template({activity: this.model.toJSON(), imagePath: appData.settings.imagePath}));
        return this; 
    }

});





