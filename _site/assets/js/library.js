var library = (function () {

    //  this method is for offline mode to make calender and announcement data as we required
    function groupByWeek(data) {
        const weeksArray = {};
        data?.forEach((item) => {
            const week = item.week;

            if (!weeksArray[week]) {
                weeksArray[week] = [];
            }

            weeksArray[week].push(item);
        });

        const resultArray = Object.keys(weeksArray).map((week) => ({
            [week]: weeksArray[week],
        }));

        return resultArray;
    }

    // *************
    function read_CSV_file_data(fileName, callBackMethod, containerName, viewType) {
        // staff.csv

        let filePath = "";

        if (viewType === "details") {
            filePath = `../../assets/csv_files/${fileName}`
        } else if (viewType === "tools" || "outlines") {
            filePath = `../../../assets/csv_files/${fileName}`
        } else {
            filePath = `../assets/csv_files/${fileName}`
        }


        fetch(filePath)
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


                            rowObject[headers[j]] = value;
                        }
                        jsonData.push(rowObject);
                    }
                }

                if (containerName !== "") {
                    callBackMethod(jsonData, containerName)
                } else {
                    callBackMethod(jsonData)
                }
            })
            .catch(error => {
                console.error('noot worrrking:', error);
            });
    }

    function getColors(colorType) {

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

    function getFormattedDate(date) {
        const rawDate = new Date(date);

        const options = { year: 'numeric', month: 'short', day: '2-digit' };
        const formattedDate = rawDate.toLocaleDateString('en-US', options);

        return formattedDate;
    }

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

                let date = val.date ? getFormattedDate(val.date) : "";
                let deadline = val.deadline ? getFormattedDate(val.deadline) : "";


                if (val.type !== "" && (val.type == "Announcement" || val.type === "Lab" || val.type === "Assignment")) {
                    if (val.type == "Announcement") {
                        return `<li> <div> <span style="color: ${getColors(val.type)}; font-weight: bold">${val.type} ${val.no} </span> : ${date !== "" ? "Date" : ""} <span style="color: #7253ed; font-style: italic"> ${date} </span> </div> <div style="padding-left: 20px; padding-right: 60px"> ${val.text} </div> </li>`
                    }
                    else if (val.type == "Lab" || val.type == "Assignment") {
                        return `<li> <span style="color: ${getColors(val.type)}; font-weight: bold">${val.type} ${val.no} </span> : Deadline <span style="color: #7253ed; font-style: italic"> ${deadline} </span> </li>`
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

        heading.innerHTML = `${Object.keys(item)[0]}`

        let cardDHTML = `
            ${calendar_getItemLists(Object.keys(item)[0], item)}
        `

        calendarContainer.innerHTML = cardDHTML;
        calendarDiv.appendChild(heading);
        calendarDiv.appendChild(calendarContainer);

        function calendar_getItemLists(objKeys, item) {
            let items = item[objKeys]?.map((val) => {

                let date = val.date ? getFormattedDate(val.date) : "";
                let deadline = val.deadline ? getFormattedDate(val.deadline) : "";

                if (val.type !== "") {
                    if (val.type == "Notice") {
                        return createNoticeList(date, val.text)
                    }
                    else if (val.type == "Lecture") {
                        return createLecList(date, val.type, val.no, val.makeup, val.text, val.link)
                    }
                    else if (val.type == "Quiz") {
                        return createQuizList(date, val.type, val.no, val.text, val.link, val.solution_link, deadline)
                    }
                    else if (val.type == "Lab") {
                        return createLabList(date, val.makeup, val.type, val.no, val.text, val.link, val.solution_link, deadline)
                    }
                    else if (val.type == "Assignment") {
                        return createAssignmentList(date, val.type, val.no, val.text, val.link, val.solution_link, deadline)
                    }
                }
            }).filter(e => e !== undefined).reverse();

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

            if (items) {
                const itemsHTML = items.join("");
                return itemsHTML;
            }

        }

    }

    function famePage_createContent(item, container) {
        let parentDiv = document.getElementById(container);
        let fameDiv = document.createElement("div");
        fameDiv.classList.add("staffer");
        let responsiveClass = `${container == "overall_top_std" ? "fame-responsive" : "no-responsive"}`
        fameDiv.classList.add(responsiveClass);
        const divContainer = `${container === "top_std_of_week" ?
            `
                <img class="staffer-image" src="../assets/images/students/${item.image ? item.image : "placeholder.jpg"}" onerror="this.src='../assets/images/students/placeholder.jpg';" alt="user-image">
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
                <img class="staffer-image" style="width: 100px" src="../assets/images/students/${item.image ? item.image : "placeholder.jpg"}" onerror="this.src='../assets/images/students/placeholder.jpg';" alt="user-image">
                <div class="fame-detailContainer">
                    <h3 class="staffer-name">
                        ${item.student_name}
                    </h3>
                    ${item.student_email ? `<p><a href="mailto:${item.student_email}">${item.student_email}</a></p>` : ""}
                    <p>${item.position ? item.position : ""}</p>
                </div>
                </div>
                ${item.position !== "" ? `<div class="fame-position-image"><img class="staffer-image fame-badge-image" src="../assets/images/positions/${item.position && item.position + ".jpeg"}" onerror="this.src='../assets/images/students/placeholder.jpg';" alt="user-image"></div>` : ""}` : ""}`
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
                <img class="staffer-image" src="../assets/images/staff/${item.Image ? item.Image : "placeholder.jpg"}" onerror="this.src='../assets/images/students/placeholder.jpg';" alt="user-image">
                <div>
                    <h3 class="staffer-name">
                        ${item.Name}
                    </h3>
                    ${item.Email !== "" || item.Email !== "n" ? `<p><a href="mailto:${item.Email}">${item.Email}</a></p>` : ""}
                    ${item.Appointment == "n" ? "" : item.Appointment == "y" && item.Appointment_link !== "" ? `<p><a href="${item.Appointment_link}" class="btn btn-outline">Book TA appointment</a></p>` : ""}
                </div>
            `

        stafferDiv.innerHTML = divContainer;
        parentDiv.appendChild(stafferDiv);
    }

    function generateCheckboxes(typesList, containerId) {
        const container = document.getElementById(containerId);

        if (container) {
            typesList.forEach(type => {
                // Create a div to hold the checkbox and label
                const checkboxDiv = document.createElement('div');
                checkboxDiv.className = 'mr-4'; // Add the 'mr-4' class

                // Create a checkbox element
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.id = type.toLowerCase().replace(/\s+/g, '-'); // Use lowercase and replace spaces with hyphens for ID
                checkbox.name = type;

                // Create a label element
                const label = document.createElement('label');
                label.htmlFor = checkbox.id; // Match the label's 'for' attribute with the checkbox's ID
                label.appendChild(document.createTextNode(type));
                label.className = 'pl-2';

                // Append the checkbox and label to the div
                checkboxDiv.appendChild(checkbox);
                checkboxDiv.appendChild(label);

                // Append the div to the container
                container.appendChild(checkboxDiv);
            });
        }
    }


    return {
        staticData: function (url, sheetName, dataRequiredFor, viewType, site_mode_isOffline, csvSheetName) {
            const sheet = sheetName;
            // data required for is used into app script for check
            const newURL = url + '?data=' + sheet + '&dataRequiredFor=' + dataRequiredFor;

            const loading = document.getElementById("loader");
            loading.setAttribute('class', "loader")


            let announcement_btn = ""

            if (viewType === "indexView") {
                announcement_btn = document.getElementById("ann-btn");
                announcement_btn.setAttribute('class', 'd-none')
            }

            if (site_mode_isOffline === false) {

                loadData();
            } else {
                read_CSV_file_data(`${csvSheetName}.csv`, mapThroughDataForStaticData, "", viewType)
            }

            function loadData() {
                fetch(newURL).then(response => response.json()).then(data => {
                    loading.classList.add("d-none");
                    if (viewType === "indexView") {
                        announcement_btn.classList.remove('d-none');
                        populateIndex(data.data[0])
                    } else if (viewType === "scheduleView") {
                        populateSchedule(data.data[0])
                    } else if (viewType === "details") {
                        populateDetails(data.data[0])
                    } else if (viewType === "tools") {
                        populateTools(data.data[0])
                    }
                })
            }

            function mapThroughDataForStaticData(data) {
                if (viewType === "indexView") {
                    populateIndex(data[0])
                    announcement_btn.classList.remove('d-none');
                } else if (viewType === "scheduleView") {
                    populateSchedule(data[0])
                } else if (viewType === "details") {
                    populateDetails(data[0])
                } else if (viewType === "tools") {
                    populateTools(data[0])
                }
                loading.classList.add("d-none");
            }

            function populateIndex(data) {

                const tagLineElement = document.getElementById('tagLine');
                const titleElement = document.getElementById('title');
                const descriptionElement = document.getElementById('description');

                tagLineElement.textContent = data.tagline;
                titleElement.textContent = data.title;
                descriptionElement.textContent = data.course_description;

            }

            function populateSchedule(data) {
                const ubsAppointmentLink = document.getElementById('ubs_appointment_url');
                ubsAppointmentLink.target = '_blank';
                const taAppointmentLink = document.getElementById('ta_appointment_url');
                taAppointmentLink.target = '_blank';

                ubsAppointmentLink.href = data.ubs_appointment_url;
                taAppointmentLink.href = data.ta_appointment_url;
            }

            function populateDetails(data) {
                const descriptionElement = document.getElementById('description');
                descriptionElement.textContent = data.course_description;
            }

            function populateTools(data) {
                guide_for_tools_url.target = '_blank';
                reading_material_for_github_url.target = '_blank';
                guide_for_tools_url.href = data.guide_for_tools_url;
                reading_material_for_github_url.href = data.reading_material_for_github_url;
            }


        },
        announcements: function (url, sheetName, site_mode_isOffline, csvSheetName) {

            const sheet = sheetName;
            const loading = document.getElementById("loader");
            const newURL = url + '?data=' + sheet;

            if (site_mode_isOffline === false) {

                loadData();
            } else {

                read_CSV_file_data(`${csvSheetName}.csv`, mapThroughData)
            }

            function loadData() {
                fetch(newURL).then((rep) => rep.json()).then((data) => {
                    const listData = data.data.reverse();
                    mapThroughData(listData)
                })
            }

            function mapThroughData(data) {

                let resData = "";

                if (site_mode_isOffline) {
                    resData = groupByWeek(data)
                } else {
                    resData = data
                }


                loading.remove();

                resData && resData?.map(item => {
                    if (Object.keys(item)[0] !== "") {
                        announcement_createContent(item)
                    }
                })
            }

        },
        calender: function (url, sheetName, site_mode_isOffline, csvSheetName) {

            const sheet = sheetName;
            const loading = document.getElementById("loader");
            const newURL = url + '?data=' + sheet;

            if (site_mode_isOffline === false) {
                loadData();
            } else {
                read_CSV_file_data(`${csvSheetName}.csv`, mapThroughData)
            }
            function loadData() {
                fetch(newURL).then((rep) => rep.json()).then((data) => {
                    const listData = data.data.reverse();
                    mapThroughData(listData)
                })
            }

            function mapThroughData(data) {

                let resData = "";

                if (site_mode_isOffline) {
                    resData = groupByWeek(data)
                } else {
                    resData = data
                }

                loading.remove();

                resData && resData?.map(item => {
                    calendar_createContent(item)
                })
            }

        },
        pageOfFame: function (url, sheetName, sheetName_2, site_mode_isOffline, csvTopStdWeek, csvOverAllTop) {

            const loading = document.getElementById("loader");
            // loadData();

            const sheet = sheetName;
            const sheet2 = sheetName_2;
            const newURL = url + '?data=' + sheet;
            const newURL2 = url + '?data=' + sheet2;

            if (site_mode_isOffline === false) {
                loadData();
            } else {
                read_CSV_file_data(`${csvTopStdWeek}.csv`, mapThroughData, "top_std_of_week")

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
                    if (item.student_name !== "") {
                        famePage_createContent(item, container)
                    }
                })
            }

        },
        staff: function (url, sheetName, reqDataType, site_mode_isOffline, csvSheetName) {
            const loading = document.getElementById("loader");
            const sheet = sheetName;
            const newURL = url + '?data=' + sheet + '&dataRequiredFor=' + reqDataType;

            if (site_mode_isOffline === false) {
                loadData();
            } else {
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
                    if (item.Designation == "Instructor") {
                        staff_createContent(item, "instructors_list")
                    }
                    else {
                        staff_createContent(item, "assistants_list")
                    }
                })
            }
        },
        attendance: function (url, sheetName, site_mode_isOffline) {

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
            loading.setAttribute('class', "loader")
            const requestRecordButton = document.getElementById("requestRecordButton")

            requestRecordButton.addEventListener("click", function () {
                getInput();
            });
            requestRecordButton.disabled = true;

            const sheet = sheetName;
            let requestFor = "typesList"

            const newURL = courseDetails_sheet_url + '?data=' + sheet + "&requestedType=" + requestFor;
            // console.log(newURL)

            const checkBoxesVals = {};

            function generateObjectOfOptions(list) {
                list.forEach(element => {
                    const val = element.toLowerCase().replace(/\s+/g, '-')
                    checkBoxesVals[val] = "n"
                });
            }

            async function fetchDataAndGenerateCheckboxes(newURL) {
                try {
                    const response = await fetch(newURL);
                    const data = await response.json();

                    if (data.data.message === "requested for types only.") {
                        const list = data.data.list;
                        generateCheckboxes(list, "options");
                        generateObjectOfOptions(list)
                    }
                    // console.log("Fetch completed.");

                    const checkboxes = document.querySelectorAll("#options input[type='checkbox']");
                    checkboxes.forEach(function (checkbox) {
                        checkbox.addEventListener("change", function () {
                            // console.log("Checkbox ID:", checkbox.id);
                            setCheckBox(checkbox.id);
                        });
                    });
                    loading.classList.add("d-none");
                    requestRecordButton.disabled = false;
                } catch (error) {
                    loading.classList.add("d-none");
                    requestRecordButton.disabled = false;
                    console.error("Error fetching data:", error);
                }
            }

            fetchDataAndGenerateCheckboxes(newURL);

            function setCheckBox(checkboxId) {
                const checkbox = document.getElementById(checkboxId);
                const updatedCheckBoxesVals = { ...checkBoxesVals };
                if (checkbox) {
                    if (checkbox.checked) {
                        updatedCheckBoxesVals[checkboxId] = "y";
                    } else {
                        updatedCheckBoxesVals[checkboxId] = "n";
                    }
                    Object.assign(checkBoxesVals, updatedCheckBoxesVals);
                }
                // console.log("checkBoxesVals**** ", checkBoxesVals)
            }


            let errorMsg = document.getElementById("errorMsg")
            errorMsg.setAttribute('style', "color: red");

            function getInput() {
                loading.setAttribute('class', "loader")
                requestRecordButton.disabled = true;
                let rollNumber = document.getElementById('rollNumber').value;

                errorMsg.innerText = "";

                const hasTrueValue = Object.values(checkBoxesVals).some(value => value === "y");

                if (!rollNumber.trim().length) {
                    loading.classList.add("d-none");
                    requestRecordButton.disabled = false;
                    errorMsg.innerText = "Please enter Roll No."
                } else {
                    let value = rollNumber.split(' ').join('');
                    if (!hasTrueValue) {
                        loading.classList.add("d-none");
                        errorMsg.innerText = "Please select atleast single option."
                        requestRecordButton.disabled = false;
                        // console.log("no there is not true value")

                    } else {
                        // console.log("yes there is true value")
                        loadData(value);
                    }
                }
            }

            function loadData(data) {
                let requestForStd = "studentReport";
                let rollNo = data

                // Build the tList parameter manually
                let tListParams = [];
                for (const key in checkBoxesVals) {
                    if (checkBoxesVals.hasOwnProperty(key)) {
                        tListParams.push(`${key}=${checkBoxesVals[key]}`);
                    }
                }
                const tListQueryString = tListParams.join('&');
                // console.log("***123**** ", tListQueryString)
                // Construct the complete URL
                let newUrlIs = courseDetails_sheet_url + `?data=${sheet}&requestedType=${requestForStd}&${tListQueryString}` + "&rollNo=" + rollNo;

                fetch(newUrlIs).then(res => res.json()).then(data => {
                    if (rollNo === "TEST") {
                        console.log("data in std fetch ***** ", data);
                        console.log("tListQueryString in std fetch ***** ", tListQueryString);
                    }

                    const resMessage = data.data.message;
                    const statusCode = data.data.status;
                    if (statusCode === 200) {
                        errorMsg.removeAttribute('style', "color: red");
                        errorMsg.setAttribute('style', "color: #41d693");
                        errorMsg.innerText = resMessage;
                    } else {
                        errorMsg.innerText = resMessage;
                    }

                    loading.classList.add("d-none");
                    requestRecordButton.disabled = false;
                });
            }
        },

        stdStudentGroup: function (url, sheetName, site_mode_isOffline) {

            // console.log("url ******* ", url)
            // console.log("sheetName ******* ", sheetName)
            // console.log("mode ******* ", site_mode_isOffline)

            const sheet = sheetName;



            if (site_mode_isOffline) {
                return;
            }

            const loading = document.getElementById("loader");
            const requestRecordButton = document.getElementById("requestRecordButton")

            requestRecordButton.addEventListener("click", function () {
                getInput();
            });

            let errorMsg = document.getElementById("errorMsg")
            errorMsg.setAttribute('style', "color: red");

            function getInput() {
                loading.setAttribute('class', "loader")
                requestRecordButton.disabled = true;
                let rollNumber = document.getElementById('rollNumber').value;

                errorMsg.innerText = "";

                if (!rollNumber.trim().length) {
                    errorMsg.innerText = "Please enter Roll No."
                } else {
                    let value = rollNumber.split(' ').join('');
                    loadData(value);

                }
            }

            function loadData(value) {
                let rollNo = value;
                let newUrl = url + "?data=" + sheet + "&rollNo=" + rollNo;

                fetch(newUrl).then(res => res.json()).then(data => {
                    const resMessage = data.data.message;
                    const stdList = data.data && data?.data?.list;

                    if (stdList?.length > 0) {
                        // console.log("stdlist **** ", stdList)
                        createStudentList(stdList)
                    } else {
                        errorMsg.setAttribute('style', "color: red");
                        // console.log("here we are")
                        errorMsg.innerText = resMessage;
                    }

                    loading.classList.add("d-none");
                    requestRecordButton.disabled = false;
                });


                function createStudentList(studentArray) {
                    const ulContainer = document.getElementById('ul_container');
                
                    // Loop through the studentArray and create list items for each student
                    studentArray.forEach((student, index) => {
                        const li = document.createElement('li');
                        li.classList.add('d-flex');
                        
                        // Create and append the rollNumber, name, and groupLetter to the li
                        ['rollNumber', 'name', 'groupLetter'].forEach(key => {
                            const div = document.createElement('div');
                            
                            // Assign width classes based on the key
                            if (key === 'rollNumber') {
                                div.classList.add('width30');
                            } else if (key === 'name') {
                                div.classList.add('width50');
                            } else if (key === 'groupLetter') {
                                div.classList.add('width25');
                            }
                            
                            div.innerHTML = `<span>${student[key]}</span>`;
                            li.appendChild(div);
                        });
                
                        // Add border-bottom to all list items except the last one
                        if (index < studentArray.length - 1) {
                            li.style.borderBottom = '1px solid #ede7e7';
                            li.style.paddingBottom = '10px';
                            li.style.paddingTop = '6px';
                        }else{
                            li.style.paddingTop = '6px';
                        }
                
                        ulContainer.appendChild(li);
                    });
                }
                
                





            }

        }
    };
})();
