---
title: "Student Progress"
description: Listing of course modules and topics.
---
<link rel="stylesheet" href="../assets/css/StudentProgressReport.css">

# Get Student Progress Chart
<div class="mt-4"> 
    <label for="rollNumber">Your Roll no:</label><input type="text" id="rollNumber" class="inputFieldStyle ml-3"/>
    <p id="errorMsg"></p>
</div>
<p>Select options to add on chart.</p>
<div id="options" class="d-flex mt-2">
</div>
<div class="mt-4">
    <button id="requestRecordButton" class="btn btn-outline h6" 
    style="box-shadow: 0 1px 2px rgb(0 0 0 / 12%), 0 3px 10px rgb(0 0 0 / 8%);">Request record</button> 
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
    library.stdProgressReport("{{site.courseDetails_sheet_url}}", "{{site.std_progress_sheet}}",{{site.site_mode_isOffline}});
</script>
