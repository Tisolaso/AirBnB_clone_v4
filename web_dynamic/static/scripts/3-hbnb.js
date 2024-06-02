// web_dynamic/static/scripts/1-hbnb.js
const $ = window.$;
$(document).ready(function () {
  const amenitiesChecked = [];
  const amenitiesNames = [];
  const statusEndpoint = 'http://0.0.0.0:5001/api/v1/status/';
  const placesEndpoint = 'http://0.0.0.0:5001/api/v1/places_search/';

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
  $.get(statusEndpoint, function (data) {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });
  $.ajax({
    type: 'POST',
    url: placesEndpoint,
    data: JSON.stringify({}),
    contentType: 'application/json',
    datatype: 'json',
    success: function (data) {
      for (let i = 0; i < data.length; i++) {
        const article = $('<article></article>');
        // Placing the article element
        $('.places').append(article);
        // Adding the title-box div
        article.append('<div></div>');
        article.children().addClass('title_box');
        // Adding the 'name' <H2> Tag
        article.children(':last-child').append('<h2>' + data[i].name + '</h2>');
        // Adding the price_by_night div to title-box
        article.children(':last-child').append('<div></div>');
        const prTag = article.children(':last-child').children(':last-child');
        prTag.addClass('price_by_night');
        prTag.append('$' + data[i].price_by_night);
        // Adding the information div
        article.append('<div></div>');
        article.children(':last-child').addClass('information');
        article.children(':last-child').append('<div></div>');
        const guest = article.children(':last-child').children(':last-child');
        guest.addClass('max_guest');
        if (data[i].max_guest !== 1) {
          guest.append(data[i].max_guest + ' Guests');
        } else {
          guest.append(data[i].max_guest + ' Guest');
        }
        article.children(':last-child').append('<div></div>');
        const rooms = article.children(':last-child').children(':last-child');
        rooms.addClass('number_rooms');
        if (data[i].number_rooms !== 1) {
          rooms.append(data[i].number_rooms + ' Bedrooms');
        } else {
          rooms.append(data[i].number_rooms + ' Bedrooms');
        }
        article.children(':last-child').append('<div></div>');
        const bathrm = article.children(':last-child').children(':last-child');
        bathrm.addClass('number_bathrooms');
        if (data[i].number_bathrooms !== 1) {
          bathrm.append(data[i].number_bathrooms + ' Guests');
        } else {
          bathrm.append(data[i].number_bathrooms + ' Guest');
        }
        // Adding the description div
        article.append('<div></div>');
        article.children(':last-child').addClass('description');
        const description = article.children(':last-child');
        description.append(data[i].description);
      }
    }
  });
});
