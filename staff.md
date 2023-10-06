---
layout: page
title: Staff
description: A listing of all the course staff members.
nav_exclude: false
---
<link rel="stylesheet" href="/assets/css/style.css">

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

<script src="/assets/js/library.js"></script>
<script>
    library.staff("{{site.courseDetails_sheet_url}}", "{{site.courseDetails}}","staff",{{site.site_mode_isOffline}},"{{site.staff_csv}}");
</script>