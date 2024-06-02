// web_dynamic/static/scripts/1-hbnb.js
const $ = window.$;
$(document).ready(function () {
  const amenitiesChecked = [];
  const amenitiesNames = [];
  const url = 'http://0.0.0.0:5001/api/v1/status/';

  $('input[type="checkbox"]').change(function () {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');
    if (this.checked) {
      amenitiesChecked.push(amenityId);
      amenitiesNames.push(amenityName);
    } else {
      amenitiesChecked.splice($.inArray(amenityId, amenitiesChecked), 1);
      amenitiesNames.splice($.inArray(amenityName, amenitiesNames), 1);
    }
    // Update the h4 tag inside the div Amenities
    $('.amenities h4').text(amenitiesNames.join(', '));
  });
  $.get(url, function (data) {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });
});
