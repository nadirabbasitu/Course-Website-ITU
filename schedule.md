---
layout: page
title: Schedule
nav_order: 3
description: The weekly event schedule.
nav_exclude: false
---
<link rel="stylesheet" href="/assets/css/style.css">

# Weekly Schedule
{% assign start_time = site.scheduleData.timeline | first %}
{% capture offset %}{% include minutes.liquid time=start_time %}{% endcapture %}
<div class="schedule">
  <ul class="schedule-timeline" style="min-width: {{ site.scheduleData.schedule | size | times: 130 }}px">
    {% for time in site.scheduleData.timeline %}
    <li class="schedule-time">{{ time }} </li>
    {% endfor %}
  </ul>
  <ul class="schedule-group">
    {% for day in site.scheduleData.schedule %}
    <li class="schedule-day">
      <h2 class="schedule-header">{{ day.name }}</h2>
      {% if day.events %}
      <ul class="schedule-events" style="height: {{ site.scheduleData.timeline | size | times: 40 }}px">
      {% for event in day.events %}
        {% capture start %}{% include minutes.liquid time=event.start %}{% endcapture %}
        {% capture end %}{% include minutes.liquid time=event.end %}{% endcapture %}
        {% assign top = start | minus: offset | times: 40 | divided_by: 30 %}
        {% assign height = end | minus: start | times: 40 | divided_by: 30 %}
        <li class="schedule-event {% if event.class %}{{ event.class }}{% else %}{{ event.name | slugify }}{% endif %}"
            style="top: {{ top }}px; height: {{ height }}px;">
          <div class="name">{{ event.name }}</div>
          <div class="time">{{ event.start }}–{{ event.end }}</div>
          {% if event.location %}
          <div class="location">{{ event.location }}</div>
          {% endif %}
        </li>
      {% endfor %}
      </ul>
      {% endif %}
    </li>
    {% endfor %}
  </ul>
</div>

<a href="" class="btn btn-outline h6" id="ubs_appointment_url" >Book Instructor Appointment</a>
<a href="" class="btn btn-outline h6" id="ta_appointment_url">Book TA Appointment</a>

<div id="loader"></div>

<script src="/assets/js/library.js"></script>
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
    library.staticData("{{site.courseDetails_sheet_url}}", "{{site.courseDetails}}","general_site_details", "scheduleView" ,{{site.site_mode_isOffline}}, "{{site.general_data_csv}}");
</script>