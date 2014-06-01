cosmic-hackathon
================

COSMIC Hackathon Project

This is the front-end code that The Bean Team developed during the COSMIC Hackathon on Saturday 31st May in London.

It is a single-page Angular.js application that should have been connected to an external service (hosted on heroku) to retrieve the questions and the images for the survey (unfortunately we didn't had enought time to complete the server-side code).
The backend was intended to be a very lightweight application, that was simply converting the folder structure to a json file and return it to the frontend. 
The names of the folders would have been the questions, the name of the files would have been the responses, and finally the images (JPGs, PNGs, animated GIFs) would have been hosted on the server itself.
Not only: the folders and the images would have been kept in sync with a Dropbox folder (using an existing heroku add-on) so that maintaining, updating or even creating new surveys would have been extremely simple for the COSMIC staff.
At the same time, the responses collected by the backend would have been saved as CSV files (one per questionaire and user) in one dedicated folder inside the main Dropbox folder, so that also the data would have been delivered to the COSMIC team simply using the Dropbox/Heroku sync (this time the other way round), and the COSMIC operators could simply open the CSV files in Excel/Numbers, copy in a main spreadsheet and then elaborate the data in that file.
A very simple, low cost solution, without the necessity to implement special content-management systems, storage servers, databases.
