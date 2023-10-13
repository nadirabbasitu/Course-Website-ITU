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

# How to handle pages
- These are major pages of our site
    1) Home
    1) Announcements 
    1) Calendar
    1) Schedule
    1) Attendance
    1) Student Progress
    1) Details
    1) Page of Fame
    1) Staff
- To handle all of these files there is only single js file that contains different methods for each file and content that is being render using sheet data is handle by DOM in these methods 
- Each md file contains "script" tag in it that shows which method is being called 

### 1) HOME 
**To handle home view these are major files** 
```
└── index.md
├── assets # assets folder
|   ├── js # js folder 
|   |   ├── library.js # staticData method 
└── └── css # folder that contains css files 
```


### 2) Announcements
**To handle announcements view these are major files**
```
└── announcements.md
├── assets # assets folder
|   ├── js # js folder 
|   |   ├── library.js # announcements method 
└── └── css # folder that contains css files 
```

### 3) Calendar
**To handle calendar view these are major files**
```
└── calendar.md
├── assets # assets folder
|   ├── js # js folder 
|   |   ├── library.js # calender method 
└── └── css # folder that contains css files 
```

### 4) Schedule
**To handle the schedule view, these are the major files:**
```
└── schedule.md
├── assets
|   ├── js
|   |   ├── library.js # staticData method 
└── └── css # folder that contains css files 
```

### 5) Attendance
**To handle the attendance view, these are the major files:**
```
└── attendance.md
├── assets
|   ├── js
|   |   ├── library.js # attendance method 
└── └── css # folder that contains css files 
```

### 6) Student Progress 
**To handle the Student Progress view, these are the major files:**
```
└── studentProgressReport.md
├── assets
|   ├── js
|   |   ├── library.js # stdProgressReport method
└── └── css # folder that contains css files 
```

### 7) Details
**To handle the Details view, these are the major files:**
```
└── pages # pages folder 
|   ├── details # details folder 
|   |   ├── key.md 
|   |   ├── outlines.md 
|   |   ├── parts.md 
|   |   └── tools.md 
|   └── details.md 
├── assets # assets folder 
|   ├── js # js folder 
|   |   ├── library.js # staticData method
└── └── css # folder that contains css files 
```

### 8) Page of Fame
**To handle the Page of Fame view, these are the major files:**
```
└── pageofFame.md
├── assets
|   ├── js
|   |   ├── library.js # pageOfFame method
└── └── css # folder that contains css files 
```

### 9) Staff 
**To handle the Staff of Fame view, these are the major files:**
```
└── pageofFame.md
├── assets
|   ├── js
|   |   ├── library.js # staff method
└── └── css
```

# Handling Offline mode 
- These are major files we have to handle for offline mode
- We required **4 files from Google Sheet into csv format** for offline mode 
  1) website_weekly_data # for announcements & calendar 
  2) website_top_std_of_week # for top student of the week 
  3) website_overall_top_std # for overallTopStudent
  4) CourseDetails # use for multiple for parts, deatils, index, staff, and links on different pages 
## how its work 
- into **config.yml** file there is a variable you have to change it to **true** to make it offline work as it is set to **false** for online mode
```
site_mode_isOffline: &my_anchor false
```
- When it is set to **true** then offline mode will be activate and data will be read from csv files into csv folders
- There are some variables in **config.yml** file as given below
- These are sheetNames used into md files where js method is called 
``` 
staff_csv: staff    
general_data_csv: general_data
overall_top_std_csv: website_overall_top_std
top_std_of_week_csv: website_top_std_of_week
announcement_and_calender_csv: website_weekly_data
```
- make sure names should be same as given to csv files but without extension (.csv)
- there is method in **library.js named read_CSV_file_data** which is handling csv file and convert it into required json format
- For **staff_csv** you have to go to Course Details sheet and create an empty sheet copy staff table and paste there and then download csv file for staff
- For **general_data_csv** Course Details sheet and create an empty sheet copy general table in the last and paste (don't just paste it will work with **special paste values only**) there and then download csv file for general_data_csv

### Student Progress Report 
- as we have single lab in this semester so if there are two labs then in **studentProgressReport.md** file remove class name **d-none** from option for Lab B.