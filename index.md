---
layout: home
title: Home
nav_exclude: true
seo: 
  type: Course
  
---
<link rel="stylesheet" href="/assets/css/style.css">
<script>
  document.title = "{{ site.title }}"
</script>

<h1 class="mb-2" id="tagLine"></h1>


<!-- Announcements -->
{% if site.announcements %}
  <div class="fs-3" id="ann-btn">
    {{ site.announcements.last }}
    <a href="announcements/" class="btn btn-outline">Announcements</a>
  </div>
{% endif %}

<!-- Site Title -->
<h2 id="title"></h2>

<!-- Site Description -->
<p id="description"></p>

<div id="loader"></div>

<script src="/assets/js/library.js"></script>
<script>
    library.staticData("{{site.courseDetails_sheet_url}}", "{{site.courseDetails}}","general_site_details", "indexView" ,{{site.site_mode_isOffline}}, "{{site.general_data_csv}}");
</script>
