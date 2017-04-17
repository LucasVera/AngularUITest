'use strict';

$(document).ready(function () {
    $('.dropdown-toggle').dropdown();
    $('body').tooltip({ selector: '[data-toggle=tooltip]' });
});


$(function () {
    $('[data-toggle="tooltip"]').tooltip();
});