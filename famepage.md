---
layout: page
title: Page of Fame
nav_exclude: false
description: A listing of all students who have performed best during the week
---
<link rel="stylesheet" href="fall2023-ce100/assets/css/style.css">

# Students

A listing of all students who have performed best during each week

## Weekly Best Performer

<div id="top_std_of_week">
</div>

## Overall Top 3 Performers 

<div id="overall_top_std">
</div>

<div class="loader" id="loader"></div>
<!-- <script type="module" src="/assets/js/famePage.js">
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
    library.pageOfFame("{{site.courseDetails_sheet_url}}", "{{site.fame_weekly_top_sheet_tab}}", "{{site.fame_overall_top_sheet_tab}}",{{site.site_mode_isOffline}}, "{{site.top_std_of_week_csv}}", "{{site.overall_top_std_csv}}" );
</script>