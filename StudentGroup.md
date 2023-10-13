---
title: "Student Group"
description: Listing of course modules and topics.
---
<!-- <link rel="stylesheet" href="/assets/css/StudentProgressReport.css"> -->
<link rel="stylesheet" href="../assets/css/attendance.css">

# Get Your Group Members
<div class="mt-4"> 
    <label for="rollNumber">Your Roll no:</label><input type="text" id="rollNumber" class="inputFieldStyle ml-3"/>
    <p id="errorMsg"></p>
</div>
<div class="mt-4">
    <button id="requestRecordButton" class="btn btn-outline h6" 
    style="box-shadow: 0 1px 2px rgb(0 0 0 / 12%), 0 3px 10px rgb(0 0 0 / 8%);">Get Group Members</button> 
</div>
<div class="announcement" markdown="1">
<ul id="ul_container">
<li class="liStyle">
<div class="d-flex">
<div class="width30"> <b>Registration No.</b> </div>
<div class="width50"> <b>Name.</b> </div>
<div class="width20"> <b>Group.</b> </div>
</div>
</li>
</ul>
</div>
<div id="loader"></div>

<!-- <script src="/assets/js/StudentProgressReport.js">

</script> -->

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
    library.stdStudentGroup("{{site.courseDetails_sheet_url}}", "{{site.std_details_sheet}}",{{site.site_mode_isOffline}});
</script>
