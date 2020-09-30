# ESE2020 Scaffolding Frontend

## Prerequisite
You should have installed [NodeJS and npm](https://nodejs.org/en/download/) (they come as one) in order to run the application.  
Make sure the backend is running according to its [README](https://github.com/scg-unibe-ch/ese2020-project-scaffolding/blob/master/backend/README.md).

## Start
- navigate to the frontend folder `cd ese2020-project-scaffolding/frontend` within the same repo where you set up the backend
- run `npm install`
- run `npm run dev`
- open your browser with the url [http://localhost:4200](http://localhost:4200/)

**If you encounter CORS errors within your browser, add the [Allow CORS](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=en) extension (version for Google Chrome) to your browser.**

## About
The frontend of the project scaffolding shows you a simple Angular application with some basic features.

We have included a simple **todo checklist** to demonstrate how you can implement CRUD-operations (Create, Read, Update, Delete).
The todo example allows you to create todo-lists whereas each list can have multiple todo-items assigned to it.
Each list and item has a name and each item has a checkbox to keep track whether that task has been completed or not.

The second main feature is a small **user login** component where you can try to access a secure endpoint.
Since we have not included the option to register (this will be up to you), we will provide you a test user:
````
Username: Nora
Password: notSecure12
````
Once you are logged in, there should be a message displaying that you are signed in as 'Nora'.
With the button 'Access Secure Endpoint', you can try to access a secure endpoint in the backend that can only be accessed by logged in users.
It will display a message whether you were able to access it or not.

## Podcast
For a more detailed explanation of the frontend, watch the [podcast](https://tube.switch.ch/switchcast/unibe.ch/series/9a3d9eb3-d0cc-4993-9ac9-3e4c975b63bb) from the exercise hour.

## Quick Links
These are links to some of the files that we have implemented/modified when developing the frontend:

- **[package.json](./package.json)**  
  Includes all required dependencies of the project
- **[styles.css](./src/styles.css)**  
  Few global style changes
- **[environment](./src/environments/environment.ts)**  
  Specified backend endpoint URL to use it throughout the frontend
- **[models](./src/app/models)**  
  Defined models for TodoList and TodoItem
- **[AppModule](./src/app/app.module.ts)**  
  Includes all the necessary modules and components
- **AppComponent** | [TS](./src/app/app.component.ts), [HTML](./src/app/app.component.html)  
  Main component of the frontend application
- **TodoListComponent** | [TS](./src/app/todo-list/todo-list.component.ts), [HTML](./src/app/todo-list/todo-list.component.html)  
  Represents a todo-list
- **TodoItemComponent** | [TS](./src/app/todo-list/todo-item.component.ts), [HTML](./src/app/todo-list/todo-item.component.html)  
  Represents a todo-item
- **UserLoginComponent** | [TS](./src/app/user-login/user-login.component.ts), [HTML](./src/app/user-login/user-login.component.html)  
  Represents the user login section
- **[AuthInterceptor](./src/app/auth/auth.interceptor.ts)**  
  Intercepts all HTTP requests to add the user token if a user is logged in.
  Some backend requests can only be fulfilled if user is signed in and provides his user token for authentication.

## Resources
- [Angular](https://angular.io/)  
  Frontend Framework 
- [Angular Material](https://material.angular.io/)  
  Material Design Components
