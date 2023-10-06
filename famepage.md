---
layout: page
title: Page of Fame
nav_exclude: false
description: A listing of all students who have performed best during the week
---
<link rel="stylesheet" href="/assets/css/style.css">

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

<script src="/assets/js/library.js"></script>
<script>
    library.pageOfFame("{{site.courseDetails_sheet_url}}", "{{site.fame_weekly_top_sheet_tab}}", "{{site.fame_overall_top_sheet_tab}}",{{site.site_mode_isOffline}}, "{{site.top_std_of_week_csv}}", "{{site.overall_top_std_csv}}" );
</script>