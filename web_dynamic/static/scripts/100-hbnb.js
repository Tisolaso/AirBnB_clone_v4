// web_dynamic/static/scripts/100-hbnb.js
const $ = window.$;
$(document).ready(function () {
  const amenitiesChecked = [];
  const statesChecked = [];
  const citiesChecked = [];
  const amenitiesNames = [];
  const statesNames = [];
  const citiesNames = [];
  const statusEndpoint = 'http://0.0.0.0:5001/api/v1/status/';
  const placesEndpoint = 'http://0.0.0.0:5001/api/v1/places_search/';

  $('input[type="checkbox"]').change(function () {
    const dataType = $(this).data('type');
    const dataId = $(this).data('id');
    const dataName = $(this).data('name');

    if (dataType === 'amenity') {
      if (this.checked) {
        amenitiesChecked.push(dataId);
        amenitiesNames.push(dataName);
      } else {
        amenitiesChecked.splice($.inArray(dataId, amenitiesChecked), 1);
        amenitiesNames.splice($.inArray(dataName, amenitiesNames), 1);
      }
      $('.amenities h4').text(amenitiesNames.join(', '));
    } else if (dataType === 'state') {
      if (this.checked) {
        statesChecked.push(dataId);
        statesNames.push(dataName);
      } else {
        statesChecked.splice($.inArray(dataId, statesChecked), 1);
        statesNames.splice($.inArray(dataName, statesNames), 1);
      }
      $('.locations h4').text(statesNames.join(', '));
    } else if (dataType === 'city') {
      if (this.checked) {
        citiesChecked.push(dataId);
        citiesNames.push(dataName);
      } else {
        citiesChecked.splice($.inArray(dataId, citiesChecked), 1);
        citiesNames.splice($.inArray(dataName, citiesNames), 1);
      }
      $('.locations h4').text(citiesNames.join(', '));
    }
  });

  /*******************************************************
    display red circle on top right of page if status ok
   *******************************************************/
  $.get(statusEndpoint, function (data) {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });

  /*******************************************************
    populate Places from frontend, instead of backend jinja;
    filter places displayed based on amenity checkboxed list
   *******************************************************/
  $('button').click(function () {
    $.ajax({
      type: 'POST',
      url: placesEndpoint,
      data: JSON.stringify({
        amenities: amenitiesChecked,
        states: statesChecked,
        cities: citiesChecked,
      }),
      contentType: 'application/json',
      datatype: 'json',
      success: function (data) {
        $('.places').empty();
        for (let i = 0; i < data.length; i++) {
          const article = $('<article></article>');
          // Placing the article element
          $('.places').append(article);
          // Adding the title-box div
          article.append('<div></div>');
          article.children().addClass('title_box');
          // Adding the 'name' <H2> Tag
          article
            .children(':last-child')
            .append('<h2>' + data[i].name + '</h2>');
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
          const bathrm = article
            .children(':last-child')
            .children(':last-child');
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
      },
    });
  });
});
