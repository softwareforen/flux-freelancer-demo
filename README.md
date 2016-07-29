# React-Backbone Freelancer APP

This app is an sample to start working with certain js libraries. 
Unlike js-Frameworks this approach just uses libraries and creates its own conventions for coding styles and how things are being done.
In this specific case the Flux-Design Pattern has been used to create a small Webapp that manages Freelancer.
Some basic CRUD-functions are provided at the moment. 

1. Add Freelancer
2. Delete Freelancer
3. Update Freelancer

Note that those functions do not persist the data. They are just saveing them inside the Browser RAM and are restored to an intial state every reload.

## Flux

The Flux design pattern is described in detail at [Facebooks Github Page](https://facebook.github.io/flux/docs/overview.html).

Briefly said Flux defines its data flow in one single direction (image taken from mentioned page).
![Flux Flow](https://facebook.github.io/flux/img/flux-simple-f8-diagram-explained-1300w.png)

We can see three kinds of entities.

1. Dispatcher
2. Store
3. View

### Dispatcher

The Dispatcher can be seen as a big Event-Handler. Any Action causes the dispatcher to throw an event.
The Dispatcher is emmiting its events to all stores listening to this dispatcher.
Facebook has created its own js-library which provides this basic functionality. It can be installed via npm.

	npm install flux

### Store

Stores contain application state and logic.
In this example the store is realised as an [backbone Collection](http://backbonejs.org/#Collection).
Models as well as methods listening to events of the dispatcher are defined in there.
After processing some logic change-events cause models to redraw the DOM.

### View

Views are the representation of the state and models of the application. This means they represent the data of the store.
In this example Views are realised with [reactjs](https://facebook.github.io/react/).
Views are able to cause Actions that are passed to the Dispatcher. **Views never modifiy the stores directly**.

## Dependencies

The app is based on the following js-libraries.

1. Flux - The Dispatcher
2. Backbone - The Store
3. React - The View

Some Helper-Libraries are also contained.

1. JQuery
2. JQuery-UI (not used at the moment)

## Installation

Since all dependencies are managed with npm [NodeJs](https://nodejs.org/en/) has to be installed.
You can find the installation details at ther [official page](https://nodejs.org/en/download/).

So the following steps have to be done.

1. Install Node
2. Clone the repo
3. cd in the dir of the working directory of the repo
4. run
	npm install
5. Open the HTML-File in the browser

## Next steps

At the moment the code is not modular at all. Since we need to find out, how to use [Asynchronous Module Definition-Specification (AMD)](https://en.wikipedia.org/wiki/Asynchronous_module_definition), the code is not modular at the moment. This leads to a bad understanding and untestable code.
Basically AMD is often done with [requirejs](https://en.wikipedia.org/wiki/Asynchronous_module_definition).
Javascript is an dynamically typed scriptlanguage which is interpreted only and therfore just throws errors at runtime. As we are used to statically typed programming languages like java we love compilers and types!
The solution for this difference ist [Typescript](http://www.typescriptlang.org/).
It is made by Microsoft and described as an *Typed Superset of Javascript*.
We can use it to provide types and modularize the code in an Object-Oriented or functional way. But to do so, we have to concider that the libraries used are written in js mostly and need to be wrapped in typescript type definitions. So we are dependant on third parties providing those definitions or need to create them on our own. Finally every typedefinition has to be worked on. If we have a look on the dependencies there is much to do.

To put it in a nutshell the following steps have to be done.

1. Create an persitence layer
	* Elasticsearch for its ease of use and flexibillity
2. Learn require js
3. Transfer the code to typescript
	* Firstly require than the other libs


