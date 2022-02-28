# Box Letter Post Luxembourg
## Description
Generating maps gets more and more important for users who want to get detailed information about a location or an event. Google maps and different tools that are currently being used track a lot of data that more and more clients of 101 Studios don’t want to share with theses multinational companies. As a result, the goal is to develop a tool that counters this problem and creates a standalone solution for the different clients, but also for the developer team at 101 Studios. As a best practice example, the intern will develop a website dedicated to the letterboxes of Post Luxembourg. Where are they situated – when will they be emptied, and which letterbox is next to my current location.
## Why this project?
This project is a final bachelor project developed by Matos Freitas David with the help of the company 101 Studios.
## Usefull commands to run this project?
Since this is a laravel project some steps are required to run it. First of all a database should be setup. I deceided to use a MAMP server setup the project on that server. To setup the project I followed [those](https://5balloons.info/how-to-install-laravel-with-mamp-on-mac-os/) instructions.

To start the Laravel project:
> php artisan serve

To create the tables you can do it with migration. Following command should be used:
> php artisan migrate:refresh

To insert data into the tables following commands should be used:
> insert data into city table
>> php artisan db:seed --class=InsertCity

> insert data of the box letters
>> php artisan db:seed --class=InsertBoxLetter

