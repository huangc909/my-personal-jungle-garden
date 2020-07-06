# My Personal Jungle Garden: An App for Plant Lovers

My Personal Jungle Garden is an app that allows users to keep logs of their plant journey. I came up with this idea because I wanted to record my planting and gardening experiences. As a relatively new plant mom, I am still experimenting with understanding which types of plants are suitable for the different areas in my current living space. Plant lovers and gardeners would benefit from this app as it tracks their plant growing history, which could help them with future plant growths.


## Planning Story

Since this was a full-stack project, I first approached this project by writing user stories and creating wireframes. Then, I set each user story and component of the wireframe as a small goal.

Once I had my plan clearly laid out, I began to work on the back end API. I started with the writing the user and plant collection models/schemas. Then, I created the curl-scripts as well as the user and plant collections routes for CRUD.

After testing out that I can successfully request all the components for CRUD, I went to the client-side application and began to work on front-end, which you can read about here (https://github.com/huangc909/my-personal-jungle-garden-client).

Once I had the MVP completed for one user to many collections, I created a plants subdocument so that one plant collection can have many plants. After completing the show, create, update, delete requests in the back-end, I once again went back to my front-end app to add the plants feature.

This back-end part of the app gave me a clearer understanding on how to draw relationships among resources as well as store/updating resources in the database using CRUD requests.


## User Stories

- As a user, I want to be able to sign up for a user account.
- As a user, I want to be able to sign in to my user account.
- As a user, I want to be able to change my password for my account.
- As a user, I want to be able to sign out of my user account.
- As a user, I want to be able to add my plants to my account.
- As a user, I want to be able to see all of the plants that I have added to my collection.
- As a user, I want to be able to record information about my plants (the name, nickname, date acquired, additional notes, and logs)
- As a user, I want to be able to edit my plant information.
- As a user, I want to be able to delete my plant information.


## Technologies Used:

- Express
- Mongoose
- MongoDB
- Node.js


### Unsolved Goals

- Add another sub document feature that includes logs for users to keep track of their plant care journey.

## Images
### My Personal Jungle Garden Wireframes:

![Project2-Wireframes](https://user-images.githubusercontent.com/53062479/86547397-e1f72180-bf06-11ea-9d17-0b9de6cfddf6.jpg)


### ERD:

![Project2-ERD](https://user-images.githubusercontent.com/53062479/86547712-e07a2900-bf07-11ea-9412-72062629f7e0.jpg)
