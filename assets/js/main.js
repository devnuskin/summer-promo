//This will sort your array
function sortRight(a, b) {
    var aLeft = $(a).position().left;
    var bLeft = $(b).position().left;
    return aLeft < bLeft;
}

var clearStage = function () {

    // If we are on main stage
    var $mainStage = $('#main-view');
    if ($mainStage.find('.overview').length) {
        var $container = $mainStage.find('.overview');
        var productsLeft = $container.find('.product-1, .product-2, .product-3, .product-4, .product-6');
        var productsRight = $container.find('.product-5, .product-7, .product-8, .product-9');
        productsRight.sort(sortRight);

    }
    if ($mainStage.find('.products-details').length) {
        var $container = $mainStage.find('.products-details');
        var productsLeft = $container.find('.product-idx-1');
        var productsRight = $container.find('.product-idx-2, .product-idx-3');
        productsRight.sort(sortRight);
    }

    if ($mainStage.find('#rituals ').length) {
        var $container = $mainStage.find('#rituals');
        var productsLeft = $container.find('.product, .ritual-title');
        var productsRight = $container.find('.ritual-description');
        productsRight.sort(sortRight);
    }


    TweenMax.staggerFromTo(productsLeft, 0.5, {
        opacity: 1,
        x: 0
    }, {
        opacity: 0,
        x: -200,
        ease: Strong.easeOut,
    }, 0.05);

    TweenMax.staggerFromTo(productsRight, 0.5, {
        opacity: 1,
        x: 0
    }, {
        opacity: 0,
        x: 200,
        ease: Strong.easeOut,
    }, 0.05);


}

$(function () {
    $('.sub-menu-toggle').on('click', function (e) {
        e.preventDefault();
        $(this).parents('li').toggleClass('sub-menu-display');
    });

});