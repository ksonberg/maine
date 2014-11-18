var App = Ember.Application.create({
  LOG_TRANSITIONS: true 
});

App.Router.map(function() {
	this.route('about');
	this.route('credits');
	this.resource('things');
	this.resource('others', function() {
		this.resource('other', {path: '/:title'});
	});
	this.resource('doodads', function() {
		this.resource('doodad', {path: '/:doodad_id'});
	});
});

App.IndexController = Ember.ArrayController.extend({
	header: 'Welcome!',
	msg: 'Things of interest at the weekend retreat',
	image: 'images/maine-house.jpg',
	thingCount: Ember.computed.alias('length'),
	time: function() {
		return (new Date()).toDateString();
	}.property()
});

App.DoodadsController = Ember.ArrayController.extend({
	sortProperties: ['title']
});

App.ThingsRoute = Ember.Route.extend({
	model: function() {
		return App.THINGS;
	}
});

App.OthersRoute = Ember.Route.extend({
	model: function() {
		return App.THINGS;
	}
});

App.OtherRoute = Ember.Route.extend({
	model: function(params) {
		return App.THINGS.findBy('title', params.title)
	}
});

App.DoodadsRoute = Ember.Route.extend({
	model: function() {
		return this.store.findAll('doodad');
	}
});

App.DoodadRoute = Ember.Route.extend({
	model: function(params) {
		return this.store.find('doodad', params.doodad_id);
	}
});

App.IndexRoute = Ember.Route.extend({
	model: function() {
		return this.store.findAll('doodad');
	}
});

App.ApplicationAdapter = DS.FixtureAdapter.extend();

App.Doodad = DS.Model.extend({
	title: DS.attr('string'),
	description: DS.attr('string'),
	image: DS.attr('string')
});

App.Doodad.FIXTURES = [
{
	id: 1,
	title: 'Piano',
 	description: 'The old piano by the front door',
 	image: 'images/piano.png'
},
{
	id: 2,
	title: 'Single Malt',
 	description: 'Ardbeg single malt scotch whiskey',
 	image: 'images/scotch.png'	
},
{
	id: 3,
	title: 'Big Telephone',
 	description: 'Proof that Maine a little behind the times',
 	image: 'images/phone.png'	
},
{
	id: 4,
	title: 'Hot Tub!',
 	description: 'Nothing like the smell of chlorine in the morning',
 	image: 'images/hottub.png'	
},
{
	id: 5,
	title: 'Loneliest Lobster',
 	description: 'Unlucky number 13',
 	image: 'images/lobster.png'	
}
];

App.THINGS = [
{
	title: 'Piano',
 	description: 'The old piano by the front door',
 	image: 'images/piano.png'
},
{
	title: 'Single Malt',
 	description: 'Ardbeg single malt scotch whiskey',
 	image: 'images/scotch.png'	
},
{
	title: 'The Big Telephone',
 	description: 'Proof that Maine a little behind the times',
 	image: 'images/phone.png'	
},
{
	title: 'Hot Tub!',
 	description: 'Nothing like the smell of chlorine in the morning',
 	image: 'images/hottub.png'	
},
{
	title: 'The Loneliest Lobster',
 	description: 'Unlucky number 13',
 	image: 'images/lobster.png'	
}
];

