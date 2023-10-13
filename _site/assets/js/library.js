var library = (function () {

    function read_CSV_file_data(fileName, callBackMethod, containerName) {
        // staff.csv
        fetch(`../assets/csv_files/${fileName}`)
            .then(response => response.text())
            .then(csvText => {
                const rows = csvText.split('\n');

                const headers = rows[0].split(',').map(header => header.trim());

                const jsonData = [];
                for (let i = 1; i < rows.length; i++) {
                    const rowValues = rows[i].split(',');

                    if (rowValues.length === headers.length) {
                        const rowObject = {};
                        for (let j = 0; j < headers.length; j++) {
                            const value = rowValues[j].replace(/\r/g, '');
                            // console.log("rowValues cehkkkkkk****",value)

                            rowObject[headers[j]] = value;
                        }
                        // console.log("rowObject cehkkkkkk****",rowObject)
                        jsonData.push(rowObject);
                    }
                }

                callBackMethod(jsonData, containerName)
            })
            .catch(error => {
                console.error('noot worrrking:', error);
            });
    }

    function getColors(colorType) {

        // console.log("colortype", colorType)
        switch (colorType) {
            case "Announcement":
                return "#e7af06"
            case "Lab":
                return "#009c7b"
            case "Assignment":
                return "#e94c4c"
            default:
                return ""
                break;
        }
    }

    // Add your code here
    document.addEventListener("DOMContentLoaded", function() {
        const siteButton = document.querySelector(".site-button");
        const siteNav = document.querySelector(".site-nav");

        siteButton.addEventListener("click", function() {
            if (window.innerWidth < 800 && window.innerHeight < 656) {
                siteNav.classList.toggle("active"); // Toggle the 'active' class
            }
        });
    });
    
    function announcement_createContent(item) {

        let announcementDiv = document.getElementById("announcement_container");
        let announcementContainer = document.createElement("div");
        announcementContainer.classList.add("announcement");

        let announcementCard =
            `
                <h2>${Object.keys(item)[0]}</h2>
                <ol style="margin: 8px 0px 0px">
                    ${announcement_getItemLists(Object.keys(item)[0], item)}   
                <li> Quiz in both lectures</li>
                <li> Details of them are available in calendar section</li>
                </ol>
                    <p>Late submissions </p>
                <ul style="margin:0px 0px 16px">
                    <li>No late submissions acceptable for assignment.</li>
                </ul>
            `

        if (announcementCard !== "") {
            announcementContainer.innerHTML = announcementCard;
            announcementDiv.appendChild(announcementContainer);
        }

        function announcement_getItemLists(objKeys, item) {

            let items = item[objKeys]?.map((val) => {
                if (val.type !== "" && (val.type == "Announcement" || val.type === "Lab" || val.type === "Assignment")) {
                    if (val.type == "Announcement") {
                        return `<li> <div> <span style="color: ${getColors(val.type)}; font-weight: bold">${val.type} ${val.no} </span> : ${val.date !== "" ? "Date" : ""} <span style="color: #7253ed; font-style: italic"> ${val.date} </span> </div> <div style="padding-left: 20px; padding-right: 60px"> ${val.text} </div> </li>`
                    }
                    else if (val.type == "Lab" || val.type == "Assignment") {
                        return `<li> <span style="color: ${getColors(val.type)}; font-weight: bold">${val.type} ${val.no} </span> : Deadline <span style="color: #7253ed; font-style: italic"> ${val.deadline} </span> </li>`
                    }
                }
            }).filter(e => e !== undefined)

            if (items) {
                const itemsHTML = items.join("");
                return itemsHTML;
            }
        }

    }

    function calendar_createContent(item) {

        let calendarDiv = document.getElementById("calendar_container");
        let calendarContainer = document.createElement("div");
        calendarContainer.classList.add("module");

        let heading = document.createElement("h2");
        heading.classList.add("fs-4");

        // console.log("ObjectkeysObjectkeys******* ", Object.keys(item)[0])
        heading.innerHTML = `${Object.keys(item)[0]}`

        let cardDHTML = `
            ${calendar_getItemLists(Object.keys(item)[0], item)}
        `

        calendarContainer.innerHTML = cardDHTML;
        calendarDiv.appendChild(heading);
        calendarDiv.appendChild(calendarContainer);

        function calendar_getItemLists(objKeys, item) {

            let items = item[objKeys]?.map((val) => {
                if (val.type !== "") {
                    if (val.type == "Notice") {
                        return createNoticeList(val.date, val.text)
                    }
                    else if (val.type == "Lecture") {
                        return createLecList(val.date, val.type, val.no, val.makeup, val.text, val.link)
                    }
                    else if (val.type == "Quiz") {
                        return createQuizList(val.date, val.type, val.no, val.text, val.link, val.solution_link, val.deadline)
                    }
                    else if (val.type == "Lab") {
                        return createLabList(val.date, val.makeup, val.type, val.no, val.text, val.link, val.solution_link, val.deadline)
                    }
                    else if (val.type == "Assignment") {
                        return createAssignmentList(val.date, val.type, val.no, val.text, val.link, val.solution_link, val.deadline)
                    }
                }
            }).filter(e => e !== undefined)

            // for simple notice 
            function createNoticeList(noticeDate, notice) {

                return (
                    `
                        <dl>
                            <dt>${noticeDate}</dt>
                            <dd>${notice}</dd>
                        </dl>
                    `
                )
            }
            function createLecList(date, type, no, makeup, text, link) {
                // console.log("lecLink", lecLink)
                return (
                    `
                        <dl>
                            <dt>${date}</dt>
                            <dd>                
                                <strong class="label schedule-event lecture">${type + " " + no}</strong>
                                ${makeup == "YES" ? `<strong class="label label-yellow">Make-up</strong>` : ""}
                                ${link == "" ? `${text === "" ? (type + " " + no) : text}` : `<strong><a href=${link}>${text === "" ? (type + " " + no) : text}</a></strong>`}
                            </dd>
                        </dl>
                    `
                )
            }
            function createQuizList(date, type, no, text, link, solLink, deadline) {
                // console.log("lecLink", lecLink)
                return (
                    `
                        <dl>
                            <dt>${date}</dt>
                            <dd>                
                                <strong class="label schedule-event bg-red-000">${type + " " + no}</strong>
                                ${link == "" ? `${text}` : `<strong><a href=${link}>${text === "" ? "Quiz" : text}</a></strong>`}
                                &emsp;
                                ${deadline == "" ? "" : `<strong>Due : ${deadline}</strong>`}
                                &emsp;
                                ${solLink == "" ? "" : `<strong><a href=${solLink}>Solution</a></strong>`}
                                
                            </dd>
                        </dl>
                    `

                )
            }
            function createLabList(date, makeup, type, no, text, link, solLink, deadline) {
                return (
                    `
                        <dl>
                            <dt>${date}</dt>
                            <dd>                
                                <strong class="label label-green">${type + " " + no}</strong>
                                ${makeup == "YES" ? `<strong class="label label-yellow">Make-up</strong>` : ""}
                                ${link == "" ? `${text === "" ? (type + " " + no) : text}` : `<strong><a href=${link}>${text === "" ? "Lab" : text}</a></strong>`}
                                &emsp;
                                ${deadline == "" ? "" : `<strong>Due : ${deadline}</strong>`}
                                &emsp;
                                ${solLink == "" ? "" : `<strong><a href=${solLink}>Solution</a></strong>`}
                            </dd>
                        </dl>
                    `
                )
            }
            // for assignments
            function createAssignmentList(date, type, no, text, link, solLink, deadline) {
                return (
                    `
                        <dl>
                            <dt>${date}</dt>
                            <dd>                
                                <strong class="label label-red">${type + " " + no}</strong>
                                ${link == "" ? `${text === "" ? (type + " " + no) : text}` : `<strong><a href=${link}>${text === "" ? "Assignment" : text}</a></strong>`}
                                &emsp;
                                ${deadline == "" ? "" : `<strong>Due : ${deadline}</strong>`}
                                &emsp;
                                ${solLink == "" ? "" : `<strong><a href=${solLink}>Solution</a></strong>`}
                                
                            </dd>
                        </dl>
                    `
                )
            }

            // console.log("items **** ", items)

            if (items) {
                const itemsHTML = items.join("");
                return itemsHTML;
            }

        }

    }

    function famePage_createContent(item, container) {
        // console.log("item::", item.student_name)
        let parentDiv = document.getElementById(container);
        let fameDiv = document.createElement("div");
        fameDiv.classList.add("staffer");
        let responsiveClass = `${container == "overall_top_std" ? "fame-responsive" : "no-responsive"}`
        // console.log("responsiveClass ::: ", responsiveClass, "for :::", container)
        fameDiv.classList.add(responsiveClass);
        const divContainer = `${container === "top_std_of_week" ?
            `
                <img class="staffer-image" src="/assets/images/students/${item.image ? item.image : "placeholder.jpg"}" onerror="this.src='/assets/images/students/placeholder.jpg';" alt="user-image">
                    <div>
                        <h3 class="staffer-name">
                            ${item.student_name}
                        </h3>
                        ${item.student_email ? `<p><a href="mailto:${item.student_email}">${item.student_email}</a></p>` : ""}
                        <p>${item.week ? item.week : ""}</p>
                    </div>
            `
            :
            `${item.student_name !== "" ? `<div class="fame-std-container">
                <img class="staffer-image" style="width: 100px" src="/assets/images/students/${item.image ? item.image : "placeholder.jpg"}" onerror="this.src='/assets/images/students/placeholder.jpg';" alt="user-image">
                <div class="fame-detailContainer">
                    <h3 class="staffer-name">
                        ${item.student_name}
                    </h3>
                    ${item.student_email ? `<p><a href="mailto:${item.student_email}">${item.student_email}</a></p>` : ""}
                    <p>${item.position ? item.position : ""}</p>
                </div>
                </div>
                ${item.position !== "" ? `<div class="fame-position-image"><img class="staffer-image fame-badge-image" src="/assets/images/positions/${item.position && item.position + ".jpeg"}" onerror="this.src='/assets/images/students/placeholder.jpg';" alt="user-image"></div>` : ""}` : ""}`
            }`
        fameDiv.innerHTML = divContainer;
        parentDiv.appendChild(fameDiv);
    }

    function staff_createContent(item, container) {
        let parentDiv = document.getElementById(container);
        let stafferDiv = document.createElement("div");
        stafferDiv.classList.add("staffer");

        const divContainer =
            `
                <img class="staffer-image" src="/assets/images/staff/${item.image ? item.image : "placeholder.jpg"}" onerror="this.src='/assets/images/students/placeholder.jpg';" alt="user-image">
                <div>
                    <h3 class="staffer-name">
                        ${item.name}
                    </h3>
                    ${item.email !== "" || item.email !== "n" ? `<p><a href="mailto:${item.email}">${item.email}</a></p>` : ""}
                    ${item.appointment == "n" ? "" : item.appointment == "y" && item.appointment_link !== "" ? `<p><a href="${item.appointment_link}" class="btn btn-outline">Book TA appointment</a></p>` : ""}
                </div>
            `

        stafferDiv.innerHTML = divContainer;
        parentDiv.appendChild(stafferDiv);
    }

    return {
        announcements: function (url, sheetName, site_mode_isOffline, csvSheetName) {

            // console.log("***** ANNOUNCEMENT PAGE ***** ")
            // console.log("***** url *****", url)
            // console.log("***** sheet *****", sheetName)

            const sheet = sheetName;
            const loading = document.getElementById("loader");
            const newURL = url + '?data=' + sheet;

            if (site_mode_isOffline === false) {
                // console.log("online mode")
                loadData();
            } else {
                // console.log("offline mode")
                read_CSV_file_data(`${csvSheetName}.csv`, mapThroughData)
            }

            function loadData() {
                fetch(newURL).then((rep) => rep.json()).then((data) => {
                    const listData = data.data;

                    // console.log("response data ********* ", listData)
                    mapThroughData(listData)
                })
            }

            function mapThroughData(data) {

                // console.log("data ******** ", data)

                loading.remove();
                const arrayData = [];
                data && data?.reverse().map(item => {
                    // console.log(Object.keys(item)[0])
                    if (Object.keys(item)[0] !== "") {
                        announcement_createContent(item)
                    }
                })
            }

        },
        calender: function (url, sheetName, site_mode_isOffline, csvSheetName) {

            // console.log("***** CALENDER PAGE ***** ")

            const sheet = sheetName;
            const loading = document.getElementById("loader");
            const newURL = url + '?data=' + sheet;

            if (site_mode_isOffline === false) {
                // console.log("online mode")
                loadData();
            } else {
                // console.log("offline mode")
                // read_CSV_file_data("website_week_data.csv", mapThroughData)
                read_CSV_file_data(`${csvSheetName}.csv`, mapThroughData)
            }

            // console.log("newURL",newURL)
            function loadData() {
                fetch(newURL).then((rep) => rep.json()).then((data) => {
                    const listData = data.data;
                    mapThroughData(listData)
                })
            }

            function mapThroughData(data) {
                // console.log("data inside mapThroughData 23:::", data)
                loading.remove();

                data && data?.reverse().map(item => {
                    calendar_createContent(item)
                })
            }

        },
        pageOfFame: function (url, sheetName, sheetName_2, site_mode_isOffline, csvTopStdWeek, csvOverAllTop) {
            // console.log("***** PAGE OF FAME ***** ",site_mode_isOffline)

            // console.log("***** url *****", url)
            // console.log("***** sheet *****", sheetName)
            // console.log("***** sheet2 *****", sheetName_2)

            const loading = document.getElementById("loader");
            // loadData();

            const sheet = sheetName;
            const sheet2 = sheetName_2;
            const newURL = url + '?data=' + sheet;
            const newURL2 = url + '?data=' + sheet2;

            if (site_mode_isOffline === false) {
                // console.log("online mode")
                loadData();
            } else {
                // console.log("offline mode")
                read_CSV_file_data(`${csvTopStdWeek}.csv`, mapThroughData, "top_std_of_week")

                // read_CSV_file_data(`${csvSheetName}.csv`, mapThroughData)
                read_CSV_file_data(`${csvOverAllTop}.csv`, mapThroughData, "overall_top_std")
            }


            function loadData() {
                fetch(newURL).then((rep) => rep.json()).then((data) => {
                    const top_std_of_week = data.data;
                    mapThroughData(top_std_of_week, "top_std_of_week")
                })
                fetch(newURL2).then((rep) => rep.json()).then((data) => {
                    const overall_top_std = data.data;
                    mapThroughData(overall_top_std, "overall_top_std")
                })
            }

            function mapThroughData(data, container) {
                loading.remove();
                data && data?.map(item => {
                    // console.log("item.student_name", item.student_name)
                    if (item.student_name !== "") {
                        famePage_createContent(item, container)
                    }
                })
            }

        },
        staff: function (url, sheetName, site_mode_isOffline, csvSheetName) {

            const loading = document.getElementById("loader");
            const sheet = sheetName;
            const newURL = url + '?data=' + sheet;

            if (site_mode_isOffline === false) {
                // console.log("online mode")
                loadData();
            } else {
                // console.log("offline mode")
                read_CSV_file_data(`${csvSheetName}.csv`, mapThroughData)
            }

            function loadData() {
                fetch(newURL).then((rep) => rep.json()).then((data) => {
                    const listData = data.data;
                    mapThroughData(listData)
                })
            }

            function mapThroughData(data) {
                loading.remove();
                data && data?.map(item => {
                    if (item.role == "Instructor") {
                        staff_createContent(item, "instructors_list")
                    }
                    else {
                        staff_createContent(item, "assistants_list")
                    }
                })
            }
        },
        attendance: function (url, sheetName, site_mode_isOffline) {

            // console.log("***** ATTENDANCE PAGE ***** ")
            // console.log("***** url *****", url)
            // console.log("***** sheet *****", sheetName)

            if (site_mode_isOffline) {
                return;
            }

            const getButton = document.getElementById("buttoncheck")
            getButton.addEventListener("click", function () {
                getUserRollNumber();
            });

            const loading = document.getElementById("loader");
            let parentDiv = document.getElementById("ul_container");
            const card_container = document.getElementById("card_container");
            const ul_container = document.getElementById("ul_container");

            function getUserRollNumber() {

                // class="loader"
                loading.setAttribute('class', "loader")
                loading.classList.remove("d-none");
                let rollNumber = document.getElementById('stdRollNumber').value;
                let errorMsg = document.getElementById("errorMsg")

                let numb = ul_container.childElementCount;
                if (numb > 1) {
                    parentDiv.removeChild(parentDiv.lastElementChild)
                    card_container.innerHTML = ""
                }

                if (!rollNumber.trim().length) {
                    loading.classList.add("d-none");
                    errorMsg.innerText = "Please enter Roll No."
                } else {
                    const value = rollNumber.split(' ').join('');
                    const sheet = sheetName;
                    const newURL = url + '?data=' + sheet;
                    fetch(newURL).then((rep) => rep.json()).then((data) => {
                        // loading.remove();
                        loading.classList.add("d-none");
                        const attendanceData = data.data;
                        // console.log("data ****", data)
                        // console.log("sheet ******** ", sheet)
                        let result = attendanceData.filter(e => e.registration_no == value.toUpperCase())

                        if (result.length > 0) {
                            errorMsg.innerText = "";
                            mapThroughData(result)
                        } else {
                            errorMsg.innerText = "Result Not Found Please Enter Correct Roll No BSXXYYZZZ where XX is your department, YY your batch and ZZZ is your roll number eg. BSCE23000."
                        }
                    })
                }
            }

            function mapThroughData(data) {
                data && data?.map((item, index) => {
                    createContent(item, item.sr_no)
                })
            }

            function createContent(item, index) {
                let li = document.createElement("li");
                li.setAttribute('style', "border-bottom: 1px solid #ede7e7; padding: 4px 0px 4px 0px")
                // vars for conditional styling
                const labA = item.a_lab_percentage;
                const theoryA = item.a_theory_percent;
                //data into vars
                const regNo = item.registration_no;
                const name = item.std_name;
                const theory_present = item.p_theory_percent == "#REF!" ? 0 : item.p_theory_percent;
                const theoryP = theory_present.toFixed(1);
                const lab_present = item.p_lab_percentage == "#REF!" ? 0 : item.p_lab_percentage;
                const labP = lab_present.toFixed(1);
                const cardInnerHTML = `
                    <div class="pb-3">
                        <div class="text-center m-2"><b> Total Lectures : ${item.total_lectures} </b></div>
                        <div class="text-center d-flex flex-justify-between"> 
                            <div style="width: 49.8%;"> 
                                <div class="bg-blue-100 text-white btlr"><b> Theory </b></div>
                                <div class="d-flex lighterBlue p-tb-8">
                                    <div style="width: 50%;" class="border-right-blue"> 
                                        <div> <span class="border-b-blue"> Total Presents </span> </div>
                                        <div> ${item.theory_P} </div>
                                    </div>
                                    <div style="width: 50%;" class="border-left-blue" > 
                                        <div> <span class="border-b-blue"> Total Absents </span> </div>
                                        <div> ${item.theory_A} </div>
                                    </div>
                                </div>
                            </div>
                            <div style="width: 50%;">
                                <div class="bg-green-200 text-white btrr"><b> Lab </b></div>
                                <div class="d-flex lighterGreen p-tb-8">
                                    <div style="width: 50%;" class="border-right-green"> 
                                        <div> <span class="border-b-green"> Total Presents </span> </div>
                                        <div> ${item.lab_P} </div>
                                    </div>
                                    <div style="width: 50%;" class="border-left-green">  
                                        <div> <span class="border-b-green"> Total Absents </span> </div>
                                        <div> ${item.lab_A} </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    `
                const divContainer =
                    `<div style="display: flex;" > 
                    <div style="width: 33.33%"
                    class="
                    ${theoryP == 100 && labP == 100 ? "text-green-200" : ""}
                    ${theoryP <= 85 && theoryA < 20 || labP <= 85 && labA < 20 ? "text-yellow-200" : ""}
                    ${theoryA >= 20 || labA >= 20 ? "text-red-200" : ""}
                    ">
                        ${regNo}
                    </div>
                    <div style="width: 33.33%"
                        class="
                        ${theoryP == 100 ? "text-green-200" : ""}
                        ${theoryP <= 85 && theoryA < 20 ? "text-yellow-200" : ""}
                        ${theoryA >= 20 ? "text-red-200" : ""}
                        ">
                            ${theoryP}%
                    </div>
                    <div style="width: 33.33%"
                        class="
                        ${labP == 100 ? "text-green-200" : ""}
                        ${labP <= 85 && labA < 20 ? "text-yellow-200" : ""}
                        ${labA >= 20 ? "text-red-200" : ""}
                        ">
                            ${labP}%
                    </div>
                </div>`
                li.innerHTML = divContainer;
                parentDiv.appendChild(li);
                card_container.innerHTML = cardInnerHTML
            }
        },
        stdProgressReport: function (courseDetails_sheet_url, sheetName, site_mode_isOffline) {

            if (site_mode_isOffline) {
                return;
            }

            const loading = document.getElementById("loader");
            const requestRecordButton = document.getElementById("requestRecordButton")
            requestRecordButton.addEventListener("click", function () {
                getInput();
            });

            const checkboxes = document.querySelectorAll("#options input[type='checkbox']");
            checkboxes.forEach(function (checkbox) {
                checkbox.addEventListener("change", function () {
                    setCheckBox(checkbox.id);
                });
            });


            // console.log("here is amassssss")

            const sheet = sheetName; //"attendance"


            let quiz1 = false;
            let quiz2 = false;
            let assignment = false;
            let labA = false;
            let labB = false;

            let errorMsg = document.getElementById("errorMsg")
            errorMsg.setAttribute('style', "color: red");

            function getInput() {
                loading.setAttribute('class', "loader")
                requestRecordButton.disabled = true;
                let rollNumber = document.getElementById('rollNumber').value;

                errorMsg.innerText = "";
                if (!rollNumber.trim().length) {
                    // console.log("Please Enter Roll no.",rollNumber)
                    loading.classList.add("d-none");
                    errorMsg.innerText = "Please enter Roll No."
                    requestRecordButton.disabled = false;
                } else {
                    let value = rollNumber.split(' ').join('');
                    if (quiz1 == false && quiz2 == false && assignment == false && labA == false && labB == false) {
                        // console.log("Please Enter Roll no.",rollNumber)
                        loading.classList.add("d-none");
                        errorMsg.innerText = "Please select atleast single option."
                        requestRecordButton.disabled = false;
                    } else {
                        loadData(value);
                    }
                }
            }

            function setCheckBox(checkBoxId) {
                switch (checkBoxId) {
                    case "quiz1":
                        quiz1 = !quiz1;
                        break;
                    case "quiz2":
                        quiz2 = !quiz2;
                        break;
                    case "assignment":
                        assignment = !assignment;
                        break;
                    case "labA":
                        labA = !labA;
                        break;
                    case "labB":
                        labB = !labB;
                        break;
                    default:
                        break;
                }
            }

            function loadData(requested_rollNo) {
                const rollNo = requested_rollNo;
                const quiz1ValSet = quiz1 == true ? "y" : "n";
                const quiz2ValSet = quiz2 == true ? "y" : "n";
                const assignmentValSet = assignment == true ? "y" : "n";
                const labAValSet = labA == true ? "y" : "n";
                const labBValSet = labB == true ? "y" : "n";



                const newURL = courseDetails_sheet_url + '?data=' + sheet + "&rollNo=" + rollNo + "&quiz1=" + quiz1ValSet + "&quiz2=" + quiz2ValSet + "&assignment=" + assignmentValSet + "&labA=" + labAValSet + "&labB=" + labBValSet;

                fetch(newURL).then(response => response.json()).then(data => {
                    const resMessage = data.data.message;
                    const statusCode = data.data.status;

                    if(statusCode === 200) {
                    errorMsg.removeAttribute('style', "color: red");
                    errorMsg.setAttribute('style', "color: #41d693");    
                    errorMsg.innerText = resMessage;
                    }else{
                        errorMsg.innerText = resMessage;
                    }
                    loading.classList.add("d-none");
                    requestRecordButton.disabled = false;
                    // console.log("student data progress **** ", data);
                })
            }
        },
    };
})();
