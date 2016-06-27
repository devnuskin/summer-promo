angular.module('templates-app', ['../dev/app/modules/category/category.tpl.html', '../dev/app/modules/faq/faq.tpl.html', '../dev/app/modules/navigationCart/navigationCart.tpl.html', '../dev/app/modules/product/product.tpl.html', '../dev/app/modules/products/products.tpl.html', '../dev/app/modules/shoppingCart/shoppingCart.tpl.html']);

angular.module("../dev/app/modules/category/category.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../dev/app/modules/category/category.tpl.html",
    "<div id=\"rituals\" category-directive>\n" +
    "\n" +
    "    <div class=\"products\">\n" +
    "        <article id=\"product-display-{{::product.sku}}\" class=\"product product-{{$index+1}} product-category-{{::product.categoryId}}\" ng-repeat=\"product in categoryVm.products\" category-repeat-directive>\n" +
    "            <div ng-if=\"::product.isInPresales\" ng-bind=\"$root.translations.common.newProduct\"></div>\n" +
    "\n" +
    "            <img ng-src=\"{{::product.urlImage}}\" alt=\"\" class=\"product-image\">\n" +
    "\n" +
    "\n" +
    "            <div class=\"presale-infos\" ng-if=\"product.isInPresales\">\n" +
    "                <div class=\"presale-label\" ng-bind=\"$root.translations.common.presaleLabel\"></div>\n" +
    "            </div>\n" +
    "\n" +
    "\n" +
    "            <div id=\"product-menu-{{::product.sku}}\" class=\"product-menu\" ng-class=\"{'active' : product.menuOpened}\" ng-click=\"categoryVm.closeMenus(product); product.menuOpened = !product.menuOpened\">\n" +
    "                <div class=\"links\" ng-if=\"product.menuOpened\">\n" +
    "                    <a ng-click=\"product.menuOpened = false; categoryVm.goToProduct(product);\" ng-bind=\"$root.translations.common.viewProduct\" ng-if=\"product.menuOpened\"></a>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "        </article>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "    <perfect-scrollbar class=\"ritual-description\" dynamic=\"::categoryVm.category.description\" wheel-propagation=\"true\" wheel-speed=\"10\" min-scrollbar-length=\"20\">\n" +
    "    </perfect-scrollbar>\n" +
    "</div>");
}]);

angular.module("../dev/app/modules/faq/faq.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../dev/app/modules/faq/faq.tpl.html",
    "<h1>FAQ</h1>\n" +
    "<div ng-repeat=\"q in faqVm.questions\">\n" +
    "    <h3 ng-bind=\"q.question\"></h3>\n" +
    "    <span ng-bind=\"q.response\"></span>\n" +
    "</div>\n" +
    "");
}]);

angular.module("../dev/app/modules/navigationCart/navigationCart.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../dev/app/modules/navigationCart/navigationCart.tpl.html",
    "<div id=\"mobile-infos\" class=\"mobile-only\">\n" +
    "    <div ng-switch=\"navigationCartVm.regularProductsLength\">\n" +
    "        <div ng-switch-when=\"0\">\n" +
    "            <div class=\"alert-text text-0\" ng-bind-html=\"$root.translations.common.cartInvitationMobile0\"></div>\n" +
    "        </div>\n" +
    "        <div ng-switch-when=\"1\">\n" +
    "            <div class=\"alert-text text-1\" ng-bind-html=\"$root.translations.common.cartInvitationMobile1\"></div>\n" +
    "        </div>\n" +
    "        <div ng-switch-when=\"2\">\n" +
    "            <div class=\"alert-text text-2\" ng-bind-html=\"$root.translations.common.cartInvitationMobile2\"></div>\n" +
    "        </div>\n" +
    "        <div ng-switch-default>\n" +
    "            <div class=\"alert-text text-3\" ng-bind-html=\"$root.translations.common.cartInvitationMobile3\"></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <a class=\"button-3\" ui-sref=\"app.shop.category({showCase: 'promo', categoryId:'promoProducts'})\" ng-bind-html=\"$root.translations.common.cartButton3\"></a>\n" +
    "\n" +
    "\n" +
    "\n" +
    "    <div class=\"socials\" ng-if=\"navigationCartVm.$state.current.name == 'app.shop'\">\n" +
    "        <div class=\"roll\" ng-if=\"navigationCartVm.socialVisible\">\n" +
    "            <button class=\"close\" ng-click=\"navigationCartVm.socialVisible = false;\"></button>\n" +
    "            <a href=\"#\" socialshare socialshare-provider=\"twitter\" socialshare-text=\"{{$root.translations.common.twitterDescription}}\" socialshare-hashtags=\"{{$root.translations.common.twitterHashtags}}\" socialshare-url=\"{{$root.translations.common.shareURL}}\" class=\"twitter-button\" target=\"_blank\">\n" +
    "                <img src=\"assets/img/icon-twitter-big.png\" alt=\"Share on twitter\">\n" +
    "            </a>\n" +
    "            <a href=\"#\" socialshare socialshare-provider=\"facebook\" socialshare-text=\"{{$root.translations.common.facebookDescription}}\" socialshare-url=\"{{$root.translations.common.shareURL}}\" socialshare-media=\"{{$root.translations.common.shareMedia}}\" class=\"facebook-button\" target=\"_blank\">\n" +
    "                <img src=\"assets/img/icon-facebook-big.png\" alt=\"Share on facebook\">\n" +
    "            </a>\n" +
    "            <a href=\"#\" socialshare socialshare-provider=\"pinterest\" socialshare-text=\"{{$root.translations.common.pinterestDescription}}\" socialshare-url=\"{{$root.translations.common.shareURL}}\" socialshare-media=\"{{$root.translations.common.shareMedia}}\" class=\"pinterest-button\" target=\"_blank\">\n" +
    "                <img src=\"assets/img/icon-pinterest-big.png\" alt=\"Pin it\">\n" +
    "            </a>\n" +
    "        </div>\n" +
    "        <button class=\"roll-toggle\" ng-click=\"navigationCartVm.socialToggle();\">\n" +
    "            <span ng-bind=\"$root.translations.common.shareLabelMobile\"></span>\n" +
    "            <img src=\"assets/img/icon-twitter.png\" alt=\"Share on twitter\">\n" +
    "            <img src=\"assets/img/icon-facebook.png\" alt=\"Share on facebook\">\n" +
    "            <img src=\"assets/img/icon-pinterest.png\" alt=\"Pin it\">\n" +
    "        </button>\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n" +
    "<div id=\"cart-overview\">\n" +
    "    <!-- Products -->\n" +
    "\n" +
    "\n" +
    "\n" +
    "    <div class=\"carousel-prev carousel-ctrl\" ng-click=\"navigationCartVm.carouselPrev();\" ng-if=\"navigationCartVm.products.length > 3\"></div>\n" +
    "    <div class=\"carousel-next carousel-ctrl\" ng-click=\"navigationCartVm.carouselNext();\" ng-if=\"navigationCartVm.products.length > 3\"></div>\n" +
    "\n" +
    "    <div class=\"cart-carousel\">\n" +
    "\n" +
    "        <div class=\"inner\">\n" +
    "            <div class=\"box product\" ng-repeat=\"product in navigationCartVm.products\">\n" +
    "\n" +
    "                <a ng-click=\"navigationCartVm.goToProduct(product)\" class=\"product-display\">\n" +
    "                    <img ng-src=\"{{::product.urlThumbnail}}\" alt=\"\">\n" +
    "                </a>\n" +
    "\n" +
    "                <div class=\"product-action\">\n" +
    "                    <div class=\"quantity\">\n" +
    "                        <button class=\"ctrl minus\" ng-class=\"{'disabled': product.quantity == 1}\" ng-click=\"navigationCartVm.cartSrv.decrementQuantityOfProduct(product)\">-</button>\n" +
    "                        <span class=\"qty\" ng-bind=\"product.quantity\"></span>\n" +
    "                        <button class=\"ctrl plus\" ng-click=\"navigationCartVm.cartSrv.incrementQuantityOfProduct(product)\">+</button>\n" +
    "                    </div>\n" +
    "                    <button class=\"remove\" ng-click=\"navigationCartVm.cartSrv.removeProduct(product)\">x</button>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <!-- PLACEHOLDERS -->\n" +
    "            <div class=\"box product placeholder placeholder-{{::product.number}}\" ng-repeat=\"product in navigationCartVm.placeholders\">\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "    <div class=\"box alert\">\n" +
    "        <div ng-switch=\"navigationCartVm.regularProductsLength\">\n" +
    "            <div ng-switch-when=\"0\">\n" +
    "                <div class=\"alert-text text-0\" ng-bind-html=\"$root.translations.common.cartInvitation0\"></div>\n" +
    "            </div>\n" +
    "            <div ng-switch-when=\"1\">\n" +
    "                <div class=\"alert-text text-1\" ng-bind-html=\"$root.translations.common.cartInvitation1\"></div>\n" +
    "                <a ui-sref=\"app.shop({showCase: 'normal'})\" class=\"button-1\" ng-bind=\"$root.translations.common.cartButton1\"></a>\n" +
    "            </div>\n" +
    "            <div ng-switch-when=\"2\">\n" +
    "                <div class=\"alert-text text-2\" ng-bind-html=\"$root.translations.common.cartInvitation2\"></div>\n" +
    "                <a ui-sref=\"app.shop({showCase: 'normal'})\" class=\"button-1\" ng-bind=\"$root.translations.common.cartButton1\"></a>\n" +
    "            </div>\n" +
    "            <div ng-switch-default>\n" +
    "                <div class=\"alert-text text-3\" ng-bind-html=\"$root.translations.common.cartInvitation3\"></div>\n" +
    "                <a ui-sref=\"app.shop({showCase: 'normal'})\" class=\"button-1\" ng-bind=\"$root.translations.common.cartButton1\"></a>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-if=\"navigationCartVm.regularProductsLength > 2\" class=\"box alert-cta\">\n" +
    "        <button ng-click=\"navigationCartVm.cartSrv.displayCart()\" class=\"button-2\" ng-bind-html=\"$root.translations.common.cartButton2\"></button>\n" +
    "        <a class=\"button-3\" ui-sref=\"app.shop.category({showCase: 'promo', categoryId:'promoProducts'})\" ng-bind-html=\"$root.translations.common.cartButton3\"></a>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("../dev/app/modules/product/product.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../dev/app/modules/product/product.tpl.html",
    "<div id=\"products\" class=\"products-details\">\n" +
    "    <article id=\"product-display-{{::product.sku}}\" class=\"product product-idx-{{$index + 1}} product-{{::product.skuIndex + 1}} product-category-{{::product.categoryId}}\" ng-class=\"{selected: product.selected, 'presales' : product.isInPresales}\" ng-repeat=\"product in productVm.products | orderBy:['-selected', 'product.skuIndex']\" product-repeat-directive>\n" +
    "\n" +
    "        <div ng-if=\"product.selected\" class=\"product-infos\">\n" +
    "\n" +
    "            <div class=\"presale-alert\" ng-if=\"product.isInPresales\" ng-bind-html=\"$root.translations.common.presaleDetailTitle\"></div>\n" +
    "\n" +
    "            <h2 ng-bind=\"::product.name\"></h2>\n" +
    "\n" +
    "            <div class=\"mobile-only clearfix\">\n" +
    "\n" +
    "                <div class=\"image\">\n" +
    "                    <img ng-src=\"{{::product.urlImage}}\" alt=\"\">\n" +
    "                </div>\n" +
    "\n" +
    "\n" +
    "                <div class=\"product-action\">\n" +
    "                    <div class=\"product-price\" ng-class=\"{promo: product.isPromo}\">\n" +
    "                        <div class=\"label\" ng-bind=\"$root.translations.common.priceLabel\"></div>\n" +
    "                        <div class=\"price regular\" ng-bind=\"::product.price | customCurrency\"></div>\n" +
    "                        <div class=\"price discount\" ng-if=\"!product.isPromo\" ng-bind=\"::product.priceReduced | customCurrency\"></div>\n" +
    "                    </div>\n" +
    "                    <div class=\"product-psv\" ng-if=\"::product.psv !== null && !product.isPromo\">\n" +
    "                        <div class=\"label\" ng-bind=\"$root.translations.common.psvLabel\"></div>\n" +
    "                        <div class=\"psv\" ng-bind=\"::product.psv\"></div>\n" +
    "                    </div>\n" +
    "                    <div ng-if=\"::!product.isOutOfStock\">\n" +
    "                        <div class=\"quantity\">\n" +
    "                            <button class=\"ctrl minus\" ng-class=\"{'disabled': product.quantity == 1}\" ng-click=\"product.decrementQuantity()\">-</button>\n" +
    "                            <span class=\"qty\" ng-bind=\"product.quantity\"></span>\n" +
    "                            <button class=\"ctrl plus\" ng-click=\"product.incrementQuantity()\">+</button>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <button class=\"add-to-cart\" ng-if=\"!product.isPromo || (product.isPromo && mainVm.canBuyPromoProducts)\" ng-click=\"productVm.cartSrv.addProduct(product)\" ng-bind=\"$root.translations.common.addToCart\"></button>\n" +
    "                        <button class=\"add-to-cart\" disabled ng-if=\"product.isPromo && !mainVm.canBuyPromoProducts\" ng-bind=\"$root.translations.common.addToCart\">\n" +
    "                        </button>\n" +
    "\n" +
    "\n" +
    "                        <div class=\"quick-buy-wrapper\" ng-if=\"product.isInPresales\">\n" +
    "                            <button class=\"quick-buy\" ng-click=\"productVm.cartSrv.addAndCheckout(product)\" ng-bind=\"$root.translations.common.quickBuy\"></button>\n" +
    "                            <div ng-click=\"productVm.closeToolTip();\" class=\"quick-buy-tooltip\" ng-bind=\"$root.translations.common.quickBuyToolTip\"></div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"branded-items-disabled-message\" ng-if=\"product.isPromo && !mainVm.canBuyPromoProducts\" ng-bind-html=\"$root.translations.common.brandItemsDisabledMessage\">\n" +
    "\n" +
    "\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "            <perfect-scrollbar class=\"product-description\" ng-bind-html=\"::product.shortDescription\"></perfect-scrollbar>\n" +
    "\n" +
    "            <div class=\"product-links\">\n" +
    "                <button class=\"regular-only\" ng-click=\"productVm.displayLongDecription()\" ng-bind=\"$root.translations.common.moreInformations\"></button>\n" +
    "                <a ui-sref=\"app.shop.category({categoryId: '{{::product.categoryId}}'})\" ng-bind=\"$root.translations.common.ritual\"></a>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"product-long-description\" ng-class=\"{'show': productVm.showLongDecription}\">\n" +
    "                <span class=\"close-btn\" ng-click=\"productVm.displayLongDecription();\"></span>\n" +
    "                <perfect-scrollbar class=\"regular-only description-content\" ng-bind-html=\"product.longDescription\"></perfect-scrollbar>\n" +
    "            </div>\n" +
    "            <div class=\"mobile-only mobile-long-description\" ng-bind-html=\"product.longDescription\"></div>\n" +
    "\n" +
    "            <div class=\"product-action regular-only\" ng-if=\"::!product.isOutOfStock\">\n" +
    "                <div class=\"first-row\">\n" +
    "                    <div class=\"product-price\" ng-class=\"{promo: product.isPromo}\">\n" +
    "                        <div class=\"label\" ng-bind=\"$root.translations.common.priceLabel\"></div>\n" +
    "                        <div class=\"price regular\" ng-bind=\"::product.price | customCurrency\"></div>\n" +
    "                        <div class=\"price discount\" ng-if=\"!product.isPromo\" ng-bind=\"::product.priceReduced | customCurrency\"></div>\n" +
    "                    </div>\n" +
    "                    <div class=\"product-psv\" ng-if=\"::product.psv !== null && !product.isPromo\">\n" +
    "                        <div class=\"label\" ng-bind=\"$root.translations.common.psvLabel\"></div>\n" +
    "                        <div class=\"psv\" ng-bind=\"::product.psv\"></div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"quantity\">\n" +
    "                        <div class=\"label\" ng-bind=\"$root.translations.common.quantityLabel\"></div>\n" +
    "                        <button class=\"ctrl minus\" ng-class=\"{'disabled': product.quantity == 1}\" ng-click=\"product.decrementQuantity()\">-</button>\n" +
    "                        <span class=\"qty\" ng-bind=\"product.quantity\"></span>\n" +
    "                        <button class=\"ctrl plus\" ng-click=\"product.incrementQuantity()\">+</button>\n" +
    "\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"quick-buy-wrapper\">\n" +
    "                    <button class=\"quick-buy\" ng-if=\"product.isInPresales\" ng-click=\"productVm.cartSrv.addAndCheckout(product)\" ng-bind=\"$root.translations.common.quickBuy\"></button>\n" +
    "                    <div class=\"quick-buy-tooltip\" ng-bind=\"$root.translations.common.quickBuyToolTip\"></div>\n" +
    "                </div>\n" +
    "                <button class=\"add-to-cart\" ng-if=\"!product.isPromo || (product.isPromo && mainVm.canBuyPromoProducts)\" ng-click=\"productVm.cartSrv.addProduct(product)\" ng-bind=\"$root.translations.common.addToCart\"></button>\n" +
    "                <button class=\"add-to-cart\" disabled ng-if=\"product.isPromo && !mainVm.canBuyPromoProducts\" ng-bind=\"$root.translations.common.addToCart\">\n" +
    "                </button>\n" +
    "\n" +
    "                <div class=\"branded-items-disabled-message\" ng-if=\"product.isPromo && !mainVm.canBuyPromoProducts\" ng-bind-html=\"$root.translations.common.brandItemsDisabledMessage\">\n" +
    "\n" +
    "\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"product-soldout-notification\" ng-if=\"::product.isOutOfStock\">\n" +
    "                <div class=\"button\" ng-bind=\"$root.translations.common.soldOutLabel\">\n" +
    "\n" +
    "                </div>\n" +
    "                <p class=\"description\" ng-bind=\"$root.translations.common.soldOutPresale\" ng-if=\"::product.isOutOfStock && product.isInPresales\"></p>\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <img ng-src=\"{{::product.urlImage}}\" class=\"product-select-image\" alt=\"\" ng-if=\"product.selected\">\n" +
    "\n" +
    "        <div class=\"product-display\" ng-if=\"!product.selected\">\n" +
    "            <!-- ui-sref=\"app.shop.category.product({productId:'{{::product.sku}}', categoryId:'{{::product.categoryId}}'})\" -->\n" +
    "            <!--            <div ng-if=\"::product.isInPresales\" ng-bind=\"$root.translations.common.newProduct\"></div>-->\n" +
    "            <span class=\"product-image\"><img ng-src=\"{{::product.urlThumbnail}}\" alt=\"\"></span>\n" +
    "\n" +
    "            <div id=\"product-menu-{{::product.sku}}\" class=\"product-menu product-{{$index+1}} product-category-{{::product.categoryId}}\" ng-class=\"{'active' : product.menuOpened}\" ng-click=\"productVm.closeMenus(product); product.menuOpened = !product.menuOpened\" ng-mouseenter=\"productsVm.setActiveCategory(product.categoryId);\">\n" +
    "                <div class=\"links\" ng-if=\"product.menuOpened\">\n" +
    "                    <a ng-click=\"product.menuOpened = false; productVm.goToProduct(product)\" ng-bind=\"$root.translations.common.viewProduct\" ng-if=\"product.menuOpened\"></a>\n" +
    "                    <a class=\"ritual-link\" ui-sref=\"app.shop.category({categoryId: '{{::product.categoryId}}'})\" ng-bind=\"$root.translations.common.discoverRitual\" ng-if=\"product.menuOpened\"></a>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "    </article>\n" +
    "\n" +
    "    <div class=\"suggested-items-title\" ng-bind-html=\"$root.translations.common.suggestedProducts\"></div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("../dev/app/modules/products/products.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../dev/app/modules/products/products.tpl.html",
    "<div id=\"products\" class=\"overview {{productsVm.activeCategory}}\" ng-class=\"{promo: product.selected}\" ng-animate-children=true>\n" +
    "    <article id=\"product-display-{{::product.sku}}\" class=\"product product-{{$index+1}} product-{{::product.categoryId}}\" ng-repeat=\"product in productsVm.products\" ng-mouseenter=\"productsVm.setActiveCategory(product.categoryId);\" ng-mouseleave=\"productsVm.setActiveCategory('');\" products-repeat-directive>\n" +
    "        <div class=\"product-display\">\n" +
    "\n" +
    "            <div class=\"product-image\">\n" +
    "                <div class=\"presale-infos\" ng-if=\"::product.isOutOfStock === false && product.isInPresales\">\n" +
    "                    <div class=\"presale-label\" ng-bind-html=\"$root.translations.common.presaleLabel\"></div>\n" +
    "                    <div class=\"presale-quickbuy\">\n" +
    "\n" +
    "                        <div class=\"quick-buy-wrapper\">\n" +
    "                            <button class=\"quick-buy\" ng-click=\"productsVm.cartSrv.addAndCheckout(product)\" ng-bind=\"$root.translations.common.quickBuy\"></button>\n" +
    "                            <div class=\"quick-buy-tooltip\" ng-bind=\"$root.translations.common.quickBuyToolTip\"></div>\n" +
    "\n" +
    "                            <div class=\"quantity\">\n" +
    "                                <div class=\"label\" ng-bind=\"$root.translations.common.quantityLabel\"></div>\n" +
    "                                <button class=\"ctrl minus\" ng-class=\"{'disabled': product.quantity == 1}\" ng-click=\"product.decrementQuantity()\">-</button>\n" +
    "                                <span class=\"qty\" ng-bind=\"product.quantity\"></span>\n" +
    "                                <button class=\"ctrl plus\" ng-click=\"product.incrementQuantity()\">+</button>\n" +
    "                            </div>\n" +
    "\n" +
    "                        </div>\n" +
    "\n" +
    "\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div ng-if=\"::product.isOutOfStock && product.isInPresales\" class=\"soldout-label\" ng-bind=\"$root.translations.common.soldOutLabel\"></div>\n" +
    "                <img ng-src=\"{{::product.urlThumbnail}}\" alt=\"\" ng-click=\"productsVm.closeMenus(product); product.menuOpened = !product.menuOpened\">\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </article>\n" +
    "\n" +
    "    <div id=\"product-menu-{{::product.sku}}\" class=\"product-menu product-{{$index+1}} product-category-{{::product.categoryId}}\" ng-class=\"{'active' : product.menuOpened, 'presale' : product.isInPresales}\" ng-click=\"productsVm.closeMenus(product); product.menuOpened = !product.menuOpened\" ng-mouseenter=\"productsVm.setActiveCategory(product.categoryId);\" ng-mouseleave=\"productsVm.setActiveCategory('');\" ng-repeat=\"product in productsVm.products\" products-repeat-directive>\n" +
    "        <div class=\"links\" ng-if=\"product.menuOpened\">\n" +
    "\n" +
    "            <div class=\"quick-buy-wrapper tablets-only\" ng-if=\"product.isInPresales\">\n" +
    "                <button class=\"quick-buy\" ng-click=\"product.quickBuyToolTipOpened = true; $event.stopPropagation();\" ng-bind=\"$root.translations.common.quickBuy\"></button>\n" +
    "                <div class=\"quick-buy-tooltip\" ng-bind=\"$root.translations.common.quickBuyToolTip\"></div>\n" +
    "                <div class=\"actions clearfix\" ng-if=\"product.quickBuyToolTipOpened\">\n" +
    "                    <div class=\"quantity\">\n" +
    "                        <div class=\"label\" ng-bind=\"$root.translations.common.quantityLabel\"></div>\n" +
    "                        <button class=\"ctrl minus\" ng-class=\"{'disabled': product.quantity == 1}\" ng-click=\"product.decrementQuantity(); $event.stopPropagation();\">-</button>\n" +
    "                        <span class=\"qty\" ng-bind=\"product.quantity\"></span>\n" +
    "                        <button class=\"ctrl plus\" ng-click=\"product.incrementQuantity(); $event.stopPropagation();\">+</button>\n" +
    "                    </div>\n" +
    "                    <button class=\"quick-buy\" ng-click=\"productsVm.cartSrv.addAndCheckout(product)\" ng-bind=\"$root.translations.common.checkoutHomeMobile\">\n" +
    "                    </button>\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "            <a ng-click=\"product.menuOpened = false; productsVm.goToProduct(product)\" ng-bind=\"$root.translations.common.viewProduct\" ng-if=\"product.menuOpened\"></a>\n" +
    "\n" +
    "            <a class=\"ritual-link\" ng-click=\"product.menuOpened = false;\" ui-sref=\"app.shop.category({categoryId: '{{::product.categoryId}}'})\" ng-bind=\"$root.translations.common.discoverRitual\" ng-if=\"product.menuOpened\"></a>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("../dev/app/modules/shoppingCart/shoppingCart.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../dev/app/modules/shoppingCart/shoppingCart.tpl.html",
    "<!-- HEADER -->\n" +
    "<header id=\"main-header\">\n" +
    "\n" +
    "\n" +
    "    <button class=\"menu-toggle mobile-only\" ng-click=\"shoppingCartVm.toggleMobileMenu();\"></button>\n" +
    "\n" +
    "    <a href=\"#\" class=\"logo mobile-only\" ng-click=\"shoppingCartVm.cartSrv.showCart = false;\"><img src=\"assets/img/nuskin-logo.png\" alt=\"Nu Skin : Discover the best you\"></a>\n" +
    "\n" +
    "    <div class=\"socials\">\n" +
    "        <a href=\"#\" socialshare socialshare-provider=\"twitter\" socialshare-text=\"{{$root.translations.common.twitterDescription}}\" socialshare-hashtags=\"{{$root.translations.common.twitterHashtags}}\" socialshare-url=\"{{$root.translations.common.shareURL}}\" class=\"twitter-button\" target=\"_blank\">\n" +
    "            <img src=\"assets/img/icon-twitter.png\" alt=\"Share on twitter\">\n" +
    "        </a>\n" +
    "        <a href=\"#\" socialshare socialshare-provider=\"facebook\" socialshare-text=\"{{$root.translations.common.facebookDescription}}\" socialshare-url=\"{{$root.translations.common.shareURL}}\" socialshare-media=\"{{$root.translations.common.shareMedia}}\" class=\"facebook-button\" target=\"_blank\">\n" +
    "            <img src=\"assets/img/icon-facebook.png\" alt=\"Share on facebook\">\n" +
    "        </a>\n" +
    "        <a href=\"#\" socialshare socialshare-provider=\"pinterest\" socialshare-text=\"{{$root.translations.common.pinterestDescription}}\" socialshare-url=\"{{$root.translations.common.shareURL}}\" socialshare-media=\"{{$root.translations.common.shareMedia}}\" class=\"pinterest-button\" target=\"_blank\">\n" +
    "            <img src=\"assets/img/icon-pinterest.png\" alt=\"Pin it\">\n" +
    "        </a>\n" +
    "    </div>\n" +
    "\n" +
    "    <button id=\"cart-toggle\" ng-click=\"shoppingCartVm.displayCart()\">\n" +
    "        <span class=\"regular-only\">\n" +
    "            <span ng-bind=\"$root.translations.common.basket\"></span> <span class=\"num-product\">(<span ng-bind=\"shoppingCartVm.totalQuantity\"></span>)</span>\n" +
    "        </span>\n" +
    "        <span class=\"mobile-only num-product\" ng-bind=\"shoppingCartVm.totalQuantity\"></span>\n" +
    "    </button>\n" +
    "\n" +
    "    <div id=\"shopping-cart\">\n" +
    "        <button class=\"close-button\" ng-click=\"shoppingCartVm.displayCart()\"></button>\n" +
    "        <div class=\"content\">\n" +
    "\n" +
    "            <div ng-if=\"shoppingCartVm.cartErrorMessage.hasError\">\n" +
    "                <p ng-bind=\"$root.translations.common[shoppingCartVm.cartErrorMessage.message]\" class=\"cart-error-messages\"></p>\n" +
    "            </div>\n" +
    "\n" +
    "            <div ng-if=\"shoppingCartVm.products.length > 0\">\n" +
    "                <div class=\"products\">\n" +
    "                    <div class=\"title\" ng-bind=\"$root.translations.common.basketTitle\"></div>\n" +
    "\n" +
    "                    <div class=\"mobile-only\">\n" +
    "\n" +
    "                        <div class=\"product-row\" ng-repeat=\"product in shoppingCartVm.products\">\n" +
    "                            <div class=\"clearfix product-info\">\n" +
    "                                <table cellpadding=0 border=0 cellspacing=0>\n" +
    "                                    <tr>\n" +
    "                                        <td class=\"product-name\" ng-bind=\"::product.name\"></td>\n" +
    "                                        <td class=\"product-image\">\n" +
    "                                            <img ng-src=\"{{::product.urlThumbnail}}\" alt=\"::product.name\">\n" +
    "                                        </td>\n" +
    "                                    </tr>\n" +
    "                                </table>\n" +
    "                            </div>\n" +
    "\n" +
    "                            <div class=\"clearfix\">\n" +
    "\n" +
    "                                <table cellpadding=0 border=0 cellspacing=0 class=\"prices\">\n" +
    "                                    <tr>\n" +
    "                                        <td class=\"product-price regular\" ng-class=\"{promo: product.isPromo}\" ng-bind=\"::product.price | customCurrency\"></td>\n" +
    "                                        <td class=\"product-price discount\" ng-if=\"!product.isPromo\" ng-bind=\"::product.priceReduced | customCurrency\"></td>\n" +
    "                                        <td class=\"product-price psv\" ng-if=\"::product.psv !== null && !product.isPromo\" ng-bind=\"::product.psv + ' PSV'\"></td>\n" +
    "                                    </tr>\n" +
    "                                </table>\n" +
    "                                <table cellpadding=0 border=0 cellspacing=0 class=\"actions\">\n" +
    "                                    <tr>\n" +
    "                                        <td class=\"quantity\">\n" +
    "                                            <button class=\"ctrl minus\" ng-class=\"{'disabled': product.quantity == 1}\" ng-click=\"shoppingCartVm.cartSrv.decrementQuantityOfProduct(product)\">-</button>\n" +
    "                                            <span class=\"qty\" ng-bind=\"product.quantity\"></span>\n" +
    "                                            <button class=\"ctrl plus\" ng-click=\"shoppingCartVm.cartSrv.incrementQuantityOfProduct(product)\">+</button>\n" +
    "                                        </td>\n" +
    "                                        <td>\n" +
    "                                            <button class=\"remove-button\" ng-click=\"shoppingCartVm.cartSrv.removeProduct(product)\" ng-bind=\"$root.translations.common.remove\"></button>\n" +
    "                                        </td>\n" +
    "                                    </tr>\n" +
    "                                </table>\n" +
    "\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                    </div>\n" +
    "\n" +
    "                    <table class=\"products-table regular-only\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\n" +
    "                        <tr ng-repeat=\"product in shoppingCartVm.products\">\n" +
    "                            <td>\n" +
    "                                <a ui-sref=\"app.shop.category.product({productId:'{{::product.sku}}', categoryId:'{{::product.categoryId}}'})\">\n" +
    "                                    <img ng-src=\"{{::product.urlThumbnail}}\" alt=\"::product.name\" class=\"product-image\">\n" +
    "                                </a>\n" +
    "                            </td>\n" +
    "                            <td class=\"product-name\" ng-bind=\"::product.name\"></td>\n" +
    "                            <td>\n" +
    "                                <div class=\"product-price regular\" ng-class=\"{promo: product.isPromo}\" ng-bind=\"::product.price | customCurrency\"></div>\n" +
    "                                <div class=\"product-price discount\" ng-if=\"!product.isPromo\" ng-bind=\"::product.priceReduced | customCurrency\"></div>\n" +
    "\n" +
    "                                <div class=\"product-price psv\" ng-if=\"::product.psv !== null && !product.isPromo\" ng-bind=\"::product.psv + ' PSV'\"></div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "                            </td>\n" +
    "                            <td>\n" +
    "                                <div class=\"quantity\">\n" +
    "                                    <button class=\"ctrl minus\" ng-class=\"{'disabled': product.quantity == 1}\" ng-click=\"shoppingCartVm.cartSrv.decrementQuantityOfProduct(product)\">-</button>\n" +
    "                                    <span class=\"qty\" ng-bind=\"product.quantity\"></span>\n" +
    "                                    <button class=\"ctrl plus\" ng-click=\"shoppingCartVm.cartSrv.incrementQuantityOfProduct(product)\">+</button>\n" +
    "                                </div>\n" +
    "                                <button class=\"remove-button\" ng-click=\"shoppingCartVm.cartSrv.removeProduct(product)\" ng-bind=\"$root.translations.common.remove\"></button>\n" +
    "                            </td>\n" +
    "                        </tr>\n" +
    "                    </table>\n" +
    "                </div>\n" +
    "                <div class=\"total\">\n" +
    "                    <div class=\"title\" ng-bind=\"$root.translations.common.totalTitle\"></div>\n" +
    "                    <div class=\"total-table\">\n" +
    "                        <div class=\"regular\"><span ng-bind=\"$root.translations.common.basketTotalLabel\"></span> <strong ng-bind=\"shoppingCartVm.totalPrice | customCurrency\"></strong></div>\n" +
    "                        <div class=\"discount\"><span ng-bind=\"$root.translations.common.basketDiscountTotalLabel\"></span> <strong ng-bind=\"shoppingCartVm.totalDiscountPrice | customCurrency\"></strong></div>\n" +
    "                        <div class=\"psv\" ng-if=\"shoppingCartVm.totalPSV > 0\"><span ng-bind=\"$root.translations.common.psvLabel\"></span> <strong ng-bind=\"shoppingCartVm.totalPSV | number:2\"></strong></div>\n" +
    "                    </div>\n" +
    "                    <button ng-click=\"shoppingCartVm.redirectToCheckout()\" ng-if=\"mainVm.canBuyPromoProducts\" class=\"checkout-button\" ng-class=\"{'disabled': !mainVm.canBuyPromoProducts}\" ng-bind=\"$root.translations.common.checkout\"></button>\n" +
    "                    <div ng-if=\"!mainVm.canBuyPromoProducts\" class=\"checkout-disabled\" ng-bind-html=\"$root.translations.common.cartCheckoutDisabledMessage\"></div>\n" +
    "                    <a ng-click=\"shoppingCartVm.displayCart()\" href=\"#\" class=\"continue-button\" ng-bind=\"$root.translations.common.cartButton1\"></a>\n" +
    "                    <a ng-if=\"mainVm.canBuyPromoProducts\" ng-click=\"shoppingCartVm.displayCart()\" class=\"promo-button\" ui-sref=\"app.shop.category({showCase: 'promo', categoryId:'promoProducts'})\" ng-bind-html=\"$root.translations.common.cartButton3\"></a>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"empty-cart\" ng-if=\"shoppingCartVm.products.length == 0\" ng-bind=\"$root.translations.common.emptyBasket\">\n" +
    "\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "</header>");
}]);
