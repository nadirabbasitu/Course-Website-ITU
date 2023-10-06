# ITU UBS

We have used and modified according to our course need from github [repository](https://github.com/kevinlin1/just-the-class)


You can find deployment details on that repository .

### To install dependencies
```
bundle install
```
### To run the project
```
bundle exec jekyll serve
```

## Folder Structure
 ```
└── assets
    ├── css
    ├── csv_files # make sure not to change file names because it is using in library.js file methods
    |   ├── website_overall_top_std.csv 
    |   ├── website_top_std_of_week.csv
    |   ├── website_staff.csv
    |   └── website_week_data.csv
    ├── images
    |   ├── course #images used in course page
    |   ├── policy # images used in policy page
    |   └── positions # contains the images used for position holders
    |   ├── staff # contains images of staff members including TAs
    |   └── students # contains images of students that will be use on famepage
    |   ├── ubs-itu.png # ubs logo with itu
    |   └── ubsitu.png # banner image with itu logo
    ├── js
    |   └── library.js  # this is the file that is controlling the data rendering of almost all pages and fetching data from google app scripts and also getting data from csv_files for offline mode
    ├── pages
    |   ├── details # contains pages of detials dropdown
    |   └── details
    ├── _config.yml # this is configration file which is used to set data for different pages and controll the behaviour of site explained below
    ├── announcements.md # page strucutre for announcements page
    ├── attendance.md # page strucutre for announcements page
    ├── calendar.md # page strucutre for calendar page
    ├── CNAME # name of site
    ├── famepage.md # page strucutre for famepage page for both top students of week and overall top students
    ├── index.md # landing page (index page)
    ├── schedule.md # page strucutre for schedule page
    ├── staff.md # page strucutre for staff page
    └── StudentProgressReport.md # page strucutre for StudentProgressReport page
    
```


# Some of useful variables in _config.yml file
Here is what to be modify to make site useful for other courses

- #### site_mode_isOffline
    ```
    site_mode_isOffline: &my_anchor false
    ```
    - This is one of the major variable which is use to set the mode of site ONLINE or OFFLINE
    - If it is true the site data will be generated from the csv files in folder of csv_files 
    - This is also controlling hiding and showing the nav buttons Student Progress and Attendance which will be hide on offline mode, this variable value pass to them to show or hide in nav bar 
    - This is also using in library.js file to controll data getting flow.

- #### title
    ```
    title: {{site.title}} 
    ```
    - This is the title of the page which is used in index page and search bar 

- #### url
    ```
    url: 'https://fall2023-se101a.ubs.dev'
    ```
    - This url will be set that will be use as web url 
    
- #### courseDetails_sheet_url
    ```
    courseDetails_sheet_url : sheet app url
    ```
    - This is the url of google app scripts of Course Details sheet

- #### defaults
    ```
    defaults:
        - scope:
            path: ''
        values:
            layout: "page"
            nav_order: 5
            nav_exclude: *my_anchor
            author: "UBS"
    ```
    - This is setting default front matters to each page 
    - *my_anchor is the value of site_mode_isOffline variable that pass to each page to control hide and show on different modes (offline, online)

- #### scheduleData
    ```
    scheduleData: ...
    ```
    - This variable is using in Schedule view so update the schedule from here

# library.js file
- This file contains all the methods to manipulate DOM, and to make this site dynamic

### Some major methods
- #### read_CSV_file_data(fineName, callBackMethod, containerName)
    - This method is used to read file from csv files and generate json and pass that json data to callBackMethod (which is mostly createContent) in each method to write HTML using DOM.
    - #### Parameters used 
        - #### fileName
            - This is the file name of the csv file we saved in csv_files folder
        - #### callBackMethod
            - This is the method use to send json data
        - #### containerName
            - This is mainly use for famepage view 
            - Because it has two different containers 1st for weekly top students and 2nd for top 3 overall 

- #### announcements (url, sheetName, site_mode_isOffline)
    - This method is used to handle Announcements view DOM and other dynamic behaviour
    - #### Parameters used 
        - #### url 
            - This is the google sheet app url that is getting from config file 
        - #### sheetName 
            - Sheet name of google sheet tab
        - #### site_mode_isOffline 
            - To check if site mode is offline or online  

- #### calender (url, sheetName, site_mode_isOffline)
    - This method is used to handle Calender view DOM and other dynamic behaviour
    - #### Parameters used 
        - #### url 
            - This is the google sheet app url that is getting from config file 
        - #### sheetName 
            - Sheet name of google sheet tab
        - #### site_mode_isOffline 
            - To check if site mode is offline or online  

- #### pageOfFame (url, sheetName, sheetName_2, site_mode_isOffline)
    - This method is used to handle Fame Page view DOM and other dynamic behaviour
    - #### Parameters used 
        - #### url 
            - This is the google sheet app url that is getting from config file 
        - #### sheetName 
            - Sheet name of google sheet tab of top students of week 
        - #### sheetName2 
            - Sheet name of google sheet tab of overall top students of semester
        - #### site_mode_isOffline 
            - To check if site mode is offline or online 

- #### staff (url, sheetName, site_mode_isOffline)
    - This method is used to handle Staff page view DOM and other dynamic behaviour
    - #### Parameters used 
        - #### url 
            - This is the google sheet app url that is getting from config file 
        - #### sheetName 
            - Sheet name of google sheet tab of staff 
        - #### site_mode_isOffline 
            - To check if site mode is offline or online 

- #### attendance (url, sheetName, site_mode_isOffline)
    - This method is used to Attendance page view DOM and other dynamic behaviour
    - #### Parameters used 
        - #### url 
            - This is the google sheet app url that is getting from config file 
        - #### sheetName 
            - Sheet name of google sheet tab of staff 
        - #### site_mode_isOffline 
            - To check if site mode is offline or online

- #### stdProgressReport (rollNumUrl, progressSheetUrl, sheetName, site_mode_isOffline)
    - This method is used to Attendance page view DOM and other dynamic behaviour
    - #### Parameters used 
        - #### rollNumUrl 
            - This is the google sheet app url to check the if user is valid or not that will be check from attendance sheet this url is getting from config file 
        - #### progressSheetUrl 
            - This is the google sheet app url of analysis sheet to get user marks details this triggers the script to generate user analysis chart and url is getting from config file 
        - #### sheetName 
            - Sheet name of google sheet tab of staff 
        - #### site_mode_isOffline 
            - To check if site mode is offline or online