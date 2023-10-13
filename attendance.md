---
layout: page
title: Attendance
description: Attendance Details
nav_order: 4
---
<link rel="stylesheet" href="../assets/css/attendance.css">

# {{page.title}}

1. <span class="text-green-200">Green for those students having 100% Attendance</span>
1. <span class="text-yellow-200">Yellow for those students that can be terminated if they don't improve their attendance</span>
1. <span class="text-red-200">Red for students not fullfilling the attendance requirements.</span>
<h2> Please Enter Your Roll No. </h2>
<div class="mt-3">
<input type="text" id="stdRollNumber" class="inputFieldStyle"/>
<button id="buttoncheck" class="btn btn-outline h6" 
    style="box-shadow: 0 1px 2px rgb(0 0 0 / 12%), 0 3px 10px rgb(0 0 0 / 8%);">Search</button>
</div>
<p id="errorMsg" style="color: red"></p>

<div class="announcement" markdown="1">
<ul id="ul_container">
<li class="liStyle">
<div class="d-flex">
<div class="width33"> <b>Registration No.</b> </div>
<div class="width33"> <b>Theory Attendance</b> </div>
<div class="width33"> <b>Lab Attendance</b> </div>
</div>
</li>
</ul>
</div>
<div class="announcement" id="card_container">
</div>

<div id="loader"></div>


<script src="../assets/js/library.js"></script>
<script>
        const siteButton = document.getElementById('menu-button');
        const siteNav = document.querySelector('.site-nav');

        let isVisible = false;

        siteButton.addEventListener('click', function(event) {
            event.preventDefault();
            if (isVisible) {
                siteNav.style.display = 'none';
                isVisible = false;
            } else {
                siteNav.style.display = 'block';
                isVisible = true;
            }
        });
    </script>
<script>
    library.attendance("{{site.courseDetails_sheet_url}}", "{{site.attendance_and_std_progress_sheet_tab}}",{{site.site_mode_isOffline}});
</script>