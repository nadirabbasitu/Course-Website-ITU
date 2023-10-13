---
title: Outlines
parent: Details
nav_order: 2
description: >-
    Course parts
---
<link rel="stylesheet" href="https://nadirabbasitu.github.io/fall2023-ce100/assets/css/style.css">
# Outlines
{:.no_toc}

---

{{ site.outlines_description }}
## Theory
[Tentative Theory Course Outline]({{site.details_outline_theory_url}}){: .btn .btn-outline .h6}


## Lab
[Tentative Lab Course Outline]({{site.details_outline_lab_url}}){: .btn .btn-outline .h6}

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
