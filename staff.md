---
layout: page
title: Staff
description: A listing of all the course staff members.
nav_exclude: false
---
<link rel="stylesheet" href="../assets/css/style.css">

# Staff 

## Instructor
<div id="instructors_list">
</div>

## Teaching Assistants
<div id="assistants_list">
</div>

<div class="loader" id="loader"></div>
<!-- <script type="module" src="/assets/js/staff.js"> 
</script>  -->

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
    library.staff("{{site.courseDetails_sheet_url}}", "{{site.courseDetails}}","staff",{{site.site_mode_isOffline}},"{{site.staff_csv}}");
</script>