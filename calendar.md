---
layout: page
title: Calendar
nav_order: 2
nav_exclude: false
description: Listing of course modules and topics.
---
<link rel="stylesheet" href="../assets/css/style.css">

# Calendar

<div id= "calendar_container">
</div> 

<div class="loader" id="loader"></div>

<!-- <script type="module" src="/assets/js/calendar.js">
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
    library.calender("{{site.courseDetails_sheet_url}}", "{{site.announcemet_and_calender_sheet_tab}}",{{site.site_mode_isOffline}}, "{{site.announcement_and_calender_csv}}");
</script>
