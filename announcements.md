---
layout: page
title: Announcements
nav_order: 1
description: A feed containing all of the class announcements.
nav_exclude: false

---

<link rel="stylesheet" href="../assets/css/style.css">

# Announcements

<div id="announcement_container">
</div>
<div class="loader" id="loader"></div>
<!-- <script type="module" src="/assets/js/announcements.js">
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
    library.announcements("{{site.courseDetails_sheet_url}}", "{{site.announcemet_and_calender_sheet_tab}}",{{site.site_mode_isOffline}}, "{{site.announcement_and_calender_csv}}");
</script>