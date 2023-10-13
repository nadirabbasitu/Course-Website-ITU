---
layout: page
title: Details
nav_exclude: false
has_children: true
description: >-
    Course policies and information.
---
{% assign imagePrefix = '/fall2023-ce100/' %}

<link rel="stylesheet" href="{{ imagePrefix }}assets/css/style.css">

# Course Details
{:.no_toc}

---

## About

<p id="description"></p>

<div id="loader"></div>

<script src="{{ imagePrefix }}assets/js/library.js"></script>
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
    library.staticData("{{site.courseDetails_sheet_url}}", "{{site.courseDetails}}","general_site_details", "details" ,{{site.site_mode_isOffline}}, "{{site.general_data_csv}}");
</script>

